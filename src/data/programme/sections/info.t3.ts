import {markFallback} from "@/lib/utils";
import type {ProgrammeInfoSectionType} from "@/types/programme/programme.types";

export const programmeDataFallback: ProgrammeInfoSectionType = {
  heading: markFallback("THE PROBLEM"),
  title: markFallback("The Education-Industry Divide"),
  body: [
    markFallback("Traditional education often struggles to keep pace with the hyper-competitive demands of the modern workforce. While students have academic knowledge, they often lack the \"work-ready\" edge. We’ve moved past the old narrative of simply finding placements. We are in the business of facilitating high-trajectory careers")
  ],
}