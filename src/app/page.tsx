import Link from "next/link";
import { HomeForm } from "@/components/home/HomeForm";

export default function HomePage() {
  return (
    <main className="min-h-screen knock-gradient">
      <div className="mx-auto max-w-xl px-4 pb-16 pt-10 sm:pt-16">
        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-knock-700 shadow-sm backdrop-blur">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-knock-500" />
            匿名 · 即時 · 不留紀錄
          </div>
          <h1 className="bg-gradient-to-r from-knock-600 to-amber-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            敲敲看
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            讓我們來找個人陪你聊聊天
          </p>
        </header>

        <HomeForm />

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
  );
}
