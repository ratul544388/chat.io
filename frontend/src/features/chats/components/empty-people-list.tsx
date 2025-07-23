import { Button, buttonVariants } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useActiveTabStore } from "../hooks/use-active-tab-store";

export const EmptyPeopleList = () => {
  const { setActiveTab } = useActiveTabStore();

  const handleClick = () => {
    setActiveTab("My Chats");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16">
      <button
        onClick={handleClick}
        tabIndex={1}
        className="rounded-full bg-accent p-6 mb-6 shadow-md cursor-pointer transition hover:shadow-lg"
      >
        <MessageCircle className="w-16 h-16" />
      </button>
      <h2 className="text-xl font-semibold mb-2">No people to connect with</h2>
      <p className="text-muted-foreground mb-6">
        Start chatting with the people you've already connected!
      </p>
      <Button onClick={handleClick} className={buttonVariants()}>
        <MessageCircle className="w-4 h-4" />
        Go to Chats
      </Button>
    </div>
  );
};
