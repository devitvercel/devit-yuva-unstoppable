import type {IndividualBlogPageData} from "@/types/individualBlog/individualBlog.types";
import {heroDataFallback} from "./hero.data";
import {contentFallback} from "./content.data";
import {largeBannerDataFallback} from "./largeBanner.data";
import {initiativesDataFallback} from "./initiatives.data";

export const INDIVIDUAL_BLOG_FALLBACK: IndividualBlogPageData = {
  hero: heroDataFallback,
  content: contentFallback,
  largeBanner: largeBannerDataFallback,
  initiatives: initiativesDataFallback,
};
