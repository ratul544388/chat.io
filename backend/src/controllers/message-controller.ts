import { RequestHandler } from "express";
import { db } from "../lib/db";
import { messageSchema } from "../validations";
import { MediaType } from "@prisma/client";
import { MESSAGE_SELECT } from "../types";
import { getIO } from "../socket";

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

    const newMessage = await db.message.create({
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
    });

    const io = getIO();
    io.to(chatId).emit("new-message", newMessage);

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
