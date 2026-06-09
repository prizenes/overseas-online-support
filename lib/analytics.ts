"use client";

export type AnalyticsEventName =
  | "click_free_consultation"
  | "submit_contact_form"
  | "click_plan_initial_79"
  | "click_plan_monthly_149"
  | "click_plan_monthly_279"
  | "click_priseness_official_site"
  | "click_language_switch_ja"
  | "click_language_switch_en";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: AnalyticsEventName) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName);
}
