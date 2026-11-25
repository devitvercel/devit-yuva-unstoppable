import type { MediaAsset } from "@/types/global.types";
import type { LargeBannerSectionType } from "@/types/home/home.types";

export interface UnSdgsHeroSectionType {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  bodyLead: string;
  bodyBold: string;
  bodyRest: string;
  img: MediaAsset;
  watermark: string;
}

export interface UnSdgsNarrativeSectionType {
  heading: string;
  titlePlain: string;
  titleHighlight: string;
  paragraphs: string[];
}

export interface UnSdgsMissionSectionType {
  eyebrow: string;
  quotePlain: string;
  quoteHighlight: string;
  quoteRest: string;
  attribution: string;
}

export interface UnSdgsGoalChipType {
  number: number;
  title: string;
  color: string;
  textColor?: string;
}

export interface UnSdgsGoalType {
  number: number;
  title: string;
  color: string;
  textColor?: string;
  globalPurpose: string;
  yuvaAlignment: string;
  yuvaAlignmentHighlight?: string;
  isActive: boolean;
}

export interface UnSdgsIndexSectionType {
  heading: string;
  titlePlain: string;
  titleHighlight: string;
  goals: UnSdgsGoalType[];
  defaultGoal: number;
}

export interface UnSdgsPillarType {
  label: string;
  numeral: string;
  numeralLabel: string;
  titlePlain: string;
  titleHighlight: string;
  body: string;
  img: MediaAsset;
  sdgChips: UnSdgsGoalChipType[];
  imagePosition: "left" | "right";
}

export interface UnSdgsPillarsSectionType {
  heading: string;
  titlePlain: string;
  titleHighlight: string;
  body: string;
  pillars: UnSdgsPillarType[];
}

export interface UnSdgsMeasurementCardType {
  number: string;
  title: string;
  bodyParts: {text: string; bold?: boolean}[];
}

export interface UnSdgsMeasurementSectionType {
  heading: string;
  titlePlain: string;
  titleHighlight: string;
  body: string;
  cards: UnSdgsMeasurementCardType[];
}

export interface UnSdgsPageData {
  hero: UnSdgsHeroSectionType;
  narrative: UnSdgsNarrativeSectionType;
  mission: UnSdgsMissionSectionType;
  sdgIndex: UnSdgsIndexSectionType;
  pillars: UnSdgsPillarsSectionType;
  largeBanner: LargeBannerSectionType;
  measurement: UnSdgsMeasurementSectionType;
}
