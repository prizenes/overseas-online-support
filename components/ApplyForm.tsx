"use client";

import { useState } from "react";
import { consultationTopics } from "@/lib/service-content";

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-2 w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-base text-ink shadow-sm transition focus:border-sea focus:ring-2 focus:ring-sea/20";

export function ApplyForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

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
      timezone: String(formData.get("timezone") ?? ""),
      topics,
      message: String(formData.get("message") ?? ""),
      consultationFor: String(formData.get("consultationFor") ?? ""),
      contactPreference: String(formData.get("contactPreference") ?? ""),
      preferredTime: String(formData.get("preferredTime") ?? ""),
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
      setState("success");
    } catch (submitError) {
      setState("error");
      setError(submitError instanceof Error ? submitError.message : "送信中にエラーが発生しました。");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-md bg-white p-6 shadow-soft sm:p-8">
        <p className="text-2xl font-black leading-9 text-ink">お問い合わせありがとうございます。</p>
        <p className="mt-4 text-lg leading-8 text-ink/75">
          内容を確認のうえ、初回オンライン相談の対象となるか、日程調整やお支払い方法についてメールでご案内いたします。
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 rounded-md border border-sea bg-white px-5 py-3 font-bold text-sea transition hover:bg-mist"
        >
          続けて問い合わせる
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-md bg-white p-5 shadow-soft sm:p-8">
      <div className="rounded-md bg-mist p-4">
        <p className="text-lg font-bold leading-8 text-ink">
          送信後すぐに決済へ進むことはありません。内容を確認し、相談可否・日程・Stripe決済リンクについてメールでご案内します。
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
        <label className="font-bold text-ink">
          タイムゾーン
          <input className={inputClass} name="timezone" placeholder="例: America/Los_Angeles" required />
        </label>
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

      <label className="font-bold text-ink">
        希望時間帯
        <textarea className={inputClass} name="preferredTime" rows={3} placeholder="例: 平日夜、日本時間の午前、週末など" required />
      </label>

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
        {state === "submitting" ? "送信しています" : "送信して相談可否を確認する"}
      </button>
    </form>
  );
}
