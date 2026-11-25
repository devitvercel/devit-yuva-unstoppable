import {markFallback} from "@/lib/utils";
import type {CareersThePeopleWhoWorkHereSectionType} from "@/types/careers/careers.types";

export const thePeopleWhoWorkHereDataFallback: CareersThePeopleWhoWorkHereSectionType = {
  heading: markFallback("THE PEOPLE WHO WORK HERE"),
  title: markFallback("Not a job."),
  highlightedTitle: markFallback("A permanent decision."),
  stats: [
    {
      number: markFallback("100+"),
      title: markFallback("Team members today"),
      body: markFallback("Started as a volunteer movement in 2005. Still mission-first in 2026."),
    },
    {
      number: markFallback("40%"),
      title: markFallback("Started as volunteers"),
      body: markFallback("Nearly half our team joined Yuva first as volunteers — then never left."),
    },
    // {
    //   number: markFallback("25"),
    //   title: markFallback("states"),
    //   body: markFallback("Covered 25 states since 2005"),
    // },
    {
      number: markFallback("25"),
      title: markFallback("States your work will reach"),
      body: markFallback("From Gujarat to Assam. Every role here touches all of them."),
    },
  ]
}