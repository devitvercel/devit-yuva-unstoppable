import type { IndividualPressPageData } from "@/types/individualPress/individualPress.types";
import { pressHeroDataFallback } from "./hero.data";
import { pressContentFallback } from "./content.data";
import { relatedBlogsDataFallback } from "./relatedBlogs.data";
import { pressLargeBannerDataFallback } from "./largeBanner.data";

export const INDIVIDUAL_PRESS_FALLBACK: IndividualPressPageData = {
  hero: pressHeroDataFallback,
  content: pressContentFallback,
  relatedBlogs: relatedBlogsDataFallback,
  largeBanner: pressLargeBannerDataFallback,
};
