import type {
  IndividualBlogContentSection,
  IndividualBlogHeroScf,
  IndividualBlogHeroSection,
  IndividualBlogPageData,
  IndividualBlogScf,
  InitiativesSectionScf,
  InitiativesSectionType,
} from "@/types/individualBlog/individualBlog.types";
import type { LargeBannerSectionType } from "@/types/home/home.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import { decodeEntities, parseCta, parseRepeater, parseText, stripHtml } from "@/lib/parsers/acf.parser";
import { embedYouTubeInHtml } from "@/lib/html/embedYouTubeInHtml";
import { cleanWpContentHtml } from "@/lib/html/cleanWpContentHtml";
import { heroDataFallback } from "@/data/individualBlog/hero.data";
import { contentFallback } from "@/data/individualBlog/content.data";
import { largeBannerDataFallback } from "@/data/individualBlog/largeBanner.data";
import { initiativesDataFallback } from "@/data/individualBlog/initiatives.data";

const EMPTY_MEDIA: MediaAsset = { src: "", alt: "media" };

/**
 * Image helper — resolves a WPMedia object or plain URL string to MediaAsset.
 */
function toMedia(
  src: WPMedia | string | false | null | undefined,
  fallback: MediaAsset = EMPTY_MEDIA
): MediaAsset {
  if (typeof src === "string") {
    return src.length > 0 ? { src, alt: fallback.alt } : fallback;
  }
  const url = src ? src.url || "" : "";
  if (url.length === 0) return fallback;
  return { src: url, alt: (src && src.alt) || fallback.alt };
}

/**
 * Maps the hero section fields from the raw SCF payload.
 */
function parseHero(group: IndividualBlogHeroScf | undefined): IndividualBlogHeroSection {
  const fb = heroDataFallback;

  return {
    heading: parseText(group?.heading, fb.heading),
    title: parseText(group?.title, fb.title),
    highlightedTitle: parseText(group?.highlighted_title, fb.highlightedTitle),
    body: parseText(group?.body, fb.body),
  };
}

/**
 * Maps the page content from the raw WP page object.
 */
function parseContent(wpContent: { rendered?: string } | undefined): IndividualBlogContentSection {
  const fb = contentFallback;
  return {
    content: {
      rendered: embedYouTubeInHtml(
        cleanWpContentHtml(wpContent?.rendered || fb.content.rendered)
      ),
    },
  };
}

/**
 * Maps the large banner section fields from the raw SCF payload.
 */
function parseLargeBanner(group: any): LargeBannerSectionType {
  const fb = largeBannerDataFallback;
  return {
    eyebrow: parseText(group?.eyebrow, fb.eyebrow),
    title: parseText(group?.title, fb.title),
    body: parseText(group?.body, fb.body),
    cta1: parseCta(
      group?.cta1_text ?? group?.cta1Text,
      group?.cta1_link ?? group?.cta1Link,
      fb.cta1
    ),
    cta2: parseCta(
      group?.cta2_text ?? group?.cta2Text,
      group?.cta2_link ?? group?.cta2Link,
      fb.cta2
    ),
  };
}

/**
 * Maps the initiatives section fields from the raw SCF payload.
 */
function parseInitiatives(group: InitiativesSectionScf | undefined): InitiativesSectionType {
  const fb = initiativesDataFallback;
  const cards = parseRepeater(group?.cards)
    .map((row: any, index: number) => {
      const fallbackItem = fb.cards[index] ?? fb.cards[0];
      return {
        img: toMedia(row?.img, fallbackItem.img),
        date: parseText(row?.date, fallbackItem.date),
        title: parseText(row?.title, fallbackItem.title),
        body: parseText(row?.body, fallbackItem.body),
        link: parseCta(row?.link_text, row?.link_url, fallbackItem.link),
      };
    });

  return {
    title: parseText(group?.title, fb.title),
    highlightedTitle: parseText(group?.highlighted_title, fb.highlightedTitle),
    cards: cards.length > 0 ? cards : fb.cards,
  };
}

/**
 * Main entry point to build the Individual Blog page view-model from raw `scf` or `acf`.
 */
export function parseIndividualBlogPage(
  scf: IndividualBlogScf | undefined,
  wpContent?: { rendered?: string }
): IndividualBlogPageData {
  return {
    hero: parseHero(scf?.hero_section),
    content: parseContent(wpContent),
    largeBanner: parseLargeBanner(scf?.large_banner_section),
    initiatives: parseInitiatives(scf?.initiatives_section),
  };
}

/**
 * Build the Individual Blog view-model from a WordPress POST (blogs are posts).
 * The large banner keeps its static fallback. Hero + content come from the post.
 * The "Other Initiatives" section is populated with YARPP related posts (passed
 * in by the service); its heading copy stays from the static fallback.
 */
export function parseIndividualBlogFromPost(
  post: {
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
    content?: { rendered?: string };
    category?: { name?: string };
  },
  initiatives: InitiativesSectionType = initiativesDataFallback
): IndividualBlogPageData {
  const title = decodeEntities(post.title?.rendered ?? "");
  const category = decodeEntities(post.category?.name ?? "");

  return {
    hero: {
      heading: category || heroDataFallback.heading,
      title: title || heroDataFallback.title,
      // The post title is shown whole; no separate highlighted segment for posts.
      highlightedTitle: "",
      body: "", // Removed the excerpt to prevent redundant, truncated text (with '...') from showing above the full content.
    },
    content: {
      content: {
        rendered: embedYouTubeInHtml(
          cleanWpContentHtml(
            post.content?.rendered || contentFallback.content.rendered
          )
        ),
      },
    },
    largeBanner: largeBannerDataFallback,
    initiatives,
  };
}
