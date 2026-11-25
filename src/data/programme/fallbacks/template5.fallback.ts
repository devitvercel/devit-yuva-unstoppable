import type {ProgrammePageData} from "@/types/programme/programme.types";
import {heroDataFallback} from "@/data/programme/sections/hero.t5";
import {programmeDataFallback as infoDataFallback} from "@/data/programme/sections/info.t5";
import {programmeTemplateDataFallback} from "@/data/programme/sections/templateNo.t5";
import {programmeDataFallback as programmesDataFallback} from "@/data/programme/sections/programmes";
import {programmeLargeBannerDataFallback} from "@/data/programme/sections/largeBanner";
import {numbersDataFallback} from "@/data/programme/sections/numbers";
import {studentTestimonialDataFallback} from "@/data/programme/sections/studentTestimonial";

export const PROGRAMME_FALLBACK_T5: ProgrammePageData = {
  hero: heroDataFallback,
  programmeTemplate: programmeTemplateDataFallback,
  programmeInfo: infoDataFallback,
  programmes: programmesDataFallback.programmes,
  programmeLargeBanner: programmeLargeBannerDataFallback,
  numbers: numbersDataFallback,
  studentTestimonial: studentTestimonialDataFallback,
};
