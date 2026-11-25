import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import type { StatsSectionScf, StatsSectionType, LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface VolunteerHeroSectionScf {
  heading?: string;
  title1?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  title2?: string;
  body1?: string;
  highlighted_body?: string;
  highlightedBody?: string;
  body2?: string;
  cta1_text?: string;
  cta1Text?: string;
  cta1_link?: string;
  cta1Link?: string;
  cta2_text?: string;
  cta2Text?: string;
  cta2_link?: string;
  cta2Link?: string;
  img?: WPMedia | string | false;
  badge_title?: string;
  badgeTitle?: string;
  badge_body?: string;
  badgeBody?: string;
}

export interface HowYouCanHelpCardScf {
  img?: WPMedia | string | false;
  id?: string;
  title?: string;
  body?: string;
  points?: string[] | false;
  commitment?: string;
}

export interface HowYouCanHelpSectionScf {
  heading?: string;
  title1?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  title2?: string;
  body?: string;
  cards?: HowYouCanHelpCardScf[] | false;
}

export interface VolunteerStepScf {
  title?: string;
  body?: string;
}

export interface YourJourneySectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  steps?: VolunteerStepScf[] | false;
}

export interface VolunteerQuoteScf {
  quote?: string;
  role?: string;
  service?: string;
}

export interface VolunteerApplicationSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  quote?: VolunteerQuoteScf;
  points?: (string | { point?: string })[] | false;
}

export interface VolunteerPageScf {
  hero_section?: VolunteerHeroSectionScf;
  heroSection?: VolunteerHeroSectionScf;
  stats_section?: StatsSectionScf;
  statsSection?: StatsSectionScf;
  how_you_can_help_section?: HowYouCanHelpSectionScf;
  howYouCanHelpSection?: HowYouCanHelpSectionScf;
  your_journey_section?: YourJourneySectionScf;
  yourJourneySection?: YourJourneySectionScf;
  volunteer_application_section?: VolunteerApplicationSectionScf;
  volunteerApplicationSection?: VolunteerApplicationSectionScf;
  large_banner_section?: LargeBannerSectionScf;
  largeBannerSection?: LargeBannerSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface VolunteerCta {
  text: string;
  href: string;
}

export interface VolunteerBadge {
  title: string;
  body: string;
}

export interface VolunteerHeroSectionType {
  heading: string;
  title1: string;
  highlightedTitle: string;
  title2: string;
  body1: string;
  highlightedBody: string;
  body2: string;
  cta1: VolunteerCta;
  cta2: VolunteerCta;
  img: MediaAsset;
  badge: VolunteerBadge;
}

export interface HowYouCanHelpCardType {
  img: MediaAsset;
  id: string;
  title: string;
  body: string;
  points: string[];
  commitment: string;
}

export interface HowYouCanHelpSectionType {
  heading: string;
  title1: string;
  highlightedTitle: string;
  title2: string;
  body: string;
  cards: HowYouCanHelpCardType[];
}

export interface VolunteerStepType {
  title: string;
  body: string;
}

export interface YourJourneySectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  steps: VolunteerStepType[];
}

export interface VolunteerQuoteType {
  quote: string;
  role: string;
  service: string;
}

export interface VolunteerApplicationSectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  body: string;
  quote: VolunteerQuoteType;
  points: string[];
}

export interface VolunteerPageData {
  hero: VolunteerHeroSectionType;
  stats: StatsSectionType;
  howYouCanHelp: HowYouCanHelpSectionType;
  yourJourney: YourJourneySectionType;
  volunteerApplication: VolunteerApplicationSectionType;
  volunteerLargeBanner: LargeBannerSectionType;
}
