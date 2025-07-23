import { MessageSquare } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center px-6 py-16 text-center">
      <div className="rounded-full bg-accent p-6 mb-6 shadow-md">
        <MessageSquare className="w-16 h-16 text-primary" />
      </div>
      <h2 className="text-xl font-semibold mb-2">
        Select a chat to start conversation
      </h2>
      <p className="text-muted-foreground">
        Your messages will appear here once you select a conversation.
      </p>
    </div>
  );
};
