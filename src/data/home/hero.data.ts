import {markFallback} from "@/lib/utils";
import type {HeroSectionType} from "@/types/home/home.types";

export const heroFallback: HeroSectionType = {
  eyebrow: markFallback("EDUCATION · ENVIRONMENT · ECONOMIC OPPORTUNITY"),
  title1: markFallback("Education is the greatest"),
  highlightedTitle: markFallback("pathway"),
  title2: markFallback("out of poverty."),
  body1: markFallback("We partner with schools, communities, governments, and corporate supporters to improve learning environments, nutrition, and opportunities for millions of children across India.\n\nBut for millions of children, opportunity is still determined by where they are born—not by their talent, effort, or aspirations. Every child deserves the opportunity to fulfil their potential.\n\nOver two decades of working alongside governments and communities across India, Yuva has learned a simple but powerful truth: lasting change cannot be achieved through isolated interventions. It requires stronger schools, healthier families, meaningful livelihoods, and a more sustainable future.\n\nTogether with governments, communities, corporate partners, and changemakers, Yuva builds resilient communities by bringing together education, environmental stewardship, and economic opportunity—creating the conditions for every child, every young person, and every family to thrive."),
  cta1: {
    text: markFallback("Donate Now"),
    href: "/donate"
  },
  cta2: {
    text: markFallback("See our work"),
    href: "/our-story"
  },
  body2: markFallback("INDIA & US REGISTERED · 12A · 80G · FCRA · AUDITED BY KPMG"),
  img: {
    src: "/assets/pages/home/hero_section_updated.jpg",
    alt: "Children in school classroom"
  },
  badge: {
    title: markFallback("Since 2005 —"),
    body: markFallback("TRANSFORMING GOVERNMENT SCHOOLS ACROSS 22 STATES")
  },
  keywords: [
    markFallback("Seva"),
    markFallback("शिक्षा"),
    markFallback("Empower"),
    markFallback("प्रगति"),
    markFallback("Transform"),
    markFallback("करुणा"),
    markFallback("Sustainability"),
    // markFallback("Karuna"),
    // markFallback("Jugaad"),
  ]
};

