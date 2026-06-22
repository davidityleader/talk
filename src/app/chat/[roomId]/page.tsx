import type { Metadata } from "next";
import { ChatRoomView } from "@/components/chat/ChatRoom";

// 私密匿名房間，不應被索引
export const metadata: Metadata = {
  title: "匿名聊天中",
  description: "你正在進行匿名聊天",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: null },
};

interface Props {
  params: Promise<{ roomId: string }>;
}

export default async function ChatRoomPage({ params }: Props) {
  const { roomId } = await params;
  return <ChatRoomView roomId={roomId} />;
}
