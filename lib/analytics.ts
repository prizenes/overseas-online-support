"use client";

// GA4(gtag)・Vercel Analytics・Meta Pixel の3つに同じイベントを送る薄いラッパー。
// どれが未導入でもエラーにならない。
//
// 【プライバシー方針 / ヘルスケア配慮】
// Meta Pixel へはイベント名のみを送り、params は一切渡さない。
// 氏名・メール・相談内容・症状名・居住国・タイムゾーンなど、個人や
// 健康状態を推測しうる値が Meta 側に渡らないようにするための意図的な設計。
// GA4 / Vercel には従来どおり params を送る（送信先は自社管理のため）。

import type { EventName } from "./site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    va?: (event: "event", name: string, data?: Record<string, unknown>) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// 自社イベント名 → Meta 標準イベント名 の対応。
// ここに無いものは trackCustom でイベント名そのままを送る（カスタムイベント）。
// 主要コンバージョン（フォーム送信完了）のみ標準 "Lead" にマッピングし、
// 広告最適化・リターゲティングで使いやすくする。
const META_STANDARD_EVENTS: Partial<Record<EventName, string>> = {
  submit_contact_form: "Lead",
};

export function track(name: EventName, params: Record<string, unknown> = {}) {
  // --- GA4(自社管理。params あり) ---
  try {
    window.gtag?.("event", name, params);
  } catch {
    /* noop */
  }

  // --- Vercel Web Analytics(自社管理。params あり) ---
  try {
    window.va?.("event", name, params);
  } catch {
    /* noop */
  }

  // --- Meta Pixel(イベント名のみ。params は送らない) ---
  try {
    const standard = META_STANDARD_EVENTS[name];
    if (standard) {
      window.fbq?.("track", standard);
    } else {
      window.fbq?.("trackCustom", name);
    }
  } catch {
    /* noop */
  }
}
