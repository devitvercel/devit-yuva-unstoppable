import type { MediaPageData } from "@/types/media/media.types";
import { pressHero } from "../sections/hero";
import { defaultCta } from "../sections/cta";
import { pressArticles, newsCategories } from "../sections/articles";

export const PRESS_AND_MEDIA_FALLBACK: MediaPageData = {
  template: 4,
  hero: pressHero,
  tabs: [],
  categories: newsCategories,
  partners: [],
  reports: [],
  gallery: [],
  articles: pressArticles,
  cta: defaultCta,
};
