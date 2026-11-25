import { SCHOLARSHIP_BASE_URL } from "@/constants/wp.constants";
import {
  PROGRAMME_FOOTER_LINKS,
  PROGRAMME_NAV_LINKS,
} from "@/constants/programme.routes.constants";

/**
 * App route paths — change once, used across navbar, footer, CTAs, etc.
 */
export const APP_ROUTES = {
  HOME: "/",
  OUR_STORY: "/our-story",
  OUR_VISION: "/our-vision",
  OUR_PEOPLE: "/our-people",
  LIFE_AT_YUVA: "/life-at-yuva",
  COMMUNITY_RESPONSE: "/community-response",
  ALIGNMENT_WITH_UN_SDGS: "/alignment-with-un-sdgs",
  IMPACT: "/impact",
  ANNUAL_REPORTS: "/annual-reports",
  DONORS_AND_AUDIT_PARTNERS: "/donors-and-audit-partners",
  GALLERY: "/gallery",
  PRESS_AND_MEDIA: "/press-and-media",
  BLOGS: "/blogs",
  AWARD_RECOGNITION: "/award-recognition",
  VOICE_OF_CHANGE: "/voice-of-change",
  CONTACT: "/contact-us",
  DONATE: "/donate",
  VOLUNTEER: "/volunteer",
  CAREERS: "/careers",
  COMING_SOON: "/coming-soon",
  TERMS: "/terms",
  PRIVACY: "/privacy-policy",
} as const;

export type NavChildLink = { label: string; href: string };
export type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; href?: string; children: NavChildLink[] };

/** Primary site navigation (desktop + mobile). */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    children: [
      { label: "Our Journey", href: APP_ROUTES.OUR_STORY },
      { label: "Our Vision & Mission", href: APP_ROUTES.OUR_VISION },
      { label: "Our People", href: APP_ROUTES.OUR_PEOPLE },
      { label: "Life @ Yuva", href: APP_ROUTES.LIFE_AT_YUVA },
    ],
  },
  {
    label: "Programmes",
    children: [
      ...PROGRAMME_NAV_LINKS,
      { label: "Community Response", href: APP_ROUTES.COMMUNITY_RESPONSE },
    ],
  },
  {
    label: "Impact",
    children: [
      { label: "Alignment with UN SDGs", href: APP_ROUTES.ALIGNMENT_WITH_UN_SDGS },
      { label: "Impact Reports", href: APP_ROUTES.IMPACT },
      { label: "Annual Reports", href: APP_ROUTES.ANNUAL_REPORTS },
      {
        label: "Donors & Audit Partners",
        href: APP_ROUTES.DONORS_AND_AUDIT_PARTNERS,
      },
    ],
  },
  {
    label: "Media",
    children: [
      { label: "Photo & Media Gallery", href: APP_ROUTES.GALLERY },
      { label: "Press & Media", href: APP_ROUTES.PRESS_AND_MEDIA },
      { label: "Blogs", href: APP_ROUTES.BLOGS },
      { label: "Awards & Recognition", href: APP_ROUTES.AWARD_RECOGNITION },
    ],
  },
  { label: "Voice of Change", href: APP_ROUTES.VOICE_OF_CHANGE },
  { label: "Contact", href: APP_ROUTES.CONTACT },
];

export type FooterLink = { label: string; href: string };

export type FooterSocialLink = {
  label: string;
  href: string;
  platform: "facebook" | "twitter" | "linkedin" | "instagram" | "youtube";
};

/** Official Yuva Unstoppable social profiles (footer). */
export const FOOTER_SOCIAL_LINKS: FooterSocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/yuvaunstoppableindia/",
    platform: "facebook",
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/unstoppableyuva",
    platform: "twitter",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/yuvaunstoppableindia/",
    platform: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yuva_unstoppable/",
    platform: "instagram",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC-C1JZrgRqXTdCdkJzbOjZQ",
    platform: "youtube",
  },
];

/** Programme links for footer — shorter labels + Emergency Response. */
export const FOOTER_PROGRAMMES_SECTION_LINKS: FooterLink[] = [
  ...PROGRAMME_FOOTER_LINKS,
  { label: "Community Response", href: APP_ROUTES.COMMUNITY_RESPONSE },
];

export const FOOTER_GET_INVOLVED_LINKS: FooterLink[] = [
  { label: "Support Our Mission", href: APP_ROUTES.DONATE },
  { label: "Volunteer", href: APP_ROUTES.VOLUNTEER },
  {
    label: "CSR Partnerships",
    href: APP_ROUTES.DONORS_AND_AUDIT_PARTNERS,
  },
  { label: "Careers", href: APP_ROUTES.CAREERS },
  { label: "Apply for Scholarship", href: `${SCHOLARSHIP_BASE_URL}/?new=1` },
];

export const FOOTER_ORGANISATION_LINKS: FooterLink[] = [
  { label: "Our Story", href: APP_ROUTES.OUR_STORY },
  { label: "Our People", href: APP_ROUTES.OUR_PEOPLE },
  { label: "Annual Report", href: APP_ROUTES.ANNUAL_REPORTS },
  { label: "Press", href: APP_ROUTES.PRESS_AND_MEDIA },
  { label: "Blog", href: APP_ROUTES.BLOGS },
  { label: "Contact", href: APP_ROUTES.CONTACT },
];
