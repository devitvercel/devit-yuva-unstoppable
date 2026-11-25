import { cache } from "react";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import { parseOurVisionPage } from "@/lib/parsers/ourVision/ourVision.parser";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { OUR_VISION_FALLBACK } from "@/data/ourVision/ourVision.fallback";
import type { OurVisionPageScf, OurVisionPageData } from "@/types/ourVision/ourVision.types";

/**
 * Our Vision page service for Yuva
 * ---------------------------------------------------------------------------
 * Single entry-point used to retrieve the Our Vision page content.
 */
export const getOurVisionPageData = cache(async (): Promise<OurVisionPageData> => {
  const response = await fetchWPPage<OurVisionPageScf>(PAGE_SLUGS.OUR_VISION);

  if (!response.data) {
    console.warn(
      `[getOurVisionPageData] Falling back to static content — ${response.error}`
    );
    return OUR_VISION_FALLBACK;
  }

  const data = parseOurVisionPage(response.data.scf ?? response.data.acf);

  data.hero.img.src = await resolveMediaId(data.hero.img.src);

  if (data.ambition?.img?.src) {
    data.ambition.img.src = await resolveMediaId(data.ambition.img.src);
  }

  return data;
});
