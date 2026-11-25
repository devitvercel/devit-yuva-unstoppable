import {markFallback} from "@/lib/utils";
import type {ProgrammeHeroSectionType} from "@/types/programme/programme.types";

export const heroDataFallback: ProgrammeHeroSectionType = {
  title: markFallback("The Agroforestry Initiative"),
  img: {
    src: "/assets/pages/programme/programme-template-4-img.avif",
    alt: "Programme Template 4 img"
  }
};