import type { LargeBannerSectionType } from "@/types/home/home.types";
import { markFallback } from "@/lib/utils";

export const volunteerLargeBannerDataFallback: LargeBannerSectionType = {
  eyebrow: markFallback(""),
  title: markFallback("Can't volunteer? Donate instead."),
  body: markFallback(""),
  cta1: {
    text: markFallback("Donate Now"),
    href: "/donate"
  },
  cta2: {
    text: markFallback("Apply for Scholarship"),
    href: "/scholarship"
  }
};