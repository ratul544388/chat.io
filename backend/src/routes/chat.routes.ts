import { Router } from "express";
import { createChat, getChat, getChats } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();

router.get("/", authMiddleware, getChats);

router.post("/:otherUserId", authMiddleware, createChat);

router.get("/:id", authMiddleware, getChat);

export default router;
