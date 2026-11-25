"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import type {UnSdgsIndexSectionType} from "@/types/unSdgs/unSdgs.types";
import SdgGoalTile from "./SdgGoalTile";
import SdgDetailCard from "./SdgDetailCard";

const ROW_HEIGHT = 66;
const LIST_VIEWPORT = 520;
const STICKY_TOP = 112; // top-28
const PIN_BLOCK_HEIGHT = 580;

function SdgIndexSection({sdgIndex}: {sdgIndex: UnSdgsIndexSectionType}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedNumber, setSelectedNumber] = useState(sdgIndex.defaultGoal);
  const [listOffset, setListOffset] = useState(0);

  const goals = sdgIndex.goals;
  const selectedGoal = goals.find((g) => g.number === selectedNumber) ?? goals[0];
  const maxListOffset = Math.max(0, goals.length * ROW_HEIGHT - LIST_VIEWPORT);
  const scrollTrackHeight = maxListOffset;

  const updateListOffset = useCallback(() => {
    const track = trackRef.current;
    if (!track || window.innerWidth < 1024) {
      setListOffset(0);
      return;
    }

    if (scrollTrackHeight <= 0) {
      setListOffset(0);
      return;
    }

    const scrollInto = STICKY_TOP - track.getBoundingClientRect().top;
    const progress = Math.min(1, Math.max(0, scrollInto / scrollTrackHeight));
    setListOffset(progress * maxListOffset);
  }, [maxListOffset, scrollTrackHeight]);

  useEffect(() => {
    updateListOffset();
    window.addEventListener("scroll", updateListOffset, {passive: true});
    window.addEventListener("resize", updateListOffset);
    return () => {
      window.removeEventListener("scroll", updateListOffset);
      window.removeEventListener("resize", updateListOffset);
    };
  }, [updateListOffset]);

  const goalList = (
    <>
      {goals.map((goal) => {
        const isSelected = goal.number === selectedNumber;
        return (
          <button
            key={goal.number}
            type="button"
            onClick={() => setSelectedNumber(goal.number)}
            className={`flex h-[66px] w-full shrink-0 items-center gap-3.5 border-b border-[#1A18151A] px-6 text-left transition-colors ${
              isSelected ? "bg-[#f7f5f2] pl-7" : "bg-white hover:bg-[#faf9f7]"
            }`}
          >
            <SdgGoalTile goal={goal} isSelected={isSelected}/>
          </button>
        );
      })}
    </>
  );

  return (
    <section className="bg-[#f7f5f2] px-4 py-12 md:px-10 md:py-20 xl:px-20">
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-8">
        <div className="flex max-w-[560px] flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-[1px] bg-primary-red" aria-hidden/>
            <p className="font-dm-sans text-[12px] font-extrabold uppercase tracking-[2.2px] text-primary-red">
              {sdgIndex.heading}
            </p>
          </div>
          <h2 className="font-fraunces-italics text-[clamp(32px,4vw,52px)] leading-[1.15] tracking-[-0.025em] text-[#1a1815]">
            {sdgIndex.titlePlain}
            <span className="text-primary-red">{sdgIndex.titleHighlight}</span>
          </h2>
        </div>

        <div
          ref={trackRef}
          className="relative"
          style={{
            height:
              scrollTrackHeight > 0
                ? `calc(${scrollTrackHeight}px + ${PIN_BLOCK_HEIGHT}px)`
                : undefined,
          }}
        >
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:flex-row lg:gap-12">
            <div className="shrink-0 overflow-hidden rounded-[14px] bg-white shadow-[0_12px_32px_0_rgba(26,24,21,0.05)] lg:w-[42%]">
              <div className="border-b border-[#1A18151A] px-6 py-5">
                <p className="font-fraunces-italics text-lg font-semibold text-[#1a1815]">All Goals</p>
              </div>

              {/* Desktop: page scroll drives list — single pass, no duplicates */}
              <div className="hidden h-[520px] overflow-hidden lg:block">
                <div
                  className="will-change-transform"
                  style={{transform: `translate3d(0, -${listOffset}px, 0)`}}
                >
                  {goalList}
                </div>
              </div>

              {/* Mobile: natural list, no inner scrollbar */}
              <div className="sdg-goals-infinite-scroll max-h-[520px] overflow-y-auto overscroll-contain lg:hidden">
                {goalList}
              </div>
            </div>

            <div className="lg:flex-1">
              <SdgDetailCard goal={selectedGoal}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SdgIndexSection;
