import type { Metadata } from "next";
import Link from "next/link";
import { Heart, MessageCircle, Shield, Sparkles } from "lucide-react";
import { HomeForm } from "@/components/home/HomeForm";
import { Logo } from "@/components/Logo";
import {
  WebsiteJsonLd,
  WebApplicationJsonLd,
  FaqJsonLd,
} from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const FEATURES = [
  {
    icon: Heart,
    title: "心動配對",
    text: "依性別、話題、暗號精準找到聊得來的對象。",
  },
  {
    icon: MessageCircle,
    title: "即時聊天",
    text: "毫秒級訊息推送，像聊天軟體一樣自然順暢。",
  },
  {
    icon: Shield,
    title: "匿名安心",
    text: "無需註冊登入，離線後房間關閉，隱私不外流。",
  },
  {
    icon: Sparkles,
    title: "免費使用",
    text: "完全免費，沒有廣告，純粹享受聊天的樂趣。",
  },
];

const FAQS = [
  {
    q: "約一下是什麼？需要註冊嗎？",
    a: "約一下是匿名陌生人即時聊天平台，完全不需要註冊或登入，打開網頁選好性別與話題就能直接配對聊天。",
  },
  {
    q: "聊天紀錄會被保留嗎？",
    a: "離開聊天室後，房間會立即關閉。我們不會將你的訊息與身分連結，也不公開任何聊天內容。",
  },
  {
    q: "可以指定要跟誰配對嗎？",
    a: "可以使用「暗號」功能，跟朋友約好同一個暗號即可優先互相配對；也可以選擇性別偏好與感興趣的話題以增加配對精準度。",
  },
  {
    q: "遇到不舒服的對話該怎麼辦？",
    a: "聊天室右上角提供「舉報」與「離開」按鈕，可以隨時結束對話並提交舉報，我們會儘速處理。",
  },
];

export default function HomePage() {
  return (
    <>
      <WebsiteJsonLd />
      <WebApplicationJsonLd />
      <FaqJsonLd />

      <main className="min-h-screen knock-gradient">
        <div className="mx-auto max-w-xl px-4 pb-16 pt-10 sm:pt-16">
          {/* Hero */}
          <header className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-rose-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-rose-500" />
              匿名 · 即時 · 不留紀錄
            </div>

            <div className="flex flex-col items-center gap-3">
              <Logo size={72} />
              <h1 className="bg-gradient-to-r from-rose-500 via-rose-500 to-orange-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
                約一下
              </h1>
            </div>

            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              找個有緣人，輕鬆聊一下 ❤️
            </p>
          </header>

          <HomeForm />

          {/* 功能介紹 - SEO 內容 */}
          <section className="mt-14" aria-labelledby="features-heading">
            <h2
              id="features-heading"
              className="mb-5 text-center text-xl font-bold text-foreground"
            >
              為什麼選擇約一下？
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <article
                  key={f.title}
                  className="flex items-start gap-3 rounded-2xl border bg-white/70 p-4 backdrop-blur"
                >
                  <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <div>
                    <h3 className="font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {f.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 介紹段落 - 純文字 SEO 內容 */}
          <section
            className="mt-12 rounded-2xl border bg-white/70 p-5 text-sm leading-relaxed text-muted-foreground backdrop-blur"
            aria-labelledby="about-heading"
          >
            <h2
              id="about-heading"
              className="mb-2 text-base font-bold text-foreground"
            >
              關於約一下
            </h2>
            <p>
              約一下是一個專為台灣使用者打造的匿名陌生人聊天平台。我們相信每個人都有想找人聊聊的時刻，無論是想找人吐露心事、認識新朋友，或單純打發無聊時光，都能在這裡找到合拍的對象。系統會根據你選擇的性別偏好、感興趣的話題與自訂暗號，自動配對最適合的聊天對象，讓你可以放心做自己。
            </p>
          </section>

          {/* FAQ - 對應 JSON-LD */}
          <section className="mt-10" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="mb-4 text-center text-xl font-bold text-foreground"
            >
              常見問題
            </h2>
            <div className="space-y-2">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border bg-white/70 p-4 backdrop-blur"
                >
                  <summary className="cursor-pointer list-none font-semibold text-foreground marker:hidden">
                    <span className="mr-2 text-rose-500">Q.</span>
                    {f.q}
                  </summary>
                  <p className="mt-2 pl-6 text-sm text-muted-foreground">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <footer className="mt-12 space-y-2 text-center text-xs text-muted-foreground">
            <p>
              繼續使用即代表同意我們的{" "}
              <Link href="#" className="underline">
                服務條款
              </Link>{" "}
              與{" "}
              <Link href="#" className="underline">
                隱私政策
              </Link>
              。
            </p>
            <p>請友善聊天，遇到不舒服的情境可隨時離開或舉報。</p>
          </footer>
        </div>
      </main>
    </>
  );
}
