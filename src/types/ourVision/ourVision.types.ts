import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import type { LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface OurVisionHeroSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  img?: WPMedia | string | false;
}

export interface OurVisionPillarScf {
  id?: string | number;
  title?: string;
  body?: string;
}

export interface OurVisionSectionScf {
  heading?: string;
  title?: string;
  body?: string[] | string | false;
  pillars?: OurVisionPillarScf[] | false;
}

export interface OurVisionAmbitionItemScf {
  title?: string;
  sub_title?: string;
  subTitle?: string;
  body?: string;
}

export interface OurVisionAmbitionSectionScf {
  heading?: string;
  title?: string;
  body?: string[] | string | false;
  ambitions?: OurVisionAmbitionItemScf[] | false;
  img?: WPMedia | string | false;
  img_text?: string;
  imgText?: string;
  href?: string;
}

export interface OurVisionPageScf {
  hero_section?: OurVisionHeroSectionScf;
  heroSection?: OurVisionHeroSectionScf;
  our_vision_section?: OurVisionSectionScf;
  ourVisionSection?: OurVisionSectionScf;
  ambition_section?: OurVisionAmbitionSectionScf;
  ambitionSection?: OurVisionAmbitionSectionScf;
  large_banner_section?: LargeBannerSectionScf;
  largeBannerSection?: LargeBannerSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface OurVisionHeroSectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  body: string;
  img: MediaAsset;
}

export interface OurVisionPillarType {
  id: number;
  title: string;
  body: string;
}

export interface OurVisionSectionType {
  heading: string;
  title: string;
  body: string[];
  pillars: OurVisionPillarType[];
}

export interface OurVisionAmbitionItemType {
  title: string;
  subTitle: string;
  body: string;
}

export interface OurVisionAmbitionSectionType {
  heading: string;
  title: string;
  body: string[];
  ambitions: OurVisionAmbitionItemType[];
  img: MediaAsset;
  imgText: string;
  href: string;
}

export interface OurVisionPageData {
  hero: OurVisionHeroSectionType;
  ourVision: OurVisionSectionType;
  ambition: OurVisionAmbitionSectionType;
  largeBanner: LargeBannerSectionType;
}
