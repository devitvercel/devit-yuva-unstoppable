import {markFallback} from "@/lib/utils";
import type {ProgrammeHeroSectionType} from "@/types/programme/programme.types";

export const heroDataFallback: ProgrammeHeroSectionType = {
  title: markFallback("Scholarships to High-Trajectory Careers"),
  img: {
    src: "/assets/pages/programme/programme-template-2-img-new.avif",
    alt: "Programme Template 2 img"
  }
};