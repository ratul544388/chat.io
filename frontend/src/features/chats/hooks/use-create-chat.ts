import { request } from "@/lib/request";
import type { Chat } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useActiveTabStore } from "./use-active-tab-store";

export const useCreateChat = (userId: string) => {
  const { setActiveTab } = useActiveTabStore();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation<Chat>({
    mutationFn: () => request({ method: "post", url: `/chats/${userId}` }),
    onSuccess: (chat) => {
      setActiveTab("My Chats");
      navigate(`/chats/${chat.id}`);
    },
    onError: (error) => {
      console.log(error)
      return toast.error(error.message);
    },
  });

  return { createChat: mutate, isPending };
};
