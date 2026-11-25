import {markFallback} from "@/lib/utils";
import type {UnSdgsHeroSectionType} from "@/types/unSdgs/unSdgs.types";

export const heroDataFallback: UnSdgsHeroSectionType = {
  eyebrow: markFallback("United Nations · 2030 Agenda"),
  titleLine1: markFallback("Aligned with"),
  titleLine2: markFallback("the world's "),
  titleHighlight: markFallback("most ambitious agenda."),
  bodyLead: markFallback("17 goals. 169 targets. "),
  bodyBold: markFallback("One blueprint for the planet."),
  bodyRest: markFallback(
    " We translate the Sustainable Development Goals into ground level outcomes – maintaining global standard in every classroom, scholarship, and sanitation block."
  ),
  img: {
    src: "/assets/pages/un-sdgs/hero-figma.avif",
    alt: "Students gathered around a water purification unit at school",
  },
  watermark: markFallback("2030"),
};
