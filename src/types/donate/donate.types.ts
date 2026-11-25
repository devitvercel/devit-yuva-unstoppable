import type { WPMedia } from "@/types/wordpress.types";
import type { StatsSectionScf, StatsSectionType, LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";
import type { MediaAsset } from "@/types/global.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface DonatePerkScf {
  icon?: string;
  perk?: string;
}

export interface DonateHeroSectionScf {
  heading?: string;
  title1?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  title2?: string;
  body?: string;
  highlighted_body?: string;
  highlightedBody?: string;
  perks?: DonatePerkScf[] | false;
}

export interface WhereYouDonationGoesCardScf {
  img?: WPMedia | string | false;
  title?: string;
  body?: string;
}

export interface WhereYouDonationGoesSectionScf {
  heading?: string;
  title?: string;
  body?: string;
  cards?: WhereYouDonationGoesCardScf[] | false;
}

export interface WaysToGiveCardScf {
  img?: WPMedia | string | false;
  tag?: string;
  title?: string;
  heading?: string;
  subtitle?: string;
  body?: string;
  cta_text?: string;
  ctaText?: string;
  cta_link?: string;
  ctaLink?: string;
}

export interface WaysToGiveSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  cards?: WaysToGiveCardScf[] | false;
}

export interface BenefitItemScf {
  id?: string;
  title?: string;
  body?: string;
  icon?: string;
}

export interface BenefitsSectionScf {
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  benefits?: BenefitItemScf[] | false;
}

export interface DonatePageScf {
  hero_section?: DonateHeroSectionScf;
  heroSection?: DonateHeroSectionScf;
  stats_section?: StatsSectionScf;
  statsSection?: StatsSectionScf;
  large_banner_section?: LargeBannerSectionScf;
  largeBannerSection?: LargeBannerSectionScf;
  where_you_donation_goes_section?: WhereYouDonationGoesSectionScf;
  whereYouDonationGoesSection?: WhereYouDonationGoesSectionScf;
  ways_to_give_section?: WaysToGiveSectionScf;
  waysToGiveSection?: WaysToGiveSectionScf;
  benefits_section?: BenefitsSectionScf;
  benefitsSection?: BenefitsSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface DonatePerkType {
  icon: React.ComponentType<{ className?: string }> | any;
  perk: string;
}

export interface DonateHeroSectionType {
  heading: string;
  title1: string;
  highlightedTitle: string;
  title2: string;
  body: string;
  highlightedBody: string;
  perks: DonatePerkType[];
}

export interface WhereYouDonationGoesCardType {
  img: MediaAsset;
  title: string;
  body: string;
}

export interface WhereYouDonationGoesSectionType {
  heading: string;
  title: string;
  body: string;
  cards: WhereYouDonationGoesCardType[];
}

export interface WaysToGiveCardType {
  img: MediaAsset;
  tag: string;
  title: string;
  heading: string;
  subtitle: string;
  body: string;
  cta: {
    text: string;
    href: string;
  };
}

export interface WaysToGiveSectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  body: string;
  cards: WaysToGiveCardType[];
}

export interface BenefitItemType {
  id: string;
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string }> | any;
}

export interface BenefitsSectionType {
  title: string;
  highlightedTitle: string;
  body: string;
  benefits: BenefitItemType[];
}

export interface DonatePageData {
  hero: DonateHeroSectionType;
  stats: StatsSectionType;
  largeBanner: LargeBannerSectionType;
  whereYouDonationGoes: WhereYouDonationGoesSectionType;
  waysToGive: WaysToGiveSectionType;
  benefits: BenefitsSectionType;
}
