import { ChatRoomView } from "@/components/chat/ChatRoom";

interface Props {
  params: Promise<{ roomId: string }>;
}

export default async function ChatRoomPage({ params }: Props) {
  const { roomId } = await params;
  return <ChatRoomView roomId={roomId} />;
}
