// JSON-LD 結構化資料 - 給搜尋引擎理解網站性質與功能
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
} from "@/lib/seo";

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ["約一下", "yueyixia"],
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "zh-TW",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    headline: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: "CommunicationApplication",
    operatingSystem: "Web Browser",
    inLanguage: "zh-TW",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TWD",
    },
    featureList: [
      "匿名陌生人配對聊天",
      "性別與話題篩選",
      "暗號精準配對",
      "即時訊息推送",
      "免註冊免登入",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "約一下是什麼？需要註冊嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "約一下是匿名陌生人即時聊天平台，完全不需要註冊或登入，打開網頁選好性別與話題就能直接配對聊天。",
        },
      },
      {
        "@type": "Question",
        name: "聊天紀錄會被保留嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "離開聊天室後，房間會立即關閉。我們不會將你的訊息與身分連結，也不公開任何聊天內容。",
        },
      },
      {
        "@type": "Question",
        name: "可以指定要跟誰配對嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "可以使用「暗號」功能，跟朋友約好同一個暗號即可優先互相配對；也可以選擇性別偏好與感興趣的話題以增加配對精準度。",
        },
      },
      {
        "@type": "Question",
        name: "遇到不舒服的對話該怎麼辦？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "聊天室右上角提供「舉報」與「離開」按鈕，可以隨時結束對話並提交舉報。",
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
