import React from 'react';
import type { Metadata } from "next";
import {getCareersPageData} from "@/services/careers/careers.service";
import HeroSection from "@/components/careers/heroSection/HeroSection";
import ThePeopleWhoWorkHereSection from "@/components/careers/thePeopleWhoWorkHereSection/ThePeopleWhoWorkHereSection";
import WhyYuvaSection from "@/components/careers/whyYuvaSection/WhyYuvaSection";
import Reveal from "@/components/common/animations/Reveal";
import OurValuesSection from "@/components/careers/ourValuesSection/OurValuesSection";
import WhatYouGetSection from "@/components/careers/whatYouGetSection/WhatYouGetSection";
import OpenRolesSection from "@/components/careers/openRolesSection/OpenRolesSection";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Careers & Job Opportunities | Yuva Unstoppable NGO",
  description:
    "Join our unstoppable team and help empower government schools and resilient communities across India through education, digital literacy, and leadership.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.CAREERS };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.CAREERS);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

export default async function CareersPage() {
  const [data, pageMeta] = await Promise.all([
    getCareersPageData(),
    fetchPageMeta(PAGE_SLUGS.CAREERS),
  ]);

  return (
    <main className={"flex flex-col"}>
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <HeroSection hero={data.hero}/>
      <Reveal>
        <ThePeopleWhoWorkHereSection thePeopleWhoWorkHere={data.thePeopleWhoWorkHere}/>
      </Reveal>
      <Reveal>
        <WhyYuvaSection whyYuva={data.whyYuva}/>
      </Reveal>
      <OurValuesSection ourValues={data.ourValues}/>
      <WhatYouGetSection whatYouGet={data.whatYouGet}/>
      <OpenRolesSection openRoles={data.openRoles}/>
      <Reveal>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </main>
  );
}