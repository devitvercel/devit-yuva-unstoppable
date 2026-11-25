import { markFallback } from "@/lib/utils";
import type { ImpactNumbersSectionType } from "@/types/impact/impact.types";

export const impactNumbersFallback: ImpactNumbersSectionType = {
  eyebrow: markFallback("Numbers"),
  title: markFallback("Our Impact in Numbers"),
  subtitle: markFallback("LSE-VERIFIED OUTCOMES · 2020"),
  img: {
    src: "/assets/pages/impact/sect2.avif",
    alt: "Women carrying produce in a field",
  },
  stats: [
    {
      icon: "graduation-cap",
      value: markFallback("4×"),
      description: markFallback("Improvement in Mathematics, Science & core subjects"),
      category: markFallback("LEARNING OUTCOMES"),
    },
    {
      icon: "school",
      value: markFallback("4.4%"),
      description: markFallback("Increase in student enrolment in programme schools"),
      category: markFallback("ENROLLMENT"),
    },
    {
      icon: "users",
      value: markFallback("16%"),
      description: markFallback("Attendance increase: WASH + Smart Classrooms combined"),
      category: markFallback("PEAK IMPACT"),
    },
    {
      icon: "user-check",
      value: markFallback("15%"),
      description: markFallback("Overall improvement in student attendance"),
      category: markFallback("ATTENDANCE"),
    },
    {
      icon: "building",
      value: markFallback("14%"),
      description: markFallback("Increase in schools specifically featuring WASH interventions."),
      category: markFallback("IMPACT"),
    },
    {
      icon: "trending-up",
      value: markFallback("3.5%"),
      description: markFallback("Increase in attendance across all grades"),
      category: markFallback("ATTENDANCE"),
    },
  ],
};
