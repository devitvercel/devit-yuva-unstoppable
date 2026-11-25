import type { BlogTemplatePageData } from "@/types/programme/blogTemplate.types";
import { markFallback } from "@/lib/utils";
import { EMERGENCY_RESPONSE_FALLBACK } from "@/data/programme/fallbacks/emergencyResponse.fallback";
import { OTHER_INITIATIVE_FALLBACK } from "@/data/programme/fallbacks/otherInitiative.fallback";

/**
 * Combined fallback for the merged Community Response page
 * (formerly Emergency Response + Other Initiative).
 */
export const COMMUNITY_RESPONSE_FALLBACK: BlogTemplatePageData = {
  hero: {
    kicker: markFallback("STRATEGIC COLLABORATION"),
    title: markFallback("Community Response"),
    description: markFallback(
      "From disaster relief and emergency response to clean water, sanitation, and community welfare — Yuva Unstoppable stands with partners and communities when it matters most."
    ),
    img: {
      src: "/assets/pages/programme/programme-large-banner-img.avif",
      alt: "Community Response Hero Image",
    },
  },
  articles: [
    ...EMERGENCY_RESPONSE_FALLBACK.articles,
    ...OTHER_INITIATIVE_FALLBACK.articles,
  ],
  largeBanner: EMERGENCY_RESPONSE_FALLBACK.largeBanner,
};
