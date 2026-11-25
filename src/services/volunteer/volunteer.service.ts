import { cache } from "react";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import { parseVolunteerPage } from "@/lib/parsers/volunteer/volunteer.parser";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { VOLUNTEER_FALLBACK } from "@/data/volunteer/volunteer.fallback";
import type { VolunteerPageScf, VolunteerPageData } from "@/types/volunteer/volunteer.types";

function hasUsableScf(
  scf: VolunteerPageScf | undefined | null
): scf is VolunteerPageScf {
  if (!scf || typeof scf !== "object" || Array.isArray(scf)) return false;
  return Object.keys(scf).length > 0;
}

/**
 * Volunteer page service for Yuva
 * ---------------------------------------------------------------------------
 * Single entry-point used to retrieve the Volunteer page content.
 */
export const getVolunteerPageData = cache(async (): Promise<VolunteerPageData> => {
  const response = await fetchWPPage<VolunteerPageScf>(PAGE_SLUGS.VOLUNTEER);

  if (!response.data) {
    console.warn(
      `[getVolunteerPageData] Falling back to static content — ${response.error}`
    );
    return VOLUNTEER_FALLBACK;
  }

  const rawScf = response.data.scf ?? response.data.acf;
  if (!hasUsableScf(rawScf)) {
    console.warn(
      `[getVolunteerPageData] Empty SCF for slug "${PAGE_SLUGS.VOLUNTEER}" — using static fallback.`
    );
    return VOLUNTEER_FALLBACK;
  }

  const data = parseVolunteerPage(rawScf);

  data.hero.img.src = await resolveMediaId(data.hero.img.src);

  await Promise.all(
    data.howYouCanHelp.cards.map(async (card) => {
      card.img.src = await resolveMediaId(card.img.src);
    })
  );

  return data;
});
