import React from "react";

export function ReportCardSkeleton() {
  return (
    <div className="rounded-b-lg rounded-t-2xl border border-[rgba(0,0,0,0.10)] overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-[#E5E0DB]" />
      <div className="px-4 py-4 flex flex-col gap-3 bg-white">
        <div className="h-7 w-3/4 bg-[#E5E0DB] rounded-md" />
        <div className="h-9 w-32 bg-[#E5E0DB] rounded-full" />
      </div>
    </div>
  );
}

export function ReportGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ReportCardSkeleton key={i} />
      ))}
    </>
  );
}
