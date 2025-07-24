import { useOnlineUserListener } from "@/features/auth/hooks/use-online-user-listener";
import { useActiveTabStore } from "../hooks/use-active-tab-store";
import { ChatList } from "./chat-list";
import { ChatTabs } from "./chat-tabs";
import { UserButton } from "./user-button";
import { UserList } from "./user-list";

export const Sidebar = () => {
  const { activeTab } = useActiveTabStore();
  useOnlineUserListener();

  return (
    <aside className="h-screen flex flex-col sticky top-0 border-r flex-1 min-w-[300px] max-w-[300px] pb-3">
      <div className="h-header border-b flex items-center px-4">
        <h3 className="text-xl font-medium">Chat.io</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatTabs />
        {activeTab === "My Chats" ? (
          <>
            <ChatList />
          </>
        ) : (
          <UserList />
        )}
      </div>
      <UserButton />
    </aside>
  );
};
