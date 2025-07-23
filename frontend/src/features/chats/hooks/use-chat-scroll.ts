import type { MessageWithUser } from "@/types";
import { useEffect, useRef } from "react";

export const useChatScroll = (messages: MessageWithUser[]) => {
  const bottomRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages.length]);

  return { bottomRef };
};
