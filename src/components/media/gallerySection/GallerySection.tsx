"use client";

import {useMemo, useState, useCallback, useLayoutEffect} from "react";
import GalleryCard from "@/components/media/gallerySection/GalleryCard";
import GalleryVideoModal from "@/components/media/gallerySection/GalleryVideoModal";
import MediaTabs from "@/components/media/tabs/MediaTabs";
import MediaSearch from "@/components/media/MediaSearch";
import type {GalleryItem, MediaTab} from "@/types/media/media.types";

interface GallerySectionProps {
  tabs: MediaTab[];
  categories: MediaTab[];
  items: GalleryItem[];
  initialTab?: string;
  initialCategory?: string;
  initialQuery?: string;
}

const INITIAL_ITEMS = 9;
const BATCH_SIZE = 9;

function categoryMatchesGallery(category: MediaTab, galleryKind: string): boolean {
  if (category.id === "all") return true;
  const scope = category.kind ?? "both";
  return scope === "both" || scope === galleryKind;
}

function GallerySection({
  tabs,
  categories,
  items,
  initialTab,
  initialCategory,
  initialQuery = "",
}: GallerySectionProps) {
  const defaultTab = tabs.some((tab) => tab.id === initialTab)
    ? (initialTab as string)
    : tabs[0]?.id ?? "photo";
  const [activeGallery, setActiveGallery] = useState(defaultTab);
  const [activeCategory, setActiveCategory] = useState(
    categories.some((category) => category.id === initialCategory)
      ? (initialCategory as string)
      : "all"
  );
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [query, setQuery] = useState(initialQuery);

  // Apply ?tab= / ?category= / ?q= deep links on mount. Read from
  // window.location (not useSearchParams) so the route stays ISR and the server
  // HTML keeps the full default gallery; useLayoutEffect applies it before paint.
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && tabs.some((t) => t.id === tab)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from URL (external) on mount
      setActiveGallery(tab);
    }
    const category = params.get("category");
    if (category && categories.some((c) => c.id === category)) {
      setActiveCategory(category);
    }
    const q = params.get("q")?.trim();
    if (q) setQuery(q);
  }, [tabs, categories]);

  const normalizedQuery = query.trim().toLocaleLowerCase();

  const visibleCategories = useMemo(
    () => categories.filter((category) => categoryMatchesGallery(category, activeGallery)),
    [activeGallery, categories]
  );
  const selectedCategory = visibleCategories.some(
    (category) => category.id === activeCategory
  )
    ? activeCategory
    : "all";

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.kind === activeGallery &&
          (selectedCategory === "all" || item.category === selectedCategory) &&
          (!normalizedQuery ||
            item.title.toLocaleLowerCase().includes(normalizedQuery) ||
            (item.category ?? "").toLocaleLowerCase().includes(normalizedQuery))
      ),
    [selectedCategory, activeGallery, items, normalizedQuery]
  );

  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredItems.length));
  }, [filteredItems.length]);

  const handleGalleryChange = (tabId: string) => {
    setActiveGallery(tabId);
    setActiveCategory("all");
    setVisibleCount(INITIAL_ITEMS);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setVisibleCount(INITIAL_ITEMS);
  };

  return (
    <section className="w-916/1000 xl:w-888/1000 mx-auto pb-20 md:pb-[160px] flex flex-col items-center">
      <div className="w-full pt-10 pb-6 md:pt-[80px] md:pb-[40px]">
        <MediaTabs
          tabs={tabs}
          activeTab={activeGallery}
          onTabChange={handleGalleryChange}
          variant="pill"
        />
      </div>
      <div className="mb-8 w-full md:mb-12">
        <MediaSearch
          value={query}
          onChange={(next) => {
            setQuery(next);
            setVisibleCount(INITIAL_ITEMS);
          }}
          placeholder="Search gallery by title or category"
          resultCount={filteredItems.length}
        />
      </div>
      <div className="w-full flex flex-col gap-[30px] md:gap-[80px]">
        <div className="sticky top-18 z-20 -mx-[4.6%] bg-[#F7F5F2] px-[4.6%] pt-4 xl:-mx-[6.3%] xl:px-[6.3%]">
          <MediaTabs
            tabs={visibleCategories}
            activeTab={selectedCategory}
            onTabChange={handleCategoryChange}
            variant="gallery-underline"
          />
        </div>
        <div className="grid gap-[32px] grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full">
          {visibleItems.map((item, index) => (
            <GalleryCard
              key={`${item.title}-${index}`}
              item={item}
              onItemClick={setActiveItem}
            />
          ))}
        </div>
        {visibleItems.length === 0 && (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-[#241E1926] bg-white/50 px-6 text-center">
            <p className="font-sans text-sm text-[#6B6761] md:text-base">
              No gallery items matched your search and selected filters.
            </p>
          </div>
        )}
      </div>
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-12 md:mt-[80px] font-sans font-bold text-[16px] text-[#ce2028] tracking-[1.5px] uppercase cursor-pointer hover:text-[#a00416] transition-all duration-300 pb-2 border-b-2 border-transparent hover:border-[#a00416]"
        >
          See More +
        </button>
      )}
      <GalleryVideoModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
}

export default GallerySection;
