import {markFallback} from "@/lib/utils";
import type {ProgrammeHeroSectionType} from "@/types/programme/programme.types";

export const heroDataFallback: ProgrammeHeroSectionType = {
  title: markFallback("SCHOOL Transformation Programs "),
  img: {
    src: "/assets/pages/programme/programme-template-5-img.avif",
    alt: "Programme Template 5 img"
  }
};