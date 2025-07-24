import { useGetChats } from "../hooks/use-get-chats";
import { ChatBox } from "./chat-box";
import { EmptyChatList } from "./empty-chat-list";
import { ChatListSkeleton } from "./skeletons/chat-list-skeleton";

export const ChatList = () => {
  const { chats, isPending } = useGetChats();

  if (isPending) {
    return <ChatListSkeleton />;
  }

  if (chats.length === 0) {
    return <EmptyChatList />;
  }

  return (
    <ul className="mt-2">
      {chats.map((chat) => (
        <ChatBox key={chat.id} chat={chat} />
      ))}
    </ul>
  );
};
