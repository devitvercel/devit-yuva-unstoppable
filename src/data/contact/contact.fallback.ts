import type { ContactPageData } from "@/types/contact/contact.types";
import { heroDataFallback } from "./hero.data";
import { contactContainerDataFallback } from "./contactContainer.data";
import { LargeBannerDataFallback } from "./largeBanner.data";

export const CONTACT_FALLBACK: ContactPageData = {
  hero: heroDataFallback,
  contactContainer: contactContainerDataFallback,
  largeBanner: LargeBannerDataFallback,
};
