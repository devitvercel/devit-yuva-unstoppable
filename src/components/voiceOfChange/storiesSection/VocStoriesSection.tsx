"use client";

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import MediaSearch from "@/components/media/MediaSearch";
import { isAwardsRecognitionCategory } from "@/constants/awardsRecognition.constants";
import {
  VOC_PAGE_SIZE,
  type VocCardItem,
  type VocCategoryTab,
} from "@/services/voiceOfChange/stories.service";

const PAGE_SIZE = VOC_PAGE_SIZE;

function storyMatchesQuery(story: VocCardItem, query: string): boolean {
  if (!query) return true;
  return [story.title, story.body, story.category].some((value) =>
    value?.toLocaleLowerCase().includes(query)
  );
}

function StoryCard({ story, index }: { story: VocCardItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % PAGE_SIZE) * 0.06, ease: "easeOut" }}
    >
      <Link href={story.href} className="flex flex-col gap-3 group">
        <div className="relative w-full aspect-4/3 overflow-hidden rounded-t-lg">
          <Image
            src={story.img.src}
            alt={story.img.alt || story.title || "Voice of Change Story"}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top transition-transform rounded-t-lg duration-500 group-hover:scale-105"
          />
          {story.category && (
            <span className="absolute top-3 left-3 bg-primary-red rounded-lg text-white typo-body2 px-2.5 py-1">
              {story.category}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-work-sans text-[16px] font-medium leading-6 text-[#5B403E] uppercase">
            {story.date}
          </p>
          <h3 className="typo-h3 line-clamp-2 text-[#241E19]">{story.title}</h3>
          <p className="font-work-sans line-clamp-3 text-[16px] font-medium leading-6 text-[#5B403E]">
            {story.body}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

interface VocStoriesSectionProps {
  /** Tabs (ALL + categories, already clipped) rendered server-side. */
  tabs: VocCategoryTab[];
  /** The tab to open on — resolved server-side from ?category= (defaults to ALL). */
  initialTab: VocCategoryTab;
  /** Cached WordPress catalog shared with /blogs (up to the REST cap of 100). */
  stories: VocCardItem[];
  /** Backend search query. The search field remains feature-flagged off. */
  initialQuery?: string;
}

const VocStoriesSection: React.FC<VocStoriesSectionProps> = ({
  tabs,
  initialTab,
  stories,
  initialQuery = "",
}) => {
  const [activeTab, setActiveTab] = useState<VocCategoryTab>(initialTab);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [query, setQuery] = useState(initialQuery);

  // Apply ?category= / ?q= deep links on mount (e.g. a blog post's "Go Back").
  // Read from window.location (not useSearchParams) so the route stays ISR and
  // the server HTML keeps the default ALL tab; useLayoutEffect avoids a flash.
  // Unknown or awards-category slugs fall back to the ALL tab, as before.
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) {
      const tab = isAwardsRecognitionCategory(category)
        ? tabs[0]
        : tabs.find((t) => t.slug === category) ?? tabs[0];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from URL (external) on mount
      setActiveTab(tab);
    }
    const q = params.get("q")?.trim();
    if (q) setQuery(q);
  }, [tabs]);

  const normalizedQuery = query.trim().toLocaleLowerCase();

  const sentinelRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const filteredStories = useMemo(
    () =>
      stories.filter(
        (story) =>
          (activeTab.id === null || story.categorySlug === activeTab.slug) &&
          storyMatchesQuery(story, normalizedQuery)
      ),
    [activeTab.id, activeTab.slug, stories, normalizedQuery]
  );
  const visibleStories = filteredStories.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStories.length;

  const handleTabChange = (tab: VocCategoryTab) => {
    if (tab.slug === activeTab.slug) return;
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const loadMore = useCallback(() => {
    setVisibleCount((current) =>
      Math.min(current + PAGE_SIZE, filteredStories.length)
    );
  }, [filteredStories.length]);

  // Keep the latest loadMore in a ref so the observer below can be created ONCE
  // and never torn down/rebuilt per page — recreating it was re-triggering an
  // immediate intersection on the freshly-mounted sentinel, which made the list
  // load page after page on its own (the "scrollbar creeps down" bug).
  const loadMoreRef = useRef(loadMore);
  useEffect(() => {
    loadMoreRef.current = loadMore;
  }, [loadMore]);

  // Reveal the next cached batch shortly before the visitor reaches the bottom.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreRef.current();
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <section ref={gridRef} className="pt-14 xl:pt-20 pb-14 xl:pb-20">
        <div className="w-916/1000 xl:w-888/1000 mx-auto mb-10">
          <MediaSearch
            value={query}
            onChange={(next) => {
              setQuery(next);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search stories by title, description or category"
            resultCount={filteredStories.length}
          />
        </div>

      {/* Sticky tabs — full-width, outside constrained container so sticky works */}
      <div ref={tabsRef} className="sticky top-18 z-20 bg-[#F7F4F0] mx-auto w-full xl:w-[90%] border-b border-[#E3BEBA]">
        <div className="w-916/1000 xl:w-888/1000 mx-auto flex items-center px-4 md:justify-center py-4 gap-x-10 gap-y-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => handleTabChange(tab)}
              className={`pb-2 -mb-px border-b-2 font-work-sans text-[16px] font-medium leading-6 transition-colors duration-200 whitespace-nowrap ${activeTab.slug === tab.slug
                  ? "text-[#A00416] border-[#A00416]"
                  : "text-[#6B5F54] cursor-pointer border-transparent hover:text-[#241E19]"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stories grid */}
      <div className="w-916/1000 xl:w-888/1000 mx-auto mt-10 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
          {visibleStories.map((story, i) => (
            <StoryCard
              key={`${activeTab.slug}-${story.id}`}
              story={story}
              index={i}
            />
          ))}
        </div>

        {visibleStories.length === 0 && (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-[#241E1926] bg-white/50 px-6 text-center">
            <p className="font-sans text-sm text-[#6B6761] md:text-base">
              No stories matched your search and selected category.
            </p>
          </div>
        )}

        {hasMore && <div ref={sentinelRef} className="h-10" />}
      </div>
    </section>
  );
};

export default VocStoriesSection;
