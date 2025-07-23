import { request } from "@/lib/request";
import type { MessageWithUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useGetMessages = () => {
  const { chatId } = useParams();
  const { data: messages = [], isPending } = useQuery<MessageWithUser[]>({
    queryKey: ["messages", chatId],
    queryFn: () => request({ url: `/messages/${chatId}` }),
  });

  return { messages, isPending };
};
