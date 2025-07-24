import { useChatScroll } from "../hooks/use-chat-scroll";
import { useGetMessages } from "../hooks/use-get-messages";
import { useGetNewMessage } from "../hooks/use-get-new-message";
import { MessageBox } from "./message-box";
import { ChatBodySkeleton } from "./skeletons/chat-body-skeleton";

export const ChatBody = () => {
  const { isPending, messages } = useGetMessages();
  const { bottomRef } = useChatScroll(messages);
  useGetNewMessage();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-2">
      {isPending && <ChatBodySkeleton />}
      {!isPending && (
        <div className="flex-1 flex items-center justify-center text-center text-muted-foreground py-8">
          👋 Hello! Start the conversation by sending a message.
        </div>
      )}
      {messages.length > 0 && (
        <ul className="flex flex-col-reverse flex-1 items-end gap-3 pb-3">
          {messages.map((message) => (
            <MessageBox key={message.id} message={message} />
          ))}
        </ul>
      )}
      <span ref={bottomRef} />
    </div>
  );
};
