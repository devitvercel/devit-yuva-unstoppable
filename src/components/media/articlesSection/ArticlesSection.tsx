"use client";

import { useMemo, useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import ArticleCard from "@/components/media/articlesSection/ArticleCard";
import PressArticleCard from "@/components/media/articlesSection/PressArticleCard";
import MediaTabs from "@/components/media/tabs/MediaTabs";
import MediaSearch from "@/components/media/MediaSearch";
import type { ArticleItem, MediaTab } from "@/types/media/media.types";

interface ArticlesSectionProps {
  articles: ArticleItem[];
  categories: MediaTab[];
  variant?: "blog" | "press";
  initialQuery?: string;
  initialCategory?: string;
}

const INITIAL_ARTICLES = 6;
const BATCH_SIZE = 6;


function matchesQuery(article: ArticleItem, query: string): boolean {
  if (!query) return true;
  return [
    article.title,
    article.excerpt,
    article.category,
    article.tag,
    article.source,
  ].some((value) => value?.toLocaleLowerCase().includes(query));
}

function ArticlesSection({
  articles,
  categories,
  variant = "blog",
  initialQuery = "",
  initialCategory,
}: ArticlesSectionProps) {
  const [activeCategory, setActiveCategory] = useState(
    categories.some((category) => category.id === initialCategory)
      ? (initialCategory as string)
      : "all"
  );
  const [query, setQuery] = useState(initialQuery);

  // Apply ?category= / ?q= deep links on mount. Read from window.location (not
  // useSearchParams) so the route stays ISR and the server HTML keeps the full
  // default list; useLayoutEffect applies it before paint (no flash).
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category && categories.some((c) => c.id === category)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from URL (external) on mount
      setActiveCategory(category);
    }
    const q = params.get("q")?.trim();
    if (q) setQuery(q);
  }, [categories]);

  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filteredArticles = useMemo(
    () =>
      articles.filter(
        (article) =>
          (activeCategory === "all" || article.category === activeCategory) &&
          matchesQuery(article, normalizedQuery)
      ),
    [activeCategory, articles, normalizedQuery]
  );

  const [visibleCount, setVisibleCount] = useState(INITIAL_ARTICLES);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) =>
      Math.min(prev + BATCH_SIZE, filteredArticles.length)
    );
  }, [filteredArticles.length]);

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

  return (
    <section className="w-916/1000 xl:w-888/1000 mx-auto pb-20 md:pb-[160px] flex flex-col">
      <div className="h-10 shrink-0 md:h-20" aria-hidden="true" />
        <div className="mb-8 w-full md:mb-12">
          <MediaSearch
            value={query}
            onChange={(next) => {
              setQuery(next);
              setVisibleCount(INITIAL_ARTICLES);
            }}
            placeholder={
              variant === "press"
                ? "Search by title, keywords, tags, subtitle or description"
                : "Search blogs by title, description or category"
            }
            resultCount={filteredArticles.length}
          />
        </div>

      <div className="sticky top-18 z-20 -mx-[4.6%] mb-8 bg-[#F7F5F2] px-[4.6%] pt-4 md:mb-12 xl:-mx-[6.3%] xl:px-[6.3%]">
        <MediaTabs
          tabs={categories}
          activeTab={activeCategory}
          onTabChange={(category) => {
            setActiveCategory(category);
            setVisibleCount(INITIAL_ARTICLES);
          }}
          variant="gallery-underline"
        />
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full ${variant === "press"
            ? "gap-x-6 md:gap-x-8 xl:gap-x-10 gap-y-6 md:gap-y-8"
            : "gap-x-6 md:gap-x-10 xl:gap-x-12 gap-y-12 md:gap-y-16 xl:gap-y-20"
          }`}
      >
        {visibleArticles.map((article, index) =>
          variant === "press" ? (
            <PressArticleCard
              key={`${article.title}-${index}`}
              article={article}
            />
          ) : (
            <ArticleCard key={`${article.title}-${index}`} article={article} />
          )
        )}
      </div>

      {visibleArticles.length === 0 && (
        <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-[#241E1926] bg-white/50 px-6 text-center">
          <p className="font-sans text-sm text-[#6B6761] md:text-base">
            No {variant === "press" ? "press articles" : "articles"} matched
            your search and selected category.
          </p>
        </div>
      )}

      {hasMore && <div ref={sentinelRef} className="h-10 w-full mt-8" />}
    </section>
  );
}

export default ArticlesSection;
