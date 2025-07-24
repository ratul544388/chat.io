import { ChatBody } from "@/features/chats/components/chat-body";
import { ChatHeader } from "@/features/chats/components/chat-header";
import { ChatInput } from "@/features/chats/components/chat-input";
import { useSocket } from "@/providers/socket-provider";
import { useEffect } from "react";
import { useParams } from "react-router";

const Chat = () => {
  const socket = useSocket();
  const { chatId } = useParams();

  useEffect(() => {
    if (!socket) return;
    socket.emit("chat:join", { chatId });

    return () => {
      socket.emit("chat:leave", { chatId });
    };
  }, [socket, chatId]);
  
  return (
    <div className="flex flex-col flex-1">
      <ChatHeader />
      <ChatBody />
      <ChatInput />
    </div>
  );
};

export default Chat;
