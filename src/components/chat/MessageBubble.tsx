"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";

interface Props {
  content: string;
  isMine: boolean;
  createdAt: string | Date;
}

export function MessageBubble({ content, isMine, createdAt }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "flex w-full mb-2 items-end gap-2",
        isMine ? "justify-end" : "justify-start"
      )}
    >
      {/* 對方頭像佔位（小圓） */}
      {!isMine && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
          ?
        </div>
      )}

      <div
        className={cn(
          "flex max-w-[72%] flex-col gap-1",
          isMine ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "px-3.5 py-2 text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap break-words",
            isMine
              ? "bubble-mine rounded-2xl rounded-br-md"
              : "bubble-other rounded-2xl rounded-bl-md"
          )}
        >
          {content}
        </div>
        <span className="px-1 text-[10px] text-gray-500">
          {formatTime(createdAt)}
        </span>
      </div>
    </motion.div>
  );
}
