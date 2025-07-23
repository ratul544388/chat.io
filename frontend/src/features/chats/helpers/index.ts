import type { ChatWithUsers } from "@/types";
import type { User } from "firebase/auth";

export const extractImageAndNameFromChat = ({
  chat,
  user,
}: {
  chat: ChatWithUsers;
  user: User | null;
}) => {
  const otherUser = chat?.users.find(({ email }) => email !== user?.email);
  const image = chat?.isGroup ? chat.image : otherUser?.image;
  const name = chat?.isGroup ? chat.name : otherUser?.name;

  return { image, name };
};
