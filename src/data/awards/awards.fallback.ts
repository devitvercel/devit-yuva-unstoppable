import type { AwardsPageData } from "@/types/awards/awards.types";
import { HeroSectionData } from "./heroSection";
import { RecognitionSectionData } from "./recognitionSection";
import { OurAchievementsSectionData } from "./ourAchievementsSection";
import { largeBannerDataFallback } from "./largeBanner.data";

export const AWARDS_FALLBACK: AwardsPageData = {
  hero: HeroSectionData,
  recognition: RecognitionSectionData,
  ourAchievements: OurAchievementsSectionData,
  largeBanner: largeBannerDataFallback,
};
