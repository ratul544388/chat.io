import type { User } from "@/types";

const UserBox = ({ name, id, image  }: User) => {
    
  return (
    <li
      role="button"
      tabIndex={1}
      key={id}
      className="flex gap-2 py-1.5 hover:bg-accent rounded-md px-2 transition-colors cursor-pointer"
    >
      <img
        src={image || ""}
        alt="Avatar"
        className="size-9 rounded-full bg-accent"
      />
      <div className="text-sm font-medium">
        <p>{name}</p>
      </div>
    </li>
  );
};

export default UserBox;
