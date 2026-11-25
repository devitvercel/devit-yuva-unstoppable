import { markFallback } from "@/lib/utils";
import type { OurStoryHeroSectionType } from "@/types/ourStory/ourStory.types";

export const ourStoryHeroFallback: OurStoryHeroSectionType = {
  eyebrow: markFallback("OUR STORY · EST. 2005"),
  title1: markFallback("Our"),
  highlightedTitle: markFallback("Journey"),
  body: markFallback(
    "In 2005, Yuva Unstoppable began with a simple, quiet realisation — that education is the most powerful tool for change, yet millions of children were being denied it by a lack of basic dignity."
  ),
  cta1: {
    text: markFallback("Read our story"),
    href: "#storyline",
  },
  cta2: {
    text: markFallback("Our vision"),
    href: "/our-vision",
  },
  img: {
    src: "/assets/pages/ourstory/hero.avif",
    alt: "Yuva Unstoppable – Our Story",
  },
};
