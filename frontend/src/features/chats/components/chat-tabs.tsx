import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useActiveTabStore, type Tab } from "../hooks/use-active-tab-store";

export const ChatTabs = () => {
  const { setActiveTab, activeTab } = useActiveTabStore();
  const tabs: Tab[] = ["My Chats", "Connect People"];
  return (
    <div className="flex sticky top-0 bg-background z-20 border-b">
      {tabs.map((tab) => (
        <Button
          onClick={() => setActiveTab(tab)}
          key={tab}
          variant="ghost"
          className={cn(
            "flex-1 flex py-5 justify-center rounded-none h-13",
            tab === activeTab && "bg-accent"
          )}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};
