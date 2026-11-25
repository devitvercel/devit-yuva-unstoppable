import type {
  HeroSectionScf,
  HomeScf,
  HeroSectionType,
  HomePageData,
  StatsSectionScf,
  StatsSectionType,
  WhatWeDoSectionScf,
  WhatWeDoSectionType,
  PhotoCarouselSectionScf,
  PhotoCarouselSectionType,
  LargeBannerSectionScf,
  LargeBannerSectionType,
  CsrPartnersSectionScf,
  CsrPartnersSectionType,
  VoicesSectionScf,
  VoicesSectionType,
  OurReachSectionScf,
  OurReachSectionType,
  TrustSectionScf,
  TrustSectionType,
  BeliefsSectionScf,
  BeliefsSectionType,
  LifeAtYuvaSectionScf,
  LifeAtYuvaHomeSectionType,
} from "@/types/home/home.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import { parseText, parseCta, parseRepeater } from "@/lib/parsers/acf.parser";
import { heroFallback } from "@/data/home/hero.data";
import { statsDataFallback } from "@/data/home/stats.data";
import { whatWeDoDataFallback } from "@/data/home/whatWeDo.data";
import { photoCarouselDataFallback } from "@/data/home/photoCarousel.data";
import { largeBannerDataFallback } from "@/data/home/largeBanner.data";
import { csrPartnersDataFallback } from "@/data/home/csrPartners.data";
import { voicesDataFallback } from "@/data/home/voices.data";
import { ourReachDataFallback } from "@/data/home/ourReach.data";
import { trustSectionDataFallback } from "@/data/home/trust.data";
import { beliefsSectionDataFallback } from "@/data/home/beliefs.data";
import { theYuvaWayDataFallback } from "@/data/lifeAtYuva/theYuvaWay.data";


const EMPTY_MEDIA: MediaAsset = { src: "", alt: "media" };

/**
 * Image helper — resolves a WPMedia object or plain URL string to MediaAsset.
 */
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

/**
 * Parse the hero section SCF fields to strict UI HeroSectionType.
 */
function parseHero(group: HeroSectionScf | undefined): HeroSectionType {
  const keywords = parseRepeater(group?.keywords)
    .map((row: any) => {
      if (typeof row === "string") return row.trim();
      if (row && typeof row === "object") {
        return parseText(row.keyword ?? row.value ?? Object.values(row)[0]);
      }
      return "";
    })
    .filter(Boolean);

  return {
    eyebrow: parseText(group?.eyebrow, heroFallback.eyebrow),
    title1: parseText(group?.title1, heroFallback.title1),
    highlightedTitle: parseText(group?.highlighted_title ?? group?.highlightedTitle, heroFallback.highlightedTitle),
    title2: parseText(group?.title2, heroFallback.title2),
    body1: parseText(group?.body1, heroFallback.body1),
    cta1: parseCta(group?.cta1_text, group?.cta1_link, heroFallback.cta1),
    cta2: parseCta(group?.cta2_text, group?.cta2_link, heroFallback.cta2),
    body2: parseText(group?.body2, heroFallback.body2),
    img: toMedia(group?.img, heroFallback.img),
    badge: {
      title: parseText(group?.badge_title, heroFallback.badge.title),
      body: parseText(group?.badge_body, heroFallback.badge.body),
    },
    keywords: keywords.length > 0 ? keywords : heroFallback.keywords,
  };
}

/**
 * Parse the stats section SCF fields to strict UI StatsSectionType.
 */
function parseStats(group: StatsSectionScf | undefined): StatsSectionType {
  const fallbackRows = statsDataFallback.rows ?? [];

  const rows = parseRepeater(group?.rows)
    .map((row: any, rowIndex: number) => {
      const fallbackRow = fallbackRows[rowIndex] ?? fallbackRows[0];
      const stats = parseRepeater(row?.stats)
        .map((stat: any, index: number) => {
          const fallbackStat = fallbackRow?.stats?.[index];
          return {
            number: parseText(stat?.number, fallbackStat?.number ?? ""),
            title: parseText(stat?.title, fallbackStat?.title ?? ""),
          };
        })
        .filter((stat) => stat.number || stat.title);

      return {
        heading: parseText(row?.heading, fallbackRow?.heading ?? ""),
        stats: stats.length > 0 ? stats : (fallbackRow?.stats ?? []),
      };
    })
    .filter((row) => row.stats.length > 0);

  const legacyStats = parseRepeater(group?.stats)
    .map((row: any) => ({
      number: parseText(row?.number),
      title: parseText(row?.title),
    }))
    .filter((stat) => stat.number || stat.title);

  return {
    heading: parseText(group?.heading, statsDataFallback.heading),
    rows: rows.length > 0 ? rows : fallbackRows,
    stats: legacyStats.length > 0 ? legacyStats : undefined,
  };
}

/**
 * Parse the whatWeDo section SCF fields to strict UI WhatWeDoSectionType.
 */
function parseWhatWeDo(group: WhatWeDoSectionScf | undefined): WhatWeDoSectionType {
  const programmes = parseRepeater(group?.programmes)
    .map((row: any, index: number) => {
      const fallbackImg = whatWeDoDataFallback.programmes[index]?.img ?? EMPTY_MEDIA;
      const parsedIndex = Number(parseText(row?.index)) || (index + 1);
      return {
        index: parsedIndex,
        eyebrow: parseText(row?.eyebrow),
        title: parseText(row?.title),
        body: parseText(row?.body),
        href: parseText(row?.href),
        img: toMedia(row?.img, fallbackImg),
      };
    })
    .filter((prog) => prog.title || prog.body);

  return {
    eyebrow: parseText(group?.eyebrow, whatWeDoDataFallback.eyebrow),
    title: parseText(group?.title, whatWeDoDataFallback.title),
    body: parseText(group?.body, whatWeDoDataFallback.body),
    programmes: programmes.length > 0 ? programmes : whatWeDoDataFallback.programmes,
  };
}

/**
 * Parse the photoCarousel section SCF fields to strict UI PhotoCarouselSectionType.
 */
function parsePhotoCarousel(
  group: PhotoCarouselSectionScf | undefined
): PhotoCarouselSectionType {
  const fb = photoCarouselDataFallback;
  const carouselContent = parseRepeater(group?.carousel_content ?? group?.carouselContent)
    .map((row: any, index: number) => {
      const fallbackItem = fb.carouselContent[index] ?? fb.carouselContent[0];
      return {
        bgImg: toMedia(row?.bg_img ?? row?.bgImg, fallbackItem.bgImg),
        img: toMedia(row?.img, fallbackItem.img),
        eyebrow: parseText(row?.eyebrow, ""),
        heading: parseText(row?.heading, fallbackItem.heading),
        subHeading: parseText(row?.sub_heading ?? row?.subHeading, ""),
        title: parseText(row?.title, fallbackItem.title),
        body: parseText(row?.body, fallbackItem.body),
        cta: parseCta(
          row?.cta_text ?? row?.ctaText ?? (row?.cta && row.cta.text),
          row?.cta_link ?? row?.ctaLink ?? (row?.cta && row.cta.href),
          fallbackItem.cta
        ),
      };
    });

  return {
    eyebrow: parseText(group?.eyebrow, fb.eyebrow),
    title: parseText(group?.title, fb.title),
    body: parseText(group?.body, fb.body),
    carouselContent: carouselContent.length > 0 ? carouselContent : fb.carouselContent,
  };
}

/**
 * Parse the large banner section SCF fields to strict UI LargeBannerSectionType.
 */
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

/**
 * Parse the CSR partners section SCF fields to strict UI CsrPartnersSectionType.
 */
function parseCsrPartners(group: CsrPartnersSectionScf | undefined): CsrPartnersSectionType {
  return csrPartnersDataFallback;
}

/**
 * Parse the voices section SCF fields to strict UI VoicesSectionType.
 */
function parseVoices(group: VoicesSectionScf | undefined): VoicesSectionType {
  const backendVoices = parseRepeater(group?.voices);

  const voices =
    backendVoices.length > 0
      ? backendVoices.map((row: any, index: number) => {
        // Only use the matching fallback index — never bleed voice[0] (Kalam) onto others.
        const fallbackVoice = voicesDataFallback.voices[index];
        const name = parseText(row?.name, fallbackVoice?.name ?? "");
        const role = parseText(row?.role, fallbackVoice?.role ?? "");

        let img = toMedia(row?.img, fallbackVoice?.img ?? EMPTY_MEDIA);

        // Known CMS gaps: attach the correct portrait when WP leaves img empty.
        if (!img.src && /sehra|seher/i.test(name)) {
          img = {
            src: "/assets/pages/home/voices/harmeet-sehra.webp",
            alt: name || "Harmeet Sehra",
          };
        }

        return {
          img,
          // Badge + tag are optional CMS fields — never invent from another voice's fallback.
          badge: {
            title: parseText(row?.badge_title ?? row?.badgeTitle, ""),
            body: parseText(row?.badge_body ?? row?.badgeBody, ""),
          },
          body: parseText(row?.body, fallbackVoice?.body ?? ""),
          tag: parseText(row?.tag, ""),
          name,
          role,
        };
      })
      : voicesDataFallback.voices;

  return {
    eyebrow: parseText(group?.eyebrow, voicesDataFallback.eyebrow),
    title: parseText(group?.title, voicesDataFallback.title),
    body: parseText(group?.body, voicesDataFallback.body),
    voices,
  };
}

/**
 * Parse the ourReach section SCF fields to strict UI OurReachSectionType.
 */
function parseOurReach(group: OurReachSectionScf | undefined): OurReachSectionType {
  const stats = parseRepeater(group?.stats)
    .map((row: any, index: number) => {
      const fallbackItem = ourReachDataFallback.stats[index] ?? ourReachDataFallback.stats[0];
      let numberVal: number = fallbackItem.number;
      if (typeof row?.number === "number") {
        numberVal = row.number;
      } else if (typeof row?.number === "string" && row.number.trim().length > 0) {
        const parsed = parseInt(row.number.replace(/,/g, ""), 10);
        if (!isNaN(parsed)) {
          numberVal = parsed;
        }
      }
      return {
        number: numberVal,
        title: parseText(row?.title, fallbackItem.title),
        suffix: parseText(row?.suffix, fallbackItem.suffix),
      };
    });

  return {
    heading: parseText(group?.heading, ourReachDataFallback.heading),
    title: parseText(group?.title, ourReachDataFallback.title),
    body: parseText(group?.body, ourReachDataFallback.body),
    stats: stats.length > 0 ? stats : ourReachDataFallback.stats,
    img: toMedia(group?.img, ourReachDataFallback.img),
    cta: parseCta(
      group?.cta_text ?? group?.ctaText,
      group?.cta_link ?? group?.ctaLink,
      ourReachDataFallback.cta
    ),
  };
}

/**
 * Parse the Life at Yuva (The Yuva Way) section on the home page.
 */
function parseLifeAtYuva(
  group: LifeAtYuvaSectionScf | undefined
): LifeAtYuvaHomeSectionType {
  const pillars = parseRepeater(group?.pillars)
    .map((row: any, index: number) => {
      const fallbackPillar =
        theYuvaWayDataFallback.pillars[index] ?? theYuvaWayDataFallback.pillars[0];
      return {
        number: parseText(row?.number, fallbackPillar.number),
        title: parseText(row?.title, fallbackPillar.title),
        body: parseText(row?.body, fallbackPillar.body),
      };
    })
    .filter((pillar) => pillar.title || pillar.body);

  return {
    eyebrow: parseText(group?.eyebrow, theYuvaWayDataFallback.eyebrow),
    label: parseText(group?.label, theYuvaWayDataFallback.label),
    pillars: pillars.length > 0 ? pillars : theYuvaWayDataFallback.pillars,
  };
}

/**
 * Parse the trust section SCF fields to strict UI TrustSectionType.
 */
function parseTrust(group: TrustSectionScf | undefined): TrustSectionType {
  const recognitionItems = parseRepeater(group?.recognition_items ?? group?.recognitionItems)
    .map((row: any) => parseText(row?.item ?? row?.value ?? row))
    .filter(Boolean);

  const trustItems = parseRepeater(group?.trust_items ?? group?.trustItems)
    .map((row: any) => parseText(row?.item ?? row?.value ?? row))
    .filter(Boolean);

  return {
    eyebrow: parseText(group?.eyebrow, trustSectionDataFallback.eyebrow),
    title: parseText(group?.title, trustSectionDataFallback.title),
    body: parseText(group?.body, trustSectionDataFallback.body),
    recognition: {
      title: parseText(
        group?.recognition_title ?? group?.recognitionTitle,
        trustSectionDataFallback.recognition.title
      ),
      items: recognitionItems.length > 0 ? recognitionItems : trustSectionDataFallback.recognition.items,
      ctaText: parseText(
        group?.recognition_cta_text ?? group?.recognitionCtaText,
        trustSectionDataFallback.recognition.ctaText
      ),
      ctaLink: parseText(
        group?.recognition_cta_link ?? group?.recognitionCtaLink,
        trustSectionDataFallback.recognition.ctaLink
      ),
    },
    trust: {
      title: parseText(group?.trust_title ?? group?.trustTitle, trustSectionDataFallback.trust.title),
      subtitle: parseText(
        group?.trust_subtitle ?? group?.trustSubtitle,
        trustSectionDataFallback.trust.subtitle
      ),
      items: trustItems.length > 0 ? trustItems : trustSectionDataFallback.trust.items,
      description: parseText(
        group?.trust_description ?? group?.trustDescription,
        trustSectionDataFallback.trust.description
      ),
    },
  };
}

/**
 * Parse the beliefs section SCF fields to strict UI BeliefsSectionType.
 */
function parseBeliefs(group: BeliefsSectionScf | undefined): BeliefsSectionType {
  const beliefs = parseRepeater(group?.beliefs)
    .map((row: any, index: number) => {
      const fallbackItem = beliefsSectionDataFallback.beliefs[index] ?? beliefsSectionDataFallback.beliefs[0];

      const points = parseRepeater(row?.points)
        .map((p: any) => parseText(p?.point ?? p?.value ?? p))
        .filter(Boolean);

      return {
        index: Number(parseText(row?.index)) || (index + 1),
        eyebrow: parseText(row?.eyebrow, fallbackItem.eyebrow),
        title: parseText(row?.title, fallbackItem.title),
        body: parseText(row?.body, fallbackItem.body),
        highlight: parseText(row?.highlight, fallbackItem.highlight),
        points: points.length > 0 ? points : fallbackItem.points,
        img: toMedia(row?.img, fallbackItem.img),
      };
    });

  return {
    eyebrow: parseText(group?.eyebrow, beliefsSectionDataFallback.eyebrow),
    title: parseText(group?.title, beliefsSectionDataFallback.title),
    body: parseText(group?.body, beliefsSectionDataFallback.body),
    beliefs: beliefs.length > 0 ? beliefs : beliefsSectionDataFallback.beliefs,
  };
}

/**
 * Build the Home view-model from the raw scf payload.
 */
export function parseHomePage(scf: HomeScf | undefined): HomePageData {
  return {
    hero: parseHero(scf?.hero_section),
    stats: parseStats(scf?.stats_section),
    whatWeDo: parseWhatWeDo(scf?.what_we_do_section),
    beliefsSection: parseBeliefs(scf?.beliefs_section ?? scf?.beliefsSection),
    lifeAtYuva: parseLifeAtYuva(scf?.life_at_yuva_section ?? scf?.lifeAtYuvaSection),
    photoCarousel: parsePhotoCarousel(scf?.photo_carousel_section ?? scf?.photoCarouselSection),
    largeBanner: parseLargeBanner(scf?.large_banner_section ?? scf?.largeBannerSection),
    csrPartners: parseCsrPartners(scf?.csr_partners_section ?? scf?.csrPartnersSection),
    voices: parseVoices(scf?.voices_section ?? scf?.voicesSection),
    ourReach: parseOurReach(scf?.our_reach_section ?? scf?.ourReachSection),
    trustSection: parseTrust(scf?.trust_section ?? scf?.trustSection),
  };
}

