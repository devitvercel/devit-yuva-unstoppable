import {markFallback} from "@/lib/utils";
import type {ProgrammeHeroSectionType} from "@/types/programme/programme.types";

export const heroDataFallback: ProgrammeHeroSectionType = {
  title: markFallback("Anganwadi Transformation"),
  img: {
    src: "/assets/pages/programme/programme-template-1-img.avif",
    alt: "Programme Template 1 img"
  }
};