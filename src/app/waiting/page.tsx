"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

export default function WaitingPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [cancelling, setCancelling] = useState(false);

  // 計時
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const goToRoom = useCallback(
    (roomId: string) => {
      toast.success("配對成功！");
      router.push(`/chat/${roomId}`);
    },
    [router]
  );

  // 等待頁面用輪詢；正式配對通知會在進入聊天室後由 Pusher 處理
  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const res = await fetch("/api/match/status", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        if (data.status === "matched" && data.roomId) {
          goToRoom(data.roomId);
        } else if (data.status === "idle" || data.status === "left") {
          router.replace("/");
        }
      } catch {
        /* ignore network blip */
      }
    };

    check();
    const poll = setInterval(check, 2500);

    return () => {
      cancelled = true;
      clearInterval(poll);
    };
  }, [goToRoom, router]);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await fetch("/api/match/cancel", { method: "POST" });
      router.replace("/");
    } catch {
      toast.error("取消失敗");
      setCancelling(false);
    }
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <main className="min-h-screen knock-gradient flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mx-auto mb-10 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg"
        >
          <span className="absolute inset-0 rounded-full bg-knock-400/40 animate-pulse-ring" />
          <span
            className="absolute inset-0 rounded-full bg-knock-400/30 animate-pulse-ring"
            style={{ animationDelay: "0.5s" }}
          />
          <Loader2 className="h-12 w-12 animate-spin text-knock-500" />
        </motion.div>

        <h2 className="text-2xl font-bold text-foreground">正在尋找有緣人</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          我們正在替你尋找一個聊得來的對象，請稍候...
        </p>

        <div className="mt-8 text-3xl font-mono font-bold tabular-nums tracking-wider">
          {mm}:{ss}
        </div>

        <Button
          variant="outline"
          className="mt-10 rounded-full"
          onClick={handleCancel}
          disabled={cancelling}
        >
          {cancelling ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <X className="h-4 w-4" />
          )}
          取消配對
        </Button>
      </div>
    </main>
  );
}
