import { useGetUsers } from "@/features/chats/hooks/use-get-users";
import { UserBox } from "./user-box";
import { EmptyPeopleList } from "./empty-people-list";

export const UserList = () => {
  const { users, isPending } = useGetUsers();

  if (isPending) {
    return "Loading...";
  }

  if (users.length === 0) {
    return <EmptyPeopleList />;
  }

  return (
    <ul className="mt-2">
      {users.map((user) => (
        <UserBox key={user.id} user={user} />
      ))}
    </ul>
  );
};
