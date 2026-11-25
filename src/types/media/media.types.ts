import type {MediaAsset} from "@/types/global.types";
import type {WPMedia} from "@/types/wordpress.types";

/* ───────────────────────────── WIRE TYPES (WordPress / SCF) ───────────────────────────── */

export interface MediaTemplateScf {
  template?: number | string;
}

export interface MediaHeroScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  img?: WPMedia | string | false;
}

export interface MediaTabScf {
  id?: string;
  label?: string;
  /** Gallery categories only: photo | video | both */
  kind?: string;
}

export interface PartnerItemScf {
  name?: string;
  description?: string;
  img?: WPMedia | string | false;
  category?: string;
}

export interface ReportItemScf {
  title?: string;
  year?: string;
  category?: string;
  file_url?: WPMedia | string | false;
  fileUrl?: WPMedia | string | false;
  download_href?: WPMedia | string | false;
  downloadHref?: WPMedia | string | false;
  active?: boolean;
  img?: WPMedia | string | false;
}

export interface GalleryItemScf {
  title?: string;
  category?: string;
  kind?: string;
  date?: string;
  img?: WPMedia | string | false;
  href?: string;
  link?: string;
  video_url?: string;
  videoUrl?: string;
  active?: boolean;
}

export interface ArticleItemScf {
  title?: string;
  excerpt?: string;
  category?: string;
  tag?: string;
  source?: string;
  source_logo?: WPMedia | string | false;
  sourceLogo?: WPMedia | string | false;
  date?: string;
  img?: WPMedia | string | false;
  href?: string;
  slug?: string;
  active?: boolean;
}

export interface MediaCtaScf {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: {text?: string; href?: string};
  secondary?: {text?: string; href?: string};
}

export interface MediaPageScf {
  media_template?: MediaTemplateScf;
  mediaTemplate?: MediaTemplateScf;
  hero?: MediaHeroScf;
  tabs?: MediaTabScf[] | false;
  categories?: MediaTabScf[] | false;
  partners?: PartnerItemScf[] | false;
  reports?: ReportItemScf[] | false;
  gallery?: GalleryItemScf[] | false;
  articles?: ArticleItemScf[] | false;
  cta?: MediaCtaScf;
}

/* ───────────────────────────── UI TYPES (components) ───────────────────────────── */

export type MediaTemplate = 1 | 2 | 3 | 4;

export interface MediaHero {
  eyebrow: string;
  title: string;
  body: string;
  img: MediaAsset;
}

export interface MediaTab {
  id: string;
  label: string;
  /**
   * Gallery category scope. Photo/video tabs only show matching categories.
   * Missing / "both" = visible under either gallery type.
   */
  kind?: "photo" | "video" | "both";
}

export interface PartnerItem {
  name: string;
  description?: string;
  img: MediaAsset;
  category: string;
}

export interface ReportItem {
  title: string;
  year: string;
  /** Matches a category filter tab ID (e.g. "annual-report"). */
  category: string;
  fileUrl: string;
  img?: MediaAsset;
}

export interface GalleryItem {
  title: string;
  category: string;
  kind: "photo" | "video";
  /** ISO/date-like value used for newest-first ordering; not displayed. */
  date?: string;
  img: MediaAsset;
  href?: string;
}

export interface ArticleItem {
  title: string;
  excerpt: string;
  category: string;
  /** Red category label shown on the card (Figma tag). */
  tag?: string;
  /** Publication or outlet name (press cards). */
  source?: string;
  /** Outlet logo shown beside source (press cards). */
  sourceLogo?: MediaAsset;
  date: string;
  img?: MediaAsset;
  href: string;
  /** Optional WP slug — used to build detail URLs when href is omitted. */
  slug?: string;
}

export interface MediaCta {
  eyebrow: string;
  title: string;
  body: string;
  primary: {text: string; href: string};
  secondary: {text: string; href: string};
}

export interface MediaPageData {
  template: MediaTemplate;
  hero: MediaHero;
  tabs: MediaTab[];
  categories: MediaTab[];
  partners: PartnerItem[];
  reports: ReportItem[];
  gallery: GalleryItem[];
  articles: ArticleItem[];
  cta: MediaCta;
}
