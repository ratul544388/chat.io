import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { useSocket } from "@/providers/socket-provider";
import type { ChatWithUsers, MessageWithUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

export const useGetNewMessage = () => {
  const socket = useSocket();
  const { user } = useAuthStore();
  const { chatId } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (newMessage: MessageWithUser) => {
      if (newMessage.chatId === chatId && newMessage.user.id !== user?.id) {
        queryClient.setQueryData(
          ["messages", chatId],
          (oldData: MessageWithUser[]) => [newMessage, ...oldData]
        );

        // Update seen message
      }

      queryClient.setQueryData(
        ["chats", user?.id],
        (oldData: ChatWithUsers[]) => {
          return oldData.map((chat) =>
            chat.id === newMessage.chatId
              ? { ...chat, messages: [{ content: newMessage.content }] }
              : chat
          );
        }
      );
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, queryClient, chatId, user]);
};
