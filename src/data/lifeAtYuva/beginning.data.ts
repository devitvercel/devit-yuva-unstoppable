import {markFallback} from "@/lib/utils";
import type {OurStoryContentBlockType} from "@/types/ourStory/ourStory.types";

export const beginningDataFallback: OurStoryContentBlockType = {
  eyebrow: markFallback("THE BEGINNING"),
  title: markFallback("It started with a simple, quiet realisation."),
  paragraphs: [
    markFallback(
      "In 2005, Yuva Unstoppable didn't start with strategy decks or grand theories of change. It began with a simple, quiet realisation: that education is the most powerful tool for change, yet for millions of children, it was being limited by a lack of basic dignity."
    ),
    markFallback(
      'Founded by <strong>Amitabh Shah</strong>, a Yale graduate who walked away from a corporate career, we started as a small, volunteer-led movement. Our early days weren\'t about complex metrics; they were about <em>seva</em>.'
    ),
    markFallback(
      "We were fixing what was visibly broken — toilets, drinking water, leaking classrooms. We understood that if a child is forced to compromise on their environment, they are, in effect, being asked to lower their expectations. We decided that was not an option."
    ),
  ],
  badge: {
    label: markFallback("FOUNDED"),
    detail: markFallback("2005 · Ahmedabad"),
  },
  img: {
    src: "/assets/pages/life-at-yuva/beginning.avif",
    alt: "A child learning with colourful educational materials",
  },
};
