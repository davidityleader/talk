"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Flag, LogOut, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { createPusherClient, PUSHER_EVENTS, roomChannel } from "@/lib/pusher";

interface Msg {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  roomId: string;
}

interface Props {
  roomId: string;
}

export function ChatRoomView({ roomId }: Props) {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [meId, setMeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [partnerLeft, setPartnerLeft] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 載入歷史訊息與 meta
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/chat/${roomId}/messages`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const e = await res.json().catch(() => ({}));
          toast.error(e.error ?? "無法載入聊天室");
          router.replace("/");
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        setMeId(data.room.meId);
        setMessages(data.messages);
        if (data.room.status === "CLOSED") setPartnerLeft(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [roomId, router]);

  // 訂閱 Pusher 房間頻道
  useEffect(() => {
    let pusher: ReturnType<typeof createPusherClient> | null = null;
    try {
      pusher = createPusherClient();
    } catch {
      return; // Pusher 未設定時直接回退到輪詢 (不在 MVP)
    }
    const channel = pusher.subscribe(roomChannel(roomId));
    channel.bind(PUSHER_EVENTS.MESSAGE, (msg: Msg) => {
      setMessages((prev) =>
        prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
      );
    });
    channel.bind(PUSHER_EVENTS.LEFT, (payload: { byId: string }) => {
      if (payload.byId !== meId) {
        toast("對方已離開聊天", { icon: "👋" });
      }
      setPartnerLeft(true);
    });

    return () => {
      try {
        channel.unbind_all();
        pusher?.unsubscribe(roomChannel(roomId));
        pusher?.disconnect();
      } catch {
        /* noop */
      }
    };
  }, [roomId, meId]);

  // 訊息進來時自動捲到底
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      // 樂觀更新 - 暫時放入
      const tempId = `tmp-${Date.now()}`;
      const optimistic: Msg = {
        id: tempId,
        content: text,
        senderId: meId ?? "me",
        createdAt: new Date().toISOString(),
        roomId,
      };
      setMessages((prev) => [...prev, optimistic]);

      try {
        const res = await fetch(`/api/chat/${roomId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        });
        if (!res.ok) {
          const e = await res.json().catch(() => ({}));
          toast.error(e.error ?? "送出失敗");
          setMessages((prev) => prev.filter((m) => m.id !== tempId));
          return;
        }
        const data = await res.json();
        const real: Msg = data.message;
        setMessages((prev) =>
          prev.map((m) => (m.id === tempId ? real : m)).filter(
            (m, i, arr) => arr.findIndex((x) => x.id === m.id) === i
          )
        );
      } catch {
        toast.error("網路錯誤");
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
      }
    },
    [meId, roomId]
  );

  const handleLeave = async () => {
    setConfirmLeave(false);
    try {
      await fetch(`/api/chat/${roomId}/leave`, { method: "POST" });
    } catch {
      /* ignore */
    }
    router.replace("/");
  };

  const handleReport = async () => {
    if (!reportReason.trim()) {
      toast.error("請輸入舉報原因");
      return;
    }
    setReportSubmitting(true);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
          reason: reportReason.trim().slice(0, 100),
        }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        toast.error(e.error ?? "舉報失敗");
      } else {
        toast.success("已收到舉報，我們會儘速處理");
        setReportOpen(false);
        setReportReason("");
      }
    } finally {
      setReportSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <main className="flex h-[100dvh] flex-col chat-bg">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-3 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          aria-label="返回"
          onClick={() => setConfirmLeave(true)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold">匿名聊天中</span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
            {partnerLeft ? "對方已離開" : "連線中"}
          </span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="舉報"
            onClick={() => setReportOpen(true)}
          >
            <Flag className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="結束聊天"
            onClick={() => setConfirmLeave(true)}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="chat-scroll flex-1 overflow-y-auto px-3 py-4"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 rounded-xl bg-white px-4 py-3 text-center text-xs text-muted-foreground shadow-sm">
            配對成功！記得友善聊天，避免過早分享個人隱私 ✨
          </div>
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                content={m.content}
                isMine={m.senderId === meId}
                createdAt={m.createdAt}
              />
            ))}
          </AnimatePresence>

          {partnerLeft && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-xl border border-dashed bg-white p-4 text-center"
            >
              <p className="text-sm text-muted-foreground">
                這段聊天已經結束了，要不要繼續找下一位？
              </p>
              <Button
                className="mt-3 rounded-full"
                onClick={() => router.replace("/")}
              >
                找下一個
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      <MessageInput disabled={partnerLeft} onSend={sendMessage} />

      {/* 確認離開 */}
      <Dialog open={confirmLeave} onOpenChange={setConfirmLeave}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確定要結束聊天嗎？</DialogTitle>
            <DialogDescription>
              離開後將無法回到這個聊天室，所有訊息也不會保留。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmLeave(false)}>
              繼續聊
            </Button>
            <Button variant="destructive" onClick={handleLeave}>
              離開
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 舉報 */}
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>舉報這位使用者</DialogTitle>
            <DialogDescription>
              請簡述對方的不當行為，我們會儘速審核處理。
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder="例如：騷擾、辱罵、廣告..."
            maxLength={100}
            className="min-h-24"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportOpen(false)}>
              取消
            </Button>
            <Button onClick={handleReport} disabled={reportSubmitting}>
              {reportSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              送出舉報
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
