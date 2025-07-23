import { Router } from "express";
import { getCurrentUser, getUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();

router.get("/", authMiddleware, getUsers);

router.get("/me", authMiddleware, getCurrentUser);

export default router;
