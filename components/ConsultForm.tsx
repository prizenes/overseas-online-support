"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { EVENTS } from "@/lib/site";

// ---- タイムゾーン処理 ------------------------------------------------

/** datetime-local の値(例: 2026-06-20T10:30)を、指定タイムゾーンの壁時計時刻としてUTCに変換 */
function wallTimeToUtc(value: string, timeZone: string): Date | null {
  if (!value) return null;
  const [d, t] = value.split("T");
  if (!d || !t) return null;
  const [y, m, day] = d.split("-").map(Number);
  const [hh, mm] = t.split(":").map(Number);

  // 一旦UTCとして解釈 → そのTZでの表示とのズレ分を補正(DST含め2回反復で十分)
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

function formatJst(date: Date, locale = "ja-JP"): string {
  return new Intl.DateTimeFormat(locale, {
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

// ---- 希望日時1枠ぶんの入力+JST表示 ----------------------------------

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
        aria-describedby={`${label}-jst`}
      />
      {utc && (
        <p id={`${label}-jst`} className={`jst-result ${inRange ? "" : "out"}`}>
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
  const [tzAuto, setTzAuto] = useState(true);
  const [slots, setSlots] = useState(["", "", ""]);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detected) setTz(detected);
  }, []);

  const tzOptions = useMemo<string[]>(() => {
    try {
      // 型定義が古い環境向けにanyを許容
      return (Intl as unknown as { supportedValuesOf?: (k: string) => string[] })
        .supportedValuesOf?.("timeZone") ?? [tz];
    } catch {
      return [tz];
    }
  }, [tz]);

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
    } catch {
      setStatus("err");
    }
  }

  return (
    <form className="consult-form" onSubmit={onSubmit} noValidate>
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

      <div className="field">
        <label>あなたのタイムゾーン</label>
        <select
          name="timezone_select"
          value={tz}
          onChange={(e) => { setTz(e.target.value); setTzAuto(false); }}
        >
          {tzOptions.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
        <p className="tz-hint">
          {tzAuto
            ? "お使いの端末から自動取得しました。違う場合は選び直してください。"
            : "選択したタイムゾーンで希望日時を変換します。"}
        </p>
      </div>

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

      <div className="field">
        <label>希望日時（あなたの現地時間で入力）</label>
        <p className="tz-hint">
          現地時間のまま入力してください。日本時間への変換はこちらで自動表示します。
          日本時間9:00〜19:00の範囲外でも送信できます。
        </p>
      </div>
      <PreferredSlot label="第1希望" value={slots[0]} onChange={(v) => setSlots([v, slots[1], slots[2]])} timeZone={tz} />
      <PreferredSlot label="第2希望（任意）" value={slots[1]} onChange={(v) => setSlots([slots[0], v, slots[2]])} timeZone={tz} />
      <PreferredSlot label="第3希望（任意）" value={slots[2]} onChange={(v) => setSlots([slots[0], slots[1], v])} timeZone={tz} />

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
