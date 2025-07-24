"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface ChatListSkeletonProps {
  count?: number;
}

export const ChatListSkeleton = ({ count = 10 }: ChatListSkeletonProps) => {
  return (
    <div className="mt-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="py-1.5 flex gap-2 px-2">
          <Skeleton className="size-9 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-3.5 w-44" />
              <Skeleton className="w-6 h-3.5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
