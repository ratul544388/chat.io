import { socket } from "@/lib/socket";
import { useEffect } from "react";
import { useAuthStore } from "./use-auth-store";
import { useOnlineUsersStore } from "./use-online-users-store";

export const useOnlineUserListener = () => {
  const { addOnlineUser, removeOnlineUser, setOnlineUsers } =
    useOnlineUsersStore();
  const { user } = useAuthStore();
  const id = user?.id;

  console.log(socket.connected)

  useEffect(() => {
    if (!id) return;

    console.log(id)

    const handleUserOnline = (id: string) => {
      console.log("User online:", id);
      addOnlineUser(id);
    };

    const handleUserOffline = (id: string) => {
      console.log("User offline:", id);
      removeOnlineUser(id);
    };

    const handleUserList = (list: string[]) => {
      console.log("User list:", list);
      setOnlineUsers(list);
    };

    const onConnect = () => {
      console.log("my id:", id);
      socket.emit("join", id);
      console.log("Join");
    };

    if (socket.connected) {
      onConnect();
    } else {
      socket.once("connect", onConnect);
    }

    socket.on("connect", onConnect);
    socket.on("user:online", handleUserOnline);
    socket.on("user:offline", handleUserOffline);
    socket.on("user:list", handleUserList);

    return () => {
      socket.off("connect", onConnect);
      socket.off("user:online", handleUserOnline);
      socket.off("user:offline", handleUserOffline);
      socket.off("user:list", handleUserList);
    };
  }, [id, addOnlineUser, removeOnlineUser, setOnlineUsers]);
};
