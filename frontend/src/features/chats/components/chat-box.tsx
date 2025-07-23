import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import type { ChatWithUsers } from "@/types";
import { Link } from "react-router";
import { Avatar } from "./avatar";

export const ChatBox = ({ chat }: { chat: ChatWithUsers }) => {
  const { user: currentUser } = useAuthStore();
  const otherUser = chat.users.find((user) => user.id !== currentUser?.id)
  
  if(!otherUser) {
    return null;
  }

  return (
    <li
      role="button"
      tabIndex={1}
      className="py-1.5 hover:bg-accent rounded-md px-2 transition-colors cursor-pointer"
    >
      <Link to={`/chats/${chat.id}`} className="flex items-center gap-2">
        <Avatar otherUser={otherUser}/>
        <div className="text-sm font-medium">
          <p>{otherUser?.name}</p>
        </div>
      </Link>
    </li>
  );
};
