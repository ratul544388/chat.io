import { Router } from "express";
import { firebaseAuthMiddleware } from "../middlewares/auth-middleware";
import { createUser, getUsers } from "../controllers/user.controller";

const router = Router();

router.post("/", firebaseAuthMiddleware, createUser);

router.get("/", firebaseAuthMiddleware, getUsers);

export default router;
