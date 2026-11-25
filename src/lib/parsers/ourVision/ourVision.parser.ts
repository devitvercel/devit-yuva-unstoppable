import type {
  OurVisionPageScf,
  OurVisionHeroSectionScf,
  OurVisionHeroSectionType,
  OurVisionSectionScf,
  OurVisionSectionType,
  OurVisionPillarType,
  OurVisionAmbitionSectionScf,
  OurVisionAmbitionSectionType,
  OurVisionAmbitionItemType,
  OurVisionPageData,
} from "@/types/ourVision/ourVision.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import type { LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";
import { parseText, parseRepeater, parseCta } from "@/lib/parsers/acf.parser";
import { heroDataFallback } from "@/data/ourVision/hero.data";
import { ourVisionDataFallback } from "@/data/ourVision/ourVision.data";
import { ambitionDataFallback } from "@/data/ourVision/ambition.data";
import { LargeBannerDataFallback } from "@/data/ourVision/largeBanner.data";

const EMPTY_MEDIA: MediaAsset = { src: "", alt: "media" };

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

function parseHero(group: OurVisionHeroSectionScf | undefined): OurVisionHeroSectionType {
  return {
    heading: parseText(group?.heading, heroDataFallback.heading),
    title: parseText(group?.title, heroDataFallback.title),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      heroDataFallback.highlightedTitle
    ),
    body: parseText(group?.body, heroDataFallback.body),
    img: toMedia(group?.img, heroDataFallback.img),
  };
}

function parseBody(value: unknown, fallback: string[]): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (item && typeof item === "object") {
          return parseText(item.paragraph ?? item.text ?? Object.values(item)[0]);
        }
        return "";
      })
      .filter(Boolean);
  }
  if (typeof value === "string" && value.trim().length > 0) {
    return value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return fallback;
}

function parsePillars(value: unknown, fallback: OurVisionPillarType[]): OurVisionPillarType[] {
  const items = parseRepeater(value as any[]);
  const parsed = items
    .map((row: any, index: number) => {
      const fallbackItem = fallback[index] ?? fallback[0];
      return {
        id: index + 1,
        title: parseText(row?.title, fallbackItem?.title),
        body: parseText(row?.body, fallbackItem?.body),
      };
    })
    .filter((p) => p.title || p.body);

  return parsed.length > 0 ? parsed : fallback;
}

function parseOurVisionSection(group: OurVisionSectionScf | undefined): OurVisionSectionType {
  return {
    heading: parseText(group?.heading, ourVisionDataFallback.heading),
    title: parseText(group?.title, ourVisionDataFallback.title),
    body: parseBody(group?.body, ourVisionDataFallback.body),
    pillars: parsePillars(group?.pillars, ourVisionDataFallback.pillars),
  };
}

function parseAmbitions(value: unknown, fallback: OurVisionAmbitionItemType[]): OurVisionAmbitionItemType[] {
  const items = parseRepeater(value as any[]);
  const parsed = items
    .map((row: any, index: number) => {
      const fallbackItem = fallback[index] ?? fallback[0];
      return {
        title: parseText(row?.title, fallbackItem?.title),
        subTitle: parseText(row?.sub_title ?? row?.subTitle, fallbackItem?.subTitle),
        body: parseText(row?.body, fallbackItem?.body),
      };
    })
    .filter((a) => a.title || a.subTitle || a.body);

  return parsed.length > 0 ? parsed : fallback;
}

function parseAmbitionSection(group: OurVisionAmbitionSectionScf | undefined): OurVisionAmbitionSectionType {
  return {
    heading: parseText(group?.heading, ambitionDataFallback.heading),
    title: parseText(group?.title, ambitionDataFallback.title),
    body: parseBody(group?.body, ambitionDataFallback.body),
    ambitions: parseAmbitions(group?.ambitions, ambitionDataFallback.ambitions),
    img: toMedia(group?.img, ambitionDataFallback.img),
    imgText: parseText(group?.img_text ?? group?.imgText, ambitionDataFallback.imgText),
    href: parseText(group?.href, ambitionDataFallback.href),
  };
}

function parseLargeBanner(group: LargeBannerSectionScf | undefined): LargeBannerSectionType {
  return {
    eyebrow: parseText(group?.eyebrow, LargeBannerDataFallback.eyebrow),
    title: parseText(group?.title, LargeBannerDataFallback.title),
    body: parseText(group?.body, LargeBannerDataFallback.body),
    cta1: parseCta(
      group?.cta1_text ?? group?.cta1Text,
      group?.cta1_link ?? group?.cta1Link,
      LargeBannerDataFallback.cta1
    ),
    cta2: parseCta(
      group?.cta2_text ?? group?.cta2Text,
      group?.cta2_link ?? group?.cta2Link,
      LargeBannerDataFallback.cta2
    ),
  };
}

export function parseOurVisionPage(scf: OurVisionPageScf | undefined): OurVisionPageData {
  return {
    hero: parseHero(scf?.hero_section ?? scf?.heroSection),
    ourVision: parseOurVisionSection(scf?.our_vision_section ?? scf?.ourVisionSection),
    ambition: parseAmbitionSection(scf?.ambition_section ?? scf?.ambitionSection),
    largeBanner: parseLargeBanner(scf?.large_banner_section ?? scf?.largeBannerSection),
  };
}
