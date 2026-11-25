import type { MediaPageData } from "@/types/media/media.types";
import { blogsHero } from "../sections/hero";
import { defaultCta } from "../sections/cta";
import { blogArticles, blogCategories } from "../sections/articles";

export const BLOGS_FALLBACK: MediaPageData = {
  template: 4,
  hero: blogsHero,
  tabs: [],
  categories: blogCategories,
  partners: [],
  reports: [],
  gallery: [],
  articles: blogArticles,
  cta: defaultCta,
};
