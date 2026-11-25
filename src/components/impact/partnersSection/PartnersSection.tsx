"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import PartnerCard from "@/components/impact/partnersSection/PartnerCard";
import ImpactTabs from "@/components/impact/tabs/ImpactTabs";
import type { ImpactPartnerItem, ImpactTab } from "@/types/impact/impact.types";

interface PartnersSectionProps {
  tabs: ImpactTab[];
  partners: ImpactPartnerItem[];
  initialTab?: string;
}

const INITIAL_PARTNERS = 25;
const BATCH_SIZE = 20;

function PartnersSection({ tabs, partners, initialTab }: PartnersSectionProps) {
  const defaultTab = tabs.some((tab) => tab.id === initialTab)
    ? (initialTab as string)
    : (tabs[0]?.id ?? "");
  const [activeTab, setActiveTab] = useState(defaultTab);

  const filteredPartners = useMemo(
    () => partners.filter((partner) => partner.category === activeTab),
    [activeTab, partners]
  );

  const [visibleCount, setVisibleCount] = useState(INITIAL_PARTNERS);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visiblePartners = filteredPartners.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPartners.length;
  const isCsr = activeTab === "csr-partners";

  const loadMore = useCallback(() => {
    setVisibleCount((prev) =>
      Math.min(prev + BATCH_SIZE, filteredPartners.length)
    );
  }, [filteredPartners.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  const gridClassName =
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 xl:gap-8 justify-items-center w-full";

  return (
    <section className="bg-white">
      <div className="w-916/1000 xl:w-888/1000 mx-auto px-4 sm:px-0 py-10 sm:py-14 xl:py-20 flex flex-col gap-8 xl:gap-12">
        <div className="sticky top-18 z-20 -mx-4 bg-white px-4 py-4 sm:mx-0 sm:px-0">
          <ImpactTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => {
              setActiveTab(tabId);
              setVisibleCount(INITIAL_PARTNERS);
            }}
          />
        </div>

        <div className={gridClassName}>
          {visiblePartners.map((partner, index) => (
            <PartnerCard
              key={`${partner.name}-${index}`}
              partner={partner}
              showTitleOnHover={!isCsr}
            />
          ))}
        </div>

        {hasMore && <div ref={sentinelRef} className="h-10 w-full" />}
      </div>
    </section>
  );
}

export default PartnersSection;
