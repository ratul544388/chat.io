import { useGetUsers } from "@/features/chats/hooks/use-get-users";
import UserBox from "./user-box";

export const UserList = () => {
  const { users, isPending } = useGetUsers();

  if (isPending) {
    return "Loading...";
  }

  return (
    <ul>
      {users.map((user) => (
        <UserBox key={user.id} {...user} />
      ))}
    </ul>
  );
};
