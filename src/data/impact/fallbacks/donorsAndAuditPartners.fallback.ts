import type { ImpactSubpageData } from "@/types/impact/impact.types";
import { partnersCta } from "../sections/cta";
import { partners, partnersTabs } from "../sections/partners";
import { markFallback } from "@/lib/utils";

const donorsAndAuditHero = {
  eyebrow: markFallback("STRATEGIC COLLABORATION"),
  title: markFallback("Donors & Audit Partners"),
  body: markFallback(
    "Yuva Unstoppable gratefully acknowledges the support received from our CSR donors and audit partners who believe in our efforts, champion our cause and remain UNSTOPPABLE with us."
  ),
  img: {
    src: "/assets/pages/contact/contact-hero-img.avif",
    alt: "Donors and audit partners",
  },
};

export const DONORS_AND_AUDIT_PARTNERS_FALLBACK: ImpactSubpageData = {
  template: 1,
  hero: donorsAndAuditHero,
  tabs: partnersTabs,
  partners,
  reports: [],
  cta: partnersCta,
};
