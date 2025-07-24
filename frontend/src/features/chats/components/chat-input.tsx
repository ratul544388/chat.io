import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useRef, useState } from "react";
import { useSendMessage } from "../hooks/use-send-message";
import { useParams } from "react-router";

export const ChatInput = () => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const { sendMessage } = useSendMessage();
  const formRef = useRef<HTMLFormElement>(null);
  const {chatId} = useParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim() && !media.length) return;
    sendMessage({ content, media });
    setContent("");
    setMedia([]);
  };

const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    formRef.current?.requestSubmit();
  }

  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newValue = content.slice(0, start) + "\n" + content.slice(end);
    setContent(newValue);
    requestAnimationFrame(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 1;
    });
  }
};


  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="px-2 py-2.5 border-t sticky bottom-0 bg-background flex items-center gap-1"
    >
      <Textarea
        key={chatId}
        autoFocus
        value={content}
        maxLength={500}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a new message..."
        className="rounded-3xl min-h-10 max-h-30 resize-none"

      />
      <Button
        disabled={!content.trim()}
        className="rounded-full"
        variant="ghost"
        size="icon"
      >
        <Send className="rotate-45 size-5 mr-0.5 text-primary" />
      </Button>
    </form>
  );
};
