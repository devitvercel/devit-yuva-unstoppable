import type {
  VocPageScf,
  VocHeroSectionScf,
  VocStoriesSectionScf,
  VocCtaBannerSectionScf,
  VocPageData,
  VocHeroSectionType,
  VocStoriesSectionType,
  VocCtaBannerSectionType,
  VocStoryCategory,
} from "@/types/voiceOfChange/voiceOfChange.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import { parseText, parseCta, parseRepeater } from "@/lib/parsers/acf.parser";
import { vocHeroFallback } from "@/data/voiceOfChange/vocHero.data";
import { vocStoriesFallback } from "@/data/voiceOfChange/vocStories.data";
import { vocCtaBannerFallback } from "@/data/voiceOfChange/vocCtaBanner.data";

const EMPTY_MEDIA: MediaAsset = { src: "", alt: "media" };

const VALID_CATEGORIES = new Set<VocStoryCategory>([
  "EDUCATION",
  "HEALTH",
  "COMMUNITY",
  "INFRASTRUCTURE",
]);

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

function parseVocHero(group: VocHeroSectionScf | undefined): VocHeroSectionType {
  return {
    eyebrow: parseText(group?.eyebrow, vocHeroFallback.eyebrow),
    title1: parseText(group?.title1, vocHeroFallback.title1),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      vocHeroFallback.highlightedTitle
    ),
    body: parseText(group?.body, vocHeroFallback.body),
    cta: parseCta(
      group?.cta_text ?? group?.ctaText,
      group?.cta_link ?? group?.ctaLink,
      vocHeroFallback.cta
    ),
    img: toMedia(group?.img, vocHeroFallback.img),
  };
}

function parseVocStories(group: VocStoriesSectionScf | undefined): VocStoriesSectionType {
  const stories = parseRepeater(group?.stories).map((row: any, index: number) => {
    const fallbackItem = vocStoriesFallback.stories[index] ?? vocStoriesFallback.stories[0];
    const rawCategory = parseText(row?.category, "").toUpperCase() as VocStoryCategory;
    return {
      img: toMedia(row?.img, fallbackItem.img),
      category: VALID_CATEGORIES.has(rawCategory) ? rawCategory : fallbackItem.category,
      date: parseText(row?.date, fallbackItem.date),
      title: parseText(row?.title, fallbackItem.title),
      body: parseText(row?.body, fallbackItem.body),
      href: parseText(row?.href, fallbackItem.href),
    };
  });

  return {
    stories: stories.length > 0 ? stories : vocStoriesFallback.stories,
  };
}

function parseVocCtaBanner(group: VocCtaBannerSectionScf | undefined): VocCtaBannerSectionType {
  return {
    eyebrow: parseText(group?.eyebrow, vocCtaBannerFallback.eyebrow),
    title: parseText(group?.title, vocCtaBannerFallback.title),
    body: parseText(group?.body, vocCtaBannerFallback.body),
    cta1: parseCta(
      group?.cta1_text ?? group?.cta1Text,
      group?.cta1_link ?? group?.cta1Link,
      vocCtaBannerFallback.cta1
    ),
    cta2: parseCta(
      group?.cta2_text ?? group?.cta2Text,
      group?.cta2_link ?? group?.cta2Link,
      vocCtaBannerFallback.cta2
    ),
  };
}

export function parseVocPage(scf: VocPageScf | undefined): VocPageData {
  return {
    hero: parseVocHero(scf?.hero_section ?? scf?.heroSection),
    storiesSection: parseVocStories(scf?.stories_section ?? scf?.storiesSection),
    ctaBanner: parseVocCtaBanner(scf?.cta_banner_section ?? scf?.ctaBannerSection),
  };
}
