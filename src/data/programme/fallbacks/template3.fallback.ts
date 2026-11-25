import type {ProgrammePageData} from "@/types/programme/programme.types";
import {heroDataFallback} from "@/data/programme/sections/hero.t3";
import {programmeDataFallback} from "@/data/programme/sections/info.t3";
import {programmeTemplateDataFallback} from "@/data/programme/sections/templateNo.t3";
import {programmeLargeBannerDataFallback} from "@/data/programme/sections/largeBanner";
import {supportSystemDataFallback} from "@/data/programme/sections/supportSystem.t3";
import {studentJourneyDataFallback} from "@/data/programme/sections/studentJourney";
import {whyPartnerDataFallback} from "@/data/programme/sections/whyPartner";
import {studentTestimonialDataFallback} from "@/data/programme/sections/studentTestimonial";
import {numbersDataFallback} from "@/data/programme/sections/numbers";

export const PROGRAMME_FALLBACK_T3: ProgrammePageData = {
  hero: heroDataFallback,
  programmeTemplate: programmeTemplateDataFallback,
  programmeInfo: programmeDataFallback,
  programmeLargeBanner: programmeLargeBannerDataFallback,
  supportSystem: supportSystemDataFallback,
  studentJourney: studentJourneyDataFallback,
  whyPartner: whyPartnerDataFallback,
  numbers: numbersDataFallback,
  studentTestimonial: studentTestimonialDataFallback,
};
