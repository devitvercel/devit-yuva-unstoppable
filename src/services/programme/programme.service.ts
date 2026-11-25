import {cache} from "react";
import {fetchWPPage, resolveMediaId} from "@/lib/wordpress";
import {parseProgrammePage} from "@/lib/parsers/programme/programme.parser";
import {
  getProgrammeRouteConfig,
  PROGRAMME_ROUTE_CONFIG,
  type ProgrammeFallbackTemplate,
} from "@/constants/programme.routes.constants";
import {PROGRAMME_FALLBACK} from "@/data/programme/fallbacks/template1.fallback";
import {PROGRAMME_FALLBACK_T2} from "@/data/programme/fallbacks/template2.fallback";
import {PROGRAMME_FALLBACK_T3} from "@/data/programme/fallbacks/template3.fallback";
import {PROGRAMME_FALLBACK_T4} from "@/data/programme/fallbacks/template4.fallback";
import {PROGRAMME_FALLBACK_T5} from "@/data/programme/fallbacks/template5.fallback";
import type {ProgrammePageData, ProgrammePageScf,} from "@/types/programme/programme.types";
import {
  PERSON_IMAGE_PLACEHOLDER,
  hasPersonImage,
} from "@/constants/personPlaceholder.constants";

async function resolvePersonImage(src: string): Promise<string> {
  const resolved = await resolveMediaId(src);
  return hasPersonImage(resolved) ? resolved : PERSON_IMAGE_PLACEHOLDER;
}

const FALLBACK_BY_TEMPLATE: Record<ProgrammeFallbackTemplate, ProgrammePageData> = {
  1: PROGRAMME_FALLBACK,
  2: PROGRAMME_FALLBACK_T2,
  3: PROGRAMME_FALLBACK_T3,
  4: PROGRAMME_FALLBACK_T4,
  5: PROGRAMME_FALLBACK_T5,
};

/** Built from PROGRAMME_ROUTE_CONFIG — see programme.routes.constants.ts to edit routes. */
const PROGRAMME_ROUTES: Record<string, { wpSlug: string; fallback: ProgrammePageData }> =
  Object.fromEntries(
    PROGRAMME_ROUTE_CONFIG.map((route) => [
      route.slug,
      {
        wpSlug: route.wpSlug,
        fallback: FALLBACK_BY_TEMPLATE[route.fallbackTemplate],
      },
    ])
  );

/**
 * Resolve a clean programme route slug (e.g. "agroforestry") to the WordPress
 * page slug to fetch (e.g. "agroforestry-new"). Returns null for non-programme
 * slugs. Used by metadata fetching so it queries the same WP page as the content.
 */
export function resolveProgrammeWpSlug(slug: string): string | null {
  return getProgrammeRouteConfig(slug)?.wpSlug ?? null;
}

/**
 * WordPress returns `scf: []` (empty array) when a page has no SCF field group
 * registered/published, or `{}` when the group exists but is unfilled. Either way
 * there's no real content to parse, so callers should use the static fallback.
 * Returns true only when `scf` is an object with at least one populated key.
 */
function hasUsableScf(scf: ProgrammePageScf | undefined | null): scf is ProgrammePageScf {
  if (!scf || typeof scf !== "object" || Array.isArray(scf)) return false;
  return Object.keys(scf).length > 0;
}

/**
 * Programme page service for Yuva
 * ---------------------------------------------------------------------------
 * Single entry-point used to retrieve a specific programme page content by slug.
 */
export const getProgrammePageData = cache(
  async (slug: string): Promise<ProgrammePageData | null> => {
    // `slug` is the clean route slug from the URL (e.g. "agroforestry").
    const route = PROGRAMME_ROUTES[slug.toLowerCase()];

    // Not a known programme route → let the caller 404.
    if (!route) return null;

    const slugFallback = route.fallback;
    // Fetch by the WordPress slug (carries "-new" today), not the route slug.
    const response = await fetchWPPage<ProgrammePageScf>(route.wpSlug);

    if (!response.data) {
      console.warn(
        `[getProgrammePageData] Falling back to static content for slug "${slug}" — ${response.error}`
      );
      return slugFallback;
    }

    // The page exists but its SCF group may be missing/unpublished, in which case
    // WordPress returns `scf: []` (or an empty object). Parsing that would fill every
    // field with Template-1 defaults and force `template = 1`, rendering the WRONG
    // template. So when there's no usable SCF payload, use the slug's static fallback
    // (which carries the correct template number + content) instead of parsing.
    const rawScf = response.data.scf ?? response.data.acf;
    if (!hasUsableScf(rawScf)) {
      console.warn(
        `[getProgrammePageData] Empty SCF for slug "${slug}" — using static fallback (sync the Programme field group in WP to enable live content).`
      );
      return slugFallback;
    }

    // Parse with THIS template's fallback as the per-section default, so any
    // section WP didn't fill uses the right template's content (no mixing).
    const data = parseProgrammePage(rawScf, slugFallback);

    if (data.hero?.img?.src) {
      data.hero.img.src = await resolveMediaId(data.hero.img.src);
    }

    if (data.programmeLargeBanner?.img?.src) {
      data.programmeLargeBanner.img.src = await resolveMediaId(data.programmeLargeBanner.img.src);
    }

    if (data.programmeCommitment?.cards?.length) {
      data.programmeCommitment.cards = await Promise.all(
        data.programmeCommitment.cards.map(async (card) =>
          card.img?.src
            ? {...card, img: {...card.img, src: await resolveMediaId(card.img.src)}}
            : card
        )
      );
    }

    if (data.supportSystem?.cards?.length) {
      data.supportSystem.cards = await Promise.all(
        data.supportSystem.cards.map(async (card) => ({
          ...card,
          img: {...card.img, src: await resolveMediaId(card.img.src)},
        }))
      );
    }

    if (data.numbers?.img?.src) {
      data.numbers.img.src = await resolveMediaId(data.numbers.img.src);
    }

    if (data.realWorldChange?.img?.src) {
      data.realWorldChange.img.src = await resolveMediaId(data.realWorldChange.img.src);
    }

    if (data.view?.img?.src) {
      data.view.img.src = await resolveMediaId(data.view.img.src);
    }

    if (data.studentTestimonial?.testimonials?.length) {
      data.studentTestimonial.testimonials = await Promise.all(
        data.studentTestimonial.testimonials.map(async (testimonial) => ({
          ...testimonial,
          img: {
            ...testimonial.img,
            src: await resolvePersonImage(testimonial.img.src),
          },
        }))
      );
    }

    if (data.programmes?.length) {
      data.programmes = await Promise.all(
        data.programmes.map(async (programme) => ({
          ...programme,
          img: {...programme.img, src: await resolveMediaId(programme.img.src)},
        }))
      );
    }

    return data;
  }
);

