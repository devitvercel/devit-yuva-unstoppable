import type { VocPageData } from "@/types/voiceOfChange/voiceOfChange.types";
import { vocHeroFallback } from "./vocHero.data";
import { vocStoriesFallback } from "./vocStories.data";
import { vocCtaBannerFallback } from "./vocCtaBanner.data";

export const VOC_FALLBACK: VocPageData = {
  hero: vocHeroFallback,
  storiesSection: vocStoriesFallback,
  ctaBanner: vocCtaBannerFallback,
};
