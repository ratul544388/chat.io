import { Prisma } from "@prisma/client";

export const CHAT_SELECT = {
  id: true,
  name: true,
  isGroup: true,
  image: true,
  users: {
    select: {
      id: true,
      name: true,
      image: true,
    },
    take: 2,
  },
} satisfies Prisma.ChatSelect;

export const MESSAGE_SELECT = {
  id: true,
  content: true,
  media: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
} satisfies Prisma.MessageSelect;
