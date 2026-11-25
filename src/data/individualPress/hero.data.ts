import { markFallback } from "@/lib/utils";
import type { IndividualPressHeroSection } from "@/types/individualPress/individualPress.types";

const PRESS_HERO_FALLBACK_IMG = {
  src: "/assets/pages/voiceofchange/hero-v2.avif",
  alt: "Press and media",
};

export const pressHeroDataFallback: IndividualPressHeroSection = {
  tag: markFallback("HEALTH"),
  title: markFallback(
    "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed massa."
  ),
  body: markFallback(
    "Yuva Unstoppable gratefully acknowledges the support received from our partners who believe in our efforts, champion our cause and remain UNSTOPPABLE with us."
  ),
  date: markFallback("20 MAR 2026"),
  img: PRESS_HERO_FALLBACK_IMG,
};

export { PRESS_HERO_FALLBACK_IMG };
