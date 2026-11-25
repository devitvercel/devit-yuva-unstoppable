import { cache } from "react";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import { parseCareersPage } from "@/lib/parsers/careers/careers.parser";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { CAREERS_FALLBACK } from "@/data/careers/careers.fallback";
import type { CareersPageScf, CareersPageData } from "@/types/careers/careers.types";

/**
 * Careers page service for Yuva
 * ---------------------------------------------------------------------------
 * Single entry-point used to retrieve the Careers page content.
 */
export const getCareersPageData = cache(async (): Promise<CareersPageData> => {
  const response = await fetchWPPage<CareersPageScf>(PAGE_SLUGS.CAREERS);

  if (!response.data) {
    console.warn(
      `[getCareersPageData] Falling back to static content — ${response.error}`
    );
    return CAREERS_FALLBACK;
  }

  const data = parseCareersPage(response.data.scf ?? response.data.acf);

  if (data.hero?.img?.src) {
    data.hero.img.src = await resolveMediaId(data.hero.img.src);
  }

  if (data.whyYuva?.img?.src) {
    data.whyYuva.img.src = await resolveMediaId(data.whyYuva.img.src);
  }

  return data;
});
