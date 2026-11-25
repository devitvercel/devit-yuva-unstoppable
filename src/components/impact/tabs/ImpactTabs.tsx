"use client";

import type { ImpactTab } from "@/types/impact/impact.types";

interface ImpactTabsProps {
  tabs: ImpactTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

function ImpactTabs({ tabs, activeTab, onTabChange }: ImpactTabsProps) {
  if (tabs.length === 0) return null;

  return (
    <div className="w-full border-b border-[#2D2A261A]">
      <div
        role="tablist"
        className="flex flex-wrap items-end justify-center gap-2 sm:gap-6 xl:gap-8"
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
              className={`inline-flex items-center px-4 sm:px-6 pb-4 pt-2 border-b-[3px] uppercase transition-colors duration-200 text-[12px] sm:text-[22px] tracking-[1.2px] leading-none cursor-pointer ${
                isActive
                  ? "border-[#a00416] text-[#a00416] font-bold"
                  : "border-transparent text-[#a00416]/70 font-semibold hover:text-[#a00416]"
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

export default ImpactTabs;
