import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  // Create new chat
  res.json({ message: "Chat created" });
});

router.get("/", (req, res) => {
  // Get all chats for the user
  res.json({ chats: [] });
});

export default router;
