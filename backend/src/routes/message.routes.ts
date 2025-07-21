import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  // Send a message
  res.json({ message: "Message sent" });
});

router.get("/:chatId", (req, res) => {
  // Get all messages for a chat
  res.json({ messages: [] });
});

export default router;
