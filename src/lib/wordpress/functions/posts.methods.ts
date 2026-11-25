import { cache } from "react";
import {
  BLOG_CONTENT_SOURCE,
  PRESS_CONTENT_SOURCE,
} from "@/constants/contentSource.constants";
import {
  fetchContentBySlug,
  fetchContentCategories,
  fetchContentItems,
  fetchContentMeta,
  fetchRelatedPosts,
  embeddedFeaturedImage,
  embeddedPrimaryCategory,
  type WPCategory,
  type WPMediaItem,
  type WPCategoryItem,
  type WPPost,
  type WPPostsPage,
} from "./content.methods";

export type {
  WPCategory,
  WPMediaItem,
  WPCategoryItem,
  WPPost,
  WPPostsPage,
};

export {
  fetchRelatedPosts,
  embeddedFeaturedImage,
  embeddedPrimaryCategory,
};

/**
 * Fetch a page of blog posts, optionally filtered by category id.
 * Thin wrapper around fetchContentItems(BLOG_CONTENT_SOURCE).
 */
export const fetchPosts = cache(
  async (opts?: {
    page?: number;
    perPage?: number;
    categoryId?: number;
  }): Promise<WPPostsPage> => {
    const { items, total, totalPages, available } = await fetchContentItems(
      BLOG_CONTENT_SOURCE,
      opts
    );
    return { posts: items, items, total, totalPages, available };
  }
);

/** Fetch post categories that have at least one published post. */
export const fetchCategories = cache(async (): Promise<WPCategory[]> =>
  fetchContentCategories(BLOG_CONTENT_SOURCE)
);

/** Fetch a single blog post by slug. */
export const fetchPostBySlug = cache(async (slug: string): Promise<WPPost | null> =>
  fetchContentBySlug(BLOG_CONTENT_SOURCE, slug)
);

const BLOG_DESCRIPTION_FALLBACK =
  "Stories of transformation, education, and impact from Yuva Unstoppable across India.";

const PRESS_DESCRIPTION_FALLBACK =
  "News, announcements and media coverage from Yuva Unstoppable.";

/** Fetch SEO metadata for a blog post by slug (WordPress posts API). */
export const fetchPostMeta = cache(async (slug: string) =>
  fetchContentMeta(BLOG_CONTENT_SOURCE, slug, BLOG_DESCRIPTION_FALLBACK)
);

/** Fetch SEO metadata for a press article by slug. */
export const fetchPressMeta = cache(async (slug: string) =>
  fetchContentMeta(PRESS_CONTENT_SOURCE, slug, PRESS_DESCRIPTION_FALLBACK)
);
