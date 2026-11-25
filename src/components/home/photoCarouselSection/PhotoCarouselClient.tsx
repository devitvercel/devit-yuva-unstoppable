"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { carouselNavButtonClass } from "@/components/common/carousel";
import { useHorizontalWheelScroll } from "@/components/common/carousel/useHorizontalWheelScroll";
import { QuoteIcon } from "../../../../public/SVGs/svg";
/** How long each slide stays fully readable before auto-advancing. */
const INTERVAL_MS = 7500;

interface PhotoCarouselClientProps {
  count: number;
  backgrounds: React.ReactNode[];
  textBlocks: React.ReactNode[];
  thumbnails: React.ReactNode[];
  imageClasses: string[];
}

export default function PhotoCarouselClient({
  count,
  backgrounds,
  textBlocks,
  thumbnails,
  imageClasses,
}: PhotoCarouselClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  // Controls fade: true = fully visible, false = fading out
  const [visible, setVisible] = useState(true);
  const pendingIndex = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const advance = useCallback(() => {
    const next = activeIndex + 1;
    pendingIndex.current = next;
    // Start background crossfade immediately
    setActiveBgIndex(next);
    // Fade out first
    setVisible(false);
  }, [activeIndex]);

  const goToIndex = useCallback((next: number) => {
    pendingIndex.current = next;
    setActiveBgIndex(next);
    setVisible(false);
  }, []);

  const goPrev = useCallback(() => {
    goToIndex(activeIndex - 1);
  }, [activeIndex, goToIndex]);

  const goNext = useCallback(() => {
    goToIndex(activeIndex + 1);
  }, [activeIndex, goToIndex]);

  useHorizontalWheelScroll(sectionRef, {
    onScrollLeft: goPrev,
    onScrollRight: goNext,
  });

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [advance]);

  // When fade-out completes, swap content and fade in
  const handleTransitionEnd = useCallback(() => {
    if (!visible) {
      setActiveIndex(pendingIndex.current);
      setVisible(true);
    }
  }, [visible]);

  // Fallback timer if transitionEnd event is skipped by browser/tab backgrounding
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        setActiveIndex(pendingIndex.current);
        setVisible(true);
      }, 520);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Build the visible window:
  // Offset -1: exiting element (animates to width 0 on left)
  // Offset 0: active element (largest)
  // Offset 1, 2, 3: next elements
  // Offset 4: entering element (animates from width 0 on right)
  const imageWindow = [-1, 0, 1, 2, 3, 4].map((offset) => {
    const continuousIdx = activeIndex + offset;
    const itemIdx = (continuousIdx % count + count) % count;
    return {
      thumbnail: thumbnails[itemIdx],
      originalIdx: itemIdx,
      continuousIdx,
      offset,
    };
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-[calc(100dvh-75px)] xl:h-[calc(100dvh-90px)] w-full relative overflow-hidden bg-[#241E19]"
    >
      {/* <div className="pointer-events-none absolute inset-x-0 top-10 xl:top-12 z-20 flex items-center justify-between px-[4.2%] xl:px-[5.6%]">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={goPrev}
          className={cn(carouselNavButtonClass, "pointer-events-auto")}
        >
          <ChevronLeftIcon className="size-5" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={goNext}
          className={cn(carouselNavButtonClass, "pointer-events-auto")}
        >
          <ChevronRightIcon className="size-5" strokeWidth={2} />
        </button>
      </div> */}

      {/* ── Background Images (Crossfade) ───────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {backgrounds.map((bg, idx) => {
          const isActive = idx === (activeBgIndex % count);
          return (
            <div
              key={idx}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isActive ? "opacity-100" : "opacity-0"
              )}
            >
              {bg}
            </div>
          );
        })}
      </div>

      {/* ── Gradient overlay ─────────────────────────────────────────── */}
      <div
        className="absolute z-1 top-0 left-0 h-full w-full bg-[linear-gradient(90deg,rgba(36,30,25,0.92)_0%,rgba(36,30,25,0.75)_35%,rgba(36,30,25,0.35)_65%,rgba(36,30,25,0.00)_100%)]" />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative h-auto xl:h-full z-2 w-916/1000 xl:w-888/1000 mx-auto flex flex-col justify-between py-10 xl:py-0 xl:block">

        {/* Text block with fade transition */}
        <div
          className="flex flex-col gap-4 xl:gap-23 h-auto xl:h-full w-full xl:w-45/100 xl:justify-end pt-6 xl:pt-0 xl:pb-12 transition-opacity duration-500 ease-in-out"
          style={{ opacity: visible ? 1 : 0 }}
          onTransitionEnd={handleTransitionEnd}
        >
          <div>
            <QuoteIcon />
          </div>
          {textBlocks.map((textBlock, idx) => {
            const isActive = idx === (activeIndex % count);
            return (
              <div
                key={idx}
                className={cn(
                  isActive ? "block" : "hidden"
                )}
              >
                {textBlock}
              </div>
            );
          })}
        </div>

        {/* ── Image strip ──────────────────────────────────────────────── */}
        {/* Shows 4 images at a time. The leftmost is always the active one (largest). Clickable for navigation. */}
        <div
          className="relative mt-8 xl:absolute xl:bottom-9 xl:right-0 h-[71px] xl:h-[166px] flex flex-row gap-3 xl:gap-5 justify-end items-end overflow-hidden [--carousel-gap-neg:-12px] xl:[--carousel-gap-neg:-20px]">
          {imageWindow.map(({ thumbnail, originalIdx, continuousIdx, offset }) => {
            const isExiting = offset === -1;
            const isEntering = offset === 4;
            const isNormal = offset >= 0 && offset <= 3;

            const buttonStyle: React.CSSProperties = {};
            if (isExiting) {
              buttonStyle.width = 0;
              buttonStyle.height = 0;
              buttonStyle.marginRight = "var(--carousel-gap-neg)";
              buttonStyle.opacity = 0;
            } else if (isEntering) {
              buttonStyle.width = 0;
              buttonStyle.height = 0;
              buttonStyle.marginLeft = "var(--carousel-gap-neg)";
              buttonStyle.opacity = 0;
            }

            return (
              <button
                key={continuousIdx}
                onClick={() => {
                  if (!isNormal || offset === 0) return;
                  const next = activeIndex + offset;
                  pendingIndex.current = next;
                  setActiveBgIndex(next);
                  setVisible(false);
                }}
                tabIndex={isNormal ? 0 : -1}
                aria-label={`Go to slide ${originalIdx + 1}`}
                style={buttonStyle}
                className={cn(
                  "shrink-0 transition-all duration-500 ease-in-out overflow-hidden rounded-sm focus:outline-none",
                  (isNormal && offset !== 0) ? "cursor-pointer" : "cursor-default pointer-events-none",
                  isNormal && imageClasses[offset]
                )}
              >
                {thumbnail}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
