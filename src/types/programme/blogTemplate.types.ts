import type { MediaAsset } from "@/types/global.types";
import type { LargeBannerSectionType } from "@/types/home/home.types";

export interface BlogTemplateArticle {
  title: string;
  date: string;
  body: string;
  img: MediaAsset;
  href: string;
}

export interface BlogTemplateHero {
  kicker: string;
  title: string;
  description: string;
  img: MediaAsset;
}

export interface BlogTemplatePageData {
  hero: BlogTemplateHero;
  articles: BlogTemplateArticle[];
  largeBanner: LargeBannerSectionType;
}
