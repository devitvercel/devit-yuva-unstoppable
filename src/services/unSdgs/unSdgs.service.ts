import {cache} from "react";
import {UN_SDGS_FALLBACK} from "@/data/unSdgs/unSdgs.fallback";
import type {UnSdgsPageData} from "@/types/unSdgs/unSdgs.types";

/** Alignment with UN SDGs page — static Figma content for now; WP SCF can be wired later. */
export const getUnSdgsPageData = cache(
  async (): Promise<UnSdgsPageData> => UN_SDGS_FALLBACK
);
