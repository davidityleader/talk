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
        "flex w-full mb-2",
        isMine ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[78%] flex-col gap-1",
          isMine ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words",
            isMine
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-white text-foreground rounded-bl-md border"
          )}
        >
          {content}
        </div>
        <span className="px-1 text-[10px] text-muted-foreground">
          {formatTime(createdAt)}
        </span>
      </div>
    </motion.div>
  );
}
