export type ConvertedDateTime = {
  localInput: string;
  localDisplay: string;
  japanDisplay: string;
  japanHour: number;
  japanMinute: number;
  isWithinJapanBusinessHours: boolean;
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(timeZone: string) {
  const cached = formatterCache.get(timeZone);

  if (cached) {
    return cached;
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });

  formatterCache.set(timeZone, formatter);
  return formatter;
}

function getTimeZoneParts(date: Date, timeZone: string) {
  const parts = getFormatter(timeZone).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second)
  };
}

function getOffsetMs(date: Date, timeZone: string) {
  const parts = getTimeZoneParts(date, timeZone);
  const zonedAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);

  return zonedAsUtc - date.getTime();
}

function parseDateTimeLocal(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);

  if (!match) {
    return null;
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    hour: Number(match[4]),
    minute: Number(match[5])
  };
}

function zonedWallTimeToDate(value: string, timeZone: string) {
  const parts = parseDateTimeLocal(value);

  if (!parts) {
    return null;
  }

  const utcGuess = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, 0);
  const firstGuess = new Date(utcGuess - getOffsetMs(new Date(utcGuess), timeZone));
  const secondGuess = new Date(utcGuess - getOffsetMs(firstGuess, timeZone));

  return secondGuess;
}

function formatInTimeZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(date);
}

export function convertLocalDateTimeToJapan(value: string, sourceTimeZone: string): ConvertedDateTime | null {
  const date = zonedWallTimeToDate(value, sourceTimeZone);

  if (!date || Number.isNaN(date.getTime())) {
    return null;
  }

  const japanParts = getTimeZoneParts(date, "Asia/Tokyo");
  const japanMinutes = japanParts.hour * 60 + japanParts.minute;
  const isWithinJapanBusinessHours = japanMinutes >= 9 * 60 && japanMinutes <= 19 * 60;

  return {
    localInput: value,
    localDisplay: formatInTimeZone(date, sourceTimeZone),
    japanDisplay: formatInTimeZone(date, "Asia/Tokyo"),
    japanHour: japanParts.hour,
    japanMinute: japanParts.minute,
    isWithinJapanBusinessHours
  };
}
