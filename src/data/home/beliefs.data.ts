import { markFallback } from "@/lib/utils";
import type { BeliefsSectionType } from "@/types/home/home.types";

export const beliefsSectionDataFallback: BeliefsSectionType = {
  eyebrow: markFallback("OUR BELIEF"),
  title: markFallback(""),
  body: markFallback(""),
  beliefs: [
    {
      index: 1,
      eyebrow: markFallback(""),
      title: markFallback(""),
      body: markFallback(
        "But for millions of children, opportunity is still determined by where they are born—not by their talent, effort, or aspirations. Every child deserves the opportunity to fulfil their potential."
      ),
      img: {
        src: "/assets/pages/ourstory/image 9.png",
        alt: markFallback("Opportunity and Potential"),
      },
    },
    {
      index: 2,
      eyebrow: markFallback(""),
      title: markFallback(""),
      body: markFallback(
        "Over two decades of working alongside governments and communities across India, Yuva has learned a simple but powerful truth: lasting change cannot be achieved through isolated interventions. It requires stronger schools, healthier families, meaningful livelihoods, and a more sustainable future."
      ),
      highlight: markFallback("That is why we build beyond classrooms."),
      img: {
        src: "/assets/pages/home/google_classroom.avif",
        alt: markFallback(
          "A brighter government school classroom with desks, chalkboard, and learning tools"
        ),
      },
    },
    {
      index: 3,
      eyebrow: markFallback(""),
      title: markFallback(""),
      body: markFallback(
        "Together with governments, communities, corporate partners, and changemakers, Yuva builds resilient communities by bringing together education, environmental stewardship, and economic opportunity—creating the conditions for every child, every young person, and every family to thrive."
      ),
      points: [
        markFallback(
          "Because children learn better when schools are safe and inspiring."
        ),
        markFallback(
          "Young people succeed when education leads to meaningful livelihoods."
        ),
        markFallback(
          "Families prosper when communities are healthier, more resilient, and prepared for the future."
        ),
      ],
      highlight: markFallback(
        "That is why Yuva builds stronger communities—not isolated programmes."
      ),
      img: {
        src: "/assets/pages/ourstory/image 13.png",
        alt: markFallback("Stronger Communities"),
      },
    },
  ],
};
