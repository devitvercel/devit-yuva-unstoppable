import type {ProgrammePageData} from "@/types/programme/programme.types";
import {heroDataFallback} from "@/data/programme/sections/hero.t1";
import {programmeDataFallback} from "@/data/programme/sections/info.t1";
import {commitmentDataFallback} from "@/data/programme/sections/commitment.t1";
import {programmeLargeBannerDataFallback} from "@/data/programme/sections/largeBanner";
import {programmeTemplateDataFallback} from "@/data/programme/sections/templateNo.t1";
import {numbersDataFallback} from "@/data/programme/sections/numbers";
import {studentTestimonialDataFallback} from "@/data/programme/sections/studentTestimonial";

export const PROGRAMME_FALLBACK: ProgrammePageData = {
  hero: heroDataFallback,
  programmeTemplate: programmeTemplateDataFallback,
  programmeInfo: programmeDataFallback,
  programmeCommitment: commitmentDataFallback,
  programmeLargeBanner: programmeLargeBannerDataFallback,
  numbers: numbersDataFallback,
  studentTestimonial: studentTestimonialDataFallback,
};
