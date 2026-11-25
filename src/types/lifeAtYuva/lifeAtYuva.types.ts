import type {MediaAsset} from "@/types/global.types";
import type {LargeBannerSectionScf, LargeBannerSectionType} from "@/types/home/home.types";
import type {CareersThePeopleWhoWorkHereSectionType} from "@/types/careers/careers.types";
import type {OurStoryContentBlockType} from "@/types/ourStory/ourStory.types";
import type {WPMedia} from "@/types/wordpress.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface LifeAtYuvaHeroSectionScf {
  heading?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  title?: string;
  body?: string;
  img?: WPMedia | string | false;
}

export interface LifeAtYuvaPillarScf {
  number?: string;
  title?: string;
  body?: string;
}

export interface LifeAtYuvaTheYuvaWaySectionScf {
  eyebrow?: string;
  label?: string;
  pillars?: LifeAtYuvaPillarScf[] | false;
}

export interface LifeAtYuvaTeamNumbersStatScf {
  number?: string;
  title?: string;
  body?: string;
}

export interface LifeAtYuvaTeamNumbersSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  stats?: LifeAtYuvaTeamNumbersStatScf[] | false;
}

export interface LifeAtYuvaBeginningSectionScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  badge_label?: string;
  badgeLabel?: string;
  badge_detail?: string;
  badgeDetail?: string;
  img?: WPMedia | string | false;
}

export interface LifeAtYuvaBannerSectionScf {
  img?: WPMedia | string | false;
}

export interface LifeAtYuvaWhoWeAreSectionScf {
  label?: string;
  pillars?: LifeAtYuvaPillarScf[] | false;
}

export interface LifeAtYuvaMomentScf {
  label?: string;
  layout?: string;
  img?: WPMedia | string | false;
}

export interface LifeAtYuvaLifeMomentsSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  moments?: LifeAtYuvaMomentScf[] | false;
}

export interface LifeAtYuvaFeaturedMemberScf {
  name?: string;
  role?: string;
  bio?: string;
  img?: WPMedia | string | false;
  linkedin_href?: string;
  linkedinHref?: string;
  read_more_href?: string;
  readMoreHref?: string;
}

export interface LifeAtYuvaCompactMemberScf {
  name?: string;
  role?: string;
  since?: string;
  img?: WPMedia | string | false;
}

export interface LifeAtYuvaStandWithUsSectionScf {
  heading?: string;
  title?: string;
  featured?: LifeAtYuvaFeaturedMemberScf[] | false;
  members?: LifeAtYuvaCompactMemberScf[] | false;
}

export interface LifeAtYuvaPageScf {
  hero_section?: LifeAtYuvaHeroSectionScf;
  heroSection?: LifeAtYuvaHeroSectionScf;
  the_yuva_way_section?: LifeAtYuvaTheYuvaWaySectionScf;
  theYuvaWaySection?: LifeAtYuvaTheYuvaWaySectionScf;
  team_numbers_section?: LifeAtYuvaTeamNumbersSectionScf;
  teamNumbersSection?: LifeAtYuvaTeamNumbersSectionScf;
  beginning_section?: LifeAtYuvaBeginningSectionScf;
  beginningSection?: LifeAtYuvaBeginningSectionScf;
  banner_section?: LifeAtYuvaBannerSectionScf;
  bannerSection?: LifeAtYuvaBannerSectionScf;
  who_we_are_section?: LifeAtYuvaWhoWeAreSectionScf;
  whoWeAreSection?: LifeAtYuvaWhoWeAreSectionScf;
  life_moments_section?: LifeAtYuvaLifeMomentsSectionScf;
  lifeMomentsSection?: LifeAtYuvaLifeMomentsSectionScf;
  stand_with_us_section?: LifeAtYuvaStandWithUsSectionScf;
  standWithUsSection?: LifeAtYuvaStandWithUsSectionScf;
  large_banner_section?: LargeBannerSectionScf;
  largeBannerSection?: LargeBannerSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface LifeAtYuvaHeroSectionType {
  heading: string;
  highlightedTitle: string;
  title: string;
  body: string;
  img: MediaAsset;
}

export interface LifeAtYuvaPillarType {
  number: string;
  title: string;
  body: string;
}

export interface LifeAtYuvaWhoWeAreSectionType {
  label: string;
  pillars: LifeAtYuvaPillarType[];
}

export interface LifeAtYuvaTheYuvaWaySectionType {
  eyebrow: string;
  label: string;
  pillars: LifeAtYuvaPillarType[];
}

export interface LifeAtYuvaMomentType {
  label: string;
  img: MediaAsset;
  /** Grid placement key for the desktop mosaic layout. */
  layout: "featured" | "small";
}

export interface LifeAtYuvaMomentsSectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  body: string;
  moments: LifeAtYuvaMomentType[];
}

export interface LifeAtYuvaFeaturedMemberType {
  name: string;
  role: string;
  bio: string;
  img: MediaAsset;
  linkedinHref?: string;
  readMoreHref?: string;
}

export interface LifeAtYuvaCompactMemberType {
  name: string;
  role: string;
  since: string;
  img: MediaAsset;
}

export interface LifeAtYuvaStandWithUsSectionType {
  heading: string;
  title: string;
  featured: LifeAtYuvaFeaturedMemberType[];
  members: LifeAtYuvaCompactMemberType[];
}

export interface LifeAtYuvaBannerSectionType {
  img: MediaAsset;
}

export interface LifeAtYuvaPageData {
  hero: LifeAtYuvaHeroSectionType;
  theYuvaWay: LifeAtYuvaTheYuvaWaySectionType;
  teamNumbers: CareersThePeopleWhoWorkHereSectionType;
  beginning: OurStoryContentBlockType;
  banner: LifeAtYuvaBannerSectionType;
  whoWeAre: LifeAtYuvaWhoWeAreSectionType;
  lifeMoments: LifeAtYuvaMomentsSectionType;
  standWithUs: LifeAtYuvaStandWithUsSectionType;
  largeBanner: LargeBannerSectionType;
}
