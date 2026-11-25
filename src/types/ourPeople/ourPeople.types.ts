import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import type { LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface OurPeopleHeroSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  img?: WPMedia | string | false;
}

export interface OurPeopleLeaderScf {
  role?: string;
  name?: string;
  quote?: string;
  body?: string;
  href?: string;
  cta_text?: string;
  ctaText?: string;
  img?: WPMedia | string | false;
  badge?: string;
}

export interface OurPeopleLeadershipSectionScf {
  leaders?: OurPeopleLeaderScf[] | false;
}

export interface OurPeopleTeamCardScf {
  img?: WPMedia | string | false;
  name?: string;
  role?: string;
  since?: string;
  description?: string;
  body?: string;
  linkedin_href?: string;
  linkedinHref?: string;
}

export interface OurPeopleTeamSectionScf {
  heading?: string;
  title?: string;
  cards?: OurPeopleTeamCardScf[] | false;
}

export interface OurPeopleAdvisorCardScf {
  img?: WPMedia | string | false;
  name?: string;
  role?: string;
  description?: string;
  body?: string;
  linkedin_href?: string;
  linkedinHref?: string;
}

export interface OurPeopleAdvisorSectionScf {
  heading?: string;
  title?: string;
  advisors?: OurPeopleAdvisorCardScf[] | false;
}

export interface OurPeoplePageScf {
  hero_section?: OurPeopleHeroSectionScf;
  heroSection?: OurPeopleHeroSectionScf;
  leadership_section?: OurPeopleLeadershipSectionScf;
  leadershipSection?: OurPeopleLeadershipSectionScf;
  our_team_section?: OurPeopleTeamSectionScf;
  ourTeamSection?: OurPeopleTeamSectionScf;
  advisor_board_section?: OurPeopleAdvisorSectionScf;
  advisorBoardSection?: OurPeopleAdvisorSectionScf;
  large_banner_section?: LargeBannerSectionScf;
  largeBannerSection?: LargeBannerSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface OurPeopleHeroSectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  body: string;
  img: MediaAsset;
}

export interface OurPeopleLeaderCta {
  text: string;
  href: string;
}

export interface OurPeopleLeaderType {
  role: string;
  name: string;
  quote: string;
  body: string;
  cta: OurPeopleLeaderCta;
  img: MediaAsset;
  badge: string;
}

export interface OurPeopleLeadershipSectionType {
  leaders: OurPeopleLeaderType[];
}

export interface OurPeopleTeamCardType {
  img: MediaAsset;
  name: string;
  role: string;
  since: string;
  description: string;
  /** Present only when CMS provides a LinkedIn URL. */
  linkedinHref?: string;
}

export interface OurPeopleTeamSectionType {
  heading: string;
  title: string;
  cards: OurPeopleTeamCardType[];
}

export interface OurPeopleAdvisorCardType {
  img: MediaAsset;
  name: string;
  role: string;
  description: string;
  /** Present only when CMS provides a LinkedIn URL. */
  linkedinHref?: string;
}

export interface OurPeopleAdvisorSectionType {
  heading: string;
  title: string;
  advisors: OurPeopleAdvisorCardType[];
}

export interface OurPeoplePageData {
  hero: OurPeopleHeroSectionType;
  leadership: OurPeopleLeadershipSectionType;
  ourTeam: OurPeopleTeamSectionType;
  advisorBoard: OurPeopleAdvisorSectionType;
  largeBanner: LargeBannerSectionType;
}
