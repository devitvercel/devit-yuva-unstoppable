import {markFallback} from "@/lib/utils";
import type {NumbersSectionType} from "@/types/programme/programme.types";
import {CloudIcon, TreeIcon, UsersIcon} from "../../../../public/SVGs/svg";

export const numbersDataFallback: NumbersSectionType = {
  heading: markFallback("Numbers"),
  title: markFallback("Our Impact in Numbers"),
  body: markFallback("We are proud to stand with the farming families and communities restoring their land — measurable, lasting change rooted in healthier ecosystems and stronger livelihoods."),
  img: {src: "/assets/pages/impact/sect2.avif", alt: "Women carrying produce in a field"},
  numbers: [
    {
      icon: TreeIcon,
      title: markFallback("3.5Cr+"),
      body: markFallback("TREES PLANTED"),
    },
    {
      icon: UsersIcon,
      title: markFallback("50K+"),
      body: markFallback("FARMERS EMPOWERED")
    },
    {
      icon: CloudIcon,
      title: markFallback("27M"),
      body: markFallback("TONS CO₂ SEQUESTERED")
    },
  ]
};