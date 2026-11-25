import { markFallback } from "@/lib/utils";
import type { ContactHeroSectionType } from "@/types/contact/contact.types";

export const heroDataFallback: ContactHeroSectionType = {
  heading: markFallback("EDUCATION · ENVIRONMENT · ECONOMIC OPPORTUNITY"),
  title: markFallback("Get in"),
  highlightedTitle: markFallback("Touch"),
  body: markFallback(
    "Whether you want to partner with us, ask about scholarships, support a school, or simply learn more about our work — we would love to hear from you."
  ),
  bgImg: {
    src: markFallback("/assets/pages/contact/contact-hero-img.avif"),
    alt: markFallback("Hero Image"),
  },
};