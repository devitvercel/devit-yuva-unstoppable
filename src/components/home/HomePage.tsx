import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getHomePageData } from "@/services/home/home.service";
import { fetchPageMeta } from "@/lib/wordpress";
import {
  buildMetadata,
  buildMetadataFromYoast,
  buildFallbackMetadata,
} from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_REVALIDATE, PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";
import HeroSection from "@/components/home/heroSection/HeroSection";
import StatsSection from "@/components/home/statsSection/StatsSection";
import WhatWeDoSection from "@/components/home/whatWeDoSection/WhatWeDoSection";
import LifeAtYuvaSection from "@/components/home/lifeAtYuvaSection/LifeAtYuvaSection";
import PhotoCarouselSection from "@/components/home/photoCarouselSection/PhotoCarouselSection";
import VoicesSection from "@/components/home/voicesSection/VoicesSection";
import Reveal from "@/components/common/animations/Reveal";

import CsrPartnersSection from "@/components/home/csrPartnersSection/CsrPartnersSection";
import TrustSection from "@/components/home/trustSection/TrustSection";
import OurReachSection from "@/components/home/ourReachSection/OurReachSection";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";

export const revalidate = PAGE_REVALIDATE[PAGE_SLUGS.HOME];

const HOME_SEO_FALLBACK = {
  title: "Yuva — Transforming Government Schools Across India",
  description:
    "We work alongside 10,000+ schools across India, co-designing classrooms, meals, and futures with the teachers and children who know them best.",
};

const HOME_CANONICAL = { canonicalPath: APP_ROUTES.HOME };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.HOME);

  if (!pageMeta) return buildFallbackMetadata(HOME_SEO_FALLBACK, HOME_CANONICAL);

  if (pageMeta.yoast) {
    return buildMetadataFromYoast(pageMeta.yoast, HOME_SEO_FALLBACK, HOME_CANONICAL);
  }

  if (pageMeta.seo) {
    return buildMetadata(
      pageMeta.seo,
      pageMeta.title || HOME_SEO_FALLBACK.title,
      HOME_CANONICAL,
    );
  }

  return buildFallbackMetadata(HOME_SEO_FALLBACK, HOME_CANONICAL);
}

export default async function HomePage() {
  const [data, pageMeta] = await Promise.all([
    getHomePageData(),
    fetchPageMeta(PAGE_SLUGS.HOME),
  ]);

  return (
    <div className="flex flex-col overflow-x-clip">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <HeroSection hero={data.hero} />

      <Reveal>
        <LifeAtYuvaSection lifeAtYuva={data.lifeAtYuva} />
      </Reveal>

      <Reveal>
        <StatsSection stats={data.stats} showCounterAnimation={false} />
      </Reveal>

      <Reveal>
        <WhatWeDoSection whatWeDo={data.whatWeDo} />
      </Reveal>

      <Reveal>
        <PhotoCarouselSection photoCarousel={data.photoCarousel} />
      </Reveal>

      <Reveal>
        <VoicesSection voices={data.voices} />
      </Reveal>

      <Reveal>
        <CsrPartnersSection csrPartners={data.csrPartners} />
      </Reveal>

      <Reveal>
        <TrustSection trustSection={data.trustSection} />
      </Reveal>

      <Reveal>
        <OurReachSection ourReach={data.ourReach} />
      </Reveal>

      <Reveal>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </div>
  );
}
