import type {
  IndividualPressContentSection,
  IndividualPressHeroSection,
  IndividualPressPageData,
  RelatedBlogsSectionType,
} from "@/types/individualPress/individualPress.types";
import type { LargeBannerSectionType } from "@/types/home/home.types";
import { decodeEntities, stripHtml } from "@/lib/parsers/acf.parser";
import { cleanWpContentHtml } from "@/lib/html/cleanWpContentHtml";
import { embedYouTubeInHtml } from "@/lib/html/embedYouTubeInHtml";
import { pressHeroDataFallback, PRESS_HERO_FALLBACK_IMG } from "@/data/individualPress/hero.data";
import { pressContentFallback } from "@/data/individualPress/content.data";
import { relatedBlogsDataFallback } from "@/data/individualPress/relatedBlogs.data";
import { pressLargeBannerDataFallback } from "@/data/individualPress/largeBanner.data";

/** "2026-03-20T00:00:00" → "20 MAR 2026" */
export function formatPressHeroDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

/**
 * Build the Individual Press view-model from a WordPress POST.
 * Hero + content come from the post; related blogs and large banner use
 * service-provided / static fallbacks.
 */
export function parseIndividualPressFromPost(
  post: {
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
    content?: { rendered?: string };
    date?: string;
    category?: { name?: string };
    tag?: string;
    featuredImage?: { src: string; alt: string };
  },
  relatedBlogs: RelatedBlogsSectionType = relatedBlogsDataFallback,
  largeBanner: LargeBannerSectionType = pressLargeBannerDataFallback
): IndividualPressPageData {
  const title = decodeEntities(post.title?.rendered ?? "");
  const tag =
    post.tag?.toUpperCase() ||
    decodeEntities(post.category?.name ?? "").toUpperCase() ||
    pressHeroDataFallback.tag;

  const hero: IndividualPressHeroSection = {
    tag,
    title: title || pressHeroDataFallback.title,
    body: stripHtml(post.excerpt?.rendered ?? "") || pressHeroDataFallback.body,
    date: post.date
      ? formatPressHeroDate(post.date)
      : pressHeroDataFallback.date,
    img: post.featuredImage?.src
      ? {
          src: post.featuredImage.src,
          alt: post.featuredImage.alt || title || PRESS_HERO_FALLBACK_IMG.alt,
        }
      : pressHeroDataFallback.img,
  };

  const content: IndividualPressContentSection = {
    content: {
      rendered: embedYouTubeInHtml(
        cleanWpContentHtml(
          post.content?.rendered || pressContentFallback.content.rendered
        )
      ),
    },
  };

  return {
    hero,
    content,
    relatedBlogs,
    largeBanner,
  };
}
