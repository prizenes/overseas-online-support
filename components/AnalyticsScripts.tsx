import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { GA_ID } from "@/lib/site";

/** GA4 + Vercel Analytics。両レイアウトの<body>末尾に置く */
export default function AnalyticsScripts() {
  return (
    <>
      <Analytics />
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
    </>
  );
}
