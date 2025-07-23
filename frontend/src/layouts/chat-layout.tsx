import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { request } from "@/lib/request";
import type { User } from "@/types";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { Sidebar } from "../features/chats/components/sidebar";
import { disconnectSocket, getSocket, initSocket } from "@/lib/socket";
import { useOnlineUsersStore } from "@/features/auth/hooks/use-online-users-store";

const ChatLayout = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const { setOnlineUserIds } = useOnlineUsersStore();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data: User = await request({ url: "/users/me" });
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, [setUser]);

  useEffect(() => {
    if (!user) {
      disconnectSocket();
      setOnlineUserIds([]);
      return;
    }

    initSocket(user);
    const socket = getSocket();
    if (!socket) return;

    const handleOnlineUsers = (userIds: string[]) => {
      setOnlineUserIds(userIds);
    };

    const handleConnect = () => {
      socket.on("online-users", handleOnlineUsers);
    };

    if (socket.connected) {
      socket.on("online-users", handleOnlineUsers);
    } else {
      socket.once("connect", handleConnect);
    }

    return () => {
      if (socket.connected) {
        socket.off("online-users", handleOnlineUsers);
        socket.off("connect", handleConnect);
      }
    };
  }, [setOnlineUserIds, user]);

  if (loading) {
    return "Loading...";
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default ChatLayout;
