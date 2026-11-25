import { cache } from "react";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import { parseImpactPage } from "@/lib/parsers/impact/impact.parser";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { IMPACT_FALLBACK } from "@/data/impact/impact.fallback";
import type { ImpactPageScf, ImpactPageData } from "@/types/impact/impact.types";

export const getImpactPageData = cache(async (): Promise<ImpactPageData> => {
  const response = await fetchWPPage<ImpactPageScf>(PAGE_SLUGS.IMPACT);

  if (!response.data) {
    console.warn(
      `[getImpactPageData] Falling back to static content — ${response.error}`
    );
    return IMPACT_FALLBACK;
  }

  const data = parseImpactPage(response.data.scf ?? response.data.acf);

  data.hero.img.src = await resolveMediaId(data.hero.img.src);
  data.numbersSection.img.src = await resolveMediaId(data.numbersSection.img.src);

  await Promise.all(
    data.reportsSection.reports.map(async (report) => {
      report.img.src = await resolveMediaId(report.img.src);
    })
  );

  return data;
});
