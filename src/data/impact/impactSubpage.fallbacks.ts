import type { ImpactSubpageData } from "@/types/impact/impact.types";
import { ANNUAL_REPORTS_FALLBACK } from "./fallbacks/annualReports.fallback";

export const IMPACT_SUBPAGE_FALLBACKS: Record<string, ImpactSubpageData> = {
  "annual-reports": ANNUAL_REPORTS_FALLBACK,
};
