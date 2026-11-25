import type {VolunteerHeroSectionType} from "@/types/volunteer/volunteer.types";
import {markFallback} from "@/lib/utils";

export const heroDataFallback: VolunteerHeroSectionType = {
  heading: markFallback("VOLUNTEERING SINCE 2005 · 150,000+ VOLUNTEERS"),
  title1: markFallback("Give your time. Change a "),
  highlightedTitle: markFallback("child's"),
  title2: markFallback("world."),
  body1: markFallback("Volunteering at Yuva is not a Saturday afternoon activity."),
  highlightedBody: markFallback("It's a commitment to showing up"),
  body2: markFallback("— for students and communities who are waiting."),
  cta1: {
    text: markFallback("Apply to Volunteer"),
    href: "#volunteer-form"
  },
  cta2: {
    text: markFallback("How to Help"),
    href: "#how-to-help"
  },
  img: {src: "/assets/pages/volunteer/volunteer-hero-img.avif", alt: "volunteer hero img"},
  badge: {
    title: markFallback("150K+"),
    body: markFallback("VOLUNTEERS SINCE 2005"),
  }
}