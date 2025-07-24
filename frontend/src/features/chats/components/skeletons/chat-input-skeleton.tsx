import { Skeleton } from "@/components/ui/skeleton";

export const ChatInputSkeleton = () => {
  return (
     <div className="border-t flex py-2.5 gap-2 px-2 items-center sticky bottom-0 bg-background">
        <Skeleton className="flex-1 h-10 rounded-full"/>
        <Skeleton className="h-6 w-8"/>
     </div>
    );
}
