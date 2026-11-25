import type { ImpactSubpageData } from "@/types/impact/impact.types";
import { partnerHero } from "../sections/hero";
import { partnersCta } from "../sections/cta";
import { partners, partnersTabs } from "../sections/partners";

export const CSR_PARTNERS_FALLBACK: ImpactSubpageData = {
  template: 1,
  hero: partnerHero,
  tabs: partnersTabs,
  partners,
  reports: [],
  cta: partnersCta,
};
