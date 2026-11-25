import type { Metadata } from "next";
import {getOurVisionPageData} from "@/services/ourVision/ourVision.service";
import HeroSection from "@/components/ourVision/heroSection/HeroSection";
import OurVisionSection from "@/components/ourVision/ourVisionSection/OurVisionSection";
import AmbitionSection from "@/components/ourVision/ambitionSection/AmbitionSection";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import Reveal from "@/components/common/animations/Reveal";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Our Vision & Mission — Yuva Unstoppable",
  description: "Learn about our vision to transform schools and empower youth, paving the way towards a Viksit Bharat.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.OUR_VISION };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.OUR_VISION);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

export default async function OurVisionPage() {
  const [data, pageMeta] = await Promise.all([
    getOurVisionPageData(),
    fetchPageMeta(PAGE_SLUGS.OUR_VISION),
  ]);

  return (
    <main className="flex flex-col overflow-x-clip bg-[#FDFBF7]">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <Reveal delay={0.123}>
        <HeroSection hero={data.hero}/>
      </Reveal>
      <Reveal delay={0.123}>
        <OurVisionSection ourVision={data.ourVision}/>
      </Reveal>
      <Reveal delay={0.123}>
        <AmbitionSection ambition={data.ambition}/>
      </Reveal>
      <Reveal delay={0.123}>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </main>
  );
}
