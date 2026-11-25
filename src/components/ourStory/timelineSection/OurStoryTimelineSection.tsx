"use client";

import {forwardRef, useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";
import {AnimatePresence, motion, useSpring, useTransform,} from "framer-motion";
import type {OurStoryTimelineEntryType, OurStoryTimelineSectionType,} from "@/types/ourStory/ourStory.types";

interface Props {
  timelineSection: OurStoryTimelineSectionType;
}

const TimelineEntry = forwardRef<
  HTMLDivElement,
  { entry: OurStoryTimelineEntryType }
>(({entry}, ref) => (
  <div ref={ref} className="flex flex-col gap-5">
    <p className="font-sans text-[11px] font-bold leading-normal tracking-[2.2px] text-primary-red uppercase">
      — {entry.eyebrow} —
    </p>
    <motion.h3
      initial={{opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: "-8%"}}
      transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
      className="font-fraunces-italics italic font-semibold text-[24px] lg:text-[30px] leading-tight tracking-[-0.5px] text-[#1a1815]"
    >
      {entry.title}
    </motion.h3>
    <motion.p
      initial={{opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: "-8%"}}
      transition={{duration: 0.6, delay: 0.09, ease: [0.22, 1, 0.36, 1]}}
      className="font-sans text-[14px] font-medium leading-6 text-[#6b6761]"
    >
      {entry.body}
    </motion.p>
    {entry.tag && (
      <motion.div
        initial={{opacity: 0, y: 10}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: "-8%"}}
        transition={{duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1]}}
        className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#1a1815] text-white"
      >
        <span className="inline-block w-1.5 h-1.5 bg-primary-red shrink-0"/>
        <p className="font-sans text-[10px] font-semibold tracking-[1.6px] uppercase">
          {entry.tag}
        </p>
      </motion.div>
    )}
    {entry.img.src && (
      <motion.div
        initial={{opacity: 0, y: 18, scale: 0.98}}
        whileInView={{opacity: 1, y: 0, scale: 1}}
        viewport={{once: true, margin: "-8%"}}
        transition={{duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1]}}
        className="relative w-full aspect-video rounded-xl overflow-hidden mt-1"
      >
        <Image
          src={entry.img.src}
          alt={entry.img.alt || entry.title || "Yuva Story Timeline Image"}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 90vw, 60vw"
          className="object-cover object-center"
        />
      </motion.div>
    )}
  </div>
));
TimelineEntry.displayName = "TimelineEntry";

const ROW_H = 28;

export default function OurStoryTimelineSection({timelineSection}: Props) {
  const {eyebrow, title, entries} = timelineSection;
  const [activeIndex, setActiveIndex] = useState(0);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Refs for mobile year carousel ─────────────────────────────────────────
  // Ref to the scrollable carousel viewport
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  // Ref to each year item div (the dot + label pair)
  const yearItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Spring-driven progress (0→1)
  const springProgress = useSpring(1 / entries.length, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Desktop: vertical bar height | Mobile: horizontal bar width
  const barHeight = useTransform(springProgress, (v) => `${v * 100}%`);
  const barWidth = useTransform(springProgress, (v) => `${v * 100}%`);

  // Scroll listener — finds which entry top is closest to 25% from viewport top
  useEffect(() => {
    const TRIGGER_Y = window.innerHeight * 0.25;

    const onScroll = () => {
      let bestIdx = 0;
      let bestDist = Infinity;

      entryRefs.current.forEach((el, i) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        const dist = Math.abs(top - TRIGGER_Y);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });

      setActiveIndex(bestIdx);
    };

    window.addEventListener("scroll", onScroll, {passive: true});
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [entries]);

  // Update spring whenever active entry changes
  useEffect(() => {
    springProgress.set((activeIndex + 1) / entries.length);
  }, [activeIndex, entries.length, springProgress]);

  // ── Mobile carousel: scroll so active year item is centered ───────────────
  useEffect(() => {
    const carousel = mobileCarouselRef.current;
    const activeEl = yearItemRefs.current[activeIndex];
    if (!carousel || !activeEl) return;
    const center = carousel.offsetWidth / 2;
    const itemCenter = activeEl.offsetLeft + activeEl.offsetWidth / 2;
    carousel.scrollTo({left: itemCenter - center, behavior: "smooth"});
  }, [activeIndex]);

  const activeYear = entries[activeIndex]?.year ?? "";

  const scrollToEntry = useCallback((idx: number) => {
    entryRefs.current[idx]?.scrollIntoView({behavior: "smooth", block: "start"});
  }, []);

  return (
    <section id="timeline" className="bg-[#f7f5f2] border-t border-[rgba(26,24,21,0.10)]">

      {/* ─────────────────────────────────────────────────────────────────────
          Mobile-only sticky bar — direct child of <section> so sticky works
          across the full scroll height of the section without being clipped
          by any width-constrained parent.
      ───────────────────────────────────────────────────────────────────── */}
      <div
        className="lg:hidden sticky top-0 z-30 bg-[#f7f5f2] border-b border-[rgba(26,24,21,0.10)] px-[4.2%] pt-4 pb-3">

        {/* Section header — sticky on mobile, shown in content area on desktop */}
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-primary-red shrink-0"/>
            <p className="font-sans text-[11px] font-bold leading-normal tracking-[2.2px] text-primary-red uppercase">
              {eyebrow}
            </p>
          </div>
          <h2
            className="font-fraunces-italics italic font-semibold text-[26px] leading-tight tracking-[-0.8px] text-[#1a1815]">
            {title}
          </h2>
        </div>

        {/* "Timeline" label — same as desktop */}
        <p className="font-sans text-[9px] font-bold tracking-[2.4px] text-[#6b6761] uppercase mb-2">
          Timeline
        </p>

        {/* Active year — same AnimatePresence slide as desktop, but compact */}
        <div className="overflow-hidden mb-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeYear}
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 10}}
              transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              className="block font-fraunces-italics italic font-semibold text-[36px] leading-none text-[#1a1815] select-none"
            >
              {activeYear}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Horizontal progress bar — same 1 px track + red spring fill as desktop */}
        <div className="relative w-full h-px bg-[rgba(26,24,21,0.12)] mb-3">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary-red origin-left"
            style={{width: barWidth}}
          />
        </div>

        {/* Horizontal year carousel — clickable, same dot + label styling as desktop */}
        <div
          ref={mobileCarouselRef}
          className="overflow-hidden"
        >
          <div className="flex w-max">
            {entries.map((entry, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={entry.year}
                  ref={(el) => {
                    yearItemRefs.current[i] = el;
                  }}
                  onClick={() => scrollToEntry(i)}
                  style={{height: `${ROW_H}px`, paddingRight: "20px"}}
                  className="flex items-center gap-2.5 shrink-0 cursor-pointer"
                >
                  {/* Same animated dot as desktop */}
                  <motion.div
                    animate={{scale: isActive ? 1.2 : 1}}
                    transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
                    className={`w-2 h-2 rounded-full border shrink-0 transition-colors duration-300 ${
                      isActive
                        ? "bg-primary-red border-primary-red"
                        : "bg-transparent border-[rgba(26,24,21,0.25)]"
                    }`}
                  />
                  {/* Same year label as desktop */}
                  <span
                    className={`font-sans text-[11px] leading-none transition-all duration-200 ${
                      isActive
                        ? "text-primary-red font-bold"
                        : "text-[#6b6761] font-normal"
                    }`}
                  >
                    {entry.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10 lg:gap-14 pt-10 pb-16 lg:py-24">

        {/* Section header — hidden on mobile (shown in sticky bar), visible on desktop */}
        <div className="hidden lg:flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-primary-red shrink-0"/>
            <p className="font-sans text-[11px] font-bold leading-normal tracking-[2.2px] text-primary-red uppercase">
              {eyebrow}
            </p>
          </div>
          <h2
            className="font-fraunces-italics italic font-semibold text-[30px] lg:text-[42px] leading-tight tracking-[-0.8px] text-[#1a1815]">
            {title}
          </h2>
        </div>

        {/* Timeline: sidebar (desktop) + entries */}
        <div className="flex gap-8 lg:gap-14 items-start">

          {/* ── Sticky sidebar (desktop only — unchanged) ── */}
          <div className="hidden lg:flex flex-col sticky top-24 w-36 shrink-0">

            <p className="font-sans text-[9px] font-bold tracking-[2.4px] text-[#6b6761] uppercase mb-3">
              Timeline
            </p>

            {/* Large year — slides in/out */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeYear}
                  initial={{opacity: 0, y: -14}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 14}}
                  transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                  className="block font-fraunces-italics italic font-semibold text-[52px] leading-none text-[#1a1815] select-none"
                >
                  {activeYear}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Vertical progress bar */}
            <div
              className="relative mt-4 mb-3 ml-px"
              style={{width: "1px", height: "140px"}}
            >
              <div className="absolute inset-0 bg-[rgba(26,24,21,0.12)]"/>
              <motion.div
                className="absolute top-0 left-0 right-0 bg-primary-red origin-top"
                style={{height: barHeight}}
              />
            </div>

            {/* Year list — filled circle active, outline inactive */}
            <div className="flex flex-col">
              {entries.map((entry, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={entry.year}
                    onClick={() => scrollToEntry(i)}
                    style={{height: `${ROW_H}px`}}
                    className="flex items-center gap-2.5 text-left group"
                  >
                    <motion.div
                      animate={{scale: isActive ? 1.2 : 1}}
                      transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
                      className={`w-2 h-2 rounded-full border shrink-0 transition-colors duration-300 ${
                        isActive
                          ? "bg-primary-red border-primary-red"
                          : "bg-transparent border-[rgba(26,24,21,0.25)] group-hover:border-[rgba(26,24,21,0.5)]"
                      }`}
                    />
                    <span
                      className={`font-sans text-[11px] leading-none transition-all duration-200 ${
                        isActive
                          ? "text-primary-red font-bold"
                          : "text-[#6b6761] font-normal group-hover:text-[#1a1815]"
                      }`}
                    >
                      {entry.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Scrolling entries ── */}
          <div className="flex flex-col gap-14 lg:gap-20 flex-1 min-w-0">
            {entries.map((entry, i) => (
              <TimelineEntry
                key={entry.year}
                entry={entry}
                ref={(el) => {
                  entryRefs.current[i] = el;
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
