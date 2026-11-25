import React from 'react';
import type { Metadata } from "next";
import HeroSection from "@/components/donate/heroSection/HeroSection";
import StatsSection from "@/components/home/statsSection/StatsSection";
import WhereYouDonationGoesSection from "@/components/donate/whereYouDonationGoesSection/WhereYouDonationGoesSection";

import {getDonatePageData} from "@/services/donate/donate.service";
import {getHomePageData} from "@/services/home/home.service";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import Reveal from "@/components/common/animations/Reveal";
import WaysToGiveSection from "@/components/donate/waysToGiveSection/WaysToGiveSection";
import BenefitsSection from "@/components/donate/benefitsSection/BenefitsSection";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Donate & Support Children Education | Yuva Unstoppable",
  description:
    "Support our mission to empower vulnerable children and government schools across India. Donate today to transform lives with education and sanitation.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.DONATE };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.DONATE);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

async function DonatePage() {
  const [data, pageMeta, homeData] = await Promise.all([
    getDonatePageData(),
    fetchPageMeta(PAGE_SLUGS.DONATE),
    getHomePageData(),
  ]);
  return (
    <main className={"flex flex-col overflow-x-clip"}>
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <HeroSection hero={data.hero}/>
      {/* <Reveal>
        <StatsSection
          contentContainerClassName={"border-b border-primary-red xl:border-b-0 pb-8 xl:pb-0 w-7/10 xl:w-full mx-auto"}
          contentClassName={"flex-col xl:flex-row gap-8"}
          sectionClassName={"bg-[linear-gradient(178deg,rgba(232,227,228,0.02)_2.09%,rgba(160,4,22,0.02)_98.25%)]"}
          stats={data.stats}/>
      </Reveal> */}
      <Reveal>
        <StatsSection stats={homeData.stats} showCounterAnimation={false} />
      </Reveal>
      <WhereYouDonationGoesSection whereYouDonationGoes={data.whereYouDonationGoes}/>
      <WaysToGiveSection waysToGiveSection={data.waysToGive}/>
      <BenefitsSection benefits={data.benefits}/>
      <Reveal>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </main>
  );
}

export default DonatePage;