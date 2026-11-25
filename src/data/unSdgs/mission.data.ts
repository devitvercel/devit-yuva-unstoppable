import {markFallback} from "@/lib/utils";
import type {UnSdgsMissionSectionType} from "@/types/unSdgs/unSdgs.types";

export const missionDataFallback: UnSdgsMissionSectionType = {
  eyebrow: markFallback("Our Mission"),
  quotePlain: markFallback("Our mission is to translate "),
  quoteHighlight: markFallback("global aspirations"),
  quoteRest: markFallback(
    " into tangible, ground-level outcomes. We bridge the gap between policy and practice, ensuring that the progress of our organisation accelerates the progress of our nation."
  ),
  attribution: markFallback("Yuva Unstoppable · Founding Charter"),
};
