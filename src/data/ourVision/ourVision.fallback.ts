import type { OurVisionPageData } from "@/types/ourVision/ourVision.types";
import { heroDataFallback } from "./hero.data";
import { ourVisionDataFallback } from "./ourVision.data";
import { ambitionDataFallback } from "./ambition.data";
import { LargeBannerDataFallback } from "./largeBanner.data";

export const OUR_VISION_FALLBACK: OurVisionPageData = {
  hero: heroDataFallback,
  ourVision: ourVisionDataFallback,
  ambition: ambitionDataFallback,
  largeBanner: LargeBannerDataFallback,
};
