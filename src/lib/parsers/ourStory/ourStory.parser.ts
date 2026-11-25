import type {
  OurStoryPageScf,
  OurStoryHeroSectionScf,
  OurStoryContentSectionScf,
  OurStoryContentBlockScf,
  OurStoryQuoteSectionScf,
  OurStoryApproachSectionScf,
  OurStoryApproachItemScf,
  OurStoryTimelineSectionScf,
  OurStoryTimelineEntryScf,
  OurStoryPageData,
  OurStoryHeroSectionType,
  OurStoryContentSectionType,
  OurStoryContentBlockType,
  OurStoryQuoteSectionType,
  OurStoryApproachSectionType,
  OurStoryApproachItemType,
  OurStoryTimelineSectionType,
  OurStoryTimelineEntryType,
} from "@/types/ourStory/ourStory.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import { parseText, parseCta, parseRepeater } from "@/lib/parsers/acf.parser";
import { ourStoryHeroFallback } from "@/data/ourStory/ourStoryHero.data";
import { ourStoryContentFallback } from "@/data/ourStory/ourStoryContent.data";
import { ourStoryQuoteFallback } from "@/data/ourStory/ourStoryQuote.data";
import { ourStoryApproachFallback } from "@/data/ourStory/ourStoryApproach.data";
import { ourStoryTimelineFallback } from "@/data/ourStory/ourStoryTimeline.data";

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

function parseOurStoryHero(
  group: OurStoryHeroSectionScf | undefined
): OurStoryHeroSectionType {
  return {
    eyebrow: parseText(group?.eyebrow, ourStoryHeroFallback.eyebrow),
    title1: parseText(group?.title1, ourStoryHeroFallback.title1),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      ourStoryHeroFallback.highlightedTitle
    ),
    body: parseText(group?.body, ourStoryHeroFallback.body),
    cta1: parseCta(
      group?.cta1_text ?? group?.cta1Text,
      group?.cta1_link ?? group?.cta1Link,
      ourStoryHeroFallback.cta1
    ),
    cta2: parseCta(
      group?.cta2_text ?? group?.cta2Text,
      group?.cta2_link ?? group?.cta2Link,
      ourStoryHeroFallback.cta2
    ),
    img: toMedia(group?.img, ourStoryHeroFallback.img),
  };
}

function parseContentBlock(
  row: OurStoryContentBlockScf,
  fallback: OurStoryContentBlockType
): OurStoryContentBlockType {
  const rawBody = parseText(row?.body, "");
  const paragraphs = rawBody.length > 0
    ? rawBody.split("\n\n").map((p) => p.trim()).filter(Boolean)
    : fallback.paragraphs;

  return {
    eyebrow: parseText(row?.eyebrow, fallback.eyebrow),
    title: parseText(row?.title, fallback.title),
    paragraphs,
    // Quote box is optional & per-block. A blank value from the server means
    // "no quote" — do NOT fall back to the static quote (that only applies when
    // the whole page is unreachable, which the service handles separately).
    quote: parseText(row?.quote) || undefined,
    quoteHighlight: parseText(row?.quote_highlight ?? row?.quoteHighlight) || undefined,
    badge: {
      label: parseText(row?.badge_label ?? row?.badgeLabel, fallback.badge.label),
      detail: parseText(row?.badge_detail ?? row?.badgeDetail, fallback.badge.detail),
    },
    img: toMedia(row?.img, fallback.img),
  };
}

function parseOurStoryContentSection(
  group: OurStoryContentSectionScf | undefined
): OurStoryContentSectionType {
  const rows = parseRepeater(group?.blocks);
  const blocks = rows.map((row: OurStoryContentBlockScf, index: number) => {
    const fallback =
      ourStoryContentFallback.blocks[index] ?? ourStoryContentFallback.blocks[0];
    return parseContentBlock(row, fallback);
  });
  return { blocks: blocks.length > 0 ? blocks : ourStoryContentFallback.blocks };
}

function parseOurStoryQuoteSection(
  group: OurStoryQuoteSectionScf | undefined
): OurStoryQuoteSectionType {
  return {
    quote: parseText(group?.quote, ourStoryQuoteFallback.quote),
    quoteHighlight:
      parseText(
        group?.quote_highlight ?? group?.quoteHighlight,
        ourStoryQuoteFallback.quoteHighlight ?? ""
      ) || undefined,
    attribution:
      parseText(group?.attribution, ourStoryQuoteFallback.attribution ?? "") || undefined,
  };
}

function parseApproachItem(
  row: OurStoryApproachItemScf,
  fallback: OurStoryApproachItemType
): OurStoryApproachItemType {
  return {
    title: parseText(row?.title, fallback.title),
    body: parseText(row?.body, fallback.body),
  };
}

function parseOurStoryApproachSection(
  group: OurStoryApproachSectionScf | undefined
): OurStoryApproachSectionType {
  const rows = parseRepeater(group?.items);
  const items = rows.map((row: OurStoryApproachItemScf, index: number) => {
    const fallback =
      ourStoryApproachFallback.items[index] ?? ourStoryApproachFallback.items[0];
    return parseApproachItem(row, fallback);
  });
  return {
    eyebrow: parseText(group?.eyebrow, ourStoryApproachFallback.eyebrow),
    title: parseText(group?.title, ourStoryApproachFallback.title),
    body: parseText(group?.body, ourStoryApproachFallback.body),
    items: items.length > 0 ? items : ourStoryApproachFallback.items,
    img: toMedia(group?.img, ourStoryApproachFallback.img),
  };
}

function parseTimelineEntry(
  row: OurStoryTimelineEntryScf,
  fallback: OurStoryTimelineEntryType
): OurStoryTimelineEntryType {
  return {
    year: parseText(row?.year, fallback.year),
    eyebrow: parseText(row?.eyebrow, fallback.eyebrow),
    title: parseText(row?.title, fallback.title),
    body: parseText(row?.body, fallback.body),
    tag: parseText(row?.tag, fallback.tag ?? "") || undefined,
    img: toMedia(row?.img, fallback.img),
  };
}

function parseOurStoryTimelineSection(
  group: OurStoryTimelineSectionScf | undefined
): OurStoryTimelineSectionType {
  const rows = parseRepeater(group?.entries);
  const entries = rows.map((row: OurStoryTimelineEntryScf, index: number) => {
    const fallback =
      ourStoryTimelineFallback.entries[index] ?? ourStoryTimelineFallback.entries[0];
    return parseTimelineEntry(row, fallback);
  });
  return {
    eyebrow: parseText(group?.eyebrow, ourStoryTimelineFallback.eyebrow),
    title: parseText(group?.title, ourStoryTimelineFallback.title),
    entries: entries.length > 0 ? entries : ourStoryTimelineFallback.entries,
  };
}

export function parseOurStoryPage(scf: OurStoryPageScf | undefined): OurStoryPageData {
  return {
    hero: parseOurStoryHero(scf?.hero_section ?? scf?.heroSection),
    contentSection: parseOurStoryContentSection(scf?.content_section ?? scf?.contentSection),
    quoteSection: parseOurStoryQuoteSection(scf?.quote_section ?? scf?.quoteSection),
    approachSection: parseOurStoryApproachSection(scf?.approach_section ?? scf?.approachSection),
    timelineSection: parseOurStoryTimelineSection(scf?.timeline_section ?? scf?.timelineSection),
  };
}
