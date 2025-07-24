import { useAuthUser } from "@/features/auth/hooks/use-auth-store";
import { request } from "@/lib/request";
import type { Message } from "@/types";
import { useEffect } from "react";
import { useParams } from "react-router";

export const useSeenMessages = (messages: Message[]) => {
  const { chatId } = useParams();
  const currentUser = useAuthUser();
  useEffect(() => {
    if (!messages.length) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.seenBy.some((user) => user.id === currentUser.id)) return;

    console.log("calling...")

    request({ url: `/messages/seen/${chatId}` });
  }, [chatId, messages, messages.length, currentUser.id]);
};
