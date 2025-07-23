import { ChatBody } from "@/features/chats/components/chat-body";
import { ChatHeader } from "@/features/chats/components/chat-header";
import { ChatInput } from "@/features/chats/components/chat-input";
import { getSocket } from "@/lib/socket";
import { useEffect } from "react";
import { useParams } from "react-router";

const Chat = () => {
  const { chatId } = useParams();
  useEffect(() => {
    const socket = getSocket();
    socket.emit("join-chat", chatId);

    return () => {
      socket.emit("leave-chat", chatId);
    };
  }, [chatId]);
  return (
    <div className="flex flex-col flex-1">
      <ChatHeader />
      <ChatBody />
      <ChatInput />
    </div>
  );
};

export default Chat;
