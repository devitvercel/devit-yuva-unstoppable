import type {ProgrammePageData} from "@/types/programme/programme.types";
import {heroDataFallback} from "@/data/programme/sections/hero.t4";
import {programmeDataFallback} from "@/data/programme/sections/info.t4";
import {programmeTemplateDataFallback} from "@/data/programme/sections/templateNo.t4";
import {programmeLargeBannerDataFallback} from "@/data/programme/sections/largeBanner";
import {supportSystemDataFallback} from "@/data/programme/sections/supportSystem.t4";
import {numbersDataFallback} from "@/data/programme/sections/numbers.t4";
import {ourVisionDataFallback} from "@/data/programme/sections/ourVision";
import {viewDataFallback} from "@/data/programme/sections/view.t4";
import {realWorldChangeDataFallback} from "@/data/programme/sections/realWorldChange.t4";
import {studentTestimonialDataFallback} from "@/data/programme/sections/studentTestimonial";

export const PROGRAMME_FALLBACK_T4: ProgrammePageData = {
  hero: heroDataFallback,
  programmeTemplate: programmeTemplateDataFallback,
  programmeInfo: programmeDataFallback,
  supportSystem: supportSystemDataFallback,
  numbers: numbersDataFallback,
  ourVision: ourVisionDataFallback,
  view: viewDataFallback,
  realWorldChange: realWorldChangeDataFallback,
  programmeLargeBanner: programmeLargeBannerDataFallback,
  studentTestimonial: studentTestimonialDataFallback,
};

