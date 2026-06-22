// 三合一分析：Vercel Analytics + Google Analytics 4 + Microsoft Clarity
// 用 env 變數驅動，缺哪個就不載哪個，本機開發完全不影響
import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {/* Vercel Analytics & Speed Insights - 自動偵測，無需設定 */}
      <VercelAnalytics />
      <SpeedInsights />

      {/* Google Analytics 4 */}
      {gaId && <GoogleAnalytics gaId={gaId} />}

      {/* Microsoft Clarity - 行為錄影、熱圖 */}
      {clarityId && (
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}
    </>
  );
}
