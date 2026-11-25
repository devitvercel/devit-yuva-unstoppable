import { markFallback } from "@/lib/utils";
import type { TrustSectionType } from "@/types/home/home.types";

export const trustSectionDataFallback: TrustSectionType = {
  eyebrow: markFallback("AWARDS & RECOGNITION"),
  title: markFallback("Recognition Earned. Trust Built."),
  body: markFallback(
    "A mission is only as strong as the confidence it inspires. Over the past two decades, Yuva has earned the trust of governments, leading corporations, foundations, independent institutions and, most importantly, the communities we serve. Every partnership reflects a shared commitment to creating measurable, lasting impact."
  ),
  recognition: {
    title: markFallback("Recognition"),
    items: [
      markFallback("National & State Awards"),
      markFallback("Independent Evaluations"),
      markFallback("Global Recognition"),
      markFallback("Governance & Transparency"),
    ],
    ctaText: markFallback("Explore Awards & Recognition"),
    ctaLink: "/award-recognition",
  },
  trust: {
    title: markFallback("Built on Trust"),
    subtitle: markFallback(
      "Rather than leaving your registrations in the footer, this is where they become meaningful."
    ),
    items: [
      markFallback("80G & 12A Registered"),
      markFallback("FCRA Certified"),
      markFallback("Audited by KPMG"),
      markFallback("Transparent Governance"),
    ],
    description: markFallback(
      "These are trust signals rather than compliance badges."
    ),
  },
};
