// /guide - 攻略中心首頁
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ARTICLES } from "@/content/articles";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "攻略中心 - 隨意約玩法與安全指南",
  description:
    "隨意約攻略中心：新手入門、女性安全守則、暗號玩法、破冰金句、聊天禮儀。從零到上手，從聊天到見面，一站搞定。",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "攻略中心 - 隨意約玩法與安全指南",
    description:
      "新手入門、女性安全守則、暗號玩法、破冰金句⋯⋯隨意約完整攻略一站搞定。",
    url: "/guide",
  },
};

function CategoryBadge({ cat }: { cat: string }) {
  const colorMap: Record<string, string> = {
    新手: "bg-blue-50 text-blue-700",
    安全: "bg-rose-50 text-rose-700",
    玩法: "bg-brand-50 text-brand-700",
    攻略: "bg-amber-50 text-amber-700",
    禮儀: "bg-purple-50 text-purple-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
        colorMap[cat] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      <Tag className="h-3 w-3" />
      {cat}
    </span>
  );
}

export default function GuideIndexPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "隨意約攻略中心",
    itemListElement: ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/guide/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <main className="min-h-screen bg-white">
        {/* Top bar */}
        <nav className="border-b bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <Logo size={32} />
              <Logo variant="wordmark" />
            </Link>
            <div className="flex items-center gap-5 text-sm">
              <Link
                href="/"
                className="text-muted-foreground transition hover:text-brand-600"
              >
                開始隨意約
              </Link>
              <Link
                href="/guide"
                className="font-semibold text-brand-700"
              >
                攻略中心
              </Link>
            </div>
          </div>
        </nav>

        <div className="mx-auto max-w-3xl px-4 pb-16 pt-10">
          <header className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
              玩法 · 安全 · 禮儀
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              攻略中心
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              從零到上手、從聊天到見面，一站搞定。<br className="sm:hidden" />
              特別整理給女性使用者的安全守則。
            </p>
          </header>

          {/* 文章列表 */}
          <section className="space-y-3">
            {ARTICLES.map((a) => (
              <Link
                key={a.slug}
                href={`/guide/${a.slug}`}
                className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-brand-400 hover:shadow-md"
              >
                <div className="flex items-start gap-4 p-5">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl bg-gradient-to-br ${a.hero.gradient}`}
                  >
                    {a.hero.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <CategoryBadge cat={a.category} />
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {a.readMinutes} 分鐘
                      </span>
                    </div>
                    <h2 className="text-base font-bold leading-snug text-foreground group-hover:text-brand-700">
                      {a.title}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                      {a.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 hidden h-4 w-4 shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-brand-600 sm:block" />
                </div>
              </Link>
            ))}
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-6 text-center text-white">
            <h3 className="text-xl font-bold">準備好開始了嗎？</h3>
            <p className="mt-1 text-sm text-white/85">
              現在就找個有緣人，一起去做想做的事
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
            >
              開始隨意約
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
