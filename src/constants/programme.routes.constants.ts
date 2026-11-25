import { PAGE_SLUGS } from "@/constants/wp.constants";

/**
 * Programme route registry — single source of truth for programme URLs.
 * ---------------------------------------------------------------------------
 * Change `slug` here to update the frontend route, navbar, footer, sitemap,
 * and WordPress fetch mapping in one place.
 *
 * `slug`     → URL path segment (`/${slug}`)
 * `wpSlug`   → WordPress page slug to fetch (via PAGE_SLUGS)
 * `fallbackTemplate` → which static fallback template the service uses (1–5)
 */
export type ProgrammeFallbackTemplate = 1 | 2 | 3 | 4 | 5;

export interface ProgrammeRouteConfig {
  slug: string;
  label: string;
  footerLabel: string;
  wpSlug: string;
  fallbackTemplate: ProgrammeFallbackTemplate;
}

export const PROGRAMME_ROUTE_CONFIG: readonly ProgrammeRouteConfig[] = [
  {
    slug: "school-transformation",
    label: "School Transformation",
    footerLabel: "School Transformation",
    wpSlug: PAGE_SLUGS.SCHOOL_TRANSFORMATION,
    fallbackTemplate: 5,
  },
  {
    slug: "scholarship",
    label: "Scholarships",
    footerLabel: "Scholarships",
    wpSlug: PAGE_SLUGS.SCHOLARSHIP,
    fallbackTemplate: 2,
  },
  {
    slug: "skill-and-employability",
    label: "Skilling & Employability",
    footerLabel: "Skilling & Employability",
    wpSlug: PAGE_SLUGS.SKILL_DEVELOPMENT,
    fallbackTemplate: 3,
  },
  {
    slug: "anganwadi-transformation",
    label: "Anganwadi Transformation",
    footerLabel: "Anganwadi",
    wpSlug: PAGE_SLUGS.ANGANWADI_TRANSFORMATION,
    fallbackTemplate: 1,
  },
  {
    slug: "environment-and-climate-action",
    label: "Environment & Climate Action",
    footerLabel: "Environment & Climate Action",
    wpSlug: PAGE_SLUGS.AGROFORESTRY,
    fallbackTemplate: 4,
  },
] as const;

/** Lookup a programme route by its URL slug (case-insensitive). */
export function getProgrammeRouteConfig(slug: string): ProgrammeRouteConfig | undefined {
  return PROGRAMME_ROUTE_CONFIG.find((item) => item.slug === slug.toLowerCase());
}

/** Nav/footer link objects derived from the programme registry. */
export const PROGRAMME_NAV_LINKS = PROGRAMME_ROUTE_CONFIG.map(({ slug, label }) => ({
  label,
  href: `/${slug}`,
}));

export const PROGRAMME_FOOTER_LINKS = PROGRAMME_ROUTE_CONFIG.map(({ slug, footerLabel }) => ({
  label: footerLabel,
  href: `/${slug}`,
}));
