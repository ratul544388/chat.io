import { RequestHandler } from "express";
import { db } from "../lib/db";
import { getUserByEmail } from "../data";
import { CHAT_SELECT } from "../types";

export const getChat: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const chats = await db.chat.findUnique({
      where: {
        id,
      },
      select: CHAT_SELECT,
    });

    return res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

export const getChats: RequestHandler = async (req, res, next) => {
  try {
    const chats = await db.chat.findMany({
      where: {
        users: {
          some: {
            id: req.user.id,
          },
        },
      },
      select: CHAT_SELECT,
      orderBy: {
        lastMessageAt: "desc",
      },
    });

    return res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

export const createChat: RequestHandler = async (req, res, next) => {
  try {
    const { otherUserId } = req.params;
    const { id } = req.user;

    const existingChat = await db.chat.findFirst({
      where: {
        users: {
          every: {
            id: {
              in: [id, otherUserId],
            },
          },
        },
      },
    });

    if (existingChat) {
      return res.status(400).json({ message: "Chat Already exist" });
    }

    const newChat = await db.chat.create({
      data: {
        users: {
          connect: [
            {
              id,
            },
            {
              id: otherUserId,
            },
          ],
        },
      },
    });

    return res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
};
