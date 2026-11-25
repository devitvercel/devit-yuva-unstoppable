import type {UnSdgsPageData} from "@/types/unSdgs/unSdgs.types";
import {heroDataFallback} from "./hero.data";
import {narrativeDataFallback} from "./narrative.data";
import {missionDataFallback} from "./mission.data";
import {sdgIndexDataFallback} from "./sdgIndex.data";
import {pillarsDataFallback} from "./pillars.data";
import { largeBannerDataFallback } from "./largeBanner.data";
import {measurementDataFallback} from "./measurement.data";

export const UN_SDGS_FALLBACK: UnSdgsPageData = {
  hero: heroDataFallback,
  narrative: narrativeDataFallback,
  mission: missionDataFallback,
  sdgIndex: sdgIndexDataFallback,
  pillars: pillarsDataFallback,
  largeBanner: largeBannerDataFallback,
  measurement: measurementDataFallback,
};
