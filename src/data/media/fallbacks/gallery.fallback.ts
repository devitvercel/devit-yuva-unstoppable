import type { MediaPageData } from "@/types/media/media.types";
import { galleryHero } from "../sections/hero";
import { defaultCta } from "../sections/cta";
import { galleryItems, galleryTabs, galleryCategories } from "../sections/gallery";

export const GALLERY_FALLBACK: MediaPageData = {
  template: 3,
  hero: galleryHero,
  tabs: galleryTabs,
  categories: galleryCategories,
  partners: [],
  reports: [],
  gallery: galleryItems,
  articles: [],
  cta: defaultCta,
};
