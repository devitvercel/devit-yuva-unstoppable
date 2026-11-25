/**
 * WordPress integration constants for Yuva
 * ---------------------------------------------------------------------------
 * Single source of truth for everything the frontend needs to reach the
 * Yuva headless WordPress backend.
 */
export const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuvaunstoppable.org";

export const SCHOLARSHIP_BASE_URL = process.env.NEXT_PUBLIC_SCHOLARSHIP_URL ?? "https://scholarship.yuvaunstoppable.org";

export const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL ?? "https://cms.yuvaunstoppable.org/cms";

/** WP REST API root — everything under /wp/v2. */
export const WP_API_BASE = `${WP_BASE_URL}/wp-json/wp/v2`;

/** Yuva custom REST namespace — for site-specific routes (newsletter, etc.). */
export const WP_YUVA_API_BASE = `${WP_BASE_URL}/wp-json/yuva/v1`;

/** YARPP (Yet Another Related Posts Plugin) REST namespace. */
export const WP_YARPP_API_BASE = `${WP_BASE_URL}/wp-json/yarpp/v1`;

/** REST endpoints we currently consume. */
export const WP_ENDPOINTS = {
  PAGES: `${WP_API_BASE}/pages`,
  /** Blog posts — shared by Voice of Change and the Media /blogs page. */
  POSTS: `${WP_API_BASE}/posts`,
  /** Press articles — separate custom post type for Press & Media. */
  PRESS_ARTICLES: `${WP_API_BASE}/press-article`,
  /** Post categories — blog filter tabs. */
  CATEGORIES: `${WP_API_BASE}/categories`,
  /** Press categories — press listing filter tabs. */
  PRESS_CATEGORIES: `${WP_API_BASE}/press-category`,
  /** Media library — used to resolve bare attachment IDs to their file URL. */
  MEDIA: `${WP_API_BASE}/media`,
  /** Newsletter signup — custom route, POST { email }. */
  NEWSLETTER: `${WP_YUVA_API_BASE}/newsletter`,
  /** Contact form — custom route, POST { type, name, email, mobile, message }. */
  CONTACT: `${WP_YUVA_API_BASE}/contact`,
  /** Volunteer application — custom route, POST application fields. */
  VOLUNTEER: `${WP_YUVA_API_BASE}/volunteer`,
  /** Server-side search over Gallery page SCF repeater items. */
  GALLERY_SEARCH: `${WP_YUVA_API_BASE}/gallery-search`,
  /** Donation record create — server-to-server, POST pending order (secret-gated). */
  DONATION: `${WP_YUVA_API_BASE}/donation`,
  /** Donation status update — server-to-server, POST gateway result (secret-gated). */
  DONATION_UPDATE: `${WP_YUVA_API_BASE}/donation/update`,
  /** Donation purpose options — public GET for the donate form dropdown. */
  DONATION_PURPOSES: `${WP_YUVA_API_BASE}/donation/purposes`,
} as const;

/**
 * Query parameters applied to every page fetch.
 */
export const WP_QUERY = {
  SCF_FORMAT: "standard",
  PAGE_FIELDS: "scf,slug,title,yoast_head_json,seo,modified_gmt",
  /**
   * Lean field set for post list cards. No `_embed` / `_embedded`: the featured
   * image + category are resolved via batched /media + /categories lookups
   * instead (see fetchPosts), which is ~3x faster and ~20-30x smaller than embed.
   */
  POST_LIST_FIELDS: "id,slug,date,title,excerpt,categories,featured_media",
  /** Detail/single-post field set — list fields plus the rendered body. */
  POST_DETAIL_FIELDS:
    "id,slug,date,title,excerpt,content,categories,featured_media",
  /** Lean field set for post SEO metadata (generateMetadata). */
  POST_META_FIELDS: "slug,title,excerpt,yoast_head_json,seo,modified_gmt",
  /** Lean field set for press article SEO metadata. */
  PRESS_META_FIELDS: "slug,title,excerpt,yoast_head_json,seo,modified_gmt",
} as const;

/**
 * Stable, kebab-case slugs that match WordPress page slugs.
 */
export const PAGE_SLUGS = {
  HOME: "home-new",
  VOICE_OF_CHANGE: "voice-of-change",
  IMPACT: "impact-new",
  OUR_VISION: "our-vision-new",
  OUR_PEOPLE: "our-people-new",
  OUR_STORY: "our-story-new",
  ANGANWADI_TRANSFORMATION: "anganwadi-transformation-programme",
  SCHOLARSHIP: "scholarship-programme",
  SKILL_DEVELOPMENT: "skill-and-employability-programme",
  AGROFORESTRY: "environment-and-climate-action-programme",
  SCHOOL_TRANSFORMATION: "school-transformation-programme",
  COMMUNITY_RESPONSE: "community-response",
  CONTACT: "contact-us-new",
  DONATE: "donate-new",
  VOLUNTEER: "volunteer-new",
  CSR_PARTNERS: "csr-partners",
  AUDIT_PARTNERS: "audit-partners-new",
  DONORS_AUDIT_PARTNERS: "donors-audit-partners",
  ANNUAL_REPORTS: "annual-reports-new",
  GALLERY: "gallery-new",
  BLOGS: "blogs-new",
  PRESS_AND_MEDIA: "press-and-media-new",
  CAREERS: "careers",
  LIFE_AT_YUVA: "life-at-yuva",
  AWARD_RECOGNITION: "award-recognition-new",
  ALIGNMENT_WITH_UN_SDGS: "alignment-with-un-sdgs-new",
} as const;

/**
 * Next.js ISR revalidation windows, in seconds.
 */
export const REVALIDATE_TIME = {
  PAGES: 900,
  GLOBAL: 900,
  /**
   * Blog posts/list. Editorial content changes infrequently, so a longer window
   * avoids needless slow upstream re-renders. 5 minutes; raise toward 600 (10
   * min) if blogs change even less often.
   */
  POSTS: 900,
} as const;

/**
 * Per-page ISR override.
 */
export const PAGE_REVALIDATE: Record<string, number> = {
  [PAGE_SLUGS.HOME]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.VOICE_OF_CHANGE]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.IMPACT]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.OUR_VISION]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.OUR_PEOPLE]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.OUR_STORY]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.CONTACT]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.DONATE]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.VOLUNTEER]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.CAREERS]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.LIFE_AT_YUVA]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.AWARD_RECOGNITION]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.ALIGNMENT_WITH_UN_SDGS]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.COMMUNITY_RESPONSE]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.CSR_PARTNERS]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.AUDIT_PARTNERS]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.DONORS_AUDIT_PARTNERS]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.ANNUAL_REPORTS]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.GALLERY]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.BLOGS]: REVALIDATE_TIME.PAGES,
  [PAGE_SLUGS.PRESS_AND_MEDIA]: REVALIDATE_TIME.PAGES,
};
