import type {WPMedia} from "@/types/wordpress.types";
import type {MediaAsset} from "@/types/global.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface ProgrammeHeroSectionScf {
  title?: string;
  img?: WPMedia | string | false;
}

export interface ProgrammeTemplateScf {
  template?: number | string;
}

export interface ProgrammeInfoSectionScf {
  heading?: string;
  title?: string;
  body?: string | string[];
}

export interface ProgrammeCommitmentPointsScf {
  title?: string;
  body?: string | string[] | Array<{ point?: string }>;
}

export interface ProgrammeCommitmentCardScf {
  heading?: string;
  title?: string;
  body?: string;
  img?: WPMedia | string | false;
  points?: ProgrammeCommitmentPointsScf[] | false;
}

export interface ProgrammeCommitmentSectionScf {
  heading?: string;
  title?: string;
  body?: string;
  cards?: ProgrammeCommitmentCardScf[] | false;
}

export interface SupportSystemCardScf {
  title?: string;
  body?: string;
  img?: WPMedia | string | false;
}

export interface SupportSystemSectionScf {
  heading?: string;
  title?: string;
  body?: string | string[];
  cards?: SupportSystemCardScf[] | false;
}

export interface RealWorldChangeSectionScf {
  heading?: string;
  title?: string;
  body?: string | string[];
  img?: WPMedia | string | false;
}

export interface ViewSectionScf {
  heading?: string;
  title?: string;
  body?: string | string[];
  img?: WPMedia | string | false;
}

export interface NumbersItemScf {
  icon?: string;
  title?: string;
  body?: string;
}

export interface NumbersSectionScf {
  heading?: string;
  title?: string;
  body?: string;
  img?: WPMedia | string | false;
  numbers?: NumbersItemScf[] | false;
}

export interface StudentJourneyCardScf {
  id?: string;
  title?: string;
  body?: string;
  icon?: string;
}

export interface StudentJourneySectionScf {
  heading?: string;
  title?: string;
  body?: string;
  card?: StudentJourneyCardScf[] | false;
}

export interface WhyPartnerCardScf {
  id?: string;
  title?: string;
  body?: string;
}

export interface WhyPartnerSectionScf {
  heading?: string;
  title?: string;
  body?: string | string[];
  cards?: WhyPartnerCardScf[] | false;
}

export interface OurVisionCardScf {
  id?: string;
  title?: string;
  body?: string;
}

export interface OurVisionSectionScf {
  heading?: string;
  title?: string;
  body?: string | string[];
  cards?: OurVisionCardScf[] | false;
}


export interface StudentTestimonialScf {
  img?: WPMedia | string | false;
  badge_title?: string;
  badgeTitle?: string;
  badge_body?: string;
  badgeBody?: string;
  tag?: string;
  body?: string;
  name?: string;
  role?: string;
  /** Legacy — mapped to role by the parser. */
  location?: string;
}

export interface StudentTestimonialSectionScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  /** Preferred: multiple student voices (home Voices carousel). */
  testimonials?: StudentTestimonialScf[] | false;
  /** Legacy single testimonial — still accepted by the parser. */
  testimonial?: StudentTestimonialScf;
}

export interface SchoolTransformationPointScf {
  title?: string;
  body?: string | string[];
}

export interface SchoolTransformationItemScf {
  index?: number | string;
  title?: string;
  points?: SchoolTransformationPointScf[] | false;
  img?: WPMedia | string | false;
}


export interface ProgrammePageScf {
  hero?: ProgrammeHeroSectionScf;
  programme_template?: ProgrammeTemplateScf;
  programmeTemplate?: ProgrammeTemplateScf;
  programme_info?: ProgrammeInfoSectionScf;
  programmeInfo?: ProgrammeInfoSectionScf;
  programme_commitment?: ProgrammeCommitmentSectionScf;
  programmeCommitment?: ProgrammeCommitmentSectionScf;
  programme_large_banner?: ProgrammeLargeBannerSectionScf;
  programmeLargeBanner?: ProgrammeLargeBannerSectionScf;
  support_system?: SupportSystemSectionScf;
  supportSystem?: SupportSystemSectionScf;
  real_world_change?: RealWorldChangeSectionScf;
  realWorldChange?: RealWorldChangeSectionScf;
  view?: ViewSectionScf;
  numbers?: NumbersSectionScf;
  student_journey?: StudentJourneySectionScf;
  studentJourney?: StudentJourneySectionScf;
  why_partner?: WhyPartnerSectionScf;
  whyPartner?: WhyPartnerSectionScf;
  our_vision?: OurVisionSectionScf;
  ourVision?: OurVisionSectionScf;
  student_testimonial?: StudentTestimonialSectionScf;
  studentTestimonial?: StudentTestimonialSectionScf;
  programmes?: SchoolTransformationItemScf[] | false;
}

export interface ProgrammeLargeBannerCtaScf {
  title?: string;
  href?: string;
}

export interface ProgrammeLargeBannerSectionScf {
  heading?: string;
  title?: string;
  body?: string;
  cta1?: ProgrammeLargeBannerCtaScf;
  cta2?: ProgrammeLargeBannerCtaScf;
  img?: WPMedia | string | false;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface ProgrammeHeroSectionType {
  title: string;
  body?: string;
  img: MediaAsset;
}

export interface ProgrammeTemplateType {
  template: number;
}

export interface ProgrammeInfoSectionType {
  heading: string;
  title: string;
  body: string[];
}

export interface ProgrammeCommitmentPointsType {
  title: string;
  body: string[];
}

export interface ProgrammeCommitmentCardType {
  heading: string;
  title: string;
  body: string;
  img?: MediaAsset;
  points: ProgrammeCommitmentPointsType[]
}

export interface ProgrammeCommitmentSectionType {
  heading: string;
  title: string;
  body: string;
  cards: ProgrammeCommitmentCardType[];
}

export interface SupportSystemCardType {
  title: string;
  body: string;
  img: MediaAsset;
}

export interface SupportSystemSectionType {
  heading: string;
  title: string;
  body: string[];
  cards: SupportSystemCardType[];
}

export interface RealWorldChangeSectionType {
  heading: string;
  title: string;
  body: string[];
  img: MediaAsset;
}

export interface ViewSectionType {
  heading: string;
  title: string;
  body: string[];
  img: MediaAsset;
}

export interface NumbersItemType {
  icon: React.ComponentType<{ className?: string; stroke?: string; fill?: string }>;
  title: string;
  body: string;
}

export interface NumbersSectionType {
  heading: string;
  title: string;
  body: string;
  img?: MediaAsset;
  numbers: NumbersItemType[];
}

export interface StudentJourneyCardType {
  id: string;
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string; stroke?: string; fill?: string }>;
}

export interface StudentJourneySectionType {
  heading: string;
  title: string;
  body: string;
  card: StudentJourneyCardType[];
}

export interface WhyPartnerCardType {
  id: string;
  title: string;
  body: string;
}

export interface WhyPartnerSectionType {
  heading: string;
  title: string;
  body: string[];
  cards: WhyPartnerCardType[];
}

export interface OurVisionCardType {
  id: string;
  title: string;
  body: string;
}

export interface OurVisionSectionType {
  heading: string;
  title: string;
  body: string;
  cards: OurVisionCardType[];
}


export interface StudentTestimonialType {
  img: MediaAsset;
  badge: { title: string; body: string };
  body: string;
  tag: string;
  name: string;
  role: string;
}

export interface StudentTestimonialSectionType {
  eyebrow: string;
  title: string;
  body: string;
  testimonials: StudentTestimonialType[];
}

export interface SchoolTransformationPointType {
  title: string;
  body: string[];
}

export interface SchoolTransformationItemType {
  index: string | number;
  title: string;
  points: SchoolTransformationPointType[];
  img: MediaAsset;
}


export interface ProgrammePageData {
  hero: ProgrammeHeroSectionType;
  programmeTemplate: ProgrammeTemplateType;
  programmeInfo?: ProgrammeInfoSectionType;
  programmeCommitment?: ProgrammeCommitmentSectionType | null;
  programmeLargeBanner?: ProgrammeLargeBannerSectionType | null;
  supportSystem?: SupportSystemSectionType | null;
  realWorldChange?: RealWorldChangeSectionType | null;
  view?: ViewSectionType | null;
  numbers?: NumbersSectionType | null;
  studentJourney?: StudentJourneySectionType | null;
  whyPartner?: WhyPartnerSectionType | null;
  ourVision?: OurVisionSectionType | null;
  studentTestimonial?: StudentTestimonialSectionType | null;
  programmes?: SchoolTransformationItemType[] | null;
}

export interface ProgrammeLargeBannerCtaType {
  title: string;
  href: string;
}

export interface ProgrammeLargeBannerSectionType {
  heading: string;
  title: string;
  body: string;
  cta1: ProgrammeLargeBannerCtaType;
  cta2: ProgrammeLargeBannerCtaType;
  img: MediaAsset;
}
