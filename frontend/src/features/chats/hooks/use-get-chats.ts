import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { request } from "@/lib/request";
import type { ChatWithUsers } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetChats = () => {
  const { user } = useAuthStore();
  const { data: chats = [], isPending } = useQuery<ChatWithUsers[]>({
    queryKey: ["chats", user?.uid],
    queryFn: () => request({ url: "/chats" }),
  });

  return { chats, isPending };
};