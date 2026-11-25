import React from 'react';
import type { Metadata } from "next";
import HeroSection from "@/components/volunteer/heroSection/HeroSection";
import {getVolunteerPageData} from "@/services/volunteer/volunteer.service";
import Reveal from "@/components/common/animations/Reveal";
import StatsSection from "@/components/home/statsSection/StatsSection";
import HowYouCanHelpSection from "@/components/volunteer/howYouCanHelpSection/HowYouCanHelpSection";
import YourJourneySection from "@/components/volunteer/yourJourneySection/YourJourneySection";
import VolunteerApplicationSection
  from "@/components/volunteer/volunteerApplicationSection/VolunteerApplicationSection";
import VolunteerLargeBannerSection
  from "@/components/volunteer/volunteerLargeBannerSection/VolunteerLargeBannerSection";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Volunteer — Yuva Unstoppable",
  description: "Become a volunteer with Yuva Unstoppable. Sign up today and make a positive impact in children's lives.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.VOLUNTEER };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.VOLUNTEER);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

async function VolunteerPage() {
  const [data, pageMeta] = await Promise.all([
    getVolunteerPageData(),
    fetchPageMeta(PAGE_SLUGS.VOLUNTEER),
  ]);
  return (
    <main className={"flex flex-col overflow-x-clip mt-16.25 xl:mt-19.5"}>
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <HeroSection hero={data.hero}/>
      <Reveal>
        <StatsSection stats={data.stats} showCounterAnimation={false} />
      </Reveal>
      <Reveal>
        <HowYouCanHelpSection howYouCanHelp={data.howYouCanHelp}/>
      </Reveal>
      <Reveal>
        <YourJourneySection yourJourney={data.yourJourney}/>
      </Reveal>
      <Reveal>
        <VolunteerApplicationSection volunteerApplication={data.volunteerApplication}/>
      </Reveal>
      <Reveal>
        <VolunteerLargeBannerSection volunteerLargeBanner={data.volunteerLargeBanner}/>
      </Reveal>
    </main>
  );
}

export default VolunteerPage;
