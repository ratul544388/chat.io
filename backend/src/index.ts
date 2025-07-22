import dotenv from 'dotenv';
import app from './app';
import { db } from './lib/db';

dotenv.config();

const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  try {
    await db.$connect();
    console.log("✅✅✅ Connected to MongoDB via Prisma");
  } catch (error) {
    console.error("❌❌❌ Prisma connection failed", error);
  }
});

