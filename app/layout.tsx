import type { Metadata } from "next";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import "./globals.css";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://overseas-online-support.vercel.app"),
  title: {
    default: "海外在住日本人のオンライン運動サポート｜リハビリジムプライズネス",
    template: "%s｜リハビリジムプライズネス"
  },
  description:
    "海外在住の日本人向けに、理学療法士が日本語でオンライン身体相談・運動サポートを行います。腰痛、膝痛、股関節痛、歩行不安、転倒不安、運動不足、病院リハビリ後の運動継続をサポート。",
  robots: {
    index: true,
    follow: true
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification
      }
    : undefined
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
