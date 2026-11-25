import { cache } from "react";
import {
  BLOG_CONTENT_SOURCE,
  MEDIA_ARTICLES_LIST_PER_PAGE,
} from "@/constants/contentSource.constants";
import {
  fetchContentItems,
  fetchContentCategories,
  embeddedFeaturedImage,
  embeddedPrimaryCategory,
  type WPContentItem,
} from "@/lib/wordpress/functions/content.methods";
import { decodeEntities, stripHtml } from "@/lib/parsers/acf.parser";
import { VOC_CARD_FALLBACK_IMG } from "@/data/voiceOfChange/vocStories.data";
import { shouldExcludeFromBlogListings } from "@/constants/awardsRecognition.constants";

/** Number of cards per page / per scroll batch. */
export const VOC_PAGE_SIZE = 9;

/** Max number of filter tabs shown, INCLUDING the leading "ALL" tab. */
export const VOC_MAX_TABS = 5;

/** A card-ready story item for the voice-of-change grid. */
export interface VocCardItem {
  id: number;
  slug: string;
  title: string;
  date: string;
  body: string;
  category: string;
  categorySlug: string;
  img: { src: string; alt: string };
  href: string;
}

export interface VocCategoryTab {
  id: number | null;
  name: string;
  slug: string;
}

export interface VocStoriesPage {
  items: VocCardItem[];
  total: number;
  totalPages: number;
  page: number;
}

/** "2024-03-21T11:37:47" → "MARCH 21, 2024" (uppercase, matches the card style). */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })
    .toUpperCase();
}

/** Map a WP post into a card-ready story item. */
function toCard(post: WPContentItem): VocCardItem {
  const img = embeddedFeaturedImage(post);
  const cat = embeddedPrimaryCategory(post);
  const title = decodeEntities(post.title?.rendered ?? "");
  const detailPrefix = BLOG_CONTENT_SOURCE.detailPathPrefix;
  return {
    id: post.id,
    slug: post.slug,
    title,
    date: formatDate(post.date),
    body: stripHtml(post.excerpt?.rendered ?? ""),
    category: decodeEntities(cat.name),
    categorySlug: cat.slug,
    img: {
      src: img.src || VOC_CARD_FALLBACK_IMG.src,
      alt: img.alt || title || VOC_CARD_FALLBACK_IMG.alt,
    },
    href: `${detailPrefix}/${post.slug}`,
  };
}

/**
 * Fetch one page of story cards (optionally filtered by category id). Used by
 * both the SSR first paint and the "load more" server action.
 */
export const getVocStories = cache(
  async (page = 1, categoryId?: number): Promise<VocStoriesPage> => {
    const { items, total, totalPages } = await fetchContentItems(
      BLOG_CONTENT_SOURCE,
      {
        page,
        perPage: VOC_PAGE_SIZE,
        categoryId,
      }
    );
    const filteredItems = items.filter((post) => {
      const cat = embeddedPrimaryCategory(post);
      return !shouldExcludeFromBlogListings(cat.slug, cat.name);
    });
    return {
      items: filteredItems.map(toCard),
      total,
      totalPages,
      page,
    };
  }
);

/**
 * Full cached catalog used by Voice of Change.
 *
 * It deliberately uses the same 100-post WordPress request as /blogs, so both
 * pages share Next's fetch cache. Category changes and "load more" then reveal
 * already-fetched cards instantly instead of starting another server action.
 */
export const getVocStoryCatalog = cache(
  async (search = ""): Promise<VocCardItem[]> => {
    const {items} = await fetchContentItems(BLOG_CONTENT_SOURCE, {
      perPage: MEDIA_ARTICLES_LIST_PER_PAGE,
      search,
    });
    return items
      .map(toCard)
      .filter(
        (story) =>
          !shouldExcludeFromBlogListings(story.categorySlug, story.category)
      );
  }
);

export const getVocCategoryTabs = cache(async (): Promise<VocCategoryTab[]> => {
  const cats = await fetchContentCategories(BLOG_CONTENT_SOURCE);
  const catTabs: VocCategoryTab[] = cats
    .filter((c) => c.parent === 0)
    .filter(
      (c) => !shouldExcludeFromBlogListings(c.slug, decodeEntities(c.name))
    )
    .map((c) => ({ id: c.id, name: decodeEntities(c.name).toUpperCase(), slug: c.slug }));

  const all: VocCategoryTab = { id: null, name: "ALL", slug: "all" };
  // ALL + (VOC_MAX_TABS - 1) real categories = VOC_MAX_TABS total.
  return [all, ...catTabs].slice(0, VOC_MAX_TABS);
});
