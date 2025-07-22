import { Separator } from "@/components/ui/separator";
import { UserButton } from "./user-button";
import { UserList } from "./user-list";

export const Sidebar = () => {
  return (
    <aside className="h-screen flex flex-col sticky top-0 border-r flex-1 max-w-[300px] p-4">
      <h3 className="text-lg font-medium">Chats</h3>
      <Separator className="my-3" />
      <UserList/>
      <UserButton/>
    </aside>
  );
};
