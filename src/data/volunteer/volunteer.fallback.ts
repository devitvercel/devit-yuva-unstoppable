import type { VolunteerPageData } from "@/types/volunteer/volunteer.types";
import { heroDataFallback } from "./hero.data";
import { statsDataFallback } from "./stats.data";
import { howYouCanHelpDataFallback } from "./howYouCanHelp.data";
import { yourJourneyDataFallback } from "./yourJourney.data";
import { volunteerApplicationDataFallback } from "./volunteerApplication.data";
import { volunteerLargeBannerDataFallback } from "./volunteerLargeBanner.data";

export const VOLUNTEER_FALLBACK: VolunteerPageData = {
  hero: heroDataFallback,
  stats: statsDataFallback,
  howYouCanHelp: howYouCanHelpDataFallback,
  yourJourney: yourJourneyDataFallback,
  volunteerApplication: volunteerApplicationDataFallback,
  volunteerLargeBanner: volunteerLargeBannerDataFallback,
};
