import { useOnlineUsersStore } from "@/features/auth/hooks/use-online-users-store";
import { useSocket } from "@/providers/socket-provider";
import { useEffect } from "react";

export const useOnlineUserListener = () => {
  const socket = useSocket();
  const { setOnlineUserIds } = useOnlineUsersStore();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleOnlineUsers = (userIds: string[]) => {
      setOnlineUserIds(userIds)
    };

    if (socket.connected) {
      socket.on("online-users", handleOnlineUsers);
    } else {
      socket.once("connect", () => {
        socket.on("online-users", handleOnlineUsers);
      });
    }

    return () => {
      socket.off("online-users", handleOnlineUsers);
    };
  }, [socket, setOnlineUserIds]);

  return null;
};
