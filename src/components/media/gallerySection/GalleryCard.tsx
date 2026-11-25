"use client";

import Image from "next/image";
import Link from "next/link";
import {PlayIcon} from "lucide-react";
import {getYouTubeThumbnailUrl} from "@/lib/videoEmbed";
import type {GalleryItem} from "@/types/media/media.types";

function resolveCardThumbnail(item: GalleryItem): string {
  if (item.img?.src) return item.img.src;
  if (item.kind === "video" && item.href) {
    return getYouTubeThumbnailUrl(item.href) ?? "";
  }
  return "";
}

function GalleryCard({
  item,
  onItemClick,
}: {
  item: GalleryItem;
  onItemClick?: (item: GalleryItem) => void;
}) {
  const isVideo = item.kind === "video";
  const hasLink = Boolean(item.href && item.href !== "#");
  const thumbnailSrc = resolveCardThumbnail(item);
  const hasImage = Boolean(thumbnailSrc);

  const media = (
    <div className="relative w-full aspect-[3/2] overflow-hidden rounded-[6px] border border-[rgba(15,23,42,0.05)] bg-[#ffe9e7]">
      {hasImage ? (
        <Image
          src={thumbnailSrc}
          alt={item.img?.alt || item.title || "Gallery Item"}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-[6px]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f5ebe8]">
          <span className="font-sans text-[13px] font-semibold uppercase tracking-[1px] text-[#5b403e]/50">
            No cover image
          </span>
        </div>
      )}
      {isVideo && hasLink && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#1A1815]/20 transition-colors group-hover:bg-[#1A1815]/30">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary-red text-white shadow-[0_8px_24px_rgba(206,32,40,0.35)] transition-transform duration-300 group-hover:scale-110">
            <PlayIcon size={26} fill="currentColor" className="ml-1" />
          </span>
        </div>
      )}
    </div>
  );

  const footer = (
    <>
      <div className="w-full h-[1.5px] bg-[#5b403e]/15 group-hover:bg-primary-red transition-colors duration-200 mt-[16px]" />
      <div className="w-full pt-[7px]">
        <h3 className="font-sans font-extrabold text-[15px] md:text-[16px] text-center text-[#5b403e] tracking-[0.8px] uppercase leading-6 line-clamp-2">
          {item.title}
        </h3>
      </div>
    </>
  );

  if (isVideo && hasLink) {
    return (
      <button
        type="button"
        onClick={() => onItemClick?.(item)}
        className="group flex w-full flex-col items-center text-left cursor-pointer"
        aria-label={`Play video: ${item.title}`}
      >
        {media}
        {footer}
      </button>
    );
  }

  if (!hasLink && item.kind === "photo") {
    return (
      <button
        type="button"
        onClick={() => onItemClick?.(item)}
        className="group flex flex-col items-center w-full text-left cursor-pointer"
        aria-label={`View photo: ${item.title}`}
      >
        {media}
        {footer}
      </button>
    );
  }

  if (!hasLink) {
    return (
      <div className="group flex flex-col items-center w-full">
        {media}
        {footer}
      </div>
    );
  }

  return (
    <Link href={item.href!} className="group flex flex-col items-center w-full">
      {media}
      {footer}
    </Link>
  );
}

export default GalleryCard;
