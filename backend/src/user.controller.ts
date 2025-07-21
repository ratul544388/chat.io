import { Request, Response } from "express";
import { adminAuth } from "./lib/firebase-admin";
import { db } from "./lib/db";

export const createUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const idToken = authHeader.split(" ")[1];
    const decoded = await adminAuth.verifyIdToken(idToken);

    const { name, email, picture } = decoded;

    if (!email || !name) {
      return res.status(400).json({ message: "Missing name or email" });
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = await db.user.create({
      data: {
        name,
        email,
        image: picture || null,
      },
    });

    return res.status(201).json(newUser);
  } catch (err) {
    console.error("User creation error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
