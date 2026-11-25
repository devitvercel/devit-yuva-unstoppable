import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface HeroSectionScf {
  eyebrow?: string;
  title?: string;
  title1?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  title2?: string;
  body?: string;
  body1?: string;
  cta1_text?: string;
  cta1_link?: string;
  cta2_text?: string;
  cta2_link?: string;
  body2?: string;
  img?: WPMedia | string | false;
  badge_title?: string;
  badge_body?: string;
  keywords?: any[] | false;
}

export interface StatItemScf {
  number?: string;
  title?: string;
}

export interface StatsRowScf {
  heading?: string;
  stats?: StatItemScf[] | false;
}

export interface StatsSectionScf {
  heading?: string;
  /** @deprecated Legacy flat stats — prefer `rows`. */
  stats?: StatItemScf[] | false;
  rows?: StatsRowScf[] | false;
}

export interface ProgrammeScf {
  index?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  href?: string;
  img?: WPMedia | string | false;
}

export interface WhatWeDoSectionScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  programmes?: ProgrammeScf[] | false;
}

export interface PhotoCarouselItemScf {
  bg_img?: WPMedia | string | false;
  bgImg?: WPMedia | string | false;
  img?: WPMedia | string | false;
  eyebrow?: string;
  heading?: string;
  sub_heading?: string;
  subHeading?: string;
  title?: string;
  body?: string;
  cta_text?: string;
  ctaText?: string;
  cta_link?: string;
  ctaLink?: string;
}

export interface PhotoCarouselSectionScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  carousel_content?: PhotoCarouselItemScf[] | false;
  carouselContent?: PhotoCarouselItemScf[] | false;
}

export interface LargeBannerSectionScf {
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

export interface CsrPartnerGridItemScf {
  logo1?: WPMedia | string | false;
  logo2?: WPMedia | string | false;
}

export interface CsrPartnersSectionScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  grids?: CsrPartnerGridItemScf[] | false;
  cta1_text?: string;
  cta1Text?: string;
  cta1_link?: string;
  cta1Link?: string;
  cta2_text?: string;
  cta2Text?: string;
  cta2_link?: string;
  cta2Link?: string;
}

export interface VoiceItemScf {
  img?: WPMedia | string | false;
  badge_title?: string;
  badgeTitle?: string;
  badge_body?: string;
  badgeBody?: string;
  body?: string;
  tag?: string;
  name?: string;
  role?: string;
}

export interface VoicesSectionScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  voices?: VoiceItemScf[] | false;
}

export interface OurReachStatItemScf {
  number?: string | number;
  title?: string;
  suffix?: string;
}

export interface OurReachSectionScf {
  heading?: string;
  title?: string;
  body?: string;
  stats?: OurReachStatItemScf[] | false;
  img?: WPMedia | string | false;
  cta_text?: string;
  ctaText?: string;
  cta_link?: string;
  ctaLink?: string;
}

export interface TrustSectionScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  recognition_title?: string;
  recognitionTitle?: string;
  recognition_items?: any[] | false;
  recognitionItems?: any[] | false;
  recognition_cta_text?: string;
  recognitionCtaText?: string;
  recognition_cta_link?: string;
  recognitionCtaLink?: string;
  trust_title?: string;
  trustTitle?: string;
  trust_subtitle?: string;
  trustSubtitle?: string;
  trust_items?: any[] | false;
  trustItems?: any[] | false;
  trust_description?: string;
  trustDescription?: string;
}

export interface BeliefItemScf {
  index?: string | number;
  eyebrow?: string;
  title?: string;
  body?: string;
  highlight?: string;
  points?: any[] | false;
  img?: WPMedia | string | false;
}

export interface BeliefsSectionScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  beliefs?: BeliefItemScf[] | false;
}

export interface LifeAtYuvaPillarScf {
  number?: string;
  title?: string;
  body?: string;
}

export interface LifeAtYuvaSectionScf {
  eyebrow?: string;
  label?: string;
  pillars?: LifeAtYuvaPillarScf[] | false;
}

export interface HomeScf {
  hero_section?: HeroSectionScf;
  stats_section?: StatsSectionScf;
  what_we_do_section?: WhatWeDoSectionScf;
  life_at_yuva_section?: LifeAtYuvaSectionScf;
  lifeAtYuvaSection?: LifeAtYuvaSectionScf;
  photo_carousel_section?: PhotoCarouselSectionScf;
  photoCarouselSection?: PhotoCarouselSectionScf;
  large_banner_section?: LargeBannerSectionScf;
  largeBannerSection?: LargeBannerSectionScf;
  csr_partners_section?: CsrPartnersSectionScf;
  csrPartnersSection?: CsrPartnersSectionScf;
  voices_section?: VoicesSectionScf;
  voicesSection?: VoicesSectionScf;
  our_reach_section?: OurReachSectionScf;
  ourReachSection?: OurReachSectionScf;
  trust_section?: TrustSectionScf;
  trustSection?: TrustSectionScf;
  beliefs_section?: BeliefsSectionScf;
  beliefsSection?: BeliefsSectionScf;
}


/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface HeroCta {
  text: string;
  href: string;
}

export interface HeroBadge {
  title: string;
  body: string;
}

export interface HeroSectionType {
  eyebrow: string;
  title1: string;
  highlightedTitle: string;
  title2: string;
  body1: string;
  cta1: HeroCta;
  cta2: HeroCta;
  body2: string;
  img: MediaAsset;
  badge: HeroBadge;
  keywords: string[];
}

export interface StatItemType {
  number: string;
  title: string;
}

export interface StatGroupType {
  category: string;
  items: StatItemType[];
}

export interface StatsRowType {
  heading?: string;
  stats: StatItemType[];
}

export interface StatsSectionType {
  heading: string;
  groups?: StatGroupType[];
  stats?: StatItemType[];
  rows?: StatsRowType[];
}

export interface ProgrammeType {
  index: number;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  img: MediaAsset;
}

export interface WhatWeDoSectionType {
  eyebrow: string;
  title: string;
  body: string;
  programmes: ProgrammeType[];
}

export interface PhotoCarouselCta {
  text: string;
  href: string;
}

export interface PhotoCarouselItemType {
  bgImg: MediaAsset;
  img: MediaAsset;
  eyebrow: string;
  heading: string;
  subHeading: string;
  title: string;
  body: string;
  cta: PhotoCarouselCta;
}

export interface PhotoCarouselSectionType {
  eyebrow: string;
  title: string;
  body: string;
  carouselContent: PhotoCarouselItemType[];
}

export interface LargeBannerCta {
  text: string;
  href: string;
}

export interface LargeBannerSectionType {
  eyebrow: string;
  title: string;
  body: string;
  cta1: LargeBannerCta;
  cta2: LargeBannerCta;
}

export interface CsrPartnerGridItemType {
  logos: MediaAsset[];
}

export interface CsrPartnersCta {
  text: string;
  href: string;
}

export interface CsrPartnersSectionType {
  eyebrow: string;
  title: string;
  body: string;
  grids: CsrPartnerGridItemType[];
  cta1: CsrPartnersCta;
  cta2: CsrPartnersCta;
}

export interface VoiceBadge {
  title: string;
  body: string;
}

export interface VoiceItemType {
  img: MediaAsset;
  badge: VoiceBadge;
  body: string;
  tag: string;
  name: string;
  role: string;
}

export interface VoicesSectionType {
  eyebrow: string;
  title: string;
  body: string;
  voices: VoiceItemType[];
}

export interface OurReachStatItemType {
  number: number;
  title: string;
  suffix?: string;
}

export interface OurReachSectionType {
  heading: string;
  title: string;
  body: string;
  stats: OurReachStatItemType[];
  img: MediaAsset;
  cta: {
    text: string;
    href: string;
  };
}

export interface TrustSectionType {
  eyebrow: string;
  title: string;
  body: string;
  recognition: {
    title: string;
    items: string[];
    ctaText: string;
    ctaLink: string;
  };
  trust: {
    title: string;
    subtitle: string;
    items: string[];
    description: string;
  };
}

export interface BeliefItemType {
  index: number;
  eyebrow: string;
  title: string;
  body: string;
  highlight?: string;
  points?: string[];
  img: MediaAsset;
}

export interface BeliefsSectionType {
  eyebrow: string;
  title: string;
  body: string;
  beliefs: BeliefItemType[];
}

export interface LifeAtYuvaHomeSectionType {
  eyebrow: string;
  label: string;
  pillars: {
    number: string;
    title: string;
    body: string;
  }[];
}

export interface HomePageData {
  hero: HeroSectionType;
  stats: StatsSectionType;
  whatWeDo: WhatWeDoSectionType;
  beliefsSection: BeliefsSectionType;
  lifeAtYuva: LifeAtYuvaHomeSectionType;
  photoCarousel: PhotoCarouselSectionType;
  largeBanner: LargeBannerSectionType;
  csrPartners: CsrPartnersSectionType;
  voices: VoicesSectionType;
  ourReach: OurReachSectionType;
  trustSection: TrustSectionType;
}

