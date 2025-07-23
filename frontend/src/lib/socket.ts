import { io, Socket } from "socket.io-client";
import type { User } from "@/types";

let socket: Socket | null = null;

export const initSocket = (user: User) => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io("http://localhost:5000", {
    auth: { userId: user.id },
    withCredentials: true,
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket(user) first.");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
