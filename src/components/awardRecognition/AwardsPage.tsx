import HeroSection from "./heroSection/HeroSection";
import OurAchievementsSection from "./ourAchievementsSection/OurAchievementsSection";
import RecognitionSection from "./recognitionSection/RecognitionSection";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import Reveal from "@/components/common/animations/Reveal";
import { getAwardsPageData } from "@/services/awards/awards.service";
import { fetchPageMeta } from "@/lib/wordpress";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";

export default async function AwardsPage() {
  const [data, pageMeta] = await Promise.all([
    getAwardsPageData(),
    fetchPageMeta(PAGE_SLUGS.AWARD_RECOGNITION),
  ]);

  return (
    <main className="flex flex-col gap-15 xl:gap-20">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <HeroSection hero={data.hero} />

      <Reveal>
        <RecognitionSection recognition={data.recognition} />
      </Reveal>

      <Reveal>
        <OurAchievementsSection ourAchievements={data.ourAchievements} />
      </Reveal>

      <Reveal>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </main>
  );
}
