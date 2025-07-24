import { useSocket } from "@/providers/socket-provider";
import { useEffect } from "react";
import { useParams } from "react-router";

export const useSeenMessagesListener = () => {
  const socket = useSocket();
  const { chatId } = useParams();
  useEffect(() => {
    if (!socket) return;
    const handleSeen = (userId: string) => {
      console.log("Someone saw the message", userId);
    };

    socket.on("seen-messages", handleSeen);

    return () => {
      socket.off("seen-messages", handleSeen);
    };
  }, [chatId, socket]);
};
