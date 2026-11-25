import React from "react";

export function StoryCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="w-full aspect-[4/3] rounded-t-lg bg-[#E3BEBA]/40" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-28 bg-[#E3BEBA]/40 rounded" />
        <div className="h-7 w-4/5 bg-[#E3BEBA]/40 rounded" />
        <div className="h-4 w-full bg-[#E3BEBA]/40 rounded" />
        <div className="h-4 w-3/4 bg-[#E3BEBA]/40 rounded" />
      </div>
    </div>
  );
}

export function StoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <StoryCardSkeleton key={i} />
      ))}
    </>
  );
}
