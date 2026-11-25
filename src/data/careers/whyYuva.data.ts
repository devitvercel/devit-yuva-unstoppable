import {markFallback} from "@/lib/utils";
import type {CareersWhyYuvaSectionType} from "@/types/careers/careers.types";

export const whyYuvaDataFallback: CareersWhyYuvaSectionType = {
  heading: markFallback("WHY YUVA"),
  title: markFallback("Work that outlives"),
  highlightedTitle: markFallback("your resume."),
  body1: markFallback("Most people spend their careers building companies. Here,"),
  highlightedBody: markFallback("you'll spend yours building futures."),
  body2: markFallback("Every school transformed, every scholarship awarded, every community empowered is a reminder that your work matters long after the workday ends."),
  img: {src: "/assets/pages/donate/where-you-donation-goes-1.avif", alt: "where-you-donation-goes-1"},
  imgText: markFallback("10,000TH SCHOOL · INAUGURATED BY INDIA'S VICE PRESIDENT · 2024")
}