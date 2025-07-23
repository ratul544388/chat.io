import { useEffect } from "react";
import { useChatScroll } from "../hooks/use-chat-scroll";
import { useGetMessages } from "../hooks/use-get-messages";
import { MessageBox } from "./message-box";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/lib/socket";

export const ChatBody = () => {
  const { isPending, messages } = useGetMessages();
  const { bottomRef } = useChatScroll(messages);
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    const handleNewMessage = () => {
      console.log("New message received!!!")
    }

    socket.on("new-message", handleNewMessage)

    return () => {
      socket.off("new-message", handleNewMessage)
    }
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-2">
      {isPending && "Loading..."}
      <ul className="flex flex-col-reverse gap-3 pb-3">
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </ul>
      <span ref={bottomRef} />
    </div>
  );
};
