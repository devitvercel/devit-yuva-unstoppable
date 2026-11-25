import { cache } from "react";
import {
  BLOG_CONTENT_SOURCE,
  type ContentSource,
} from "@/constants/contentSource.constants";
import {
  REVALIDATE_TIME,
  WP_ENDPOINTS,
  WP_YARPP_API_BASE,
  WP_QUERY,
} from "@/constants/wp.constants";
import {wpFetch} from "@/lib/wordpress/wpFetch";
import { decodeEntities, stripHtml } from "@/lib/parsers/acf.parser";
import type { ContentMeta, WPSeo, YoastHeadJson } from "@/types/wordpress.types";

/**
 * Generic WordPress content fetch helpers.
 * ---------------------------------------------------------------------------
 * Powers blog posts (standard `posts`) and press articles (`press-article`)
 * through a shared ContentSource config so listings can be repointed from
 * constants without duplicating fetch/enrich logic.
 */

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
}

export interface WPMediaItem {
  id: number;
  source_url?: string;
  alt_text?: string;
}

export interface WPCategoryItem {
  id: number;
  name: string;
  slug: string;
}

export interface PressArticleScf {
  subtitle?: string;
  sub_title?: string;
  description?: string;
  keywords?: string;
  tags?: string;
  source?: string;
  source_logo?: { url?: string; alt?: string } | string | false;
  sourceLogo?: { url?: string; alt?: string } | string | false;
}

export interface WPContentItem {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  categories?: number[];
  "press-category"?: number[];
  scf?: PressArticleScf;
  yoast_head_json?: YoastHeadJson;
  seo?: WPSeo;
  modified_gmt?: string;
  _media?: WPMediaItem;
  _primaryCategory?: WPCategoryItem;
}

export interface WPContentPage {
  items: WPContentItem[];
  total: number;
  totalPages: number;
  available: boolean;
}

/** @deprecated Use WPContentItem — kept for existing blog imports. */
export type WPPost = WPContentItem;

/** @deprecated Use WPContentPage — kept for existing blog imports. */
export interface WPPostsPage extends WPContentPage {
  posts: WPContentItem[];
}

function taxonomyIds(item: WPContentItem, field: string): number[] {
  const raw = (item as unknown as Record<string, unknown>)[field];
  return Array.isArray(raw) ? (raw as number[]) : [];
}

async function fetchByIds<T extends { id: number }>(
  endpoint: string,
  ids: number[],
  fields: string
): Promise<Map<number, T>> {
  const map = new Map<number, T>();
  if (ids.length === 0) return map;

  const params = new URLSearchParams({
    include: ids.join(","),
    per_page: "100",
    _fields: fields,
  });
  const url = `${endpoint}?${params.toString()}`;

  try {
    const res = await wpFetch(url, {
      next: { revalidate: REVALIDATE_TIME.POSTS },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return map;
    const items = (await res.json()) as T[];
    for (const item of items) map.set(item.id, item);
  } catch (err) {
    console.error(`[fetchByIds] Failed for ${endpoint}`, err);
  }
  return map;
}

async function enrichContentItems(
  items: WPContentItem[],
  source: ContentSource
): Promise<WPContentItem[]> {
  if (items.length === 0) return items;

  const mediaIds = [
    ...new Set(items.map((item) => item.featured_media).filter((id) => id > 0)),
  ];
  const catIds = [
    ...new Set(
      items
        .map((item) => taxonomyIds(item, source.taxonomyFieldOnItem)[0])
        .filter((id): id is number => !!id)
    ),
  ];

  const [mediaMap, catMap] = await Promise.all([
    fetchByIds<WPMediaItem>(
      WP_ENDPOINTS.MEDIA,
      mediaIds,
      "id,source_url,alt_text"
    ),
    fetchByIds<WPCategoryItem>(
      source.taxonomyEndpoint,
      catIds,
      "id,name,slug"
    ),
  ]);

  for (const item of items) {
    item._media =
      item.featured_media > 0 ? mediaMap.get(item.featured_media) : undefined;
    const primaryId = taxonomyIds(item, source.taxonomyFieldOnItem)[0];
    item._primaryCategory = primaryId ? catMap.get(primaryId) : undefined;
  }

  return items;
}

function buildListParams(
  source: ContentSource,
  opts?: {
    page?: number;
    perPage?: number;
    categoryId?: number | string;
    search?: string;
  }
): URLSearchParams {
  const params = new URLSearchParams({
    page: String(opts?.page ?? 1),
    per_page: String(opts?.perPage ?? 9),
    _fields: source.listFields,
    orderby: "date",
    order: "desc",
  });

  if (source.includeScf) {
    params.set("scf_format", WP_QUERY.SCF_FORMAT);
  }

  if (opts?.categoryId) {
    params.set(source.taxonomyQueryParam, String(opts.categoryId));
  }

  const search = opts?.search?.trim();
  if (search) {
    params.set("search", search);
  }

  return params;
}

export const fetchContentItems = cache(
  async (
    source: ContentSource,
    opts?: {
      page?: number;
      perPage?: number;
      categoryId?: number | string;
      search?: string;
    }
  ): Promise<WPContentPage> => {
    const page = opts?.page ?? 1;
    const url = `${source.postsEndpoint}?${buildListParams(source, opts).toString()}`;

    try {
      const res = await wpFetch(url, {
        next: { revalidate: REVALIDATE_TIME.POSTS },
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        console.warn(
          `[fetchContentItems] ${res.status} for ${source.label} page=${page}`
        );
        return { items: [], total: 0, totalPages: 0, available: false };
      }

      const items = (await res.json()) as WPContentItem[];
      const total = Number(res.headers.get("X-WP-Total") ?? items.length);
      const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);

      return {
        items: await enrichContentItems(items, source),
        total,
        totalPages,
        available: true,
      };
    } catch (err) {
      console.error(`[fetchContentItems] Failed for ${source.label}`, err);
      return { items: [], total: 0, totalPages: 0, available: false };
    }
  }
);

export const fetchContentCategories = cache(
  async (source: ContentSource): Promise<WPCategory[]> => {
    const params = new URLSearchParams({
      per_page: "100",
      _fields: "id,name,slug,count,parent",
      orderby: "name",
      order: "asc",
      hide_empty: "true",
    });
    const url = `${source.taxonomyEndpoint}?${params.toString()}`;

    try {
      const res = await wpFetch(url, {
        next: { revalidate: REVALIDATE_TIME.POSTS },
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return [];
      const cats = (await res.json()) as WPCategory[];
      return cats.filter((c) => c.count > 0);
    } catch (err) {
      console.error(`[fetchContentCategories] Failed for ${source.label}`, err);
      return [];
    }
  }
);

export const fetchContentBySlug = cache(
  async (
    source: ContentSource,
    slug: string
  ): Promise<WPContentItem | null> => {
    const params = new URLSearchParams({
      slug,
      _fields: source.detailFields,
    });
    if (source.includeScf) {
      params.set("scf_format", WP_QUERY.SCF_FORMAT);
    }

    const url = `${source.postsEndpoint}?${params.toString()}`;

    try {
      const res = await wpFetch(url, {
        next: { revalidate: REVALIDATE_TIME.POSTS },
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return null;

      const items = (await res.json()) as WPContentItem[];
      if (items.length === 0) return null;

      const [item] = await enrichContentItems(items, source);
      return item;
    } catch (err) {
      console.error(
        `[fetchContentBySlug] Failed for ${source.label} slug="${slug}"`,
        err
      );
      return null;
    }
  }
);

function excerptToDescription(
  excerpt: { rendered?: string } | undefined,
  fallback: string
): string {
  const text = stripHtml(decodeEntities(excerpt?.rendered ?? "")).trim();
  return text || fallback;
}

function toContentMeta(
  item: WPContentItem,
  descriptionFallback: string
): ContentMeta {
  const title = decodeEntities(item.title?.rendered ?? "");
  const yoast = (item.yoast_head_json ?? null) as YoastHeadJson | null;

  return {
    title,
    description:
      yoast?.description?.trim() ||
      excerptToDescription(item.excerpt, descriptionFallback),
    yoast,
    seo: item.seo ?? null,
    modified: item.modified_gmt,
  };
}

/**
 * Fetch Yoast/SEO metadata for a post or custom post type item by slug.
 * Used by generateMetadata() on blog and press detail routes.
 */
export const fetchContentMeta = cache(
  async (
    source: ContentSource,
    slug: string,
    descriptionFallback: string
  ): Promise<ContentMeta | null> => {
    const params = new URLSearchParams({
      slug,
      _fields: source.metaFields,
    });

    const url = `${source.postsEndpoint}?${params.toString()}`;

    try {
      const res = await wpFetch(url, {
        next: { revalidate: REVALIDATE_TIME.POSTS },
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return null;

      const items = (await res.json()) as WPContentItem[];
      if (items.length === 0) return null;

      return toContentMeta(items[0], descriptionFallback);
    } catch (err) {
      console.error(
        `[fetchContentMeta] Failed for ${source.label} slug="${slug}"`,
        err
      );
      return null;
    }
  }
);

/** Related blog posts via YARPP (posts only). */
export const fetchRelatedPosts = cache(
  async (postId: number, limit = 3): Promise<WPContentItem[]> => {
    if (!postId) return [];
    const url = `${WP_YARPP_API_BASE}/related/${postId}`;

    try {
      const res = await wpFetch(url, {
        next: { revalidate: REVALIDATE_TIME.POSTS },
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return [];

      const posts = (await res.json()) as WPContentItem[];
      if (!Array.isArray(posts)) return [];

      return enrichContentItems(posts.slice(0, limit), BLOG_CONTENT_SOURCE);
    } catch (err) {
      console.error(`[fetchRelatedPosts] Failed for id=${postId}`, err);
      return [];
    }
  }
);

/** Related press articles in the same press category (excludes current item). */
export const fetchRelatedPressArticles = cache(
  async (
    source: ContentSource,
    articleId: number,
    categoryId?: number,
    limit = 3
  ): Promise<WPContentItem[]> => {
    if (!categoryId) return [];

    const params = buildListParams(source, {
      perPage: limit + 1,
      categoryId,
    });
    params.set("exclude", String(articleId));

    const url = `${source.postsEndpoint}?${params.toString()}`;

    try {
      const res = await wpFetch(url, {
        next: { revalidate: REVALIDATE_TIME.POSTS },
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return [];

      const items = (await res.json()) as WPContentItem[];
      return enrichContentItems(items.slice(0, limit), source);
    } catch (err) {
      console.error(
        `[fetchRelatedPressArticles] Failed for id=${articleId}`,
        err
      );
      return [];
    }
  }
);

export function embeddedFeaturedImage(
  item: WPContentItem
): { src: string; alt: string } {
  return {
    src: item._media?.source_url ?? "",
    alt: item._media?.alt_text ?? "",
  };
}

export function embeddedPrimaryCategory(
  item: WPContentItem
): { name: string; slug: string } {
  return {
    name: item._primaryCategory?.name ?? "",
    slug: item._primaryCategory?.slug ?? "",
  };
}
