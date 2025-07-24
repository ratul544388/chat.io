import { useAuthUser } from "@/features/auth/hooks/use-auth-store";
import { useSocket } from "@/providers/socket-provider";
import type { ChatWithUsers, MessageWithUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

export const useGetNewMessage = () => {
  const socket = useSocket();
  const user = useAuthUser();
  const { chatId } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (newMessage: MessageWithUser) => {
      if (newMessage.chatId === chatId && newMessage.user.id !== user.id) {
        queryClient.setQueryData(
          ["messages", chatId],
          (oldData: MessageWithUser[]) => [newMessage, ...oldData]
        );
      }

      queryClient.setQueryData(
        ["chats", user.id],
        (oldData: ChatWithUsers[] = []) => {
          const updatedChats = oldData.map((chat) =>
            chat.id === newMessage.chatId
              ? {
                  ...chat,
                  lastMessageAt: new Date().toISOString(),
                  messages: [{ content: newMessage.content }],
                }
              : chat
          );

          return updatedChats.sort(
            (a, b) =>
              new Date(b.lastMessageAt).getTime() -
              new Date(a.lastMessageAt).getTime()
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
