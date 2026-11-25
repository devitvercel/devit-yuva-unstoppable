import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface ImpactHeroValidationCardScf {
  eyebrow?: string;
  title?: string;
  label?: string;
}

export interface ImpactHeroSectionScf {
  title1?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  img?: WPMedia | string | false;
  validation_card?: ImpactHeroValidationCardScf;
  validationCard?: ImpactHeroValidationCardScf;
}

export interface ImpactStatItemScf {
  icon?: string;
  value?: string;
  description?: string;
  category?: string;
}

export interface ImpactNumbersSectionScf {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  img?: WPMedia | string | false;
  stats?: ImpactStatItemScf[] | false;
}

export interface ImpactReportItemScf {
  // Published toggle (true_false). Defaults to true when absent; false hides the card.
  active?: boolean | number | string;
  img?: WPMedia | string | false;
  month?: string;
  title?: string;
  // SCF link/file field: object { url, alt } when set, or `false` when empty.
  download_href?: WPMedia | string | false;
  downloadHref?: WPMedia | string | false;
}

export interface ImpactReportsSectionScf {
  reports?: ImpactReportItemScf[] | false;
}

export interface ImpactPageScf {
  hero_section?: ImpactHeroSectionScf;
  heroSection?: ImpactHeroSectionScf;
  numbers_section?: ImpactNumbersSectionScf;
  numbersSection?: ImpactNumbersSectionScf;
  reports_section?: ImpactReportsSectionScf;
  reportsSection?: ImpactReportsSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface ImpactHeroValidationCard {
  eyebrow: string;
  title: string;
  label: string;
}

export interface ImpactHeroSectionType {
  title1: string;
  highlightedTitle: string;
  body: string;
  img: MediaAsset;
  validationCard: ImpactHeroValidationCard;
}

export interface ImpactStatItem {
  icon: string;
  value: string;
  description: string;
  category: string;
}

export interface ImpactNumbersSectionType {
  eyebrow: string;
  title: string;
  subtitle: string;
  img: MediaAsset;
  stats: ImpactStatItem[];
}

export interface ImpactReportItem {
  img: MediaAsset;
  month: string;
  title: string;
  downloadHref: string;
}

export interface ImpactReportsSectionType {
  reports: ImpactReportItem[];
}

export interface ImpactPageData {
  hero: ImpactHeroSectionType;
  numbersSection: ImpactNumbersSectionType;
  reportsSection: ImpactReportsSectionType;
}

/* ──────────────────── IMPACT SUB-PAGES (CSR/Audit Partners, Annual Reports) ──────────────────── */

export type ImpactSubpageTemplate = 1 | 2;

export interface ImpactSubpageHero {
  eyebrow: string;
  title: string;
  body: string;
  img: MediaAsset;
}

export interface ImpactTab {
  id: string;
  label: string;
}

export interface ImpactPartnerItem {
  name: string;
  description?: string;
  img: MediaAsset;
  category: string;
}

export interface ImpactAnnualReportItem {
  title: string;
  year: string;
  /** Matches a category filter tab ID (e.g. "annual-report"). */
  category: string;
  fileUrl: string;
  img?: MediaAsset;
}

export interface ImpactSubpageCta {
  eyebrow: string;
  title: string;
  body: string;
  primary: { text: string; href: string };
  secondary: { text: string; href: string };
}

/** Wire type — WordPress SCF for impact sub-pages mirrors the media page SCF shape. */
export type ImpactSubpageScf = import("@/types/media/media.types").MediaPageScf;

export interface ImpactSubpageData {
  template: ImpactSubpageTemplate;
  hero: ImpactSubpageHero;
  tabs: ImpactTab[];
  partners: ImpactPartnerItem[];
  reports: ImpactAnnualReportItem[];
  cta: ImpactSubpageCta;
}
