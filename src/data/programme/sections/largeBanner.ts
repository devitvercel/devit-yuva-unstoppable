import {markFallback} from "@/lib/utils";
import type {ProgrammeLargeBannerSectionType} from "@/types/programme/programme.types";

export const programmeLargeBannerDataFallback: ProgrammeLargeBannerSectionType = {
  heading: markFallback("THE MISSION CONTINUES"),
  title: markFallback("Join Us in Creating Brighter Futures"),
  body: markFallback("We are trusted by communities and partners to create measurable, sustainable change. We know the scale of the need is vast, and the challenge ahead is significant. That is why we are deeply grateful to be joining forces with visionary partners. Together, we have set our sights on an ambitious, necessary horizon — and when you look at the millions of lives whose futures are waiting for this very support, it is the only work that matters."),
  cta1: {
    title: markFallback("Donate"),
    href: "/donate",
  },
  cta2: {
    title: markFallback("Volunteer"),
    href: "/volunteer",
  },
  img: { src: "/assets/pages/programme/programme-large-banner-img.avif", alt: "programme large banner img" }
}