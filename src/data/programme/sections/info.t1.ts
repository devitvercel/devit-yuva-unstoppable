import {markFallback} from "@/lib/utils";
import type {ProgrammeInfoSectionType} from "@/types/programme/programme.types";

export const programmeDataFallback: ProgrammeInfoSectionType = {
  heading: markFallback("ABOUT ANGANWADI TRANSFORMATION"),
  title: markFallback("Building the Foundation for a Lifetime"),
  body: [
    markFallback("Every child deserves a foundation built on health, opportunity, and care. Our mission is to bridge the gap in early childhood development, ensuring that every mother has the support she needs and every child has the environment required to thrive.")
  ],
}