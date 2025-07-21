import { request } from "@/lib/request";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { data: users, isPending } = useQuery<User>({
    queryKey: ["users"],
    queryFn: () => request({ url: "/users" }),
  });

  return { users, isPending };
};
