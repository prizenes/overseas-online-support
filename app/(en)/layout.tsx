import type { Metadata } from "next";
import { mincho, gothic } from "@/lib/fonts";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import { SITE_URL, GSC_VERIFICATION } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Online Exercise Support in Japanese｜Japanese Physical Therapist-Based Guidance from Japan",
  description:
    "Online exercise support in Japanese for Japanese speakers living abroad. A physical therapist from Japan provides exercise guidance for low back pain, knee pain, walking concerns, fall prevention, and exercise continuation. Free inquiry available.",
  alternates: {
    canonical: "/en",
    languages: { ja: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/en`,
    siteName: "Priseness Online Exercise Support in Japanese",
    title: "Online Exercise Support in Japanese for People Living Abroad",
    description:
      "Exercise guidance in Japanese by a physical therapist from Japan. Support for low back pain, knee pain, walking concerns, and exercise continuation. Start with a free inquiry.",
    images: [
      {
        url: "/images/overseas-support/hero-online-consultation.png",
        width: 1200,
        height: 630,
        alt: "Online exercise support session in Japanese for a person living abroad",
      },
    ],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: GSC_VERIFICATION ? { google: GSC_VERIFICATION } : undefined,
};

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mincho.variable} ${gothic.variable}`}>
      <body>
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
