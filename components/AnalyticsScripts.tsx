import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { GA_ID, META_PIXEL_ID } from "@/lib/site";
import MetaPixelRoute from "./MetaPixelRoute";

/** GA4 + Vercel Analytics + Meta Pixel。両レイアウトの<body>末尾に置く */
export default function AnalyticsScripts() {
  return (
    <>
      <Analytics />

      {/* ---- GA4 ---- */}
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

      {/* ---- Meta(Facebook)Pixel ----
          ベースコード。init とロード時の初回 PageView を送信する。
          NEXT_PUBLIC_META_PIXEL_ID 未設定なら何も読み込まれない。 */}
      {META_PIXEL_ID && (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
          {/* SPA(クライアント遷移)時の PageView 送信 */}
          <MetaPixelRoute />
        </>
      )}
    </>
  );
}
