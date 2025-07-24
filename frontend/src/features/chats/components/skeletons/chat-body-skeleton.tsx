import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const heightMap: Record<number, string> = {
  0: "h-10",
  1: "h-12",
  2: "h-8",
  3: "h-16",
  4: "h-20",
  5: "h-12",
  6: "h-24",
  7: "h-10",
  8: "h-32",
  9: "h-16",
  10: "h-12",
  11: "h-10",
  12: "h-8",
  13: "h-16",
  14: "h-20",
  15: "h-12",
};

const widthMap: Record<number, string> = {
  0: "w-[65%]",
  1: "w-[70%]",
  2: "w-[50%]",
  3: "w-[75%]",
  4: "w-[60%]",
  5: "w-[55%]",
  6: "w-[70%]",
  7: "w-[60%]",
  8: "w-[75%]",
  9: "w-[50%]",
  10: "w-[65%]",
  11: "w-[70%]",
  12: "w-[50%]",
  13: "w-[75%]",
  14: "w-[60%]",
  15: "w-[55%]",
};

const flexDirectionMap: Record<number, string> = {
  0: "flex-row",
  1: "flex-row",
  2: "flex-row",
  3: "flex-row-reverse",
  4: "flex-row-reverse",
  5: "flex-row",
  6: "flex-row",
  7: "flex-row",
  8: "flex-row-reverse",
  9: "flex-row-reverse",
  10: "flex-row",
  11: "flex-row",
  12: "flex-row",
  13: "flex-row",
  14: "flex-row",
  15: "flex-row",
};

export const ChatBodySkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className={cn("flex items-end gap-1.5", flexDirectionMap[i])}
        >
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className={cn("rounded-3xl", heightMap[i], widthMap[i])} />
        </div>
      ))}
    </div>
  );
};
