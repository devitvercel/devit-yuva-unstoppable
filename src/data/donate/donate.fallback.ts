import type { DonatePageData } from "@/types/donate/donate.types";
import { heroDataFallback } from "./hero.data";
import { statsDataFallback } from "./stats.data";
import { largeBannerDataFallback } from "./largeBanner.data";
import { whereYouDonationGoesDataFallback } from "./whereYouDonationGoes.data";
import { waysToGiveDataFallback } from "./waysToGive.data";
import { benefitsDataFallback } from "./benefits.data";

export const DONATE_FALLBACK: DonatePageData = {
  hero: heroDataFallback,
  stats: statsDataFallback,
  largeBanner: largeBannerDataFallback,
  whereYouDonationGoes: whereYouDonationGoesDataFallback,
  waysToGive: waysToGiveDataFallback,
  benefits: benefitsDataFallback,
};
