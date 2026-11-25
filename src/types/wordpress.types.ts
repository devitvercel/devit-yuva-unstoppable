/**
 * WordPress REST API — wire-format types for Yuva
 * ---------------------------------------------------------------------------
 * These mirror what `/wp-json/wp/v2/...` returns.
 */

export interface WPPage<TAcf = Record<string, unknown>> {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;

  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt?: { rendered: string };
  featured_media?: number;

  acf?: TAcf;
  scf?: TAcf;

  seo?: WPSeo;
  yoast_head_json?: YoastHeadJson;
}

export interface YoastRobots {
  index?: string;
  follow?: string;
  "max-snippet"?: string;
  "max-image-preview"?: string;
  "max-video-preview"?: string;
}

export interface YoastOgImage {
  url: string;
  width?: number;
  height?: number;
  type?: string;
}

export interface YoastHeadJson {
  title?: string;
  description?: string;
  robots?: YoastRobots;
  canonical?: string;

  og_locale?: string;
  og_type?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  article_modified_time?: string;
  og_image?: YoastOgImage[];

  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  twitter_misc?: Record<string, string>;

  schema?: {
    "@context"?: string;
    "@graph"?: Record<string, unknown>[];
  };

  [key: string]: unknown;
}

export interface WPSeo {
  title?: string;
  description?: string;
  canonical?: string;

  og_title?: string;
  og_description?: string;
  og_type?: string;
  og_image?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;

  twitter_card?: string;
  twitter_title?: string;
  twitter_image?: string;

  raw_head?: string;
  schema?: Record<string, unknown>;
  robots?: string;
}

export interface WPRobots {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
}

export interface WPApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

/** Normalized SEO payload shared by pages and posts. */
export interface ContentMeta {
  title: string;
  description: string;
  yoast: YoastHeadJson | null;
  seo: WPSeo | null;
  modified?: string;
}

export interface WPMedia {
  url: string;
  alt: string;
}

export interface AcfLink {
  url: string;
  title: string;
  target?: string;
}

export interface AcfPostObject {
  ID: number;
  post_title: string;
  post_name: string;
  post_type: string;
}

export interface AcfTerm {
  term_id: number;
  name: string;
  slug: string;
  taxonomy: string;
}
