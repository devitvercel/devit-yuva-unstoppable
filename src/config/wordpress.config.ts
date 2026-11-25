import {
  PAGE_REVALIDATE,
  PAGE_SLUGS,
  REVALIDATE_TIME,
  WP_API_BASE,
  WP_BASE_URL,
  WP_ENDPOINTS,
  WP_QUERY,
} from "@/constants/wp.constants";

/**
 * Single, structured handle for everything WordPress-related in Yuva.
 */
export const WP_CONFIG = {
  baseUrl: WP_BASE_URL,
  apiBase: WP_API_BASE,

  endpoints: {
    pages: WP_ENDPOINTS.PAGES,
    media: WP_ENDPOINTS.MEDIA,
    newsletter: WP_ENDPOINTS.NEWSLETTER,
    contact: WP_ENDPOINTS.CONTACT,
    volunteer: WP_ENDPOINTS.VOLUNTEER,
    donation: WP_ENDPOINTS.DONATION,
    donationUpdate: WP_ENDPOINTS.DONATION_UPDATE,
    donationPurposes: WP_ENDPOINTS.DONATION_PURPOSES,
  },

  /** Query params composed into every page fetch URL. */
  query: {
    scfFormat: WP_QUERY.SCF_FORMAT,
    pageFields: WP_QUERY.PAGE_FIELDS,
  },

  slugs: PAGE_SLUGS,

  revalidate: {
    pages: REVALIDATE_TIME.PAGES,
    global: REVALIDATE_TIME.GLOBAL,
    perPage: PAGE_REVALIDATE,
  },

  enableRawHeadInjection: process.env.NEXT_PUBLIC_RAW_HEAD_INJECTION === "true",
} as const;
