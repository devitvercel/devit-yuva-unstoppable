import type { Metadata } from "next";
import {getImpactPageData} from "@/services/impact/impact.service";
import ImpactHeroSection from "@/components/impact/heroSection/ImpactHeroSection";
import NumbersSection from "@/components/common/numbersSection/NumbersSection";
import ImpactReportsSection from "@/components/impact/reportsSection/ImpactReportsSection";
import VocCtaBannerSection from "@/components/voiceOfChange/ctaBannerSection/VocCtaBannerSection";
import {vocCtaBannerFallback} from "@/data/voiceOfChange/vocCtaBanner.data";
import Reveal from "../common/animations/Reveal";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Impact Reports & Outcomes — Yuva Unstoppable",
  description: "Learn about the social impact and metrics of our grassroots initiatives across India.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.IMPACT };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.IMPACT);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

export default async function ImpactPage() {
  const [data, pageMeta] = await Promise.all([
    getImpactPageData(),
    fetchPageMeta(PAGE_SLUGS.IMPACT),
  ]);

  return (
    <main className="flex flex-col overflow-x-clip">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <Reveal delay={0.123}>
        <ImpactHeroSection hero={data.hero}/>
      </Reveal>
      <Reveal delay={0.123}>
        <NumbersSection
          numbersSection={data.numbersSection}
          scrollable
          autoScroll
        />
      </Reveal>
      <Reveal delay={0.123}>
        <ImpactReportsSection reportsSection={data.reportsSection}/>
      </Reveal>
      <Reveal delay={0.123}>
        <VocCtaBannerSection ctaBanner={vocCtaBannerFallback}/>
      </Reveal>
    </main>
  );
}
