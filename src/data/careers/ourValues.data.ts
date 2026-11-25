import {markFallback} from "@/lib/utils";
import type { CareersOurValuesSectionType } from "@/types/careers/careers.types";

export const ourValuesDataFallback: CareersOurValuesSectionType = {
  heading: markFallback("OUR VALUES"),
  title: markFallback("Six things we stand for. All starting with"),
  highlightedTitle: markFallback("\"Be.\""),
  body: markFallback("Not poster values. The ethos woven into how we hire, measure and show up — every day since 2005."),
  values: [
    {
      title: markFallback("Be Creative"),
      body: markFallback("Proactive action to solve a community problem. Keep empathy and humility at the core — always.")
    },
    {
      title: markFallback("Be Productive"),
      body: markFallback("Focus on tasks and work towards fulfilling them with mindfulness and happiness. Output matters.")
    },
    {
      title: markFallback("Be Dynamic"),
      body: markFallback("Be energised and a force to reckon with. Stay hungry, stay agile — the mission can't afford inertia.")
    },
    {
      title: markFallback("Be Grateful"),
      body: markFallback("Be aware of your opportunity to help others. Gratitude is the foundation of everything we do at Yuva.")
    },
    {
      title: markFallback("Be a Changemaker"),
      body: markFallback("We are not here to sustain the status quo. We are here to disrupt educational inequality at scale.")
    },
    {
      title: markFallback("Be Unstoppable"),
      body: markFallback("PM Modi said it best: \"The reason Yuva is unstoppable is because Yuva-ites are totally self-motivated.\"")
    },
  ]
}