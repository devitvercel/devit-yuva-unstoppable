import type {ProgrammePageData} from "@/types/programme/programme.types";
import {heroDataFallback} from "@/data/programme/sections/hero.t2";
import {programmeDataFallback} from "@/data/programme/sections/info.t2";
import {programmeTemplateDataFallback} from "@/data/programme/sections/templateNo.t2";
import {programmeLargeBannerDataFallback} from "@/data/programme/sections/largeBanner";
import {supportSystemDataFallback} from "@/data/programme/sections/supportSystem";
import {realWorldChangeDataFallback} from "@/data/programme/sections/realWorldChange";
import {viewDataFallback} from "@/data/programme/sections/view";
import {numbersDataFallback} from "@/data/programme/sections/numbers";
import {studentTestimonialDataFallback} from "@/data/programme/sections/studentTestimonial";

export const PROGRAMME_FALLBACK_T2: ProgrammePageData = {
  hero: heroDataFallback,
  programmeTemplate: programmeTemplateDataFallback,
  programmeInfo: programmeDataFallback,
  supportSystem: supportSystemDataFallback,
  realWorldChange: realWorldChangeDataFallback,
  view: viewDataFallback,
  programmeLargeBanner: programmeLargeBannerDataFallback,
  numbers: numbersDataFallback,
  studentTestimonial: studentTestimonialDataFallback,
};
