import {markFallback} from "@/lib/utils";
import type {OurStoryQuoteSectionType} from "@/types/ourStory/ourStory.types";

export const ourStoryQuoteFallback: OurStoryQuoteSectionType = {
  quote: markFallback(
    "We believe that the infrastructure of a school is the architecture of a child’s ambition. When we provide a world-class environment, we aren't just renovating buildings, we are elevating the possibilities of every child inside them."
  ),
  quoteHighlight: markFallback("lower their expectations."),
  attribution: markFallback("YUVA UNSTOPPABLE · CORE BELIEF · EST. 2005"),
};
