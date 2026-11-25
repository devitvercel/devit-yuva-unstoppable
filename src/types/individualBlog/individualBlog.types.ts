import type { LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";
import type { MediaAsset } from "@/types/global.types";
import type { WPMedia } from "@/types/wordpress.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface IndividualBlogHeroScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  body?: string;
}

export interface IndividualBlogTagsScf {
  tags?: string[];
}

export interface InitiativeCardScf {
  img?: WPMedia | string | false;
  date?: string;
  title?: string;
  body?: string;
  link_text?: string;
  link_url?: string;
}

export interface InitiativesSectionScf {
  title?: string;
  highlighted_title?: string;
  cards?: InitiativeCardScf[] | false;
}

export interface IndividualBlogScf {
  hero_section?: IndividualBlogHeroScf;
  tags_section?: IndividualBlogTagsScf;
  large_banner_section?: LargeBannerSectionScf;
  initiatives_section?: InitiativesSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface IndividualBlogHeroSection {
  heading: string;
  title: string;
  highlightedTitle: string;
  body: string;
}

export interface IndividualBlogContentSection {
  content: {
    rendered: string;
  };
}

export interface InitiativeCardType {
  img: MediaAsset;
  date: string;
  title: string;
  body: string;
  link: {
    text: string;
    href: string;
  };
}

export interface InitiativesSectionType {
  title: string;
  highlightedTitle: string;
  cards: InitiativeCardType[];
}

export interface IndividualBlogPageData {
  hero: IndividualBlogHeroSection;
  content: IndividualBlogContentSection;
  largeBanner: LargeBannerSectionType;
  initiatives: InitiativesSectionType;
}
