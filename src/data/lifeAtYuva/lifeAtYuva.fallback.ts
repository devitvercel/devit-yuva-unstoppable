import type {LifeAtYuvaPageData} from "@/types/lifeAtYuva/lifeAtYuva.types";
import {heroDataFallback} from "./hero.data";
import {theYuvaWayDataFallback} from "./theYuvaWay.data";
import {teamNumbersDataFallback} from "./teamNumbers.data";
import {beginningDataFallback} from "./beginning.data";
import {bannerDataFallback} from "./banner.data";
import {whoWeAreDataFallback} from "./whoWeAre.data";
import {lifeMomentsDataFallback} from "./lifeMoments.data";
import {standWithUsDataFallback} from "./standWithUs.data";
import {largeBannerDataFallback} from "./largeBanner.data";

export const LIFE_AT_YUVA_FALLBACK: LifeAtYuvaPageData = {
  hero: heroDataFallback,
  theYuvaWay: theYuvaWayDataFallback,
  teamNumbers: teamNumbersDataFallback,
  beginning: beginningDataFallback,
  banner: bannerDataFallback,
  whoWeAre: whoWeAreDataFallback,
  lifeMoments: lifeMomentsDataFallback,
  standWithUs: standWithUsDataFallback,
  largeBanner: largeBannerDataFallback,
};
