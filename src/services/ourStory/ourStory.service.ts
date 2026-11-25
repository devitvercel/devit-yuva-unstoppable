import { cache } from "react";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import { parseOurStoryPage } from "@/lib/parsers/ourStory/ourStory.parser";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { OUR_STORY_FALLBACK } from "@/data/ourStory/ourStory.fallback";
import type { OurStoryPageScf, OurStoryPageData } from "@/types/ourStory/ourStory.types";

export const getOurStoryPageData = cache(async (): Promise<OurStoryPageData> => {
  const response = await fetchWPPage<OurStoryPageScf>(PAGE_SLUGS.OUR_STORY);

  if (!response.data) {
    console.warn(
      `[getOurStoryPageData] Falling back to static content — ${response.error}`
    );
    return OUR_STORY_FALLBACK;
  }

  const data = parseOurStoryPage(response.data.scf ?? response.data.acf);

  data.hero.img.src = await resolveMediaId(data.hero.img.src);

  await Promise.all(
    data.contentSection.blocks.map(async (block) => {
      block.img.src = await resolveMediaId(block.img.src);
    })
  );

  data.approachSection.img.src = await resolveMediaId(data.approachSection.img.src);

  await Promise.all(
    data.timelineSection.entries.map(async (entry) => {
      entry.img.src = await resolveMediaId(entry.img.src);
    })
  );

  return data;
});
