import dotenv from "dotenv";
import http from "http";
import app from "./app";
import { db } from "./lib/db";
import { initSocketIO } from "./socket";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initSocketIO(server);

server.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  try {
    await db.$connect();
    console.log("✅ Connected to MongoDB via Prisma");
  } catch (error) {
    console.error("❌ Prisma connection failed", error);
  }
});
