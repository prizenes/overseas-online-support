"use client";

// GA4(gtag)と Vercel Analytics の両方にイベントを送る薄いラッパー。
// どちらかが未導入でもエラーにならない。

import type { EventName } from "./site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    va?: (event: "event", name: string, data?: Record<string, unknown>) => void;
  }
}

export function track(name: EventName, params: Record<string, unknown> = {}) {
  try {
    window.gtag?.("event", name, params);
  } catch {
    /* noop */
  }
  try {
    // Vercel Web Analytics custom events
    window.va?.("event", name, params);
  } catch {
    /* noop */
  }
}
