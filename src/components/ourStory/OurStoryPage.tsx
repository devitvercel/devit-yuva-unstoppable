import type { Metadata } from "next";
import { getOurStoryPageData } from "@/services/ourStory/ourStory.service";
import OurStoryHeroSection from "./heroSection/OurStoryHeroSection";
import OurStoryContentSection from "./storyContentSection/OurStoryContentSection";
import OurStoryQuoteSection from "./quoteSection/OurStoryQuoteSection";
import OurStoryApproachSection from "./approachSection/OurStoryApproachSection";
import OurStoryTimelineSection from "./timelineSection/OurStoryTimelineSection";
import Reveal from "@/components/common/animations/Reveal";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Our Story — Yuva Unstoppable",
  description: "Explore the journey, history, and major milestones of Yuva Unstoppable since inception.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.OUR_STORY };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.OUR_STORY);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

export default async function OurStoryPage() {
  const [data, pageMeta] = await Promise.all([
    getOurStoryPageData(),
    fetchPageMeta(PAGE_SLUGS.OUR_STORY),
  ]);

  return (
    <main className="flex flex-col overflow-x-clip bg-[#FDFBF7]">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <Reveal delay={0.123}>
        <OurStoryHeroSection hero={data.hero} />
      </Reveal>
      <Reveal delay={0.123}>
        <OurStoryContentSection contentSection={data.contentSection} />
      </Reveal>
      <Reveal delay={0.123}>
        <OurStoryQuoteSection quoteSection={data.quoteSection} />
      </Reveal>
      <Reveal>
        <OurStoryApproachSection approachSection={data.approachSection} />
      </Reveal>
      <Reveal>
        <OurStoryTimelineSection timelineSection={data.timelineSection} />
      </Reveal>
    </main>
  );
}
