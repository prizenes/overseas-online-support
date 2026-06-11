import type { Metadata } from "next";
import { mincho, gothic } from "@/lib/fonts";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import { SITE_URL, GSC_VERIFICATION } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "海外在住日本人のオンライン運動相談｜理学療法士に日本語で身体の不安を相談",
  description:
    "海外で腰痛・膝痛・歩行の不安を感じたとき、日本語で身体の不安と運動の進め方を整理できるオンライン相談。理学療法士が担当します。現地医療の代わりではなく、受診前後の不安整理や運動継続をサポート。まずは無料相談から。",
  alternates: {
    canonical: "/",
    languages: { ja: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "リハビリジム プライズネス｜海外在住者向けオンライン運動サポート",
    title: "海外で身体の不安を感じたとき、まず日本語で整理できる相談先を。",
    description:
      "腰痛・膝痛・歩行不安、現地医療での説明後の運動継続、一時帰国後のフォローまで。理学療法士が日本語で一緒に整理します。無料相談から始められます。",
    images: [
      {
        url: "/images/overseas-support/hero-online-consultation.png",
        width: 1200,
        height: 630,
        alt: "海外在住の日本人が自宅から日本語でオンライン運動相談を受けている様子",
      },
    ],
    locale: "ja_JP",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: GSC_VERIFICATION ? { google: GSC_VERIFICATION } : undefined,
};

export default function JaRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${mincho.variable} ${gothic.variable}`}>
      <body>
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
