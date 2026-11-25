import {markFallback} from "@/lib/utils";
import type {LargeBannerSectionType} from "@/types/home/home.types";

export const largeBannerDataFallback: LargeBannerSectionType = {
  eyebrow: markFallback("Twenty One years of impact. A lifetime of possibilities still ahead."),
  title: markFallback("Together, We Are Unstoppable"),
  body: markFallback("Every partnership, every volunteer, every act of generosity helps create opportunities that last for generations."),
  cta1: {
    text: markFallback("Donate"),
    href: "/donate"
  },
  cta2: {
    text: markFallback("Volunteer"),
    href: "/volunteer"
  }
}