import { markFallback } from "@/lib/utils";
import type { StatsSectionType } from "@/types/home/home.types";

export const statsDataFallback: StatsSectionType = {
  heading: markFallback("Turning Belief into Impact"),
  rows: [
    {
      heading: markFallback("Education"),
      stats: [
        {
          number: markFallback("10M+"),
          title: markFallback("LIVES IMPACTED")
        },
        {
          number: markFallback("10,000+"),
          title: markFallback("GOVERNMENT SCHOOLS & PUBLIC INSTITUTIONS STRENGTHENED")
        },
        {
          number: markFallback("5,000+"),
          title: markFallback("DIGITAL CLASSROOMS")
        },
        {
          number: markFallback("1,000+"),
          title: markFallback("STEM & AI LABS")
        }
      ]
    },
    {
      heading: markFallback("Economic Opportunity & Environment"),
      stats: [
        {
          number: markFallback("8,000+"),
          title: markFallback("SCHOLARSHIPS AWARDED")
        },
        {
          number: markFallback("1,000+"),
          title: markFallback("YOUTH SKILLED & PLACED")
        },
        {
          number: markFallback("35M+"),
          title: markFallback("TREES PLANTED")
        },
        {
          number: markFallback("22+"),
          title: markFallback("STATES REACHED")
        }
      ]
    }
  ]
};