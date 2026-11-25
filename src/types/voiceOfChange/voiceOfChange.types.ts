import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface VocHeroSectionScf {
  eyebrow?: string;
  title1?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  cta_text?: string;
  ctaText?: string;
  cta_link?: string;
  ctaLink?: string;
  img?: WPMedia | string | false;
}

export interface VocStoryItemScf {
  img?: WPMedia | string | false;
  category?: string;
  date?: string;
  title?: string;
  body?: string;
  href?: string;
}

export interface VocStoriesSectionScf {
  stories?: VocStoryItemScf[] | false;
}

export interface VocCtaBannerSectionScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  cta1_text?: string;
  cta1Text?: string;
  cta1_link?: string;
  cta1Link?: string;
  cta2_text?: string;
  cta2Text?: string;
  cta2_link?: string;
  cta2Link?: string;
}

export interface VocPageScf {
  hero_section?: VocHeroSectionScf;
  heroSection?: VocHeroSectionScf;
  stories_section?: VocStoriesSectionScf;
  storiesSection?: VocStoriesSectionScf;
  cta_banner_section?: VocCtaBannerSectionScf;
  ctaBannerSection?: VocCtaBannerSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface VocHeroCta {
  text: string;
  href: string;
}

export interface VocHeroSectionType {
  eyebrow: string;
  title1: string;
  highlightedTitle: string;
  body: string;
  cta: VocHeroCta;
  img: MediaAsset;
}

export type VocStoryCategory = "EDUCATION" | "HEALTH" | "COMMUNITY" | "INFRASTRUCTURE";

export interface VocStoryItemType {
  img: MediaAsset;
  category: VocStoryCategory;
  date: string;
  title: string;
  body: string;
  href: string;
}

export interface VocStoriesSectionType {
  stories: VocStoryItemType[];
}

export interface VocCtaBannerCta {
  text: string;
  href: string;
}

export interface VocCtaBannerSectionType {
  eyebrow: string;
  title: string;
  body: string;
  cta1: VocCtaBannerCta;
  cta2: VocCtaBannerCta;
}

export interface VocPageData {
  hero: VocHeroSectionType;
  storiesSection: VocStoriesSectionType;
  ctaBanner: VocCtaBannerSectionType;
}
