import { markFallback } from "@/lib/utils";
import type { VocCtaBannerSectionType } from "@/types/voiceOfChange/voiceOfChange.types";

export const vocCtaBannerFallback: VocCtaBannerSectionType = {
  eyebrow: markFallback("THE MISSION CONTINUES"),
  title: markFallback("Together, We Are Unstoppable"),
  body: markFallback("Twenty one years in. Ten million lives touched.\nThe next twenty one start with you."),
  cta1: { text: markFallback("Donate"), href: "/donate" },
  cta2: { text: markFallback("Volunteer"), href: "/volunteer" },
};
