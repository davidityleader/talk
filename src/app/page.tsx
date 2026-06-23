import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  Utensils,
  Mountain,
  Mic2,
  Flame,
  Film,
  PartyPopper,
} from "lucide-react";
import { HomeForm } from "@/components/home/HomeForm";
import { Logo } from "@/components/Logo";
import { ReturnBanner } from "@/components/home/ReturnBanner";
import {
  WebsiteJsonLd,
  WebApplicationJsonLd,
  FaqJsonLd,
} from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

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
    title: "情境配對",
    text: "想吃飯、想看夜景、想唱 KTV，依場景找到合拍的人。",
  },
  {
    icon: MessageCircle,
    title: "聊得來再見",
    text: "毫秒級即時聊天，先確認頻率對了再決定要不要見面。",
  },
  {
    icon: Shield,
    title: "匿名安心",
    text: "免註冊免登入，不留聊天紀錄，隨時想停就停。",
  },
  {
    icon: Sparkles,
    title: "暗號約定",
    text: "和朋友約好暗號，瞬間配對成功，告白也很適合。",
  },
];

const SCENARIO_HIGHLIGHTS = [
  { icon: Utensils, label: "找伴吃飯", color: "text-orange-500" },
  { icon: Mountain, label: "找伴看夜景", color: "text-blue-500" },
  { icon: Mic2, label: "找伴唱 KTV", color: "text-purple-500" },
  { icon: Flame, label: "找伴吃燒肉", color: "text-red-500" },
  { icon: Film, label: "找伴看電影", color: "text-indigo-500" },
  { icon: PartyPopper, label: "找伴參加婚禮", color: "text-pink-500" },
];

const FAQS = [
  {
    q: "隨意約是什麼？需要註冊嗎？",
    a: "隨意約 (randate.tw) 是台灣的匿名情境配對平台，完全不需要註冊或登入。打開網頁、選好想做的事情和對象偏好，就能與有相同興趣的陌生人即時配對聊天，聊得來再決定是否實際碰面。",
  },
  {
    q: "可以指定情境嗎？例如「我想找人陪我參加婚禮」",
    a: "可以！這正是隨意約的核心。你可以勾選多個情境，例如「參加婚禮」、「回家過年」、「跨年」、「演唱會」等，系統會優先媒合也想做同樣事情的人。",
  },
  {
    q: "聊天紀錄會被保留嗎？",
    a: "離開聊天室後房間立即關閉，我們不會將你的訊息與身分連結，也不公開任何聊天內容。連 cookie 都只記錄一組匿名 ID。",
  },
  {
    q: "和朋友能透過隨意約對話嗎？",
    a: "可以使用「暗號」功能。雙方輸入相同暗號（例如 friday1024），系統會優先把你們配在同一個房間，適合做為告白前的破冰小遊戲。",
  },
  {
    q: "遇到不舒服的對話怎麼辦？",
    a: "聊天室右上角有「舉報」與「離開」按鈕，可以隨時結束對話並提交舉報，我們會儘速審核處理。",
  },
];

// 自動回房 + 上次對話回顧
async function resumeContext() {
  const me = await getCurrentSession();
  if (!me) return { redirectTo: null, lastRoom: null };

  // 還在配對中：跳到等待頁
  if (me.status === "WAITING") {
    return { redirectTo: "/waiting" as const, lastRoom: null };
  }

  // 還在聊天中：驗證房間還 ACTIVE 才跳
  if (me.status === "MATCHED" && me.currentRoomId) {
    const room = await prisma.chatRoom.findUnique({
      where: { id: me.currentRoomId },
    });
    if (room && room.status === "ACTIVE") {
      return { redirectTo: `/chat/${room.id}` as const, lastRoom: null };
    }
  }

  // 上次離開不到 24 小時 → 顯示回顧 banner
  if (me.lastRoomId) {
    const room = await prisma.chatRoom.findUnique({
      where: { id: me.lastRoomId },
    });
    if (room) {
      const ref = room.closedAt ?? room.createdAt;
      const diffMs = Date.now() - new Date(ref).getTime();
      if (diffMs < 24 * 60 * 60 * 1000) {
        return {
          redirectTo: null,
          lastRoom: { id: room.id, closedAt: room.closedAt },
        };
      }
    }
  }

  return { redirectTo: null, lastRoom: null };
}

export default async function HomePage() {
  const { redirectTo, lastRoom } = await resumeContext();
  if (redirectTo) redirect(redirectTo);

  return (
    <>
      <WebsiteJsonLd />
      <WebApplicationJsonLd />
      <FaqJsonLd />

      <main className="min-h-screen bg-white">
        {/* Top bar */}
        <nav className="border-b bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <Logo size={32} />
              <Logo variant="wordmark" />
            </Link>
            <Link
              href="#scenarios"
              className="text-sm font-medium text-muted-foreground transition hover:text-brand-600"
            >
              情境玩法
            </Link>
          </div>
        </nav>

        <div className="mx-auto max-w-xl px-4 pb-16 pt-8">
          {lastRoom && (
            <ReturnBanner roomId={lastRoom.id} closedAt={lastRoom.closedAt} />
          )}

          {/* Hero */}
          <header className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand-500" />
              匿名 · 即時 · 不留紀錄
            </div>

            <div className="flex flex-col items-center gap-3">
              <Logo size={72} />
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
                隨意約
              </h1>
              <div className="text-lg font-semibold tracking-tight">
                <span className="text-foreground">randate</span>
                <span className="text-brand-500">.tw</span>
              </div>
            </div>

            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              找個有緣人，一起去做想做的事
            </p>
          </header>

          <HomeForm />

          {/* 情境亮點橫幅 */}
          <section
            id="scenarios"
            className="mt-14"
            aria-labelledby="scenarios-heading"
          >
            <h2
              id="scenarios-heading"
              className="mb-5 text-center text-xl font-bold text-foreground"
            >
              你不是不想出門，只是缺一個伴
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {SCENARIO_HIGHLIGHTS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                >
                  <s.icon className={`h-5 w-5 shrink-0 ${s.color}`} />
                  <span className="text-sm font-medium text-foreground">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 為什麼選擇 */}
          <section className="mt-12" aria-labelledby="features-heading">
            <h2
              id="features-heading"
              className="mb-5 text-center text-xl font-bold text-foreground"
            >
              為什麼選擇隨意約？
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <article
                  key={f.title}
                  className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
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

          {/* 介紹段落 */}
          <section
            className="mt-12 rounded-2xl border border-gray-200 bg-white p-5 text-sm leading-relaxed text-muted-foreground shadow-sm"
            aria-labelledby="about-heading"
          >
            <h2
              id="about-heading"
              className="mb-2 text-base font-bold text-foreground"
            >
              關於隨意約 randate.tw
            </h2>
            <p>
              隨意約是專為台灣使用者打造的匿名情境配對平台。
              我們相信「找伴一起做點什麼」比「滑手機聊天」更能拉近人與人的距離。
              不論你想要找人一起吃飯、看夜景、唱 KTV、吃燒肉，
              還是參加好友的婚禮、回家過年、跨年倒數，
              都能在 randate.tw 找到願意一起的人。系統依性別、情境與暗號智慧配對，
              聊得來再決定是否實際碰面，把生活的缺角輕鬆補起來。
            </p>
          </section>

          {/* FAQ */}
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
                  className="group rounded-xl border border-gray-200 bg-white p-4"
                >
                  <summary className="cursor-pointer list-none font-semibold text-foreground marker:hidden">
                    <span className="mr-2 text-brand-500">Q.</span>
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
            <p className="pt-2 text-foreground/40">
              © {new Date().getFullYear()} randate.tw
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
