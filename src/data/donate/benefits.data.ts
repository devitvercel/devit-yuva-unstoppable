import {markFallback} from "@/lib/utils";
import {RedIdIcon, RedShieldIcon, RedTickIcon} from "../../../public/SVGs/svg";
import type { BenefitsSectionType } from "@/types/donate/donate.types";

export const benefitsDataFallback: BenefitsSectionType = {
  title: markFallback("Your donation is secure & eligible for"),
  highlightedTitle: markFallback("tax benefits."),
  body: markFallback("We are one of India's most audited and verified non-profits. Every rupee is accountable. Every outcome is documented."),
  benefits: [
    {
      id: markFallback("01"),
      title: markFallback("80G Tax Benefits Available"),
      body: markFallback("Claim tax exemption on your donation"),
      icon: RedTickIcon,
    },
    {
      id: markFallback("02"),
      title: markFallback("Registered NGO (India & US)"),
      body: markFallback("Verified and compliant organization"),
      icon: RedShieldIcon,
    },
    {
      id: markFallback("03"),
      title: markFallback("100% Secure Payments"),
      body: markFallback("Trusted payment gateways"),
      icon: RedIdIcon,
    }
  ]
}