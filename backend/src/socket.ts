import { Server as SocketIOServer, Socket } from "socket.io";
import http from "http";

export function initSocket(httpServer: http.Server) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    socket.on("message", (data) => {
      console.log(`📨 Message received: ${data}`);
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  return io;
}
