import type {WPMedia} from "@/types/wordpress.types";
import type {MediaAsset} from "@/types/global.types";
import type {LargeBannerSectionScf, LargeBannerSectionType} from "@/types/home/home.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface CareersHeroSectionScf {
  heading?: string;
  title?: string;
  body?: string;
  img?: WPMedia | string | false;
  bg_img?: WPMedia | string | false;
  bgImg?: WPMedia | string | false;
}

export interface CareersThePeopleWhoWorkHereStatScf {
  number?: string;
  title?: string;
  body?: string;
}

export interface CareersThePeopleWhoWorkHereSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  stats?: CareersThePeopleWhoWorkHereStatScf[] | false;
}

export interface CareersWhyYuvaSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body1?: string;
  highlighted_body?: string;
  highlightedBody?: string;
  body2?: string;
  img?: WPMedia | string | false;
  bg_img?: WPMedia | string | false;
  bgImg?: WPMedia | string | false;
  img_text?: string;
  imgText?: string;
}

export interface CareersValueItemScf {
  title?: string;
  body?: string;
}

export interface CareersOurValuesSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  values?: CareersValueItemScf[] | false;
}

export interface CareersWhatYouGetCardScf {
  icon?: string;
  title?: string;
  body?: string;
}

export interface CareersWhatYouGetSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  cards?: CareersWhatYouGetCardScf[] | false;
}

export interface CareersCategoryScf {
  id?: string | number;
  label?: string;
}

export interface CareersJobDetailsScf {
  role?: string;
  description?: string;
  what_we_do?: Array<{ point?: string; text?: string; item?: string } | string> | string;
  apply_link?: string;
}

export interface CareersJobScf {
  active?: boolean | string | number;
  title?: string;
  location?: string;
  job_type?: string;
  job_env?: string;
  category_id?: string | number;
  job_details?: CareersJobDetailsScf;
}

export interface CareersOpenRoleScf {
  title?: string;
  location?: string;
  type?: string;
  where?: string;
  department?: string;
  about_the_role?: string;
  aboutTheRole?: string;
  what_you_will_do?: any[] | string;
  whatYouWillDo?: any[] | string;
  cta_href?: string;
  ctaHref?: string;
}

export interface CareersOpenRolesSectionScf {
  heading?: string;
  title?: string;
  highlightedTitle?: string;
  highlighted_title?: string;
  departments?: any[] | false;
  roles?: CareersOpenRoleScf[] | false;
}

export interface CareersPageScf {
  categories?: CareersCategoryScf[];
  jobs?: CareersJobScf[];
  hero_section?: CareersHeroSectionScf;
  heroSection?: CareersHeroSectionScf;
  the_people_who_work_here_section?: CareersThePeopleWhoWorkHereSectionScf;
  thePeopleWhoWorkHereSection?: CareersThePeopleWhoWorkHereSectionScf;
  why_yuva_section?: CareersWhyYuvaSectionScf;
  whyYuvaSection?: CareersWhyYuvaSectionScf;
  our_values_section?: CareersOurValuesSectionScf;
  ourValuesSection?: CareersOurValuesSectionScf;
  what_you_get_section?: CareersWhatYouGetSectionScf;
  whatYouGetSection?: CareersWhatYouGetSectionScf;
  open_roles_section?: CareersOpenRolesSectionScf;
  openRolesSection?: CareersOpenRolesSectionScf;
  large_banner_section?: LargeBannerSectionScf;
  largeBannerSection?: LargeBannerSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface CareersHeroSectionType {
  heading: string;
  title: string;
  body: string;
  img: MediaAsset;
}

export interface CareersThePeopleWhoWorkHereStatType {
  number: string;
  title: string;
  body: string;
}

export interface CareersThePeopleWhoWorkHereSectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  stats: CareersThePeopleWhoWorkHereStatType[];
}

export interface CareersWhyYuvaSectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  body1: string;
  highlightedBody: string;
  body2: string;
  img: MediaAsset;
  imgText: string;
}

export interface CareersValueItemType {
  title: string;
  body: string;
}

export interface CareersOurValuesSectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  body: string;
  values: CareersValueItemType[];
}

export interface CareersWhatYouGetCardType {
  icon: React.ComponentType<{ className?: string; stroke?: string; fill?: string }>;
  title: string;
  body: string;
}

export interface CareersWhatYouGetSectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  body: string;
  cards: CareersWhatYouGetCardType[];
}

export interface CareersOpenRoleType {
  title: string;
  location: string;
  type: string;
  where?: string;
  department: string;
  aboutTheRole: string;
  whatYouWillDo: string[];
  ctaHref: string;
}

export interface CareersOpenRolesSectionType {
  heading: string;
  highlightedTitle: string;
  title: string;
  departments: string[];
  roles: CareersOpenRoleType[];
}

export interface CareersPageData {
  hero: CareersHeroSectionType;
  thePeopleWhoWorkHere: CareersThePeopleWhoWorkHereSectionType;
  whyYuva: CareersWhyYuvaSectionType;
  ourValues: CareersOurValuesSectionType;
  whatYouGet: CareersWhatYouGetSectionType;
  openRoles: CareersOpenRolesSectionType;
  largeBanner: LargeBannerSectionType;
}
