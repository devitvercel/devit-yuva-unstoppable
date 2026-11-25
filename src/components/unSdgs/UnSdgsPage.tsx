import {getUnSdgsPageData} from "@/services/unSdgs/unSdgs.service";
import SdgsHeroSection from "@/components/unSdgs/heroSection/SdgsHeroSection";
import NarrativeSection from "@/components/unSdgs/narrativeSection/NarrativeSection";
import MissionSection from "@/components/unSdgs/missionSection/MissionSection";
import SdgIndexSection from "@/components/unSdgs/sdgIndexSection/SdgIndexSection";
import PillarsSection from "@/components/unSdgs/pillarsSection/PillarsSection";
import MeasurementSection from "@/components/unSdgs/measurementSection/MeasurementSection";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import Reveal from "@/components/common/animations/Reveal";
import { fetchPageMeta } from "@/lib/wordpress";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";

export default async function UnSdgsPage() {
  const [data, pageMeta] = await Promise.all([
    getUnSdgsPageData(),
    fetchPageMeta(PAGE_SLUGS.ALIGNMENT_WITH_UN_SDGS),
  ]);

  return (
    <main className="flex flex-col bg-[#FDFBF7] overflow-x-clip">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <SdgsHeroSection hero={data.hero}/>

      <Reveal delay={0.123}>
        <NarrativeSection narrative={data.narrative}/>
      </Reveal>

      <Reveal>
        <MissionSection mission={data.mission}/>
      </Reveal>

      <Reveal>
        <SdgIndexSection sdgIndex={data.sdgIndex}/>
      </Reveal>

      <Reveal>
        <PillarsSection pillars={data.pillars}/>
      </Reveal>

      <Reveal>
        <MeasurementSection measurement={data.measurement}/>
      </Reveal>

      <Reveal delay={0.123}>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </main>
  );
}
