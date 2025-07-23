import { placeholderUser } from "@/constants";
import { useOnlineUsersStore } from "@/features/auth/hooks/use-online-users-store";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

interface AvatarProps {
  otherUser: User
}

export const Avatar = ({ otherUser }: AvatarProps) => {
  const {onlineUserIds} = useOnlineUsersStore()
  const isOnline = onlineUserIds.includes(otherUser?.id as string);

  return (
    <div className="relative">
      <img
        src={otherUser.image || placeholderUser}
        alt="Chat Avatar"
        className="size-9 rounded-full bg-accent"
      />
      <span
        className={cn(
          "absolute size-3.5 border-2 border-white right-0 bottom-0 rounded-full bg-green-500 hidden",
          isOnline && "block"
        )}
      />
    </div>
  );
};
