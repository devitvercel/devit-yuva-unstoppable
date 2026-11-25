import React from "react";

export const RecognitionSkeleton = () => (
  <div className="relative flex flex-col gap-4">
    {/* Image skeleton */}
    <div className="w-full aspect-[4/3] rounded-xl bg-gray-200 animate-pulse" />

    {/* Year badge skeleton */}
    <div className="absolute top-6 left-6 bg-white border-l-2 border-gray-300 py-2.5 px-5 rounded-md">
      <div className="h-4 w-10 bg-gray-200 animate-pulse rounded" />
    </div>

    {/* Text content skeleton */}
    <div className="flex flex-col gap-1">
      {/* Title */}
      <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
      {/* Body - two lines */}
      <div className="flex flex-col gap-1.5 mt-1">
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  </div>
);
