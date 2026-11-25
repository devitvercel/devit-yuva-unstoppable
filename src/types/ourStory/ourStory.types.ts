import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface OurStoryHeroSectionScf {
  eyebrow?: string;
  title1?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  cta1_text?: string;
  cta1Text?: string;
  cta1_link?: string;
  cta1Link?: string;
  cta2_text?: string;
  cta2Text?: string;
  cta2_link?: string;
  cta2Link?: string;
  img?: WPMedia | string | false;
}

export interface OurStoryContentBlockScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  quote?: string;
  quote_highlight?: string;
  quoteHighlight?: string;
  badge_label?: string;
  badgeLabel?: string;
  badge_detail?: string;
  badgeDetail?: string;
  img?: WPMedia | string | false;
}

export interface OurStoryContentSectionScf {
  blocks?: OurStoryContentBlockScf[] | false;
}

export interface OurStoryQuoteSectionScf {
  quote?: string;
  quote_highlight?: string;
  quoteHighlight?: string;
  attribution?: string;
}

export interface OurStoryApproachItemScf {
  title?: string;
  body?: string;
}

export interface OurStoryApproachSectionScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  items?: OurStoryApproachItemScf[] | false;
  img?: WPMedia | string | false;
}

export interface OurStoryTimelineEntryScf {
  year?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  tag?: string;
  img?: WPMedia | string | false;
}

export interface OurStoryTimelineSectionScf {
  eyebrow?: string;
  title?: string;
  entries?: OurStoryTimelineEntryScf[] | false;
}

export interface OurStoryPageScf {
  hero_section?: OurStoryHeroSectionScf;
  heroSection?: OurStoryHeroSectionScf;
  content_section?: OurStoryContentSectionScf;
  contentSection?: OurStoryContentSectionScf;
  quote_section?: OurStoryQuoteSectionScf;
  quoteSection?: OurStoryQuoteSectionScf;
  approach_section?: OurStoryApproachSectionScf;
  approachSection?: OurStoryApproachSectionScf;
  timeline_section?: OurStoryTimelineSectionScf;
  timelineSection?: OurStoryTimelineSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface OurStoryHeroSectionCta {
  text: string;
  href: string;
}

export interface OurStoryHeroSectionType {
  eyebrow: string;
  title1: string;
  highlightedTitle: string;
  body: string;
  cta1: OurStoryHeroSectionCta;
  cta2: OurStoryHeroSectionCta;
  img: MediaAsset;
}

export interface OurStoryContentBadge {
  label: string;
  detail: string;
}

export interface OurStoryContentBlockType {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  quote?: string;
  quoteHighlight?: string;
  badge: OurStoryContentBadge;
  img: MediaAsset;
}

export interface OurStoryContentSectionType {
  blocks: OurStoryContentBlockType[];
}

export interface OurStoryQuoteSectionType {
  quote: string;
  quoteHighlight?: string;
  attribution?: string;
}

export interface OurStoryApproachItemType {
  title: string;
  body: string;
}

export interface OurStoryApproachSectionType {
  eyebrow: string;
  title: string;
  body: string;
  items: OurStoryApproachItemType[];
  img: MediaAsset;
}

export interface OurStoryTimelineEntryType {
  year: string;
  eyebrow: string;
  title: string;
  body: string;
  tag?: string;
  img: MediaAsset;
}

export interface OurStoryTimelineSectionType {
  eyebrow: string;
  title: string;
  entries: OurStoryTimelineEntryType[];
}

export interface OurStoryPageData {
  hero: OurStoryHeroSectionType;
  contentSection: OurStoryContentSectionType;
  quoteSection: OurStoryQuoteSectionType;
  approachSection: OurStoryApproachSectionType;
  timelineSection: OurStoryTimelineSectionType;
}
