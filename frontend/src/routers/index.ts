import AuthLayout from "@/layouts/auth-layout";
import ChatLayout from "@/layouts/chat-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import NotFound from "@/pages/not-found";
import Chat from "@/pages/protected/chat";
import Chats from "@/pages/protected/chats";
import Home from "@/pages/public/home";
import { createBrowserRouter } from "react-router";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
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
    Component: ChatLayout,
    children: [
      {
        path: "/chats",
        Component: Chats,
      },
      {
        path: "/chats/:chatId",
        Component: Chat,
      },
    ],
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);
