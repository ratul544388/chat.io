import { MediaType } from "@prisma/client";
import { RequestHandler } from "express";
import { db } from "../lib/db";
import { getIO } from "../socket";
import { MESSAGE_SELECT } from "../types";
import { messageSchema } from "../validations";

const getMediaType = (url: string): MediaType => {
  const extension = url.split(".").pop()?.split("?")[0].toLowerCase();

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const videoExtensions = ["mp4", "webm", "mov", "avi", "mkv"];

  if (extension && imageExtensions.includes(extension)) {
    return "IMAGE";
  } else if (extension && videoExtensions.includes(extension)) {
    return "VIDEO";
  }
  throw new Error("Invalid Media Type");
};

export const sendMessage: RequestHandler = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { content, media } = messageSchema.parse(req.body);

    const mediaEntries = media.map((url) => ({
      url,
      type: getMediaType(url),
    }));

    const [newMessage, chat] = await Promise.all([
      await db.message.create({
        data: {
          chatId,
          userId: req.user.id,
          content,
          ...(media.length
            ? {
                media: {
                  createMany: {
                    data: mediaEntries,
                  },
                },
              }
            : {}),
        },
        select: MESSAGE_SELECT,
      }),

      await db.chat.update({
        where: { id: chatId },
        data: {
          lastMessageAt: new Date(),
        },
        select: {
          userIds: true,
        },
      }),
    ]);

    if (!chat) {
      return res.status(400).json({ error: "Chat not found" });
    }

    const io = getIO();

    chat.userIds.forEach((id) => io.to(id).emit("new-message", newMessage));

    return res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages: RequestHandler = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const messages = await db.message.findMany({
      where: {
        chatId,
      },
      select: MESSAGE_SELECT,
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const seenMessages: RequestHandler = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    await db.message.updateMany({
      where: {
        chatId,
        seenBy: {
          none: {
            id: userId
          }
        }
      },
      data: {
        seenByIds: {
          push: userId,
        },
      },
    });

    const io = getIO();

    io.to(chatId).emit("seen-messages", userId);
  } catch (error) {
    next(error);
  }
};
