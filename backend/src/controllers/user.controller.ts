import { RequestHandler } from "express";
import { db } from "../lib/db";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, picture } = req.user;

    if (!email || !name) {
      return res.status(400).json({ message: "Missing name or email" });
    }

    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) return res.status(200).json(existingUser);

    const newUser = await db.user.create({
      data: { name, email, image: picture },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await db.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
