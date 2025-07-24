import { RequestHandler } from "express";
import { db } from "../lib/db";

export const getUsers: RequestHandler = async (req, res, next) => {
  const currentUserId = req.user.id;
  try {
    const users = await db.user.findMany({
      where: {
        id: {
          not: currentUserId,
        },
        chats: {
          none: {
            userIds: {
              has: currentUserId,
            },
            isGroup: false,
          },
        },
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser: RequestHandler = async (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
};

export const updateLastActiveAt = async (userId: string) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      lastActiveAt: new Date(),
    },
    select: {
      id: true,
    },
  });
};
