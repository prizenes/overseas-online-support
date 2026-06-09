"use client";

import { useEffect, useMemo, useState } from "react";
import { consultationTopics } from "@/lib/service-content";
import { convertLocalDateTimeToJapan, type ConvertedDateTime } from "@/lib/time-zone";

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-2 w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-base text-ink shadow-sm transition focus:border-sea focus:ring-2 focus:ring-sea/20";

const fallbackTimeZones = [
  "America/Los_Angeles",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Toronto",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Australia/Sydney",
  "Australia/Melbourne",
  "Asia/Singapore",
  "Asia/Bangkok",
  "Asia/Hong_Kong",
  "Asia/Tokyo",
  "Pacific/Auckland"
];

type PreferredSlot = {
  label: string;
  localDateTime: string;
  localTimeZone: string;
  localDisplay: string;
  japanDisplay: string;
  isWithinJapanBusinessHours: boolean;
};

export function ApplyForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [timeZone, setTimeZone] = useState("Asia/Tokyo");
  const [detectedTimeZone, setDetectedTimeZone] = useState("");
  const [preferredDateTimes, setPreferredDateTimes] = useState(["", "", ""]);

  const timeZoneOptions = useMemo(() => {
    const supportedTimeZones =
      typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : fallbackTimeZones;
    return Array.from(new Set([...fallbackTimeZones, ...supportedTimeZones])).sort();
  }, []);

  useEffect(() => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (browserTimeZone) {
      setDetectedTimeZone(browserTimeZone);
      setTimeZone(browserTimeZone);
    }
  }, []);

  const convertedSlots = useMemo(
    () => preferredDateTimes.map((value) => (value ? convertLocalDateTimeToJapan(value, timeZone) : null)),
    [preferredDateTimes, timeZone]
  );

  function buildPreferredSlots(): PreferredSlot[] {
    return preferredDateTimes
      .map((value, index) => {
        const converted = convertedSlots[index];

        if (!value || !converted) {
          return null;
        }

        return {
          label: `第${index + 1}希望`,
          localDateTime: value,
          localTimeZone: timeZone,
          localDisplay: converted.localDisplay,
          japanDisplay: converted.japanDisplay,
          isWithinJapanBusinessHours: converted.isWithinJapanBusinessHours
        };
      })
      .filter((slot): slot is PreferredSlot => Boolean(slot));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const topics = formData.getAll("topics").map(String);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      country: String(formData.get("country") ?? ""),
      timezone: timeZone,
      topics,
      message: String(formData.get("message") ?? ""),
      consultationFor: String(formData.get("consultationFor") ?? ""),
      contactPreference: String(formData.get("contactPreference") ?? ""),
      preferredSlots: buildPreferredSlots(),
      consentLocalCare: formData.get("consentLocalCare") === "on",
      consentNonMedical: formData.get("consentNonMedical") === "on"
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "送信できませんでした。時間をおいて再度お試しください。");
      }

      form.reset();
      setPreferredDateTimes(["", "", ""]);
      setState("success");
    } catch (submitError) {
      setState("error");
      setError(submitError instanceof Error ? submitError.message : "送信中にエラーが発生しました。");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-md bg-white p-6 shadow-soft sm:p-8">
        <p className="text-2xl font-black leading-9 text-ink">無料相談を送信しました。</p>
        <p className="mt-4 text-lg leading-8 text-ink/75">
          内容を確認のうえ、初回オンライン相談の対象となるか、日程調整やご利用の流れについてメールでご案内いたします。
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 rounded-md border border-sea bg-white px-5 py-3 font-bold text-sea transition hover:bg-mist"
        >
          続けて相談する
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-md bg-white p-5 shadow-soft sm:p-8">
      <div className="rounded-md bg-mist p-4">
        <p className="text-lg font-bold leading-8 text-ink">
          現在のお悩みや希望日時をお聞かせください。内容を確認し、初回オンライン相談の対象となるか、日程調整やご利用の流れをメールでご案内します。
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-bold text-ink">
          お名前
          <input className={inputClass} name="name" autoComplete="name" required />
        </label>
        <label className="font-bold text-ink">
          メールアドレス
          <input className={inputClass} name="email" type="email" autoComplete="email" required />
        </label>
        <label className="font-bold text-ink">
          居住国
          <input className={inputClass} name="country" autoComplete="country-name" required />
        </label>
        <div className="font-bold text-ink">
          <label htmlFor="timezone">あなたの現在のタイムゾーン</label>
          <select id="timezone" className={inputClass} name="timezone" value={timeZone} onChange={(event) => setTimeZone(event.target.value)} required>
            {timeZoneOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="mt-2 block text-sm font-semibold leading-6 text-ink/60">
            {detectedTimeZone
              ? `ブラウザから ${detectedTimeZone} を自動取得しました。違う場合は選択し直してください。`
              : "自動取得できない場合は、お住まいの地域のタイムゾーンを選択してください。"}
          </span>
        </div>
      </div>

      <fieldset className="rounded-md border border-ink/15 p-4">
        <legend className="px-2 text-lg font-bold text-ink">相談したい内容</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {consultationTopics.map((topic) => (
            <label key={topic} className="flex items-center gap-3 rounded-md bg-mist px-3 py-3 text-base font-semibold">
              <input className="h-5 w-5 accent-sea" type="checkbox" name="topics" value={topic} />
              {topic}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="font-bold text-ink">
        簡単な相談内容
        <textarea className={inputClass} name="message" rows={5} required />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-bold text-ink">
          本人の相談か、家族についての相談か
          <select className={inputClass} name="consultationFor" required>
            <option value="">選択してください</option>
            <option value="本人">本人</option>
            <option value="家族">家族</option>
            <option value="本人と家族で同席希望">本人と家族で同席希望</option>
          </select>
        </label>
        <label className="font-bold text-ink">
          希望する連絡方法
          <select className={inputClass} name="contactPreference" required>
            <option value="">選択してください</option>
            <option value="メール">メール</option>
            <option value="Zoom相談を希望">Zoom相談を希望</option>
            <option value="まずは日程を相談したい">まずは日程を相談したい</option>
          </select>
        </label>
      </div>

      <fieldset className="rounded-md border border-ink/15 p-4">
        <legend className="px-2 text-lg font-bold text-ink">希望日時（あなたの現地時間）</legend>
        <p className="mt-2 text-base font-semibold leading-7 text-ink/70">
          お住まいの地域の時間で希望日時を入力してください。入力後、日本時間に自動変換して表示します。日本時間を調べる必要はありません。
          原則、日本時間9:00〜19:00の範囲で調整しますが、時差の関係で難しい場合はメールでご相談ください。
        </p>
        <div className="mt-5 grid gap-5">
          {preferredDateTimes.map((value, index) => (
            <DateTimePreference
              key={index}
              index={index}
              value={value}
              converted={convertedSlots[index]}
              onChange={(nextValue) =>
                setPreferredDateTimes((current) => current.map((item, itemIndex) => (itemIndex === index ? nextValue : item)))
              }
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-md border border-coral/35 bg-coral/5 p-4">
        <legend className="px-2 text-lg font-bold text-ink">確認チェック</legend>
        <div className="mt-3 grid gap-3">
          <label className="flex gap-3 text-base font-semibold leading-7">
            <input className="mt-1 h-5 w-5 shrink-0 accent-sea" type="checkbox" name="consentLocalCare" required />
            強い痛み、しびれ、麻痺、急な症状悪化、転倒後の痛みがある場合は、現地医療機関の受診を優先することを理解しました
          </label>
          <label className="flex gap-3 text-base font-semibold leading-7">
            <input className="mt-1 h-5 w-5 shrink-0 accent-sea" type="checkbox" name="consentNonMedical" required />
            本サービスは診断・治療を目的とした医療行為ではないことを理解しました
          </label>
        </div>
      </fieldset>

      {error ? <p className="rounded-md bg-coral/10 p-4 font-bold text-coral">{error}</p> : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-md bg-sea px-6 py-4 text-lg font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-ink/45"
      >
        {state === "submitting" ? "送信しています" : "無料相談を送信する"}
      </button>
    </form>
  );
}

function DateTimePreference({
  index,
  value,
  converted,
  onChange
}: {
  index: number;
  value: string;
  converted: ConvertedDateTime | null;
  onChange: (value: string) => void;
}) {
  const label = `第${index + 1}希望日時（あなたの現地時間）`;

  return (
    <label className="font-bold text-ink">
      {label}
      <input
        className={inputClass}
        name={`preferredDateTime${index + 1}`}
        type="datetime-local"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={index === 0}
      />
      {converted ? (
        <span className="mt-3 block rounded-md bg-mist p-4 text-base font-bold leading-7 text-ink">
          日本時間：{converted.japanDisplay}
          <span className={converted.isWithinJapanBusinessHours ? "mt-2 block text-sea" : "mt-2 block text-coral"}>
            {converted.isWithinJapanBusinessHours
              ? "対応可能時間内です"
              : "日本時間の対応時間外です。別の時間をご入力いただくか、メールでご相談ください"}
          </span>
        </span>
      ) : (
        <span className="mt-2 block text-sm font-semibold leading-6 text-ink/60">入力すると日本時間に自動変換して表示します。</span>
      )}
    </label>
  );
}
