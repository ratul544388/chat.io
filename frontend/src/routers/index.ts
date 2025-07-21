import AuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";
import ProtectedLayout from "@/layouts/protected-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import ChatList from "@/pages/protected/chat-list";
import { createBrowserRouter } from "react-router";
export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        Component: AuthLayout,
        children: [
          {
            path: "/register",
            Component: Register,
          },
          {
            path: "/login",
            Component: Login,
          },
        ],
      },
      {
        Component: ProtectedLayout,
        children: [
          {
            path: "/chats",
            Component: ChatList,
          },
        ],
      },
    ],
  },
]);
