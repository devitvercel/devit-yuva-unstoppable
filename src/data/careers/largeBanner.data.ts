import {markFallback} from "@/lib/utils";
import type {LargeBannerSectionType} from "@/types/home/home.types";

export const largeBannerDataFallback: LargeBannerSectionType = {
  eyebrow: markFallback("Twenty One years of impact. A lifetime of possibilities still ahead."),
  title: markFallback("Together, We Are Unstoppable"),
  body: markFallback("Every child, every meal, every classroom starts with one decision."),
  cta1: {
    text: markFallback("Donate"),
    href: "/donate"
  },
  cta2: {
    text: markFallback("Volunteer"),
    href: "/volunteer"
  }
}