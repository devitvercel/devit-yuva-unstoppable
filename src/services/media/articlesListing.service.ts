import { cache } from "react";
import {
  BLOG_CONTENT_SOURCE,
  MEDIA_ARTICLES_LIST_PER_PAGE,
  MEDIA_ARTICLES_MAX_TABS,
  PRESS_CONTENT_SOURCE,
  type ContentSource,
} from "@/constants/contentSource.constants";
import {
  embeddedFeaturedImage,
  embeddedPrimaryCategory,
  fetchContentCategories,
  fetchContentItems,
  type WPContentItem,
} from "@/lib/wordpress/functions/content.methods";
import { decodeEntities, stripHtml } from "@/lib/parsers/acf.parser";
import { VOC_CARD_FALLBACK_IMG } from "@/data/voiceOfChange/vocStories.data";
import {
  shouldExcludeFromBlogListings,
} from "@/constants/awardsRecognition.constants";
import type { ArticleItem, MediaTab } from "@/types/media/media.types";

function formatBlogCardDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

function formatPressCardDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase()
    .replace(/\./g, "");
}

function pressSourceLogo(
  item: WPContentItem
): ArticleItem["sourceLogo"] | undefined {
  const raw = item.scf?.source_logo ?? item.scf?.sourceLogo;
  if (typeof raw === "string" && raw) {
    return { src: raw, alt: item.scf?.source ?? "" };
  }
  if (raw && typeof raw === "object" && raw.url) {
    return { src: raw.url, alt: raw.alt || item.scf?.source || "" };
  }
  return undefined;
}

function buildDetailHref(
  source: ContentSource,
  slug: string,
  categorySlug: string,
  options?: {listing?: string}
): string {
  const params = new URLSearchParams();
  if (categorySlug && categorySlug !== "all") {
    params.set("from", categorySlug);
  }
  if (options?.listing) {
    params.set("listing", options.listing);
  }
  const qs = params.toString();
  return `${source.detailPathPrefix}/${slug}${qs ? `?${qs}` : ""}`;
}

function toBlogArticleItem(item: WPContentItem): ArticleItem {
  const img = embeddedFeaturedImage(item);
  const cat = embeddedPrimaryCategory(item);
  const title = decodeEntities(item.title?.rendered ?? "");

  return {
    title,
    excerpt: stripHtml(item.excerpt?.rendered ?? ""),
    category: cat.slug || "all",
    tag: decodeEntities(cat.name),
    date: formatBlogCardDate(item.date),
    img: {
      src: img.src || VOC_CARD_FALLBACK_IMG.src,
      alt: img.alt || title || VOC_CARD_FALLBACK_IMG.alt,
    },
    slug: item.slug,
    href: buildDetailHref(BLOG_CONTENT_SOURCE, item.slug, cat.slug, {
      listing: "blogs",
    }),
  };
}

function toPressArticleItem(item: WPContentItem): ArticleItem {
  const img = embeddedFeaturedImage(item);
  const cat = embeddedPrimaryCategory(item);
  const title = decodeEntities(item.title?.rendered ?? "");
  const source = item.scf?.source?.trim();

  return {
    title,
    excerpt: stripHtml(item.excerpt?.rendered ?? ""),
    category: cat.slug || "all",
    tag: decodeEntities(cat.name).toUpperCase(),
    source: source || undefined,
    sourceLogo: pressSourceLogo(item),
    date: formatPressCardDate(item.date),
    img: img.src
      ? {
          src: img.src,
          alt: img.alt || title || VOC_CARD_FALLBACK_IMG.alt,
        }
      : undefined,
    slug: item.slug,
    href: buildDetailHref(PRESS_CONTENT_SOURCE, item.slug, cat.slug),
  };
}

async function fetchArticleItems(
  source: ContentSource,
  mapper: (item: WPContentItem) => ArticleItem,
  search = ""
): Promise<{articles: ArticleItem[]; available: boolean}> {
  const {items, available} = await fetchContentItems(source, {
    perPage: MEDIA_ARTICLES_LIST_PER_PAGE,
    search,
  });
  return {articles: items.map(mapper).filter((article) =>
    !shouldExcludeFromBlogListings(article.category, article.tag)
  ), available};
}

async function fetchCategoryTabs(
  source: ContentSource,
  fallback: MediaTab[]
): Promise<MediaTab[]> {
  const cats = await fetchContentCategories(source);
  const catTabs: MediaTab[] = cats
    .filter((c) => c.parent === 0)
    .filter(
      (c) => !shouldExcludeFromBlogListings(c.slug, decodeEntities(c.name))
    )
    .map((c) => ({
      id: c.slug,
      label: decodeEntities(c.name).toUpperCase(),
    }));

  const tabs: MediaTab[] = [{ id: "all", label: "ALL" }, ...catTabs].slice(
    0,
    MEDIA_ARTICLES_MAX_TABS
  );

  return tabs.length > 1 ? tabs : fallback.filter(
    (tab) => tab.id === "all" || !shouldExcludeFromBlogListings(tab.id, tab.label)
  );
}

function filterListingTabs(tabs: MediaTab[]): MediaTab[] {
  return tabs.filter(
    (tab) => tab.id === "all" || !shouldExcludeFromBlogListings(tab.id, tab.label)
  );
}

/** Blog cards for the Media /blogs page (same WP source as Voice of Change). */
export const getBlogArticlesForMediaPage = cache(
  async (
    search = ""
  ): Promise<{articles: ArticleItem[]; available: boolean}> =>
    fetchArticleItems(BLOG_CONTENT_SOURCE, toBlogArticleItem, search)
);

/** Press cards for the Media /press-and-media page. */
export const getPressArticlesForMediaPage = cache(
  async (
    search = ""
  ): Promise<{articles: ArticleItem[]; available: boolean}> =>
    fetchArticleItems(PRESS_CONTENT_SOURCE, toPressArticleItem, search)
);

export const getBlogCategoryTabsForMediaPage = cache(
  async (
    useScfOverride: boolean,
    scfTabs: MediaTab[],
    fallback: MediaTab[]
  ): Promise<MediaTab[]> => {
    if (useScfOverride && scfTabs.length > 0) {
      return filterListingTabs(scfTabs);
    }
    return fetchCategoryTabs(BLOG_CONTENT_SOURCE, fallback);
  }
);

export const getPressCategoryTabsForMediaPage = cache(
  async (
    useScfOverride: boolean,
    scfTabs: MediaTab[],
    fallback: MediaTab[]
  ): Promise<MediaTab[]> => {
    if (useScfOverride && scfTabs.length > 0) return scfTabs;
    return fetchCategoryTabs(PRESS_CONTENT_SOURCE, fallback);
  }
);
