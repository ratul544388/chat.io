import { FaMessage } from "react-icons/fa6";
export const PageLoader = () => {
  return (
    <div className="h-screen flex-col gap-2 flex items-center justify-center">
      <FaMessage className="size-20 animate-pulse text-primary" />
      <p className="text-lg font-semibold text-primary animate-pulse">Chat.io</p>
    </div>
  );
}
