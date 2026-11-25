import { cache } from "react";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import { parseBlogTemplatePage } from "@/lib/parsers/programme/blogTemplate.parser";
import { COMMUNITY_RESPONSE_FALLBACK } from "@/data/programme/fallbacks/communityResponse.fallback";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import type { BlogTemplatePageData, BlogTemplateArticle } from "@/types/programme/blogTemplate.types";
import { fetchContentItems, embeddedFeaturedImage } from "@/lib/wordpress/functions/content.methods";
import { BLOG_CONTENT_SOURCE } from "@/constants/contentSource.constants";
import { decodeEntities, stripHtml } from "@/lib/parsers/acf.parser";
import { VOC_CARD_FALLBACK_IMG } from "@/data/voiceOfChange/vocStories.data";

/**
 * Loads the Community Response page (merged Emergency Response + Other Initiative).
 */
export const getCommunityResponsePageData = cache(
  async (): Promise<BlogTemplatePageData> => {
    const wpSlug = PAGE_SLUGS.COMMUNITY_RESPONSE;
    const response = await fetchWPPage<Record<string, unknown>>(wpSlug);

    let data: BlogTemplatePageData;
    if (!response.data) {
      console.warn(
        `[getCommunityResponsePageData] Falling back to static content — ${response.error}`
      );
      data = { ...COMMUNITY_RESPONSE_FALLBACK };
    } else {
      const rawScf = response.data.scf ?? response.data.acf;
      if (
        !rawScf ||
        (typeof rawScf === "object" && Object.keys(rawScf).length === 0) ||
        Array.isArray(rawScf)
      ) {
        console.warn(
          `[getCommunityResponsePageData] Empty SCF for slug "${wpSlug}" — using static fallback.`
        );
        data = { ...COMMUNITY_RESPONSE_FALLBACK };
      } else {
        data = parseBlogTemplatePage(rawScf, COMMUNITY_RESPONSE_FALLBACK);
      }
    }

    if (data.hero?.img?.src) {
      data.hero.img.src = await resolveMediaId(data.hero.img.src);
    }

    // Fetch dynamic blogs for "emergency-response" (7) and "other-initiatives" (8)
    try {
      const fetchedPosts = await fetchContentItems(BLOG_CONTENT_SOURCE, {
        perPage: 9,
        categoryId: "7,8",
      });

      if (fetchedPosts.items.length > 0) {
        const mappedArticles: BlogTemplateArticle[] = fetchedPosts.items.map((item) => {
          const img = embeddedFeaturedImage(item);
          const title = decodeEntities(item.title?.rendered ?? "");
          const d = new Date(item.date);
          const formattedDate = Number.isNaN(d.getTime())
            ? ""
            : d
                .toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .toUpperCase();

          return {
            title,
            date: formattedDate,
            body: stripHtml(item.excerpt?.rendered ?? ""),
            img: {
              src: img.src || VOC_CARD_FALLBACK_IMG.src,
              alt: img.alt || title || VOC_CARD_FALLBACK_IMG.alt,
            },
            href: `/blogs/${item.slug}`,
          };
        });

        data.articles = mappedArticles;
      } else if (data.articles?.length) {
        // Resolve images for fallback articles if dynamic fetch returns 0 items
        data.articles = await Promise.all(
          data.articles.map(async (art) => {
            if (art.img?.src) {
              return {
                ...art,
                img: { ...art.img, src: await resolveMediaId(art.img.src) },
              };
            }
            return art;
          })
        );
      }
    } catch (e) {
      console.error("[getCommunityResponsePageData] Failed to fetch dynamic blogs", e);
      if (data.articles?.length) {
        data.articles = await Promise.all(
          data.articles.map(async (art) => {
            if (art.img?.src) {
              return {
                ...art,
                img: { ...art.img, src: await resolveMediaId(art.img.src) },
              };
            }
            return art;
          })
        );
      }
    }

    return data;
  }
);
