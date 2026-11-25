import type {
  ProgrammeCommitmentCardScf,
  ProgrammeCommitmentCardType,
  ProgrammeCommitmentPointsScf,
  ProgrammeCommitmentPointsType,
  ProgrammeCommitmentSectionScf,
  ProgrammeCommitmentSectionType,
  ProgrammeHeroSectionScf,
  ProgrammeHeroSectionType,
  ProgrammeInfoSectionScf,
  ProgrammeInfoSectionType,
  ProgrammeLargeBannerCtaScf,
  ProgrammeLargeBannerCtaType,
  ProgrammeLargeBannerSectionScf,
  ProgrammeLargeBannerSectionType,
  ProgrammePageData,
  ProgrammePageScf,
  ProgrammeTemplateScf,
  ProgrammeTemplateType,
  SupportSystemCardScf,
  SupportSystemCardType,
  SupportSystemSectionScf,
  SupportSystemSectionType,
  RealWorldChangeSectionScf,
  RealWorldChangeSectionType,
  ViewSectionScf,
  ViewSectionType,
  NumbersSectionScf,
  NumbersSectionType,
  NumbersItemScf,
  NumbersItemType,
  StudentJourneyCardScf,
  StudentJourneyCardType,
  StudentJourneySectionScf,
  StudentJourneySectionType,
  WhyPartnerCardScf,
  WhyPartnerCardType,
  WhyPartnerSectionScf,
  WhyPartnerSectionType,
  StudentTestimonialScf,
  StudentTestimonialSectionScf,
  StudentTestimonialSectionType,
  OurVisionCardScf,
  OurVisionCardType,
  OurVisionSectionScf,
  OurVisionSectionType,
  SchoolTransformationPointScf,
  SchoolTransformationPointType,
  SchoolTransformationItemScf,
  SchoolTransformationItemType,
} from "@/types/programme/programme.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import { parseNumber, parseRepeater, parseText } from "@/lib/parsers/acf.parser";
import { heroDataFallback } from "@/data/programme/sections/hero.t1";
import { programmeDataFallback } from "@/data/programme/sections/info.t1";
import { commitmentDataFallback } from "@/data/programme/sections/commitment.t1";
import { programmeLargeBannerDataFallback } from "@/data/programme/sections/largeBanner";
import { programmeTemplateDataFallback } from "@/data/programme/sections/templateNo.t1";
import { supportSystemDataFallback } from "@/data/programme/sections/supportSystem";
import { realWorldChangeDataFallback } from "@/data/programme/sections/realWorldChange";
import { viewDataFallback } from "@/data/programme/sections/view";
import { numbersDataFallback } from "@/data/programme/sections/numbers";
import { studentJourneyDataFallback } from "@/data/programme/sections/studentJourney";
import { whyPartnerDataFallback } from "@/data/programme/sections/whyPartner";
import { studentTestimonialDataFallback } from "@/data/programme/sections/studentTestimonial";
import { ourVisionDataFallback } from "@/data/programme/sections/ourVision";
import { programmeDataFallback as programmesDataFallback } from "@/data/programme/sections/programmes";
import {
  PERSON_IMAGE_PLACEHOLDER,
  hasPersonImage,
} from "@/constants/personPlaceholder.constants";
import {
  ClockIcon,
  CloudIcon,
  GraduationIcon,
  HeartIcon,
  HomeIcon,
  LocationIcon,
  TreeIcon,
  UsersIcon,
  EngineeringIcon,
  IdIcon,
  NetworkingIcon,
  BookIcon,
  FarmingIcon,
  LoanIcon,
  StemIcon,
  BankIcon,
  TrophyIcon,
} from "../../../../public/SVGs/svg";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; stroke?: string; fill?: string }>> = {
  clock: ClockIcon,
  cloud: CloudIcon,
  graduation: GraduationIcon,
  heart: HeartIcon,
  home: HomeIcon,
  location: LocationIcon,
  tree: TreeIcon,
  users: UsersIcon,
  engineering: EngineeringIcon,
  id: IdIcon,
  networking: NetworkingIcon,
  book: BookIcon,
  farming: FarmingIcon,
  loan: LoanIcon,
  stem: StemIcon,
  bank: BankIcon,
  trophy: TrophyIcon,
};

const EMPTY_MEDIA: MediaAsset = { src: "", alt: "media" };

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

function parseHero(group: ProgrammeHeroSectionScf | undefined): ProgrammeHeroSectionType {
  return {
    title: parseText(group?.title, heroDataFallback.title),
    img: toMedia(group?.img, heroDataFallback.img),
  };
}

function parseTemplate(
  group: ProgrammeTemplateScf | undefined,
  fallbackTemplate: number = programmeTemplateDataFallback.template
): ProgrammeTemplateType {
  return {
    // Default to the page's own template (passed by the service from its slug
    // fallback) — NOT Template 1 — so an unset template never mis-renders.
    template: parseNumber(group?.template, fallbackTemplate),
  };
}

function parseInfo(
  group: any | undefined,
  fb: ProgrammeInfoSectionType = programmeDataFallback
): ProgrammeInfoSectionType {
  const rawBody = group?.body;
  let normalizedBody: string[] = [];

  // Verify that rawBody is a valid, populated array (handles when it is false or empty)
  if (Array.isArray(rawBody) && rawBody.length > 0) {
    normalizedBody = rawBody.map((item: any) => {
      // Intercept the API's nested object contract: {"paragraph": "string"}
      if (item && typeof item === "object" && "paragraph" in item) {
        return parseText(item.paragraph);
      }
      // Alternate fallback logic if a flat string occasionally slips through
      return parseText(item);
    }).filter(Boolean); // Filter out any empty strings
  } else if (typeof rawBody === "string" && rawBody.trim()) {
    normalizedBody = [rawBody.trim()];
  }

  return {
    heading: parseText(group?.heading, fb.heading),
    title: parseText(group?.title, fb.title),
    // If the API array was empty or explicitly false, gracefully fallback to fallback array values
    body: normalizedBody.length > 0 ? normalizedBody : fb.body,
  };
}

function parseCommitmentPoint(
  point: ProgrammeCommitmentPointsScf
): { title: string; body: string[] } {
  const rawBody = point?.body;
  let normalizedBody: string[] = [];

  if (Array.isArray(rawBody)) {
    normalizedBody = (rawBody as any[]).map((item) => {
      // Check if item matches API structural contract: {"point": "string"}
      if (item && typeof item === 'object' && 'point' in item) {
        return parseText(item.point);
      }
      // Alternate fallback configuration: clean raw string array conversion
      return parseText(item);
    });
  } else if (typeof rawBody === "string" && rawBody.trim()) {
    normalizedBody = [rawBody.trim()];
  }

  return {
    title: parseText(point?.title),
    body: normalizedBody,
  };
}

function parseCommitmentCard(
  card: any,
  index: number
): any {
  // If the whole card node from the endpoint fails or is missing, use entire matching card block fallback
  const fallbackCard = commitmentDataFallback?.cards?.[index] ?? commitmentDataFallback?.cards?.[0];

  // Clean structure arrays safely
  const rawPoints = parseRepeater<ProgrammeCommitmentPointsScf>(card?.points);
  const parsedPoints = rawPoints.map(parseCommitmentPoint);

  return {
    heading: parseText(card?.heading, fallbackCard?.heading ?? ""),
    title: parseText(card?.title, fallbackCard?.title ?? ""),
    body: parseText(card?.body, fallbackCard?.body ?? ""),
    img: card?.img ? toMedia(card.img, fallbackCard?.img) : fallbackCard?.img,
    points: parsedPoints.length > 0 ? parsedPoints : (fallbackCard?.points ?? []),
  };
}

function parseCommitment(
  group: any | undefined
): ProgrammeCommitmentSectionType {
  // Gracefully drops to the global hardcoded fallback data block if the main section container node is absent
  if (!group) return commitmentDataFallback;

  return {
    heading: parseText(group?.heading, commitmentDataFallback.heading),
    title: parseText(group?.title, commitmentDataFallback.title),
    body: parseText(group?.body, commitmentDataFallback.body),
    cards: parseRepeater<any>(group?.cards).map((card, idx) =>
      parseCommitmentCard(card, idx)
    ),
  };
}

function parseLargeBannerCta(
  cta: ProgrammeLargeBannerCtaScf | undefined,
  fallback: ProgrammeLargeBannerCtaType
): ProgrammeLargeBannerCtaType {
  return {
    title: parseText(cta?.title, fallback.title),
    href: parseText(cta?.href, fallback.href),
  };
}

function parseLargeBanner(
  group: ProgrammeLargeBannerSectionScf | undefined
): ProgrammeLargeBannerSectionType {
  return {
    heading: parseText(group?.heading, programmeLargeBannerDataFallback.heading),
    title: parseText(group?.title, programmeLargeBannerDataFallback.title),
    body: parseText(group?.body, programmeLargeBannerDataFallback.body),
    cta1: parseLargeBannerCta(group?.cta1, programmeLargeBannerDataFallback.cta1),
    cta2: parseLargeBannerCta(group?.cta2, programmeLargeBannerDataFallback.cta2),
    img: toMedia(group?.img, programmeLargeBannerDataFallback.img),
  };
}

function parseSupportSystemCard(
  card: SupportSystemCardScf,
  index: number,
  fb: SupportSystemSectionType
): SupportSystemCardType {
  const fallbackCard = fb.cards[index] ?? fb.cards[0];
  return {
    title: parseText(card.title, fallbackCard?.title ?? ""),
    body: parseText(card.body, fallbackCard?.body ?? ""),
    img: toMedia(card.img, fallbackCard?.img ?? EMPTY_MEDIA),
  };
}

function parseSupportSystem(
  group: SupportSystemSectionScf | undefined,
  fb: SupportSystemSectionType = supportSystemDataFallback
): SupportSystemSectionType {
  const rawBody = group?.body;
  let body: string[];
  if (Array.isArray(rawBody)) {
    body = parseRepeater<string>(rawBody as string[]).map((s) => parseText(s));
  } else if (typeof rawBody === "string" && rawBody.trim()) {
    body = [rawBody.trim()];
  } else {
    body = fb.body;
  }

  return {
    heading: parseText(group?.heading, fb.heading),
    title: parseText(group?.title, fb.title),
    body,
    cards: parseRepeater<SupportSystemCardScf>(group?.cards).map((card, idx) =>
      parseSupportSystemCard(card, idx, fb)
    ),
  };
}

function parseRealWorldChange(
  group: RealWorldChangeSectionScf | undefined,
  fb: RealWorldChangeSectionType = realWorldChangeDataFallback
): RealWorldChangeSectionType {
  const rawBody = group?.body;
  let body: string[];
  if (Array.isArray(rawBody)) {
    body = parseRepeater<string>(rawBody as string[]).map((s) => parseText(s));
  } else if (typeof rawBody === "string" && rawBody.trim()) {
    body = [rawBody.trim()];
  } else {
    body = fb.body;
  }

  return {
    heading: parseText(group?.heading, fb.heading),
    title: parseText(group?.title, fb.title),
    body,
    img: toMedia(group?.img, fb.img),
  };
}

function parseView(
  group: ViewSectionScf | undefined,
  fb: ViewSectionType = viewDataFallback
): ViewSectionType {
  const rawBody = group?.body;
  let body: string[];
  if (Array.isArray(rawBody)) {
    body = parseRepeater<string>(rawBody as string[]).map((s) => parseText(s));
  } else if (typeof rawBody === "string" && rawBody.trim()) {
    body = [rawBody.trim()];
  } else {
    body = fb.body;
  }

  return {
    heading: parseText(group?.heading, fb.heading),
    title: parseText(group?.title, fb.title),
    body,
    img: toMedia(group?.img, fb.img),
  };
}

/**
 * A repeater group counts as "provided by WP" only when it is a non-empty array.
 * SCF emits `false`/`[]` for empty repeaters and groups, which must NOT override
 * the template fallback.
 */
function hasRows(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0;
}

/** A group field counts as provided when it is a non-empty object. */
function hasGroup(value: unknown): boolean {
  return !!value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0;
}

/**
 * Build the programme view-model.
 *
 * `fallback` is the CORRECT per-template static fallback (PROGRAMME_FALLBACK_T#)
 * resolved by the service from the page slug. Every section that WordPress did
 * NOT provide falls back to THIS template's section — never to another template's
 * data. This is what prevents the "mixed templates" bug when a page is created in
 * WP from the schema but left partially (or fully) empty.
 */
export function parseProgrammePage(
  scf: ProgrammePageScf | undefined,
  fallback: ProgrammePageData
): ProgrammePageData {
  const heroGroup = scf?.hero;
  const infoGroup = scf?.programme_info ?? scf?.programmeInfo ?? scf?.hero;
  const commitmentGroup = scf?.programme_commitment ?? scf?.programmeCommitment;
  const bannerGroup = scf?.programme_large_banner ?? scf?.programmeLargeBanner;
  const supportGroup = scf?.support_system ?? scf?.supportSystem;
  const realWorldChangeGroup = scf?.real_world_change ?? scf?.realWorldChange;
  const viewGroup = scf?.view;
  const numbersGroup = scf?.numbers;
  const studentJourneyGroup = scf?.student_journey ?? scf?.studentJourney;
  const whyPartnerGroup = scf?.why_partner ?? scf?.whyPartner;
  const ourVisionGroup = scf?.our_vision ?? scf?.ourVision;
  const testimonialGroup = scf?.student_testimonial ?? scf?.studentTestimonial;
  const programmesGroup = scf?.programmes;

  return {
    // Always-present sections: parse when WP provided them, else use this
    // template's fallback section as-is (no cross-template mixing).
    hero: hasGroup(heroGroup) ? parseHero(heroGroup) : fallback.hero,
    programmeTemplate: parseTemplate(
      scf?.programme_template ?? scf?.programmeTemplate,
      fallback.programmeTemplate.template
    ),
    programmeInfo: hasGroup(infoGroup)
      ? parseInfo(infoGroup, fallback.programmeInfo)
      : fallback.programmeInfo,
    programmeLargeBanner: hasGroup(bannerGroup)
      ? parseLargeBanner(bannerGroup)
      : fallback.programmeLargeBanner,

    // Template-specific sections: only present when WP actually sent rows/data;
    // otherwise fall back to this template's section (or null if it has none).
    programmeCommitment: hasGroup(commitmentGroup)
      ? parseCommitment(commitmentGroup)
      : fallback.programmeCommitment ?? null,
    supportSystem: hasGroup(supportGroup)
      ? parseSupportSystem(supportGroup, fallback.supportSystem ?? undefined)
      : fallback.supportSystem ?? null,
    realWorldChange: hasGroup(realWorldChangeGroup)
      ? parseRealWorldChange(realWorldChangeGroup, fallback.realWorldChange ?? undefined)
      : fallback.realWorldChange ?? null,
    view: hasGroup(viewGroup) ? parseView(viewGroup, fallback.view ?? undefined) : fallback.view ?? null,
    numbers: hasGroup(numbersGroup)
      ? parseNumbers(numbersGroup, fallback.numbers ?? undefined)
      : fallback.numbers ?? null,
    studentJourney: hasGroup(studentJourneyGroup)
      ? parseStudentJourney(studentJourneyGroup)
      : fallback.studentJourney ?? null,
    whyPartner: hasGroup(whyPartnerGroup)
      ? parseWhyPartner(whyPartnerGroup)
      : fallback.whyPartner ?? null,
    ourVision: hasGroup(ourVisionGroup)
      ? parseOurVision(ourVisionGroup)
      : fallback.ourVision ?? null,
    studentTestimonial: hasGroup(testimonialGroup)
      ? parseStudentTestimonial(testimonialGroup)
      : fallback.studentTestimonial ?? null,
    programmes: hasRows(programmesGroup)
      ? parseProgrammes(programmesGroup as SchoolTransformationItemScf[])
      : fallback.programmes ?? null,
  };
}

function parseNumbers(
  group: NumbersSectionScf | undefined,
  fb: NumbersSectionType = numbersDataFallback
): NumbersSectionType {
  const rawNumbers = group?.numbers;
  const parsedNumbers = parseRepeater<NumbersItemScf>(rawNumbers).map((item) => {
    const iconName = parseText(item?.icon, "tree").toLowerCase();
    const IconComponent = ICON_MAP[iconName] ?? TreeIcon;
    return {
      icon: IconComponent,
      title: parseText(item?.title),
      body: parseText(item?.body),
    };
  });

  // Image is only used by Template 4 (NumbersSection4). Pass through WP's image
  // if supplied; else fall back to THIS template's image (Template 2's fallback
  // has none, so it stays imageless).
  const img = toMedia(group?.img, fb.img ?? EMPTY_MEDIA);

  return {
    heading: parseText(group?.heading, fb.heading),
    title: parseText(group?.title, fb.title),
    body: parseText(group?.body, fb.body),
    ...(img.src ? { img } : {}),
    numbers: parsedNumbers.length ? parsedNumbers : fb.numbers,
  };
}

function parseStudentJourneyCard(
  card: StudentJourneyCardScf,
  index: number
): StudentJourneyCardType {
  const fallbackCard = studentJourneyDataFallback.card[index] ?? studentJourneyDataFallback.card[0];
  const iconName = parseText(card.icon, "").toLowerCase();
  const IconComponent = ICON_MAP[iconName] ?? fallbackCard.icon;

  return {
    id: parseText(card.id, fallbackCard.id),
    title: parseText(card.title, fallbackCard.title),
    body: parseText(card.body, fallbackCard.body),
    icon: IconComponent,
  };
}

function parseStudentJourney(
  group: StudentJourneySectionScf | undefined
): StudentJourneySectionType {
  return {
    heading: parseText(group?.heading, studentJourneyDataFallback.heading),
    title: parseText(group?.title, studentJourneyDataFallback.title),
    body: parseText(group?.body, studentJourneyDataFallback.body),
    card: parseRepeater<StudentJourneyCardScf>(group?.card).map((card, idx) =>
      parseStudentJourneyCard(card, idx)
    ),
  };
}

function parseWhyPartnerCard(
  card: WhyPartnerCardScf,
  index: number
): WhyPartnerCardType {
  const fallbackCard = whyPartnerDataFallback.cards[index] ?? whyPartnerDataFallback.cards[0];
  return {
    id: parseText(card.id, fallbackCard.id),
    title: parseText(card.title, fallbackCard.title),
    body: parseText(card.body, fallbackCard.body),
  };
}

function parseWhyPartner(
  group: WhyPartnerSectionScf | undefined
): WhyPartnerSectionType {
  const rawBody = group?.body;
  let body: string[];
  if (Array.isArray(rawBody)) {
    body = parseRepeater<string>(rawBody as string[]).map((s) => parseText(s));
  } else if (typeof rawBody === "string" && rawBody.trim()) {
    body = [rawBody.trim()];
  } else {
    body = whyPartnerDataFallback.body;
  }

  return {
    heading: parseText(group?.heading, whyPartnerDataFallback.heading),
    title: parseText(group?.title, whyPartnerDataFallback.title),
    body,
    cards: parseRepeater<WhyPartnerCardScf>(group?.cards).map((card, idx) =>
      parseWhyPartnerCard(card, idx)
    ),
  };
}

function parseStudentTestimonial(
  group: StudentTestimonialSectionScf | undefined
): StudentTestimonialSectionType {
  const fallback = studentTestimonialDataFallback;
  const rawRows = parseRepeater<StudentTestimonialScf>(group?.testimonials);

  // Prefer the testimonials repeater; fall back to the legacy single group.
  const sourceRows =
    rawRows.length > 0
      ? rawRows
      : group?.testimonial
        ? [group.testimonial]
        : [];

  const testimonials =
    sourceRows.length > 0
      ? sourceRows.map((row, index) => {
        const itemFallback =
          fallback.testimonials[index] ?? fallback.testimonials[0];
        const name = parseText(row?.name, itemFallback.name);
        const img = toMedia(row?.img, {
          src: PERSON_IMAGE_PLACEHOLDER,
          alt: name || "Student portrait",
        });

        return {
          img: hasPersonImage(img.src)
            ? img
            : {
              src: PERSON_IMAGE_PLACEHOLDER,
              alt: img.alt || name || "Student portrait",
            },
          badge: {
            title: parseText(row?.badge_title ?? row?.badgeTitle, ""),
            body: parseText(row?.badge_body ?? row?.badgeBody, ""),
          },
          body: parseText(row?.body, itemFallback.body),
          tag: parseText(row?.tag, ""),
          name,
          // Prefer role; keep reading legacy `location` from older CMS content.
          role: parseText(
            row?.role ?? row?.location,
            itemFallback.role
          ),
        };
      })
      : fallback.testimonials;

  return {
    eyebrow: parseText(group?.eyebrow, fallback.eyebrow),
    title: parseText(group?.title, fallback.title),
    body: parseText(group?.body, fallback.body),
    testimonials,
  };
}

function parseOurVisionCard(
  card: OurVisionCardScf,
  index: number
): OurVisionCardType {
  const fallbackCard = ourVisionDataFallback.cards[index] ?? ourVisionDataFallback.cards[0];
  return {
    id: parseText(card.id, fallbackCard.id),
    title: parseText(card.title, fallbackCard.title),
    body: parseText(card.body, fallbackCard.body),
  };
}

function parseOurVision(
  group: OurVisionSectionScf | undefined
): OurVisionSectionType {
  return {
    heading: parseText(group?.heading, ourVisionDataFallback.heading),
    title: parseText(group?.title, ourVisionDataFallback.title),
    body: parseText(group?.body, ourVisionDataFallback.body),
    cards: parseRepeater<OurVisionCardScf>(group?.cards).map((card, idx) =>
      parseOurVisionCard(card, idx)
    ),
  };
}

function parseProgrammePoint(
  point: SchoolTransformationPointScf
): SchoolTransformationPointType {
  const rawBody = point?.body;
  let normalizedBody: string[] = [];

  if (Array.isArray(rawBody)) {
    normalizedBody = (rawBody as any[]).map((item) => {
      // Intercept the API's nested object structural contract: {"point": "string"}
      if (item && typeof item === 'object' && 'point' in item) {
        return parseText(item.point);
      }
      // Alternate fallback configuration: handle clean raw string arrays if they exist
      return parseText(item);
    });
  } else if (typeof rawBody === "string" && rawBody.trim()) {
    normalizedBody = [rawBody.trim()];
  }

  return {
    title: parseText(point?.title),
    body: normalizedBody,
  };
}

function parseProgrammeCard(
  card: SchoolTransformationItemScf,
  index: number
): SchoolTransformationItemType {
  // Safe extraction of structural template fallbacks if individual cards fail or are missing
  const fallbackCard = programmesDataFallback?.programmes?.[index] ?? programmesDataFallback?.programmes?.[0];

  const rawPoints = parseRepeater<SchoolTransformationPointScf>(card?.points);
  const parsedPoints = rawPoints.map(parseProgrammePoint);

  return {
    // Standardize number strings or numbers cleanly
    index: card?.index ? String(card.index) : String(fallbackCard?.index ?? index + 1),
    title: parseText(card?.title, fallbackCard?.title),
    // toMedia automatically maps API structure 'url' properties safely over to frontend target 'src' format
    img: card?.img ? toMedia(card.img, fallbackCard?.img) : (fallbackCard?.img ?? EMPTY_MEDIA),
    points: parsedPoints.length > 0 ? parsedPoints : (fallbackCard?.points ?? []),
  };
}

function parseProgrammes(
  group: SchoolTransformationItemScf[] | undefined
): SchoolTransformationItemType[] {
  return parseRepeater<SchoolTransformationItemScf>(group).map((card, idx) =>
    parseProgrammeCard(card, idx)
  );
}


