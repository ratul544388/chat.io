import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { placeholderUser } from "@/constants";
import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { request } from "@/lib/request";
import { LogOut, User2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const UserButton = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const items = [
    {
      label: "Profile",
      icon: User2,
      onClick: () => {},
    },
    {
      label: "Logout",
      icon: LogOut,
      onClick: async () => {
        request({
          method: "post",
          url: "/auth/logout",
          onSuccess: () => {
            setUser(null);
            navigate("/");
          },
        });
      },
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="mt-auto rounded-full h-12 mx-4" variant="outline">
          <img
            src={user?.image || placeholderUser}
            alt=""
            className="size-8 rounded-full"
          />
          <div className="flex flex-col items-start">
            <span className="leading-4">{user?.name}</span>
            <span className="leading-4 font-normal text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 py-2 flex flex-col w-[280px]">
        {items.map(({ label, icon: Icon, onClick }) => (
          <Button
            key={label}
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
