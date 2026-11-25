import {getLifeAtYuvaPageData} from "@/services/lifeAtYuva/lifeAtYuva.service";
import ThePeopleWhoWorkHereSection from "@/components/careers/thePeopleWhoWorkHereSection/ThePeopleWhoWorkHereSection";
import StoryContentBlock from "@/components/ourStory/storyContentSection/StoryContentBlock";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import Reveal from "@/components/common/animations/Reveal";
import LifeAtYuvaHeroSection from "@/components/lifeAtYuva/heroSection/LifeAtYuvaHeroSection";
import LifeAtYuvaBannerSection from "@/components/lifeAtYuva/bannerSection/LifeAtYuvaBannerSection";
import WhoWeAreSection from "@/components/lifeAtYuva/whoWeAreSection/WhoWeAreSection";
import TheYuvaWaySection from "@/components/lifeAtYuva/theYuvaWaySection/TheYuvaWaySection";
import LifeMomentsSection from "@/components/lifeAtYuva/lifeMomentsSection/LifeMomentsSection";
import StandWithUsSection from "@/components/lifeAtYuva/standWithUsSection/StandWithUsSection";
import { fetchPageMeta } from "@/lib/wordpress";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";

export default async function LifeAtYuvaPage() {
  const [data, pageMeta] = await Promise.all([
    getLifeAtYuvaPageData(),
    fetchPageMeta(PAGE_SLUGS.LIFE_AT_YUVA),
  ]);

  return (
    <main className="flex flex-col overflow-x-clip bg-[#FDFBF7]">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <LifeAtYuvaHeroSection hero={data.hero} />

      <Reveal>
        <TheYuvaWaySection theYuvaWay={data.theYuvaWay} className="pt-10 xl:pt-14 pb-4" />
      </Reveal>

      <Reveal>
        <ThePeopleWhoWorkHereSection thePeopleWhoWorkHere={data.teamNumbers} />
      </Reveal>

      <Reveal delay={0.123}>
        <section className="px-5 md:px-10 xl:px-20 py-10 xl:py-15 bg-[#FDFBF7]">
          <div className="w-916/1000 xl:w-888/1000 mx-auto">
            <StoryContentBlock block={data.beginning} index={0} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <LifeAtYuvaBannerSection banner={data.banner} />
      </Reveal>

      {/* <Reveal>
        <WhoWeAreSection whoWeAre={data.whoWeAre} />
      </Reveal> */}

      <Reveal>
        <LifeMomentsSection lifeMoments={data.lifeMoments} />
      </Reveal>

      <Reveal>
        <StandWithUsSection standWithUs={data.standWithUs} />
      </Reveal>

      <Reveal delay={0.123}>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </main>
  );
}
