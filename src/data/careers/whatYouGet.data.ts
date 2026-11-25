import {markFallback} from "@/lib/utils";
import type { CareersWhatYouGetSectionType } from "@/types/careers/careers.types";
import {
  BadgeIcon18,
  BookIcon18,
  BriefcaseIcon18,
  ClockIcon18,
  HeartIcon18,
  HomeIcon18,
  ShieldIcon18,
  UsersIcon18
} from "../../../public/SVGs/svg";

export const whatYouGetDataFallback: CareersWhatYouGetSectionType = {
  heading: markFallback("WHAT YOU GET"),
  title: markFallback("Benefits that say"),
  highlightedTitle: markFallback("we value you."),
  body: markFallback("People who dedicate their careers to others deserve to be taken care of. Here is what every Yuva team member receives."),
  cards: [
    {
      icon: HeartIcon18,
      title: markFallback("Health Insurance"),
      body: markFallback("Comprehensive medical coverage for you and your dependants.")
    },
    {
      icon: ClockIcon18,
      title: markFallback("Flexible Working"),
      body: markFallback("Hybrid arrangements built around your role and personal needs.")
    },
    {
      icon: BookIcon18,
      title: markFallback("Learning & Development"),
      body: markFallback("Training, workshops and cross-sector exposure across our partner network.")
    },
    {
      icon: UsersIcon18,
      title: markFallback("Mentorship Access"),
      body: markFallback("Direct exposure to Yuva Patrons — global CEOs and industry leaders.")
    },
    {
      icon: BriefcaseIcon18,
      title: markFallback("Competitive Salary"),
      body: markFallback("Market-aligned compensation that respects your skills and experience.")
    },
    {
      icon: HomeIcon18,
      title: markFallback("Field Exposure"),
      body: markFallback("Regular visits to the schools you serve — the mission never stays abstract.")
    },
    {
      icon: ShieldIcon18,
      title: markFallback("Paid Leave"),
      body: markFallback("Annual leave, public holidays and sick leave — because rest sustains great work.")
    },
    {
      icon: BadgeIcon18,
      title: markFallback("Purpose & Recognition"),
      body: markFallback("Work celebrated by Presidents, PMs, and global press. Your contribution is seen.")
    },
  ]
}