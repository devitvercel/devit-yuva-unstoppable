import { markFallback } from "@/lib/utils";
import type { OurStoryApproachSectionType } from "@/types/ourStory/ourStory.types";

export const ourStoryApproachFallback: OurStoryApproachSectionType = {
  eyebrow: markFallback("OUR APPROACH"),
  title: markFallback("Education as a lifecycle, not a project."),
  body: markFallback(
    "We work across a spectrum of interventions — from early childhood through to employability."
  ),
  items: [
    {
      title: markFallback("School Transformation"),
      body: markFallback(
        "WASH facilities, libraries, nutrition, and learning infrastructure in 1700+ government schools."
      ),
    },
    {
      title: markFallback("Vidaan Scholarships"),
      body: markFallback(
        "Direct financial support for first-generation learners keeping girls in Class IX-XII in focus."
      ),
    },
    {
      title: markFallback("DigiKlass - Digital Classrooms"),
      body: markFallback(
        "Smart learning solutions enabling meaningful learning in government classrooms across 8 states."
      ),
    },
    {
      title: markFallback("Skill Development & Agri-Forestry"),
      body: markFallback(
        "Certified, vocational training and climate resilience for rural youth and communities."
      ),
    },
  ],
  img: {
    src: "/assets/pages/ourstory/f418c13f8f551a2fefa9dd0e6dca3f0a05387ba3.avif",
    alt: "Students learning in a classroom",
  },
};
