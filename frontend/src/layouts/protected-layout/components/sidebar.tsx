import { Separator } from "@/components/ui/separator";
import { useUsers } from "@/features/chats/hooks/use-users";
import { UserButton } from "./user-button";

export const Sidebar = () => {
  const { users, isPending } = useUsers();

  if (isPending) {
    return "Loading...";
  }

  console.log(users);
  return (
    <aside className="h-screen flex flex-col sticky top-0 border-r flex-1 max-w-[300px] p-4">
      <h3 className="text-lg font-medium">Chats</h3>
      <Separator className="my-3" />
      <UserButton/>
    </aside>
  );
};
