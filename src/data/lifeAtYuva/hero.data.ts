import {markFallback} from "@/lib/utils";
import type {LifeAtYuvaHeroSectionType} from "@/types/lifeAtYuva/lifeAtYuva.types";

export const heroDataFallback: LifeAtYuvaHeroSectionType = {
  heading: markFallback("The people behind the impact."),
  highlightedTitle: markFallback("Life at"),
  title: markFallback("YUVA"),
  body: markFallback(
    "Meet the passionate people driving change across communities."
  ),
  img: {
    src: "/assets/pages/life-at-yuva/hero.avif",
    alt: "Yuva team with smiling school children",
  },
};
