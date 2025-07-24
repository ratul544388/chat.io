import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import type { ChatWithUsers } from "@/types";
import { Link } from "react-router";
import { Avatar } from "./avatar";
import { getRelativeTimeLabel } from "@/lib/utils";

export const ChatBox = ({ chat }: { chat: ChatWithUsers }) => {
  const { user: currentUser } = useAuthStore();
  const otherUser = chat.users.find((user) => user.id !== currentUser?.id);

  if (!otherUser) {
    return null;
  }

  const lastMessage = chat.messages[0]?.content || "Say hi to start chatting";

  return (
    <li
      role="button"
      tabIndex={1}
      className="py-1.5 hover:bg-accent rounded-md px-2 transition-colors cursor-pointer"
    >
      <Link to={`/chats/${chat.id}`} className="flex items-center gap-2">
        <Avatar otherUser={otherUser} />
        <div className="font-medium w-full">
          <p>{otherUser?.name}</p>
          <div className="flex items-center gap-1.5 pr-3">
            <p className="text-sm line-clamp-1">{lastMessage}</p>
            <span className="text-muted-foreground -translate-y-[3px]">.</span>
            <span className="whitespace-nowrap text-sm">
              {getRelativeTimeLabel(chat.lastMessageAt)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};
