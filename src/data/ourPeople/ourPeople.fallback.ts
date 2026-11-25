import type { OurPeoplePageData } from "@/types/ourPeople/ourPeople.types";
import { heroDataFallback } from "./hero.data";
import { leadershipDataFallback } from "./leadership.data";
import { ourTeamDataFallback } from "./ourTeam.data";
import { advisorBoardDataFallback } from "./advisorBoard.data";
import { LargeBannerDataFallback } from "./largeBanner.data";

export const OUR_PEOPLE_FALLBACK: OurPeoplePageData = {
  hero: heroDataFallback,
  leadership: leadershipDataFallback,
  ourTeam: ourTeamDataFallback,
  advisorBoard: advisorBoardDataFallback,
  largeBanner: LargeBannerDataFallback,
};
