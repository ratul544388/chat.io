import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { request } from "@/lib/request";
import type { MessageWithUser } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

type MessageValues = {
  content: string;
  media: string[];
};

export const useSendMessage = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { chatId } = useParams();

  const queryKey = ["messages", chatId];
  const { mutate } = useMutation<
    MessageWithUser,
    Error,
    MessageValues,
    { previousMessages: MessageWithUser[]; tempId: string }
  >({
    mutationFn: (values) =>
      request({ method: "post", url: `/messages/${chatId}`, data: values }),
    onMutate: async (variables) => {
      if (!chatId || !user) return;

      await queryClient.cancelQueries({ queryKey });
      const previousMessages =
        queryClient.getQueryData<MessageWithUser[]>(queryKey) || [];

      const tempId = uuid();

      const newMessage: MessageWithUser = {
        id: tempId,
        content: variables.content,
        chatId,
        media: [],
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(queryKey, (oldData: MessageWithUser[]) => [
        newMessage,
        ...oldData,
      ]);

      return { previousMessages, tempId };
    },
    onSuccess: (newMessage, _, context) => {
      queryClient.setQueryData(queryKey, (oldData: MessageWithUser[] = []) =>
        oldData.map((message) =>
          message.id === context.tempId ? newMessage : message
        )
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { sendMessage: mutate };
};
