import type { WPMedia } from "@/types/wordpress.types";
import type { LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface AwardsHeroSectionScf {
  img?: WPMedia | string | false;
  title?: string;
  sub_title?: string;
  subTitle?: string;
  body?: string;
}

export interface AwardCardScf {
  img?: WPMedia | string | false;
  year?: string | number;
  title?: string;
  body?: string;
}

export interface AwardsRecognitionSectionScf {
  title?: string;
  sub_title?: string;
  subTitle?: string;
  cards?: AwardCardScf[] | false;
}

export interface AwardsOurAchievementsSectionScf {
  title?: string;
  sub_title?: string;
  subTitle?: string;
  cards?: AwardCardScf[] | false;
}

export interface AwardsPageScf {
  hero_section?: AwardsHeroSectionScf;
  heroSection?: AwardsHeroSectionScf;
  recognition_section?: AwardsRecognitionSectionScf;
  recognitionSection?: AwardsRecognitionSectionScf;
  our_achievements_section?: AwardsOurAchievementsSectionScf;
  ourAchievementsSection?: AwardsOurAchievementsSectionScf;
  large_banner_section?: LargeBannerSectionScf;
  largeBannerSection?: LargeBannerSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface AwardCardType {
  year: number;
  title: string;
  body: string;
  img: string | { url: string };
}

export interface AwardsHeroSectionType {
  img: string;
  title: string;
  subTitle: string;
  body: string;
}

export interface AwardsRecognitionSectionType {
  title: string;
  subTitle: string;
  cards: AwardCardType[];
}

export interface AwardsOurAchievementsSectionType {
  title: string;
  subTitle: string;
  cards: AwardCardType[];
}

export interface AwardsPageData {
  hero: AwardsHeroSectionType;
  recognition: AwardsRecognitionSectionType;
  ourAchievements: AwardsOurAchievementsSectionType;
  largeBanner: LargeBannerSectionType;
}
