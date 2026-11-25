import type {
  ContactPageScf,
  ContactHeroSectionScf,
  ContactHeroSectionType,
  ContactContainerSectionScf,
  ContactContainerSectionType,
  ContactOfficeScf,
  ContactOfficeType,
  ContactPageData,
} from "@/types/contact/contact.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import type { LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";
import { parseText, parseCta, parseRepeater } from "@/lib/parsers/acf.parser";
import { heroDataFallback } from "@/data/contact/hero.data";
import {
  contactContainerDataFallback,
  CONTACT_DEFAULT_MAP_EMBED,
} from "@/data/contact/contactContainer.data";
import { LargeBannerDataFallback } from "@/data/contact/largeBanner.data";

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

function parseHero(group: ContactHeroSectionScf | undefined): ContactHeroSectionType {
  return {
    heading: parseText(group?.heading, heroDataFallback.heading),
    title: parseText(group?.title, heroDataFallback.title),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      heroDataFallback.highlightedTitle
    ),
    body: parseText(group?.body, heroDataFallback.body),
    bgImg: toMedia(group?.bg_img ?? group?.bgImg, heroDataFallback.bgImg),
  };
}

function parseMapEmbedUrl(
  raw: string | undefined,
  fallback: string
): string {
  const text = typeof raw === "string" ? raw.trim() : "";
  if (!text) return fallback;
  if (/^https?:\/\//i.test(text)) return text;
  const match = text.match(/src=["']([^"']+)["']/i);
  return match?.[1]?.trim() || fallback;
}

function parseOffice(
  row: ContactOfficeScf,
  index: number,
  defaultTitle: string,
  fallbackOffice: ContactOfficeType
): ContactOfficeType {
  return {
    title: parseText(row?.title, index === 0 ? defaultTitle : fallbackOffice.title),
    address: parseText(row?.address, fallbackOffice.address),
    phone: parseText(row?.phone, fallbackOffice.phone),
    email: parseText(row?.email, fallbackOffice.email),
    mapEmbedUrl: parseMapEmbedUrl(
      row?.map_embed_url ?? row?.mapEmbedUrl,
      index === 0 ? CONTACT_DEFAULT_MAP_EMBED : fallbackOffice.mapEmbedUrl || ""
    ),
  };
}

function parseOffices(
  group: ContactContainerSectionScf | undefined,
  defaultTitle: string
): ContactOfficeType[] {
  const fallbackOffices = contactContainerDataFallback.offices;
  const rows = parseRepeater<ContactOfficeScf>(group?.offices);

  if (rows.length > 0) {
    return rows.map((row, index) =>
      parseOffice(row, index, defaultTitle, fallbackOffices[index] ?? fallbackOffices[0])
    );
  }

  // Legacy single-address SCF shape
  if (group?.address || group?.phone || group?.email) {
    return [
      {
        title: defaultTitle,
        address: parseText(group.address, fallbackOffices[0].address),
        phone: parseText(group.phone, fallbackOffices[0].phone),
        email: parseText(group.email, fallbackOffices[0].email),
        mapEmbedUrl: CONTACT_DEFAULT_MAP_EMBED,
      },
    ];
  }

  return fallbackOffices;
}

function parseContactContainer(
  group: ContactContainerSectionScf | undefined
): ContactContainerSectionType {
  const csr = group?.csr_collaboration ?? group?.csrCollaboration;
  const title = parseText(group?.title, contactContainerDataFallback.title);

  return {
    title,
    offices: parseOffices(group, title),
    csrCollaboration: {
      img: toMedia(csr?.img ?? csr?.image, contactContainerDataFallback.csrCollaboration.img),
      name: parseText(csr?.name, contactContainerDataFallback.csrCollaboration.name),
      phone: parseText(csr?.phone, contactContainerDataFallback.csrCollaboration.phone),
      email: parseText(csr?.email, contactContainerDataFallback.csrCollaboration.email),
    },
  };
}

function parseLargeBanner(group: LargeBannerSectionScf | undefined): LargeBannerSectionType {
  return {
    eyebrow: parseText(group?.eyebrow, LargeBannerDataFallback.eyebrow),
    title: parseText(group?.title, LargeBannerDataFallback.title),
    body: parseText(group?.body, LargeBannerDataFallback.body),
    cta1: parseCta(
      group?.cta1_text ?? group?.cta1Text,
      group?.cta1_link ?? group?.cta1Link,
      LargeBannerDataFallback.cta1
    ),
    cta2: parseCta(
      group?.cta2_text ?? group?.cta2Text,
      group?.cta2_link ?? group?.cta2Link,
      LargeBannerDataFallback.cta2
    ),
  };
}

export function parseContactPage(scf: ContactPageScf | undefined): ContactPageData {
  return {
    hero: parseHero(scf?.hero_section ?? scf?.heroSection),
    contactContainer: parseContactContainer(
      scf?.contact_container_section ?? scf?.contactContainerSection
    ),
    largeBanner: parseLargeBanner(scf?.large_banner_section ?? scf?.largeBannerSection),
  };
}
