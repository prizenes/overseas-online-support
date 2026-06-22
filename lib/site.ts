// =============================================================
// サイト全体の定数。URL・料金・計測イベント名はすべてここで管理。
// 公式サイトURLの変更などは、このファイルの1行を書き換えるだけでOK。
// =============================================================

export const SITE_URL = "https://overseas-online-support.vercel.app";
export const siteUrl = SITE_URL;

// リハビリジム プライズネス公式サイト
export const PRISENESS_OFFICIAL_URL = "https://prizenes.com/";

export const CONTACT_ANCHOR = "#consult"; // 無料相談フォームへのアンカー

// GA4 測定ID / Search Console 確認コードは環境変数で注入。
// Vercel の環境変数に NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GSC_VERIFICATION を設定する。
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";

// Meta(Facebook)Pixel ID。Vercel の環境変数 NEXT_PUBLIC_META_PIXEL_ID で注入。
// 未設定なら Pixel 関連のスクリプトは一切読み込まれない（GA4 はそのまま動く）。
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

// ---- 計測イベント名(指定どおり) ----
// ここで定義した名前が GA4 / Vercel / Meta Pixel すべてに共通で送られる。
export const EVENTS = {
  clickFreeConsultation: "click_free_consultation",
  formStart: "form_start",
  submitContactForm: "submit_contact_form",
  clickPlanInitial79: "click_plan_initial_79",
  clickPlanFollowup69: "click_plan_followup_69",
  clickPlanMonthly149: "click_plan_monthly_149",
  clickPlanMonthly279: "click_plan_monthly_279",
  clickPrisenessOfficialSite: "click_priseness_official_site",
  clickLanguageSwitchEn: "click_language_switch_en",
  clickLanguageSwitchJa: "click_language_switch_ja",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

// ---- 料金プラン(日英共通データ) ----
export type Plan = {
  id: string;
  ja: string;
  en: string;
  price: string;
  per?: "month";
  durationJa?: string;
  durationEn?: string;
  jaNote: string;
  enNote: string;
  event?: EventName;
  featured?: boolean;
};

// ---- ブログページ・JsonLdコンポーネント用エクスポート ----

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "リハビリジムプライズネス",
  url: "https://prizenes.com/",
  email: "mail@prizenes.com",
  telephone: "011-600-6048",
  image: "https://prizenes.com/common/upload_data/prizenescom/image/logo1.png",
  address: {
    "@type": "PostalAddress",
    postalCode: "063-0812",
    addressCountry: "JP",
    addressRegion: "北海道",
    addressLocality: "札幌市西区",
    streetAddress: "琴似2条3-1-1 チェストオオイビル3階",
  },
  areaServed: ["Japan", "United States", "Canada", "Australia", "United Kingdom", "Europe", "Asia"],
  availableLanguage: ["ja", "en"],
};

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const PLANS: Plan[] = [
  {
    id: "initial",
    ja: "初回オンライン身体相談",
    en: "Initial Online Body Consultation",
    price: "$79",
    durationJa: "60分",
    durationEn: "60 min",
    jaNote:
      "現在のお悩み、痛みの出方、運動内容、生活環境などを確認し、今後の運動の進め方を一緒に整理します。初めての方は、まずこちらのメニューをご利用ください。",
    enNote:
      "We review your current concerns, how pain appears, your exercise, and your daily environment, then organize how to move forward together in Japanese. If this is your first time, please start here.",
    event: EVENTS.clickPlanInitial79,
    featured: true,
  },
  {
    id: "single",
    ja: "単発フォロー相談",
    en: "Single Follow-up Consultation",
    price: "$79",
    durationJa: "45分",
    durationEn: "45 min",
    jaNote:
      "初回相談後に、運動内容の確認や修正をしたい方向けの単発相談です。必要なタイミングだけ相談したい方にもご利用いただけます。",
    enNote:
      "A one-time session after your first consultation, to check or adjust your exercise. Also for those who want to consult only when needed.",
  },
  {
    id: "monthly2",
    ja: "継続オンラインサポート 月2回",
    en: "Ongoing Online Support (2 sessions / month)",
    price: "$149",
    per: "month",
    jaNote:
      "月2回のオンライン相談で、運動内容を確認しながら継続をサポートします。運動を一人で続けるのが不安な方、定期的に状態を見直したい方向けです。",
    enNote:
      "Two online sessions a month to check your exercise and support you in continuing. For those who feel unsure about continuing alone, or want regular reviews.",
  },
  {
    id: "monthly4",
    ja: "継続オンラインサポート 月4回",
    en: "Ongoing Online Support (4 sessions / month)",
    price: "$279",
    per: "month",
    jaNote:
      "週1回程度のペースで、身体の状態や運動内容を確認しながら継続的にサポートします。よりしっかり運動習慣を作りたい方におすすめです。",
    enNote:
      "About once a week, we check your physical condition and exercise and support you continuously. Recommended for those who want to build a solid exercise habit.",
  },
];
