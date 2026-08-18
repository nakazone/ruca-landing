import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Vercel Analytics ships on every deploy. GA4 loads only when
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set — swap in Ads / CallRail tags the
 * same way without touching page components.
 */
export function AnalyticsScripts() {
  return (
    <>
      <Analytics />
      {GA_ID ? (
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
      ) : null}
    </>
  );
}
