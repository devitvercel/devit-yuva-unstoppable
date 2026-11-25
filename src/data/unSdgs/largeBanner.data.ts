import { markFallback } from "@/lib/utils";
import type { LargeBannerSectionType } from "@/types/home/home.types";

export const largeBannerDataFallback: LargeBannerSectionType = {
  eyebrow: markFallback("THE MISSION CONTINUES"),
  title: markFallback("Together, We Are Unstoppable"),
  body: markFallback(
    "Twenty one years in. Ten million lives touched. The next twenty one start with you."
  ),
  cta1: {
    text: markFallback("Donate"),
    href: "/donate",
  },
  cta2: {
    text: markFallback("Volunteer"),
    href: "/volunteer",
  },
};
