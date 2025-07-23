// middlewares/auth.middleware.ts
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { db } from "../lib/db";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, image: true },
    });

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
