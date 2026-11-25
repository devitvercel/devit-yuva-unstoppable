import {markFallback} from "@/lib/utils";
import type {ProgrammeInfoSectionType} from "@/types/programme/programme.types";

export const programmeDataFallback: ProgrammeInfoSectionType = {
  heading: markFallback("ABOUT SCHOOL TRANSFORMATION"),
  title: markFallback("Empowering Future Generations"),
  body: [
    markFallback("We are committed to transforming schools into hubs of excellence and resilience.")
  ],
};
