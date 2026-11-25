import {markFallback} from "@/lib/utils";
import type { VolunteerApplicationSectionType } from "@/types/volunteer/volunteer.types";

export const volunteerApplicationDataFallback: VolunteerApplicationSectionType = {
  heading: markFallback("READY TO START"),
  title: markFallback("Join the movement."),
  highlightedTitle: markFallback("Apply to volunteer."),
  body: markFallback("40% of our full-time staff started exactly where you are now. Volunteering at Yuva has changed thousands of lives — including those of the volunteers themselves."),
  quote: {
    quote: markFallback("The passion and love for social work at Yuva is what outshines them compared to any NGO I've worked with. I joined as a volunteer in 2018. I never left."),
    role: markFallback("FOUNDING MEMBER"),
    service: markFallback("8 YEARS OF SERVICE"),
  },
  points: [
    "No prior experience required",
    "Flexible — on-site, virtual or hybrid",
    "Volunteer certificate provided",
    "Minimum 4 hours/month",
    "We respond within 48 hours",
  ]
}