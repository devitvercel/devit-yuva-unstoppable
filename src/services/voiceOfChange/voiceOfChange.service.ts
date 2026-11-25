import { cache } from "react";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import { parseVocPage } from "@/lib/parsers/voiceOfChange/voiceOfChange.parser";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { VOC_FALLBACK } from "@/data/voiceOfChange/voc.fallback";
import type { VocPageScf, VocPageData } from "@/types/voiceOfChange/voiceOfChange.types";

export const getVocPageData = cache(async (): Promise<VocPageData> => {
  const response = await fetchWPPage<VocPageScf>(PAGE_SLUGS.VOICE_OF_CHANGE);

  if (!response.data) {
    console.warn(
      `[getVocPageData] Falling back to static content — ${response.error}`
    );
    return VOC_FALLBACK;
  }

  const data = parseVocPage(response.data.scf ?? response.data.acf);

  data.hero.img.src = await resolveMediaId(data.hero.img.src);

  if (data.storiesSection?.stories) {
    await Promise.all(
      data.storiesSection.stories.map(async (story) => {
        story.img.src = await resolveMediaId(story.img.src);
      })
    );
  }

  return data;
});
