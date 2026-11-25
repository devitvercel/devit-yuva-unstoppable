import {markFallback} from "@/lib/utils";
import type {OurVisionHeroSectionType} from "@/types/ourVision/ourVision.types";

export const heroDataFallback: OurVisionHeroSectionType = {
  heading: markFallback("STRATEGIC COLLABORATION"),
  title: markFallback("Vision"),
  highlightedTitle: markFallback("Our"),
  body: markFallback("Yuva Unstoppable gratefully acknowledges the support received from our partners who believe in our efforts, champion our cause and remain UNSTOPPABLE with us."),
  img: {
    src: "/assets/pages/ourVision/our-vision-img.avif",
    alt: "our-vision-img",
  }
};