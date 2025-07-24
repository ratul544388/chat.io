import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useGetChat = () => {
  const { chatId } = useParams();
  const {data: chat, isPending} = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => request({ url: `/chats/${chatId}` }),
  });

  return {chat, isPending}
};
