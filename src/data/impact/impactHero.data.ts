import { markFallback } from "@/lib/utils";
import type { ImpactHeroSectionType } from "@/types/impact/impact.types";

export const impactHeroFallback: ImpactHeroSectionType = {
  title1: markFallback("Impact Assessment:"),
  highlightedTitle: markFallback("Evidence-Based Transformation"),
  body: markFallback(
    "At Yuva Unstoppable, we view impact assessment as a holistic process that goes beyond output metrics. To ensure our interventions deliver meaningful, sustainable change, we combine independent academic rigour with continuous qualitative evaluation. This approach allows us to understand not just what we achieve, but how our presence fundamentally transforms the educational ecosystem."
  ),
  img: {
    src: "/assets/pages/impact/hero.avif",
    alt: "Women working in tea garden",
  },
  validationCard: {
    eyebrow: markFallback("INDEPENDENT VALIDATION"),
    title: markFallback("London School of Economics India Observatory"),
    label: markFallback("CASE STUDY - 2020"),
  },
};
