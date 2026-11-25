import type { HomePageData } from "@/types/home/home.types";
import { heroFallback } from "./hero.data";
import { statsDataFallback } from "./stats.data";
import { whatWeDoDataFallback } from "./whatWeDo.data";
import { photoCarouselDataFallback } from "./photoCarousel.data";
import { largeBannerDataFallback } from "./largeBanner.data";
import { csrPartnersDataFallback } from "./csrPartners.data";
import { voicesDataFallback } from "./voices.data";
import { ourReachDataFallback } from "./ourReach.data";
import { trustSectionDataFallback } from "./trust.data";
import { beliefsSectionDataFallback } from "./beliefs.data";
import { theYuvaWayDataFallback } from "@/data/lifeAtYuva/theYuvaWay.data";

export const HOME_FALLBACK: HomePageData = {
  hero: heroFallback,
  stats: statsDataFallback,
  whatWeDo: whatWeDoDataFallback,
  beliefsSection: beliefsSectionDataFallback,
  lifeAtYuva: theYuvaWayDataFallback,
  photoCarousel: photoCarouselDataFallback,
  largeBanner: largeBannerDataFallback,
  csrPartners: csrPartnersDataFallback,
  voices: voicesDataFallback,
  ourReach: ourReachDataFallback,
  trustSection: trustSectionDataFallback,
};

