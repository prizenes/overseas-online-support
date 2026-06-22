"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { EVENTS } from "@/lib/site";

// ---- 本体 -------------------------------------------------------------
// 海外在住日本人のスマホ流入を想定し、初回フォームは最小限に。
// 必須は「お名前・メール・確認チェック」のみ。希望日時・症状・居住国・
// タイムゾーンは、こちらからの返信メールで一緒に調整する設計にしている。
// （タイムゾーンは端末から自動検出して裏側で送るだけ。入力欄は出さない）

export default function ConsultForm() {
  const [tz, setTz] = useState("Asia/Tokyo");
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

    // API は従来どおりのペイロード形を受けるため、未使用項目は空で送る。
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      country: "",
      timezone: tz,
      topics: [] as string[],
      message: String(data.get("message") ?? ""),
      inquiryType: String(data.get("inquiry_type") ?? ""),
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
          ひと言だけ、いまの状況（任意）
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
        <label>いまのお気持ち（任意）</label>
        <div className="radio-row">
          <label>
            <input type="radio" name="inquiry_type" value="まず相談したい" /> まず相談してみたい
          </label>
          <label>
            <input type="radio" name="inquiry_type" value="利用を具体的に検討している" /> 利用を具体的に検討している
          </label>
        </div>
      </fieldset>

      <div className="field">
        <label>ご希望の曜日・時間帯（任意）</label>
        <input
          type="text"
          name="preferred_timing"
          placeholder="例：土日の午前、平日の夜など（あなたの現地時間で）"
        />
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
