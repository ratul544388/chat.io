import { useAuthUser } from "@/features/auth/hooks/use-auth-store";
import { cn, formatMessageTime } from "@/lib/utils";
import type { ChatWithUsers } from "@/types";
import { Link, useParams } from "react-router";
import { Avatar } from "./avatar";

export const ChatBox = ({ chat }: { chat: ChatWithUsers }) => {
  const currentUser = useAuthUser();
  const otherUser = chat.users.find((user) => user.id !== currentUser?.id);
  const { chatId } = useParams();

  if (!otherUser) {
    return null;
  }

  const lastMessage = chat.messages[0]?.content || "Say hi to start chatting";

  return (
    <li
      role="button"
      tabIndex={1}
      className={cn(
        "py-1.5 hover:bg-accent rounded-md px-2 transition-colors cursor-pointer",
        chatId === chat.id && "bg-accent/40"
      )}
    >
      <Link to={`/chats/${chat.id}`} className="flex items-center gap-2">
        <Avatar otherUser={otherUser} />
        <div className="w-full">
          <p className="font-medium">{otherUser?.name}</p>
          <div className="flex text-muted-foreground items-center gap-1.5 pr-3">
            <p className="text-sm line-clamp-1">{lastMessage}</p>
            <span className="text-muted-foreground -translate-y-[3px]">.</span>
            <span className="whitespace-nowrap text-sm">
              {formatMessageTime(chat.lastMessageAt)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};
