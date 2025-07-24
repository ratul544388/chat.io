import { ChatBody } from "@/features/chats/components/chat-body";
import { ChatHeader } from "@/features/chats/components/chat-header";
import { ChatInput } from "@/features/chats/components/chat-input";

const Chat = () => {

  return (
    <div className="flex flex-col flex-1">
      <ChatHeader />
      <ChatBody />
      <ChatInput />
    </div>
  );
};

export default Chat;
