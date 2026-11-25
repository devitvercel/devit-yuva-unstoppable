"use client";

import {useState, useEffect, useRef, useCallback, useMemo} from "react";
import AnnualReportCard from "@/components/impact/annualReportsSection/AnnualReportCard";
import MediaTabs from "@/components/media/tabs/MediaTabs";
import type {
  ImpactAnnualReportItem,
  ImpactTab,
} from "@/types/impact/impact.types";

const INITIAL_REPORTS = 6;
const BATCH_SIZE = 6;

function AnnualReportsSection({
  reports,
  categories,
}: {
  reports: ImpactAnnualReportItem[];
  categories: ImpactTab[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_REPORTS);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filterTabs = useMemo(() => {
    if (categories.length > 0) return categories;
    return [{id: "all", label: "All"}];
  }, [categories]);

  const filteredReports = useMemo(
    () =>
      reports.filter(
        (report) =>
          activeCategory === "all" || report.category === activeCategory
      ),
    [activeCategory, reports]
  );

  const visibleReports = filteredReports.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReports.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredReports.length));
  }, [filteredReports.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      {rootMargin: "200px 0px", threshold: 0}
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return (
    <section className="bg-white">
      <div className="w-916/1000 xl:w-888/1000 mx-auto px-4 sm:px-0 py-10 sm:py-14 xl:py-20 flex flex-col gap-8 md:gap-15 lg:gap-20 xl:gap-22.5">
        {filterTabs.length > 1 && (
          <div className="sticky top-18 z-20 -mx-4 bg-white px-4 py-4 sm:mx-0 sm:px-0">
            <MediaTabs
              tabs={filterTabs}
              activeTab={activeCategory}
              onTabChange={(category) => {
                setActiveCategory(category);
                setVisibleCount(INITIAL_REPORTS);
              }}
              variant="gallery-underline"
            />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-15 lg:gap-20 xl:gap-22.5 justify-items-center">
          {visibleReports.map((report, index) => (
            <AnnualReportCard
              key={`${report.category}-${report.year}-${index}`}
              report={report}
            />
          ))}
        </div>
        {hasMore && <div ref={sentinelRef} className="h-10"/>}
      </div>
    </section>
  );
}

export default AnnualReportsSection;
