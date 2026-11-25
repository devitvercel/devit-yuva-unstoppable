import type { ImpactPageData } from "@/types/impact/impact.types";
import { impactHeroFallback } from "./impactHero.data";
import { impactNumbersFallback } from "./impactNumbers.data";
import { impactReportsFallback } from "./impactReports.data";

export const IMPACT_FALLBACK: ImpactPageData = {
  hero: impactHeroFallback,
  numbersSection: impactNumbersFallback,
  reportsSection: impactReportsFallback,
};
