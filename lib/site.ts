// =============================================================
// サイト全体の定数。URL・料金・計測イベント名はすべてここで管理。
// 公式サイトURLの変更などは、このファイルの1行を書き換えるだけでOK。
// =============================================================

export const SITE_URL = "https://overseas-online-support.vercel.app";

// リハビリジム プライズネス公式サイト
export const PRISENESS_OFFICIAL_URL = "https://prizenes.com/";

export const CONTACT_ANCHOR = "#consult"; // 無料相談フォームへのアンカー

// GA4 測定ID / Search Console 確認コードは環境変数で注入。
// Vercel の環境変数に NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GSC_VERIFICATION を設定する。
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";

// ---- 計測イベント名(指定どおり) ----
export const EVENTS = {
  clickFreeConsultation: "click_free_consultation",
  submitContactForm: "submit_contact_form",
  clickPlanInitial79: "click_plan_initial_79",
  clickPlanMonthly149: "click_plan_monthly_149",
  clickMonthly279: "click_monthly_279",
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
  jaNote: string;
  enNote: string;
  event?: EventName;
  featured?: boolean;
};

// ---- ブログページ・JsonLdコンポーネント用エクスポート ----
export const siteUrl = SITE_URL;

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
    en: "Initial Online Consultation",
    price: "$79",
    jaNote: "60分。身体の不安と運動の進め方を、日本語でじっくり整理します。",
    enNote: "60 min on Zoom. We organize your concerns and exercise direction in Japanese.",
    event: EVENTS.clickPlanInitial79,
    featured: true,
  },
  {
    id: "single",
    ja: "単発フォロー",
    en: "Single Follow-up Session",
    price: "$69",
    jaNote: "45分。運動メニューの確認や、継続中の不安を相談できます。",
    enNote: "45 min. Review your exercise menu or discuss concerns during continuation.",
  },
  {
    id: "monthly2",
    ja: "月2回オンライン運動サポート",
    en: "Monthly Support (2 sessions)",
    price: "$149",
    per: "month",
    jaNote: "月2回のフォローで、無理のない運動継続を支えます。",
    enNote: "Two sessions per month to support steady exercise continuation.",
    event: EVENTS.clickPlanMonthly149,
  },
  {
    id: "monthly4",
    ja: "月4回オンライン運動サポート",
    en: "Monthly Support (4 sessions)",
    price: "$279",
    per: "month",
    jaNote: "より細かな確認が必要な方向けに、月4回フォローします。",
    enNote: "Four sessions per month for those who need closer follow-up.",
    event: EVENTS.clickMonthly279,
  },
  {
    id: "formcheck",
    ja: "動画フォームチェック",
    en: "Video Form Check",
    price: "$29",
    jaNote: "運動フォームの動画を確認し、続けやすい調整点を共有します。",
    enNote: "We review your exercise video and share adjustment points in Japanese.",
  },
];
