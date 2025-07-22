import { RequestHandler } from "express";
import { adminAuth } from "../lib/firebase-admin";

export const firebaseAuthMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const idToken = authHeader.split(" ")[1];
    const decoded = await adminAuth.verifyIdToken(idToken);

    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
