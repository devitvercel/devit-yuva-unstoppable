import {markFallback} from "@/lib/utils";
import type {ProgrammeHeroSectionType} from "@/types/programme/programme.types";

export const heroDataFallback: ProgrammeHeroSectionType = {
  title: markFallback("Skill Development"),
  body: markFallback("A university degree is a starting point, not the destination. At Yuva Unstoppable, we believe that true empowerment lies in the transition from the classroom to the boardroom. We aren’t just teaching skills; we are building bridges. Our goal is to ensure that young graduates don’t just find jobs, they find the right career paths that allow them to thrive, scale, and become the leaders our country needs."),
  img: {
    src: "/assets/pages/programme/programme-template-3-img.avif",
    alt: "Programme Template 3 img"
  }
};