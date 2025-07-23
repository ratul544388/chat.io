import { useGetChats } from "../hooks/use-get-chats";
import { ChatBox } from "./chat-box";
import { EmptyChatList } from "./empty-chat-list";

export const ChatList = () => {
  const { chats, isPending } = useGetChats();

  if (isPending) {
    return "Loading...";
  }

  if(chats.length === 0) {
    return <EmptyChatList/>
  }

  return (
    <ul className="mt-2">
      {chats.map((chat) => (
        <ChatBox key={chat.id} chat={chat} />
      ))}
    </ul>
  );
};
