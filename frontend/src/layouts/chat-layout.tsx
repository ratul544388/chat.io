import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { Navigate, Outlet } from "react-router";
import { Sidebar } from "../features/chats/components/sidebar";

const ChatLayout = () => {
  const { user } = useAuthStore();

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
