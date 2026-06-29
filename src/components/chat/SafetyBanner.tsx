"use client";

// 聊天室安全提示橫幅 - 女性友善機制 #1
// 新房間開啟時自動出現，可關閉，30 秒後自動 fade out
// 連結到 /guide/safety-for-women 文章

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X, ArrowRight } from "lucide-react";

export function SafetyBanner() {
  const [show, setShow] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // 30 秒後自動淡出（仍可手動點開連結）
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 30_000);
    return () => clearTimeout(t);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="mb-3 overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 shadow-sm"
        >
          <div className="flex items-start gap-3 p-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-rose-800">
                安心聊天提醒
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-rose-900/80">
                先聊得來再考慮見面 · 別過早分享真實姓名 / 住址 / LINE
                <br />
                右上角隨時可離開或舉報
              </p>
              <Link
                href="/guide/safety-for-women"
                target="_blank"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rose-700 underline-offset-2 hover:underline"
              >
                女生必看：見面前的 12 件事
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="關閉"
              className="rounded-full p-1 text-rose-400 transition hover:bg-white/60 hover:text-rose-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
