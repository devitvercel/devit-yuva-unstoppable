import type { ImpactSubpageData } from "@/types/impact/impact.types";
import type { MediaPageData } from "@/types/media/media.types";
import { parseMediaPage } from "@/lib/parsers/media/media.parser";
import type { ImpactSubpageScf } from "@/types/impact/impact.types";

function toMediaFallback(fallback: ImpactSubpageData): MediaPageData {
  return {
    ...fallback,
    // Annual reports store filter tabs in `tabs`; media parser reads `categories`.
    categories: fallback.template === 2 ? fallback.tabs : [],
    gallery: [],
    articles: [],
  };
}

function toImpactSubpage(data: MediaPageData): ImpactSubpageData {
  const isAnnualReports = data.template === 2;
  // Annual reports use `categories` as filter tabs (same pattern as blogs/gallery).
  const tabs =
    isAnnualReports && data.categories.length > 0 ? data.categories : data.tabs;

  return {
    template: isAnnualReports ? 2 : 1,
    hero: data.hero,
    tabs,
    partners: data.partners,
    reports: data.reports,
    cta: data.cta,
  };
}

/** Normalizes impact sub-page SCF using the shared media parser + route fallback. */
export function parseImpactSubpage(
  scf: ImpactSubpageScf,
  fallback: ImpactSubpageData
): ImpactSubpageData {
  return toImpactSubpage(parseMediaPage(scf, toMediaFallback(fallback)));
}
