import type { ImpactSubpageData } from "@/types/impact/impact.types";
import { annualReportsHero } from "../sections/hero";
import { defaultCta } from "../sections/cta";
import { annualReportCategories, annualReports } from "../sections/annualReports";

export const ANNUAL_REPORTS_FALLBACK: ImpactSubpageData = {
  template: 2,
  hero: annualReportsHero,
  tabs: annualReportCategories,
  partners: [],
  reports: annualReports,
  cta: defaultCta,
};
