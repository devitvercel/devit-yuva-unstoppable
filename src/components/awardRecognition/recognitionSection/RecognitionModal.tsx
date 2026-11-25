"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import Image from "next/image";
import type { AwardCardType } from "@/types/awards/awards.types";

const RecognitionModal = ({
  card,
  onClose,
}: {
  card: AwardCardType | null;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!card) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [card, onClose]);

  if (!mounted || !card) return null;

  const src = typeof card.img === "string" ? card.img : card.img?.url ?? "";

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-5 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recognition-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#1A1815]/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative z-10 flex w-full max-w-[960px] h-fit md:h-[520px] max-h-[90vh] flex-col md:flex-row overflow-hidden rounded-xl border border-[#1A18151A] bg-white shadow-[0_14px_40px_0_rgba(26,24,21,0.12)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 flex size-10 items-center justify-center rounded-full border border-[#1A18151A] bg-white/95 text-[#6B6761] transition-colors hover:text-[#1A1815]"
          aria-label="Close"
        >
          <XIcon size={20} />
        </button>

        {src ? (
          <div className="relative h-[240px] md:h-full w-full md:w-1/2 shrink-0 overflow-hidden bg-[#ebe8e2]">
            <Image
              src={src}
              alt={card.title || "Award"}
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="flex-1 h-full overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 pr-10">
              <p className="typo-body2 text-primary-red font-bold! uppercase tracking-[1.76px]">
                {card.year}
              </p>
              <h3
                id="recognition-modal-title"
                className="typo-h3 text-[#141C25]"
              >
                {card.title}
              </h3>
            </div>
            <p className="typo-body5 text-[#6B6761] leading-7">{card.body}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RecognitionModal;
