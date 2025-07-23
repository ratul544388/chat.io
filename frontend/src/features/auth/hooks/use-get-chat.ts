import { request } from "@/lib/request";
import type { ChatWithUsers } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetChat = (chatId: string) => {
  const { data: chat, isPending } = useQuery<ChatWithUsers>({
    queryKey: ["chat", chatId],
    queryFn: () => request({ url: `/chats/${chatId}` }),
  });

  return { chat, isPending };
};
