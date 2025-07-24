import { Skeleton } from "@/components/ui/skeleton";

export const ChatHeaderSkeleton = () => {
  return (
    <div className="flex z-10 items-center h-header sticky top-0 bg-background border-b px-4">
      <Skeleton className="size-4 " />
      <Skeleton className="size-9 rounded-full ml-2" />
      <div className="ml-1.5">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-20 h-3 mt-1.5" />
      </div>
    </div>
  );
};
