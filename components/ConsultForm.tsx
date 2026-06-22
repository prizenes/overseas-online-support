"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { EVENTS } from "@/lib/site";

// 日本の受付時間（9:00〜19:00 JST）を、利用者の現地時刻に変換して表示用に整える。
// 例：America/New_York なら「20:00〜翌06:00」のように返す。
function jstReceptionInLocal(tz: string): { local: string } | null {
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now);
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
    const y = get("year");
    const m = get("month");
    const d = get("day");
    // JST = UTC+9（DSTなし）。JST 9:00 = UTC 0:00、JST 19:00 = UTC 10:00。
    const start = new Date(Date.UTC(y, m - 1, d, 0, 0));
    const end = new Date(Date.UTC(y, m - 1, d, 10, 0));
    const clock = (date: Date) =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);
    const weekday = (date: Date) =>
      new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short" }).format(date);
    const crossesDay = weekday(start) !== weekday(end);
    return { local: `${clock(start)}〜${crossesDay ? "翌" : ""}${clock(end)}` };
  } catch {
    return null;
  }
}

// ---- 本体 -------------------------------------------------------------
// 海外在住日本人のスマホ流入を想定し、初回フォームは最小限に。
// 必須は「お名前・メール・確認チェック」のみ。希望日時・症状・居住国・
// タイムゾーンは、こちらからの返信メールで一緒に調整する設計にしている。
// （タイムゾーンは端末から自動検出して裏側で送るだけ。入力欄は出さない）

export default function ConsultForm() {
  const [tz, setTz] = useState("Asia/Tokyo");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const formStarted = useRef(false);
  const reception = useMemo(() => jstReceptionInLocal(tz), [tz]);

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

    // API は従来どおりのペイロード形を受けるため、未使用項目は空で送る。
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      country: "",
      timezone: tz,
      topics: [] as string[],
      message: String(data.get("message") ?? ""),
      inquiryType: data.getAll("inquiry_type").map(String).join("、"),
      preferredTiming: String(data.get("preferred_timing") ?? ""),
      consultationFor: "",
      contactPreference: "",
      preferredSlots: [] as unknown[],
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
        <label>
          現在のお悩み・ご相談内容（任意）
        </label>
        <textarea
          name="message"
          placeholder="例：海外赴任中で、半年ほど前から腰に違和感があります。日本語で相談したいです。"
        />
        <p className="tz-hint">
          くわしい症状・居住国は、こちらからの返信メールで一緒に調整します。ここでは書かなくて大丈夫です。
        </p>
      </div>

      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <label>ご利用の検討状況（任意・複数選択可）</label>
        <div className="check-grid" style={{ gridTemplateColumns: "1fr" }}>
          <label>
            <input type="checkbox" name="inquiry_type" value="まずは内容を問い合わせたい" /> まずは内容を問い合わせたい
          </label>
          <label>
            <input type="checkbox" name="inquiry_type" value="初回オンライン相談を受けてみたい" /> 初回オンライン相談を受けてみたい
          </label>
          <label>
            <input type="checkbox" name="inquiry_type" value="料金や流れを確認してから検討したい" /> 料金や流れを確認してから検討したい
          </label>
          <label>
            <input type="checkbox" name="inquiry_type" value="家族について相談したい" /> 家族について相談したい
          </label>
        </div>
      </fieldset>

      <div className="field">
        <label>ご希望の曜日・時間帯（任意）</label>
        <input
          type="text"
          name="preferred_timing"
          placeholder="例：土曜の午後、平日の夜など（あなたの現地時間で）"
        />
        {reception && (
          <p className="jst-result">
            対応できるのは日本時間 9:00〜19:00。あなたの地域では{" "}
            <strong>現地 {reception.local}</strong> にあたります。この範囲でご希望をお書きください。
          </p>
        )}
        <p className="tz-hint">
          利用を検討中の方は、ざっくりで構いません。日本時間との調整はこちらで行います。
        </p>
      </div>

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
        送信後にお支払いが発生することはありません。内容を確認のうえ、2〜3日以内にメールでご連絡します。しつこい勧誘はありません。
      </p>

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "送信中…" : "無料相談を送信する"}
      </button>

      {status === "ok" && (
        <p className="form-status ok" role="status">
          送信しました。内容を確認し、メールでご連絡します。
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
