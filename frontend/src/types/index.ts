export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Chat {
  id: string;
  name?: string | null;
  isGroup: boolean;
  image?: string;
}

export type ChatWithUsers = Chat & {
  users: User[];
};

export interface Message {
  id: string;
  content?: string;
  media: Media[];
  createdAt: string;
}

export type MessageWithUser = Message & {
  user: {
    id: string;
    name: string;
    image?: string;
  };
};

export type Media = {
  id: string;
  url: string;
  type: MediaType;
};

export type MediaType = "IMAGE" | "VIDEO";

// src/types/socket.ts

export type ClientToServerEvents = {
  // e.g. sending a message
  sendMessage: (message: string) => void;
};

export type ServerToClientEvents = {
  // receiving online user IDs from server
  "online-users": (userIds: string[]) => void;
};
