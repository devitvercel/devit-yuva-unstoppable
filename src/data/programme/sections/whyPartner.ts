import {markFallback} from "@/lib/utils";
import type {WhyPartnerSectionType} from "@/types/programme/programme.types";

export const whyPartnerDataFallback: WhyPartnerSectionType = {
  heading: markFallback("Why"),
  title: markFallback("Why Partner with Yuva Unstoppable?"),
  body: [
    markFallback("Talent is universal, but opportunity is not. When corporations engage with our skill development initiatives, they aren’t just fulfilling CSR goals, they are tapping into a motivated, prepared, and eager-to-grow talent pool."),
    markFallback("We offer our partners:"),
  ],
  cards: [
    {
      id: markFallback("01"),
      title: markFallback("A Vetted Pipeline"),
      body: markFallback("Access to candidates who have been trained, tested, and are ready for high-trajectory growth.")
    },
    {
      id: markFallback("02"),
      title: markFallback("Strategic Impact"),
      body: markFallback("An opportunity to move the needle on employability and social equity.")
    },
    {
      id: markFallback("03"),
      title: markFallback("Customized Modules"),
      body: markFallback("We can work with you to align our training with the specific technical or soft-skill demands of your organization.")
    },
  ]
}