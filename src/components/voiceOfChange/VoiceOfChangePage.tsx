import type { Metadata } from "next";
import { getVocPageData } from "@/services/voiceOfChange/voiceOfChange.service";
import {
  getVocStoryCatalog,
  getVocCategoryTabs,
} from "@/services/voiceOfChange/stories.service";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Voice of Change Stories — Yuva Unstoppable",
  description: "Read inspirational stories and testimonials of hope, empowerment, and transformation from across India.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.VOICE_OF_CHANGE };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.VOICE_OF_CHANGE);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}
import VocHeroSection from "@/components/voiceOfChange/heroSection/VocHeroSection";
import VocStoriesSection from "@/components/voiceOfChange/storiesSection/VocStoriesSection";
import VocCtaBannerSection from "@/components/voiceOfChange/ctaBannerSection/VocCtaBannerSection";

export default async function VoiceOfChangePage() {
  // Fetch the complete card catalog with the same request shape as /blogs so
  // both routes benefit from the same Next/WordPress response cache.
  const [data, tabs, pageMeta, stories] = await Promise.all([
    getVocPageData(),
    getVocCategoryTabs(),
    fetchPageMeta(PAGE_SLUGS.VOICE_OF_CHANGE),
    getVocStoryCatalog(),
  ]);

  // Server HTML always renders the default ALL tab so the route stays ISR.
  // ?category= / ?q= deep links are applied client-side in VocStoriesSection.
  const initialTab = tabs[0];

  return (
    <main className="flex flex-col overflow-x-clip">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <VocHeroSection hero={data.hero} />
      <VocStoriesSection
        tabs={tabs}
        initialTab={initialTab}
        stories={stories}
      />
      <VocCtaBannerSection ctaBanner={data.ctaBanner} />
    </main>
  );
}
