import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { updateLastActiveAt } from "./controllers/user.controller";

let io: SocketIOServer;
// Map userId => Set of socketIds (handles multiple tabs/devices per user)
const onlineUsers = new Map<string, Set<string>>();

export const initSocketIO = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.auth.userId as string;

    if (!userId) {
      socket.disconnect();
      return;
    }

    socket.join(userId);

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId)!.add(socket.id);

    // Emit updated online users to everyone AND to the newly connected socket
    const onlineUserIds = Array.from(onlineUsers.keys());
    io.emit("online-users", onlineUserIds);
    socket.emit("online-users", onlineUserIds);

    console.log("User connected:", userId);
    console.log("Online users:", onlineUserIds);

    socket.on("disconnect", async () => {
      const userSockets = onlineUsers.get(userId);
      if (userSockets) {
        userSockets.delete(socket.id);
        if (userSockets.size === 0) {
          onlineUsers.delete(userId);
          await updateLastActiveAt(userId);
        }
      }

      const updatedUserIds = Array.from(onlineUsers.keys());
      io.emit("online-users", updatedUserIds);

      console.log("User disconnected:", userId);
      console.log("Online users:", updatedUserIds);
    });

    // ... other event handlers ...
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized yet.");
  }
  return io;
};
