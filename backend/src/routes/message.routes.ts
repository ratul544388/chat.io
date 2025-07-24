import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();

router.post("/:chatId", authMiddleware, sendMessage);

router.get("/:chatId", authMiddleware, getMessages);

// router.get("/seen/:chatId", authMiddleware, seenMessages);

export default router;
