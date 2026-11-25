import type { YourJourneySectionType } from "@/types/volunteer/volunteer.types";
import {markFallback} from "@/lib/utils";

export const yourJourneyDataFallback: YourJourneySectionType = {
  heading: markFallback("YOUR JOURNEY"),
  title: markFallback("From sign-up to showing up —"),
  highlightedTitle: markFallback("four steps."),
  steps: [
    {
      title: markFallback("Apply Online"),
      body: markFallback("Fill the form below. Tell us your skills and which pathway interests you. We read every application.")
    },
    {
      title: markFallback("Orientation Call"),
      body: markFallback("A 20-minute call with our volunteer coordinator. We match you with the right programme and school.")
    },
    {
      title: markFallback("First Visit"),
      body: markFallback("Your first school visit or virtual session. A Yuva team member is always with you on your first visit.")
    },
    {
      title: markFallback("Be Unstoppable"),
      body: markFallback("You're now part of 150,000+ volunteers since 2005. Welcome to the movement.")
    },
  ]
}