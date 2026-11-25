import type { Metadata } from "next";
import {getOurPeoplePageData} from "@/services/ourPeople/ourPeople.service";
import HeroSection from "@/components/ourPeople/heroSection/HeroSection";
import LeadershipSection from "@/components/ourPeople/leadershipSection/LeadershipSection";
import OurTeamSection from "@/components/ourPeople/ourTeamSection/OurTeamSection";
import AdvisorBoardSection from "@/components/ourPeople/advisorBoardSection/AdvisorBoardSection";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import Reveal from "@/components/common/animations/Reveal";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Our People & Leadership — Yuva Unstoppable",
  description: "Meet our founders, trustees, advisors, and the passionate team driving change at Yuva Unstoppable.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.OUR_PEOPLE };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.OUR_PEOPLE);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

export default async function OurPeoplePage() {
  const [data, pageMeta] = await Promise.all([
    getOurPeoplePageData(),
    fetchPageMeta(PAGE_SLUGS.OUR_PEOPLE),
  ]);

  return (
    <main className="flex flex-col bg-[#FDFBF7]">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <Reveal delay={0.123}>
        <HeroSection hero={data.hero}/>
      </Reveal>
      <Reveal delay={0.123}>
        <LeadershipSection leadership={data.leadership}/>
      </Reveal>
      <Reveal delay={0.123}>
        <OurTeamSection ourTeam={data.ourTeam}/>
      </Reveal>
      <Reveal>
        <AdvisorBoardSection advisorBoard={data.advisorBoard}/>
      </Reveal>
      <Reveal>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </main>
  );
}
