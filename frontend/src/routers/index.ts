import AuthLayout from "@/layouts/auth-layout";
import ChatLayout from "@/layouts/chat-layout";
import MainLayout from "@/layouts/main-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import ChatList from "@/pages/protected/chat-list";
import Home from "@/pages/public/home";
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
        path: "/",
        Component: Home,
      },
      {
        Component: ChatLayout,
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
