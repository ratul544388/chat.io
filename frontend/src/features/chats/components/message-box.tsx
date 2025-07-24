import { placeholderUser } from "@/constants";
import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { cn } from "@/lib/utils";
import type { MessageWithUser } from "@/types";

interface MessageBoxProps {
  message: MessageWithUser;
}

export const MessageBox = ({ message }: MessageBoxProps) => {
  const { user } = useAuthStore();

  const isMe = user?.id === message.user.id;
  return (
    <li className={cn("flex gap-1.5 items-end w-full", isMe && "flex-row-reverse")}>
      <img
        src={message.user.image || placeholderUser}
        alt={message.user.name}
        className="size-8 rounded-full bg-accent"
      />
      <div className="bg-primary text-white py-1 rounded-3xl px-4 w-fit max-w-[70%]">
        {message.content}
      </div>
    </li>
  );
};
