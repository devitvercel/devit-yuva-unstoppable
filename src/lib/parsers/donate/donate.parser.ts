import type {
  DonatePageScf,
  DonateHeroSectionScf,
  DonateHeroSectionType,
  DonatePerkScf,
  DonatePerkType,
  DonatePageData,
  WhereYouDonationGoesSectionScf,
  WhereYouDonationGoesSectionType,
  WaysToGiveSectionScf,
  WaysToGiveSectionType,
  WaysToGiveCardScf,
  BenefitsSectionScf,
  BenefitsSectionType,
  BenefitItemScf,
  BenefitItemType,
} from "@/types/donate/donate.types";
import type { StatsSectionScf, StatsSectionType, LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import { ShieldIcon, TickIcon, RedTickIcon, RedShieldIcon, RedIdIcon } from "../../../../public/SVGs/svg";
import { parseText, parseRepeater, parseCta } from "@/lib/parsers/acf.parser";
import { heroDataFallback } from "@/data/donate/hero.data";
import { statsDataFallback } from "@/data/donate/stats.data";
import { largeBannerDataFallback } from "@/data/donate/largeBanner.data";
import { whereYouDonationGoesDataFallback } from "@/data/donate/whereYouDonationGoes.data";
import { waysToGiveDataFallback } from "@/data/donate/waysToGive.data";
import { benefitsDataFallback } from "@/data/donate/benefits.data";

const EMPTY_MEDIA: MediaAsset = { src: "", alt: "media" };

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  tick: TickIcon,
  shield: ShieldIcon,
  tickicon: TickIcon,
  shieldicon: ShieldIcon,
  "tick-icon": TickIcon,
  "shield-icon": ShieldIcon,
};

const RED_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  tick: RedTickIcon,
  shield: RedShieldIcon,
  id: RedIdIcon,
  tickicon: RedTickIcon,
  shieldicon: RedShieldIcon,
  idicon: RedIdIcon,
  "tick-icon": RedTickIcon,
  "shield-icon": RedShieldIcon,
  "id-icon": RedIdIcon,
};

function toMedia(
  src: WPMedia | string | false | null | undefined,
  fallback: MediaAsset = EMPTY_MEDIA
): MediaAsset {
  if (typeof src === "string") {
    return src.length > 0 ? { src, alt: fallback.alt } : fallback;
  }
  const url = src ? src.url || "" : "";
  if (url.length === 0) return fallback;
  return { src: url, alt: (src && src.alt) || fallback.alt };
}

function parsePerk(card: DonatePerkScf, index: number): DonatePerkType {
  const fallbackPerk = heroDataFallback.perks[index] ?? heroDataFallback.perks[0];
  const iconName = parseText(card.icon, "").toLowerCase();
  const IconComponent = ICON_MAP[iconName] ?? fallbackPerk.icon;

  return {
    perk: parseText(card.perk, fallbackPerk.perk),
    icon: IconComponent,
  };
}

function parseHero(group: DonateHeroSectionScf | undefined): DonateHeroSectionType {
  return {
    heading: parseText(group?.heading, heroDataFallback.heading),
    title1: parseText(group?.title1, heroDataFallback.title1),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      heroDataFallback.highlightedTitle
    ),
    title2: parseText(group?.title2, heroDataFallback.title2),
    body: parseText(group?.body, heroDataFallback.body),
    highlightedBody: parseText(
      group?.highlighted_body ?? group?.highlightedBody,
      heroDataFallback.highlightedBody
    ),
    perks: parseRepeater<DonatePerkScf>(group?.perks).map((perk, idx) =>
      parsePerk(perk, idx)
    ),
  };
}

function parseStats(group: StatsSectionScf | undefined): StatsSectionType {
  const stats = parseRepeater(group?.stats)
    .map((row: any) => {
      return {
        number: parseText(row?.number),
        title: parseText(row?.title),
      };
    })
    .filter((stat) => stat.number || stat.title);

  return {
    heading: parseText(group?.heading, statsDataFallback.heading),
    stats: stats.length > 0 ? stats : statsDataFallback.stats,
  };
}

function parseLargeBanner(group: LargeBannerSectionScf | undefined): LargeBannerSectionType {
  return {
    eyebrow: parseText(group?.eyebrow, largeBannerDataFallback.eyebrow),
    title: parseText(group?.title, largeBannerDataFallback.title),
    body: parseText(group?.body, largeBannerDataFallback.body),
    cta1: parseCta(
      group?.cta1_text ?? group?.cta1Text,
      group?.cta1_link ?? group?.cta1Link,
      largeBannerDataFallback.cta1
    ),
    cta2: parseCta(
      group?.cta2_text ?? group?.cta2Text,
      group?.cta2_link ?? group?.cta2Link,
      largeBannerDataFallback.cta2
    ),
  };
}

function parseWhereYouDonationGoes(
  group: WhereYouDonationGoesSectionScf | undefined
): WhereYouDonationGoesSectionType {
  const cards = parseRepeater(group?.cards).map((row: any, index: number) => {
    const fallbackCard =
      whereYouDonationGoesDataFallback.cards[index] ??
      whereYouDonationGoesDataFallback.cards[0];
    return {
      img: toMedia(row?.img, fallbackCard.img),
      title: parseText(row?.title, fallbackCard.title),
      body: parseText(row?.body, fallbackCard.body),
    };
  });

  return {
    heading: parseText(group?.heading, whereYouDonationGoesDataFallback.heading),
    title: parseText(group?.title, whereYouDonationGoesDataFallback.title),
    body: parseText(group?.body, whereYouDonationGoesDataFallback.body),
    cards: cards.length > 0 ? cards : whereYouDonationGoesDataFallback.cards,
  };
}

function parseWaysToGive(
  group: WaysToGiveSectionScf | undefined
): WaysToGiveSectionType {
  const cards = parseRepeater<WaysToGiveCardScf>(group?.cards).map((row, index) => {
    const fallbackCard =
      waysToGiveDataFallback.cards[index] ??
      waysToGiveDataFallback.cards[0];
    return {
      img: toMedia(row?.img, fallbackCard.img),
      tag: parseText(row?.tag, fallbackCard.tag),
      title: parseText(row?.title, fallbackCard.title),
      heading: parseText(row?.heading, fallbackCard.heading),
      subtitle: parseText(row?.subtitle, fallbackCard.subtitle),
      body: parseText(row?.body, fallbackCard.body),
      cta: parseCta(
        row?.cta_text ?? row?.ctaText,
        row?.cta_link ?? row?.ctaLink,
        fallbackCard.cta
      ),
    };
  });

  return {
    heading: parseText(group?.heading, waysToGiveDataFallback.heading),
    title: parseText(group?.title, waysToGiveDataFallback.title),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      waysToGiveDataFallback.highlightedTitle
    ),
    body: parseText(group?.body, waysToGiveDataFallback.body),
    cards: cards.length > 0 ? cards : waysToGiveDataFallback.cards,
  };
}

function parseBenefit(card: BenefitItemScf, index: number): BenefitItemType {
  const fallbackBenefit = benefitsDataFallback.benefits[index] ?? benefitsDataFallback.benefits[0];
  const iconName = parseText(card.icon, "").toLowerCase();
  const IconComponent = RED_ICON_MAP[iconName] ?? fallbackBenefit.icon;

  return {
    id: parseText(card.id, fallbackBenefit.id),
    title: parseText(card.title, fallbackBenefit.title),
    body: parseText(card.body, fallbackBenefit.body),
    icon: IconComponent,
  };
}

function parseBenefits(
  group: BenefitsSectionScf | undefined
): BenefitsSectionType {
  const benefits = parseRepeater<BenefitItemScf>(group?.benefits).map((row, index) =>
    parseBenefit(row, index)
  );

  return {
    title: parseText(group?.title, benefitsDataFallback.title),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      benefitsDataFallback.highlightedTitle
    ),
    body: parseText(group?.body, benefitsDataFallback.body),
    benefits: benefits.length > 0 ? benefits : benefitsDataFallback.benefits,
  };
}

export function parseDonatePage(scf: DonatePageScf | undefined): DonatePageData {
  return {
    hero: parseHero(scf?.hero_section ?? scf?.heroSection),
    stats: parseStats(scf?.stats_section ?? scf?.statsSection),
    largeBanner: parseLargeBanner(scf?.large_banner_section ?? scf?.largeBannerSection),
    whereYouDonationGoes: parseWhereYouDonationGoes(
      scf?.where_you_donation_goes_section ?? scf?.whereYouDonationGoesSection
    ),
    waysToGive: parseWaysToGive(
      scf?.ways_to_give_section ?? scf?.waysToGiveSection
    ),
    benefits: parseBenefits(
      scf?.benefits_section ?? scf?.benefitsSection
    ),
  };
}
