import { cache } from "react";
import { fetchWPPage } from "@/lib/wordpress";
import { parseDonatePage } from "@/lib/parsers/donate/donate.parser";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { DONATE_FALLBACK } from "@/data/donate/donate.fallback";
import type { DonatePageScf, DonatePageData } from "@/types/donate/donate.types";

/**
 * Donate page service for Yuva
 * ---------------------------------------------------------------------------
 * Single entry-point used to retrieve the Donate page content.
 */
export const getDonatePageData = cache(async (): Promise<DonatePageData> => {
  const response = await fetchWPPage<DonatePageScf>(PAGE_SLUGS.DONATE);

  if (!response.data) {
    console.warn(
      `[getDonatePageData] Falling back to static content — ${response.error}`
    );
    return DONATE_FALLBACK;
  }

  return parseDonatePage(response.data.scf ?? response.data.acf);
});
