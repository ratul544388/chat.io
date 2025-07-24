import { Prisma } from "@prisma/client";

export const CHAT_SELECT = {
  id: true,
  name: true,
  isGroup: true,
  image: true,
  lastMessageAt: true,
  messages: {
    select: {
      content: true,
      createdAt: true,
      _count: {
        select: {
          media: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  },
  users: {
    select: {
      id: true,
      name: true,
      image: true,
      lastActiveAt: true,
    },
    take: 2,
  },
} satisfies Prisma.ChatSelect;

export const MESSAGE_SELECT = {
  id: true,
  content: true,
  media: true,
  createdAt: true,
  chatId: true,
  seenBy: {
    select: {
      image: true,
    },
  },
  user: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
} satisfies Prisma.MessageSelect;
