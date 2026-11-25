import {markFallback} from "@/lib/utils";
import type {VocHeroSectionType} from "@/types/voiceOfChange/voiceOfChange.types";

export const vocHeroFallback: VocHeroSectionType = {
  eyebrow: markFallback("OUR STORY · EST. 2005."),
  title1: markFallback("Twenty one years of putting children"),
  highlightedTitle: markFallback("first."),
  body: markFallback(
    "What began in 2005 as a belief that every child deserves dignity has grown into a movement reaching millions. For two decades, Yuva Unstoppable has worked to ensure that education is not limited by something as basic as access to safe sanitation, clean water, nutrition, and opportunity."
  ),
  cta: {
    text: markFallback("Read Full Story"),
    href: "/our-story",
  },
  img: {
    src: "/assets/pages/voiceofchange/hero-v2.avif",
    alt: "Child reading a book",
  },
};
