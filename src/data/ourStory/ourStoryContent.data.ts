import {markFallback} from "@/lib/utils";
import type {OurStoryContentSectionType} from "@/types/ourStory/ourStory.types";

export const ourStoryContentFallback: OurStoryContentSectionType = {
  blocks: [
    {
      eyebrow: markFallback("THE BEGINNING"),
      title: markFallback("It started with a simple, quiet realisation."),
      paragraphs: [
        markFallback("In 2005, Amitabh tracked his childhood care taker Kamlaben down to the remote village of Gontagaav. When he arrived, he found an 82-year-old woman in a state of severe neglect and abuse. "),
        markFallback("Amitabh brought her back to his home to nurse her back to health. He eventually placed her into a comfortable, supportive old age home in Ahmedabad where she could be properly cared for alongside peers."),
        markFallback("The raw exposure to Kamlaben's suffering, and the stories of abandonment shared by other elderly residents at her care home, completely shifted Amitabh's worldview. Though he went on to complete his MBA at Yale University, his priorities had irreversibly changed."),
        markFallback("Upon graduation, he received a high-paying Wall Street job offer from JPMorgan. Driven by his newfound purpose, he turned down the offer to work on the \"real streets of India\"")
      ],
      badge: {
        label: markFallback("FOUNDED"),
        detail: markFallback("2005 - Ahmedabad"),
      },
      img: {
        src: "/assets/pages/ourstory/e0647024c4e32b5f674d4135cfd614f68842221b.avif",
        alt: "A child playing with colourful puzzle pieces",
      },
    },
    {
      eyebrow: markFallback("THE EVOLUTION"),
      title: markFallback(
        "Children don't experience education in compartments. They experience it as life."
      ),
      paragraphs: [
        markFallback("Amitbah mobilized 150,000 volunteers, and what began as a youth driven volunteer group quickly evolved into something much larger. He realized that passion alone wasn't enough to solve systemic issues, Inida needed a structured approach to drive lasting change."),
        markFallback("He shifted the focus from ad-hoc volunteering to systematic intervention, prioritizing the fundamentals that hold children back: lack of sanitation, poor school infrastructure, and limited access to technology. By targeting these core pillars, Yuva Unstoppable began to transform not just individual lives, but the very environments where children learn and grow."),
      ],
      quote: markFallback(
        "Everything we do is guided by a simple belief: Doing Good is Fun. We are not just building schools; we are fostering a sense of self-belief, compassion, and gratitude."
      ),
      quoteHighlight: markFallback("Doing Good is Fun"),
      badge: {
        label: markFallback("EVOLVED"),
        detail: markFallback("2015 onwards"),
      },
      img: {
        src: "/assets/pages/ourstory/43967d3e4bebbef38e6ac2e81fd1c69c2d6f65e3.avif",
        alt: "Children learning in a classroom",
      },
    },
  ],
};
