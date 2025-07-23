import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

let io: SocketIOServer;
const onlineUsers = new Map<string, string>();

export const initSocketIO = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.auth.userId;

    if (!userId) {
      console.warn(
        "No userId provided in handshake.auth. Disconnecting socket."
      );
      socket.disconnect();
      return;
    }

    onlineUsers.set(userId, socket.id);

    io.emit("online-users", Array.from(onlineUsers.keys()));

    socket.on("join-chat", (chatId: string) => {
      socket.join(chatId);
    });

    socket.on("leave-chat", (chatId: string) => {
      socket.leave(chatId);
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized yet.");
  }
  return io;
};
