import type { OurStoryPageData } from "@/types/ourStory/ourStory.types";
import { ourStoryHeroFallback } from "./ourStoryHero.data";
import { ourStoryContentFallback } from "./ourStoryContent.data";
import { ourStoryQuoteFallback } from "./ourStoryQuote.data";
import { ourStoryApproachFallback } from "./ourStoryApproach.data";
import { ourStoryTimelineFallback } from "./ourStoryTimeline.data";

export const OUR_STORY_FALLBACK: OurStoryPageData = {
  hero: ourStoryHeroFallback,
  contentSection: ourStoryContentFallback,
  quoteSection: ourStoryQuoteFallback,
  approachSection: ourStoryApproachFallback,
  timelineSection: ourStoryTimelineFallback,
};
