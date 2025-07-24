import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { request } from "@/lib/request";
import { SocketProvider } from "@/providers/socket-provider";
import type { User } from "@/types";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { Sidebar } from "../features/chats/components/sidebar";
import { PageLoader } from "@/features/chats/components/page-loader";

const ChatLayout = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <PageLoader/>
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <SocketProvider>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </SocketProvider>
  );
};

export default ChatLayout;
