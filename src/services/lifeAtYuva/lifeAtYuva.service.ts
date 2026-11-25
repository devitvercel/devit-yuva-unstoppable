import { cache } from "react";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import { parseLifeAtYuvaPage } from "@/lib/parsers/lifeAtYuva/lifeAtYuva.parser";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { LIFE_AT_YUVA_FALLBACK } from "@/data/lifeAtYuva/lifeAtYuva.fallback";
import type { LifeAtYuvaPageData, LifeAtYuvaPageScf } from "@/types/lifeAtYuva/lifeAtYuva.types";

export const getLifeAtYuvaPageData = cache(async (): Promise<LifeAtYuvaPageData> => {
  const response = await fetchWPPage<LifeAtYuvaPageScf>(PAGE_SLUGS.LIFE_AT_YUVA);

  if (!response.data) {
    console.warn(
      `[getLifeAtYuvaPageData] Falling back to static content — ${response.error}`
    );
    return LIFE_AT_YUVA_FALLBACK;
  }

  const data = parseLifeAtYuvaPage(response.data.scf ?? response.data.acf);

  data.hero.img.src = await resolveMediaId(data.hero.img.src);
  data.beginning.img.src = await resolveMediaId(data.beginning.img.src);
  data.banner.img.src = await resolveMediaId(data.banner.img.src);

  await Promise.all(
    data.lifeMoments.moments.map(async (moment) => {
      moment.img.src = await resolveMediaId(moment.img.src);
    })
  );

  await Promise.all(
    data.standWithUs.featured.map(async (member) => {
      member.img.src = await resolveMediaId(member.img.src);
    })
  );

  await Promise.all(
    data.standWithUs.members.map(async (member) => {
      member.img.src = await resolveMediaId(member.img.src);
    })
  );

  // Sort people alphabetically by name
  data.standWithUs.featured.sort((a, b) => a.name.localeCompare(b.name));
  data.standWithUs.members.sort((a, b) => a.name.localeCompare(b.name));

  return data;
});
