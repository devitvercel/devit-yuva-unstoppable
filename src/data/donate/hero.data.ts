import { markFallback } from "@/lib/utils";
import { ShieldIcon, TickIcon } from "../../../public/SVGs/svg";
import type { DonateHeroSectionType } from "@/types/donate/donate.types";

export const heroDataFallback: DonateHeroSectionType = {
  heading: markFallback("EDUCATION · ENVIRONMENT · ECONOMIC OPPORTUNITY"),
  title1: markFallback("Be the reason a child"),
  highlightedTitle: markFallback("smiles"),
  title2: markFallback("today."),
  body: markFallback("Support education, infrastructure & scholarships for underprivileged students."),
  highlightedBody: markFallback("Every rupee is traced to a real outcome."),
  perks: [
    {
      icon: TickIcon,
      perk: markFallback("80G Tax Benefits")
    },
    {
      icon: TickIcon,
      perk: markFallback("KPMG Audited")
    },
    {
      icon: TickIcon,
      perk: markFallback("100% Secure")
    },
    {
      icon: ShieldIcon,
      perk: markFallback("India & US Registered")
    },
  ]
}