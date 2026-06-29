// /guide/[slug] - 單篇文章
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Tag,
  Calendar,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  ARTICLES,
  findArticle,
  relatedArticles,
} from "@/content/articles";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = findArticle(slug);
  if (!a) {
    return { title: "找不到文章" };
  }
  return {
    title: a.title,
    description: a.description,
    keywords: a.tags,
    alternates: { canonical: `/guide/${a.slug}` },
    openGraph: {
      type: "article",
      url: `/guide/${a.slug}`,
      title: a.title,
      description: a.description,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt ?? a.publishedAt,
      tags: a.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const related = relatedArticles(article.slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: "zh-TW",
    keywords: article.tags.join(", "),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/${article.slug}`,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首頁",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "攻略中心",
        item: `${SITE_URL}/guide`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/guide/${article.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
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

        <article className="mx-auto max-w-2xl px-4 pb-16 pt-8">
          {/* 返回 */}
          <Link
            href="/guide"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            返回攻略中心
          </Link>

          {/* Hero */}
          <header className="mb-8">
            <div
              className={`mb-5 flex h-24 w-24 items-center justify-center rounded-2xl text-5xl bg-gradient-to-br ${article.hero.gradient}`}
            >
              {article.hero.emoji}
            </div>
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700">
                <Tag className="h-3 w-3" />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" /> {article.readMinutes} 分鐘閱讀
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {article.publishedAt}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              {article.description}
            </p>
          </header>

          {/* 文章內文（用 [&_xx] 注入 typography 樣式，省一個依賴） */}
          <div
            className="
              text-[15px] leading-7 text-foreground/90
              [&_h2]:mt-9 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground
              [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-foreground
              [&_p]:mb-4
              [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1.5
              [&_strong]:font-semibold [&_strong]:text-foreground
              [&_em]:not-italic [&_em]:text-muted-foreground [&_em]:text-sm
              [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-2
              [&_a:hover]:text-brand-600
            "
          >
            {article.body()}
          </div>

          {/* CTA */}
          <section className="mt-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-6 text-center text-white">
            <h3 className="text-lg font-bold">看完想試試嗎？</h3>
            <p className="mt-1 text-sm text-white/85">
              5 秒配對，匿名安心，免註冊
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
            >
              開始隨意約
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* 相關文章 */}
          {related.length > 0 && (
            <section className="mt-12">
              <h3 className="mb-3 text-base font-bold text-foreground">
                延伸閱讀
              </h3>
              <div className="space-y-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/guide/${r.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-brand-400"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl bg-gradient-to-br ${r.hero.gradient}`}
                    >
                      {r.hero.emoji}
                    </div>
                    <span className="flex-1 truncate text-sm font-medium text-foreground group-hover:text-brand-700">
                      {r.title}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-brand-600" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
}
