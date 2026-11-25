import type { LargeBannerSectionType } from "@/types/home/home.types";
import type { MediaAsset } from "@/types/global.types";
import type { ArticleItem } from "@/types/media/media.types";

export interface IndividualPressHeroSection {
  tag: string;
  title: string;
  body: string;
  date: string;
  img: MediaAsset;
}

export interface IndividualPressContentSection {
  content: {
    rendered: string;
  };
}

export interface RelatedBlogsSectionType {
  title: string;
  highlightedTitle: string;
  articles: ArticleItem[];
}

export interface IndividualPressPageData {
  hero: IndividualPressHeroSection;
  content: IndividualPressContentSection;
  relatedBlogs: RelatedBlogsSectionType;
  largeBanner: LargeBannerSectionType;
}
