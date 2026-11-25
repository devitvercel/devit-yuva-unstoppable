import type { CareersPageData } from "@/types/careers/careers.types";
import { heroDataFallback } from "./hero.data";
import { thePeopleWhoWorkHereDataFallback } from "./thePeopleWhoWorkHere.data";
import { whyYuvaDataFallback } from "./whyYuva.data";
import { ourValuesDataFallback } from "./ourValues.data";
import { whatYouGetDataFallback } from "./whatYouGet.data";
import { openRolesDataFallback } from "./openRoles.data";
import { largeBannerDataFallback } from "./largeBanner.data";

export const CAREERS_FALLBACK: CareersPageData = {
  hero: heroDataFallback,
  thePeopleWhoWorkHere: thePeopleWhoWorkHereDataFallback,
  whyYuva: whyYuvaDataFallback,
  ourValues: ourValuesDataFallback,
  whatYouGet: whatYouGetDataFallback,
  openRoles: openRolesDataFallback,
  largeBanner: largeBannerDataFallback,
};
