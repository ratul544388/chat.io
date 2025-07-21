import { Router } from "express";
import { createUser } from "../user.controller";

const router = Router();

router.post("/", createUser);

router.get("/", (req, res) => {
  res.json({ messages: [] });
});

export default router;
