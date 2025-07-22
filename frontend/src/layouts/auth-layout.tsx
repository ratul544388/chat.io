import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/chats" />;
  }

  
  return (
    <div className="flex items-center justify-center min-h-screen py-10">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
