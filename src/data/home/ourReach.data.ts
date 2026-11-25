import {markFallback} from "@/lib/utils";
import type {OurReachSectionType} from "@/types/home/home.types";
import {APP_ROUTES} from "@/constants/navigation.constants";

export const ourReachDataFallback: OurReachSectionType = {
  heading: markFallback("OUR REACH"),
  title: markFallback("From 22+ states to one village at a time."),
  body: markFallback(
    "Every number represents a child who stayed in school, a young person who found opportunity, a family that became more resilient, or a community that found hope."
  ),
  stats: [
    {
      number: 22,
      suffix: markFallback("+"),
      title: markFallback("STATES REACHED"),
    },
    {
      number: 312,
      title: markFallback("DISTRICTS"),
    },
    {
      number: 7021,
      title: markFallback("VILLAGES"),
    },
  ],
  cta: {
    text: markFallback("Explore our impact"),
    href: APP_ROUTES.IMPACT,
  },
  img: {
    src: "/assets/pages/home/india-map-outline.avif",
    alt: markFallback("India map outline"),
  },
};
