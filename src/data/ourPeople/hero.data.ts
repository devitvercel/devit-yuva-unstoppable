import {markFallback} from "@/lib/utils";
import type {OurVisionHeroSectionType} from "@/types/ourVision/ourVision.types";

export const heroDataFallback: OurVisionHeroSectionType = {
  heading: markFallback("STRATEGIC COLLABORATION"),
  title: markFallback("Team"),
  highlightedTitle: markFallback("Our"),
  body: markFallback("Yuva Unstoppable gratefully acknowledges the support received from our partners who believe in our efforts, champion our cause and remain UNSTOPPABLE with us."),
  img: {
    src: "/assets/pages/ourTeam/yuva-team.avif",
    alt: "our-vision-img",
  }
};