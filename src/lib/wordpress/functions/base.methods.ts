import { cache } from "react";
import { WP_CONFIG } from "@/config/wordpress.config";
import { wpFetch } from "@/lib/wordpress/wpFetch";
import { PAGE_REVALIDATE, REVALIDATE_TIME } from "@/constants/wp.constants";
import { decodeEntities } from "@/lib/parsers/acf.parser";
import type {
  WPApiResponse,
  WPPage,
  YoastHeadJson,
} from "@/types/wordpress.types";

/**
 * Core WordPress fetch helpers for Yuva
 * ---------------------------------------------------------------------------
 * Wrapped with `React.cache` so that the page component, generateMetadata(),
 * and any service-layer function called during the same request all share one
 * in-flight network call.
 */

export const fetchWPPage = cache(
  async <TScf = Record<string, unknown>>(
    slug: string
  ): Promise<WPApiResponse<WPPage<TScf>>> => {
    const revalidate = PAGE_REVALIDATE[slug] ?? REVALIDATE_TIME.PAGES;
    const url =
      `${WP_CONFIG.endpoints.pages}?slug=${encodeURIComponent(slug)}` +
      `&scf_format=${WP_CONFIG.query.scfFormat}` +
      `&_fields=${WP_CONFIG.query.pageFields}`;

    console.log(`[fetchWPPage] GET ${url} (revalidate ${revalidate}s)`);

    try {
      const res = await wpFetch(url, {
        next: { revalidate },
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        return {
          data: null,
          error: `WordPress API returned ${res.status}`,
          status: res.status,
        };
      }

      const pages: WPPage<TScf>[] = await res.json();

      if (!pages || pages.length === 0) {
        return { data: null, error: `Page not found: ${slug}`, status: 404 };
      }

      return { data: pages[0], error: null, status: 200 };
    } catch (err) {
      console.error(`[fetchWPPage] Failed for slug="${slug}"`, err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "Unknown fetch error",
        status: 500,
      };
    }
  }
);

/** True when a value is a bare WordPress attachment id (e.g. "1258"). */
export const isAttachmentId = (value: string | number | null | undefined): boolean =>
  value !== null && value !== undefined && /^\d+$/.test(String(value).trim());

/**
 * Resolve a WordPress media attachment id to its real file URL.
 */
export const fetchMediaUrl = cache(
  async (id: string | number): Promise<string> => {
    const mediaId = String(id).trim();
    if (!/^\d+$/.test(mediaId)) return "";

    const revalidate = REVALIDATE_TIME.PAGES;
    const url = `${WP_CONFIG.endpoints.media}/${mediaId}?_fields=source_url`;

    try {
      const res = await wpFetch(url, {
        next: { revalidate },
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return "";
      const media = (await res.json()) as { source_url?: string };
      return typeof media?.source_url === "string" ? media.source_url : "";
    } catch (err) {
      console.error(`[fetchMediaUrl] Failed for id="${mediaId}"`, err);
      return "";
    }
  }
);

/**
 * If `value` is a bare attachment id, resolve it to a media URL; otherwise
 * return it untouched.
 */
export const resolveMediaId = async (value: string): Promise<string> => {
  if (!isAttachmentId(value)) return value;
  const resolved = await fetchMediaUrl(value);
  return resolved || value;
};

export const fetchPageMeta = cache(async (slug: string) => {
  const response = await fetchWPPage(slug);
  if (!response.data) return null;

  return {
    title: decodeEntities(response.data.title?.rendered ?? ""),
    yoast: (response.data.yoast_head_json ?? null) as YoastHeadJson | null,
    seo: response.data.seo ?? null,
    modified: response.data.modified_gmt,
  };
});
