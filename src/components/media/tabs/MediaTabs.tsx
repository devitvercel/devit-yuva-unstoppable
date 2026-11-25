"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MediaTab } from "@/types/media/media.types";

interface MediaTabsProps {
  tabs: MediaTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: "underline" | "pill" | "bullet" | "gallery-underline";
}

/** Shared accessible tab navigation used by media listing templates. */
function MediaTabs({
  tabs,
  activeTab,
  onTabChange,
  variant = "underline",
}: MediaTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || variant !== "gallery-underline") return;

    const updateScrollButtons = () => {
      const maxScrollLeft =
        scrollElement.scrollWidth - scrollElement.clientWidth;
      setCanScrollLeft(scrollElement.scrollLeft > 1);
      setCanScrollRight(scrollElement.scrollLeft < maxScrollLeft - 1);
    };

    updateScrollButtons();
    scrollElement.addEventListener("scroll", updateScrollButtons, {
      passive: true,
    });
    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(scrollElement);

    return () => {
      scrollElement.removeEventListener("scroll", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [tabs, variant]);

  const scrollTabs = (direction: number) => {
    scrollRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  };

  if (tabs.length === 0) return null;

  if (variant === "pill") {
    return (
      <div className="flex justify-center w-full pb-4">
        <div
          role="tablist"
          className="bg-[#ffe9e7] border border-[rgba(227,190,186,0.3)] p-[5px] rounded-full flex items-center justify-center max-w-full"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={`px-5 py-2.5 md:px-[32px] md:py-[12px] rounded-full font-sans font-medium text-[16px] md:text-[20px] leading-6 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#c3272b] text-white shadow-md"
                    : "bg-transparent text-[#5b403e] hover:text-[#c3272b]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === "gallery-underline") {
    return (
      <div className="relative w-full overflow-hidden">
        <button
          type="button"
          aria-label="Scroll tabs left"
          onClick={() => scrollTabs(-1)}
          disabled={!canScrollLeft}
          className="absolute left-0 top-[30%] cursor-pointer z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#f7f5f2] text-[#5b403e] shadow-md transition-opacity hover:text-[#a00416] disabled:pointer-events-none disabled:opacity-0 md:flex"
        >
          <ChevronLeft className="size-7" />
        </button>
        <div
          ref={scrollRef}
          role="tablist"
          className="media-tabs-scroll flex gap-8 md:gap-10 flex-row flex-nowrap items-center justify-start overflow-x-auto border-b border-[#e3beba] pb-3 w-full whitespace-nowrap scroll-smooth md:px-16"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={`font-sans font-medium text-[14px] md:text-[16px] uppercase tracking-wider transition-all duration-200 cursor-pointer relative pb-3 shrink-0 ${
                  isActive
                    ? "text-[#a00416] border-b-2 border-[#a00416] font-bold"
                    : "text-[#5b403e] hover:text-[#a00416] border-b-2 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Scroll tabs right"
          onClick={() => scrollTabs(1)}
          disabled={!canScrollRight}
          className="absolute -right-0 top-[30%] z-10 hidden cursor-pointer size-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#f7f5f2] text-[#5b403e] shadow-md transition-opacity hover:text-[#a00416] disabled:pointer-events-none disabled:opacity-0 md:flex"
        >
          <ChevronRight className="size-7" />
        </button>
      </div>
    );
  }

  if (variant === "bullet") {
    return (
      <div
        role="tablist"
        className="flex flex-wrap justify-center gap-6 xl:gap-8 flex-row items-center pt-2 pb-6 border-b border-[#2D2A260D]"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={`typo-body2 font-bold uppercase tracking-wider flex items-center gap-2 group transition-all duration-200 py-2 cursor-pointer ${
                isActive
                  ? "text-primary-red"
                  : "text-[#6B6761] hover:text-primary-red"
              }`}
            >
              <span
                className={`size-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-primary-red scale-100"
                    : "bg-[#6B6761]/30 group-hover:bg-primary-red scale-90"
                }`}
              />
              {tab.label}
            </button>
          );
        })}
      </div>
    );
  }

  // Fallback to "underline" variant
  return (
    <div
      role="tablist"
      className="flex flex-wrap justify-center gap-2 xl:gap-6 border-b border-[#2D2A261A]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`typo-body2 cursor-pointer border-b-3 px-6 py-4.5 uppercase font-bold tracking-wider transition-all duration-200 ${
              isActive
                ? "border-primary-red text-primary-red"
                : "border-transparent text-[#6B6761] hover:text-primary-red"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default MediaTabs;
