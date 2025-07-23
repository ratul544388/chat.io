import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { useCreateChat } from "../hooks/use-create-chat";
import { Avatar } from "./avatar";

export const UserBox = ({ user }: { user: User }) => {
  const { isPending, createChat } = useCreateChat(user.id);
  return (
    <li
      onClick={() => createChat()}
      role="button"
      tabIndex={1}
      className={cn(
        "py-1.5 flex items-center gap-2 rounded-none hover:bg-accent px-2 transition-colors cursor-pointer",
        isPending && "opacity-60 pointer-events-none"
      )}
    >
      <Avatar otherUser={user} />
      <div className="text-sm font-medium">
        <p>{user.name}</p>
      </div>
    </li>
  );
};
