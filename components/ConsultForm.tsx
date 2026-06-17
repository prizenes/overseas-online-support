"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { EVENTS } from "@/lib/site";

// ---- タイムゾーン処理 ------------------------------------------------

/** datetime-local の値を、指定タイムゾーンの壁時計時刻としてUTCに変換（DST考慮） */
function wallTimeToUtc(value: string, timeZone: string): Date | null {
  if (!value) return null;
  const [d, t] = value.split("T");
  if (!d || !t) return null;
  const [y, m, day] = d.split("-").map(Number);
  const [hh, mm] = t.split(":").map(Number);

  let utc = Date.UTC(y, m - 1, day, hh, mm);
  for (let i = 0; i < 2; i++) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: false,
    }).formatToParts(new Date(utc));
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
    const shown = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"));
    utc += Date.UTC(y, m - 1, day, hh, mm) - shown;
  }
  return new Date(utc);
}

function formatJst(date: Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "long", day: "numeric", weekday: "short",
    hour: "2-digit", minute: "2-digit",
  }).format(date);
}

function jstHour(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour")?.value) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value);
  return h + m / 60;
}

// 海外在住日本人の主要居住地を上位候補として表示
const MAJOR_TZ = [
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
  "Pacific/Auckland",
];

// ---- タイムゾーン選択（折りたたみ+検索） ------------------------------

function TimezonePicker({ tz, onChange }: { tz: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const allZones = useMemo<string[]>(() => {
    try {
      return (
        (Intl as unknown as { supportedValuesOf?: (k: string) => string[] })
          .supportedValuesOf?.("timeZone") ?? MAJOR_TZ
      );
    } catch {
      return MAJOR_TZ;
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // 検索前は主要候補のみ表示し、長いリストを出さない
      return MAJOR_TZ;
    }
    return allZones.filter((z) => z.toLowerCase().includes(q)).slice(0, 30);
  }, [query, allZones]);

  const localNow = (zone: string) => {
    try {
      return new Intl.DateTimeFormat("ja-JP", {
        timeZone: zone, hour: "2-digit", minute: "2-digit",
      }).format(new Date());
    } catch {
      return "";
    }
  };

  return (
    <div className="field">
      <label>あなたのタイムゾーン</label>
      <div className="tz-current">
        <span>
          <strong>{tz}</strong>
          <small>（現地時刻 {localNow(tz)}）</small>
        </span>
        <button
          type="button"
          className="tz-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "閉じる" : "タイムゾーンを変更する"}
        </button>
      </div>
      <p className="tz-hint">お使いの端末から自動取得しました。違う場合のみ変更してください。</p>

      {open && (
        <div className="tz-picker">
          <input
            type="text"
            placeholder="都市名で検索（例：London、Sydney、Vancouver）"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="タイムゾーンを検索"
          />
          {!query && <p className="tz-hint" style={{ margin: "8px 0 4px" }}>主要な候補：</p>}
          <ul className="tz-options" role="listbox">
            {filtered.map((z) => (
              <li key={z}>
                <button
                  type="button"
                  role="option"
                  aria-selected={z === tz}
                  className={z === tz ? "selected" : ""}
                  onClick={() => {
                    onChange(z);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  {z}
                  <small>{localNow(z)}</small>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="tz-empty">該当するタイムゾーンが見つかりません</li>
            )}
          </ul>
        </div>
      )}
      <input type="hidden" name="timezone" value={tz} />
    </div>
  );
}

// ---- 希望日時1枠 -------------------------------------------------------

function PreferredSlot({
  label, value, onChange, timeZone,
}: { label: string; value: string; onChange: (v: string) => void; timeZone: string }) {
  const utc = useMemo(() => wallTimeToUtc(value, timeZone), [value, timeZone]);
  const inRange = utc ? jstHour(utc) >= 9 && jstHour(utc) <= 19 : null;

  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {utc && (
        <p className={`jst-result ${inRange ? "" : "out"}`}>
          日本時間：{formatJst(utc)}{" "}
          {inRange
            ? "（受付時間内 9:00〜19:00）"
            : "（日本時間9:00〜19:00の範囲外ですが、このまま送信できます。メールで調整します）"}
        </p>
      )}
    </div>
  );
}

// ---- 本体 -------------------------------------------------------------

const TOPICS = [
  "腰痛", "膝痛", "股関節痛", "歩行不安", "転倒不安",
  "運動不足", "病院リハビリ後の運動継続", "高齢家族の体力低下", "その他",
];

export default function ConsultForm() {
  const [tz, setTz] = useState("Asia/Tokyo");
  const [slots, setSlots] = useState(["", "", ""]);
  const [moreSlots, setMoreSlots] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const formStarted = useRef(false);

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detected) setTz(detected);
  }, []);

  // フォームへの最初の操作（フォーカス）で一度だけ form_start を送る。
  // 入力値そのものは一切送らない（イベント名のみ）。
  function handleFormStart() {
    if (formStarted.current) return;
    formStarted.current = true;
    track(EVENTS.formStart);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    const preferredSlots = slots
      .map((s, i) => {
        const utc = wallTimeToUtc(s, tz);
        if (!s || !utc) return null;
        const h = jstHour(utc);
        return {
          label: `第${i + 1}希望`,
          localDateTime: s,
          localTimeZone: tz,
          localDisplay: new Intl.DateTimeFormat("ja-JP", {
            timeZone: tz,
            month: "long", day: "numeric", weekday: "short",
            hour: "2-digit", minute: "2-digit",
          }).format(utc),
          japanDisplay: formatJst(utc),
          isWithinJapanBusinessHours: h >= 9 && h <= 19,
        };
      })
      .filter(Boolean);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      country: String(data.get("country") ?? ""),
      timezone: tz,
      topics: data.getAll("topics").map(String),
      message: String(data.get("message") ?? ""),
      consultationFor: String(data.get("who") ?? ""),
      contactPreference: "",
      preferredSlots,
      consentLocalCare: data.has("agree_emergency"),
      consentNonMedical: data.has("agree_scope"),
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");
      track(EVENTS.submitContactForm);
      setStatus("ok");
      form.reset();
      setSlots(["", "", ""]);
      setMoreSlots(false);
    } catch {
      setStatus("err");
    }
  }

  return (
    <form className="consult-form" onSubmit={onSubmit} onFocusCapture={handleFormStart} noValidate>
      <div className="field">
        <label>
          お名前<span className="req">必須</span>
        </label>
        <input type="text" name="name" required autoComplete="name" />
      </div>

      <div className="field">
        <label>
          メールアドレス<span className="req">必須</span>
        </label>
        <input type="email" name="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label>居住国</label>
        <input type="text" name="country" placeholder="例：アメリカ、ドイツ、シンガポール" />
      </div>

      <TimezonePicker tz={tz} onChange={setTz} />

      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <label>相談したい内容（複数選択可）</label>
        <div className="check-grid">
          {TOPICS.map((t) => (
            <label key={t}>
              <input type="checkbox" name="topics" value={t} /> {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label>簡単な相談内容</label>
        <textarea
          name="message"
          placeholder="例：海外赴任中で、半年ほど前から腰に違和感があります。運動してよいか日本語で相談したいです。"
        />
      </div>

      <div className="field">
        <label>どなたについてのご相談ですか</label>
        <select name="who" defaultValue="">
          <option value="" disabled>選択してください</option>
          <option>本人</option>
          <option>家族</option>
          <option>本人と家族で同席希望</option>
        </select>
      </div>

      <div className="field" style={{ marginBottom: -8 }}>
        <label>希望日時（あなたの現地時間で入力）</label>
        <p className="tz-hint">
          現地時間のまま入力してください。日本時間は自動で表示されます。
          日本時間9:00〜19:00の範囲外でも送信できます。
        </p>
      </div>
      <PreferredSlot label="第1希望" value={slots[0]} onChange={(v) => setSlots([v, slots[1], slots[2]])} timeZone={tz} />

      {!moreSlots ? (
        <button type="button" className="slot-more" onClick={() => setMoreSlots(true)}>
          ＋ 第2・第3希望を追加する（任意）
        </button>
      ) : (
        <>
          <PreferredSlot label="第2希望（任意）" value={slots[1]} onChange={(v) => setSlots([slots[0], v, slots[2]])} timeZone={tz} />
          <PreferredSlot label="第3希望（任意）" value={slots[2]} onChange={(v) => setSlots([slots[0], slots[1], v])} timeZone={tz} />
        </>
      )}

      <div className="agree">
        <label>
          <input type="checkbox" required name="agree_emergency" />
          強い痛み・しびれ・麻痺・急な悪化・転倒後の痛みがある場合は、現地医療機関の受診を優先することを理解しました
        </label>
        <label>
          <input type="checkbox" required name="agree_scope" />
          本サービスは診断・治療を目的とした医療行為ではないことを理解しました
        </label>
      </div>

      <p className="form-note">
        送信後にお支払いが発生することはありません。内容を確認のうえ、2〜3日以内にメールでご連絡します。
      </p>

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "送信中…" : "無料相談を送信する"}
      </button>

      {status === "ok" && (
        <p className="form-status ok" role="status">
          送信しました。内容を確認し、メールでご連絡します。この時点で費用は一切かかりません。
        </p>
      )}
      {status === "err" && (
        <p className="form-status err" role="alert">
          送信に失敗しました。時間をおいて再度お試しいただくか、メールで直接ご連絡ください。
        </p>
      )}
    </form>
  );
}
