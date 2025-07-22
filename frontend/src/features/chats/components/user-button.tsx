import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { LogOut, User2 } from "lucide-react";
import { useState } from "react";

export const UserButton = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const items = [
    {
      label: "Profile",
      icon: User2,
      onClick: () => {},
    },
    {
      label: "Logout",
      icon: LogOut,
      onClick: () => {},
    },
  ];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="mt-auto rounded-full h-12" variant="outline">
          <img
            src={user?.photoURL || ""}
            alt=""
            className="size-7 rounded-full"
          />
          <div className="flex flex-col items-start">
            <span className="leading-4">{user?.displayName}</span>
            <span className="leading-4 font-normal text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 py-2 flex flex-col w-[280px]">
        {items.map(({ label, icon: Icon, onClick }) => (
          <Button
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            variant="ghost"
            className="justify-start px-6! rounded-none"
          >
            <Icon className="size-4" />
            {label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
