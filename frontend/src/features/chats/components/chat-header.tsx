import { buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { useGetChat } from "@/features/auth/hooks/use-get-chat";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { Avatar } from "./avatar";
import { ChatHeaderSkeleton } from "./skeletons/chat-header-skeleton";
import { getRelativeTimeLabel } from "@/lib/utils";
import { useOnlineUsersStore } from "@/features/auth/hooks/use-online-users-store";

export const ChatHeader = () => {
  const { user } = useAuthStore();
  const { chatId } = useParams();
  const { chat, isPending } = useGetChat(chatId as string);
  const { onlineUserIds } = useOnlineUsersStore();

  if (isPending) {
    return <ChatHeaderSkeleton />;
  }

  const otherUser = chat?.users.find(({ id }) => id !== user?.id);
  const name = chat?.isGroup ? chat.name : otherUser?.name;

  if (!otherUser) {
    return null;
  }

  const isActive = onlineUserIds.includes(otherUser.id);

  const activeStatus = isActive
    ? "Active now"
    : `Last seen ${getRelativeTimeLabel(
        otherUser?.lastActiveAt as string
      )} ago`;

  return (
    <div className="h-header sticky z-50 top-0 bg-background items-center border-b flex gap-1 px-3">
      <Link
        to="/chats"
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "rounded-full",
        })}
      >
        <ArrowLeft className="size-4" />
      </Link>
      <div className="flex items-center gap-1.5">
        <Avatar otherUser={otherUser} />
        <div className="text-sm">
          <p className="font-medium leading-4">{name}</p>
          <p className="leading-5">{activeStatus}</p>
        </div>
      </div>
    </div>
  );
};
