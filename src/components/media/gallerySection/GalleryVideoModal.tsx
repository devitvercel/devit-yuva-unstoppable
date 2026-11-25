"use client";

import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import Image from "next/image";
import {XIcon} from "lucide-react";
import {getVideoEmbed, isTallEmbed} from "@/lib/videoEmbed";
import type {GalleryItem} from "@/types/media/media.types";

const GalleryVideoModal = ({
  item,
  onClose,
}: {
  item: GalleryItem | null;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const embed = item?.href ? getVideoEmbed(item.href) : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setVideoFailed(false);
  }, [item?.href]);

  useEffect(() => {
    if (!item) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  if (!mounted || !item) return null;

  const tallEmbed = embed?.type === "iframe" && isTallEmbed(embed.src);

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-5 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-video-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#1A1815]/70 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close video"
      />
      <div className="relative z-10 flex w-full max-w-[960px] flex-col overflow-hidden rounded-xl border border-[#1A18151A] bg-white shadow-[0_14px_40px_0_rgba(26,24,21,0.18)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full border border-[#1A18151A] bg-white/95 text-[#6B6761] transition-colors hover:text-[#1A1815]"
          aria-label="Close"
        >
          <XIcon size={20} />
        </button>

        <div
          className={`relative w-full bg-black ${tallEmbed ? "max-h-[75vh] overflow-y-auto" : "aspect-video"}`}
        >
          {item.kind === "photo" && item.img?.src ? (
            <Image
              src={item.img.src}
              alt={item.img.alt || item.title || "Gallery Photo"}
              fill
              sizes="90vw"
              className="object-contain"
            />
          ) : embed?.type === "iframe" ? (
            <iframe
              src={embed.src}
              title={item.title}
              className={
                tallEmbed
                  ? "h-[500px] w-full sm:h-[600px]"
                  : "absolute inset-0 h-full w-full"
              }
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : embed?.type === "video" && !videoFailed ? (
            <video
              key={embed.src}
              src={embed.src}
              title={item.title}
              className="absolute inset-0 h-full w-full"
              controls
              autoPlay
              playsInline
              preload="metadata"
              onError={() => setVideoFailed(true)}
            />
          ) : embed?.type === "video" ? (
            <div className="flex h-full items-center justify-center px-8 text-center">
              <p className="font-sans text-[15px] text-white/90">
                This video could not be played. If it is a Google Drive file, set sharing to Anyone with the link.
              </p>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center px-8 text-center">
              <p className="font-sans text-[15px] text-white/90">
                This video format is not supported for inline playback.
              </p>
            </div>
          )}
        </div>

        <div className="px-6 py-5 sm:px-8">
          <h3
            id="gallery-video-modal-title"
            className="pr-10 font-sans text-[18px] font-extrabold uppercase tracking-[0.8px] text-[#5b403e]"
          >
            {item.title}
          </h3>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GalleryVideoModal;
