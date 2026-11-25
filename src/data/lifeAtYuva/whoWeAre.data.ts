import {markFallback} from "@/lib/utils";
import type {LifeAtYuvaWhoWeAreSectionType} from "@/types/lifeAtYuva/lifeAtYuva.types";

export const whoWeAreDataFallback: LifeAtYuvaWhoWeAreSectionType = {
  label: markFallback("Who We Are"),
  pillars: [
    {
      number: markFallback("01"),
      title: markFallback("Purpose-driven organization"),
      body: markFallback(
        "Moving away from fragmented, programme-driven systems toward a government-embedded, tech-enabled delivery architecture that scales without losing accountability."
      ),
    },
    {
      number: markFallback("02"),
      title: markFallback("Collaborative work environment"),
      body: markFallback(
        "Integrating education, health, skilling, and climate interventions to ensure positive outcomes from early childhood through to employability — not just at one stage."
      ),
    },
    {
      number: markFallback("03"),
      title: markFallback("Innovation and community impact"),
      body: markFallback(
        'Systematically reducing "impact leakage" to ensure that high inputs in public spending result in high outcomes for the millions of children and mothers we serve.'
      ),
    },
    {
      number: markFallback("04"),
      title: markFallback("Commitment to education and social change"),
      body: markFallback(
        'Leveraging a unique "hub-and-spoke" model and digital platforms to orchestrate collective action across government, corporate partners, and grassroots communities.'
      ),
    },
    {
      number: markFallback("05"),
      title: markFallback("Young"),
      body: markFallback(
        'We believe age is never a barrier to creating meaningful change. We lead with energy, optimism and purpose.'
      ),
    },
    {
      number: markFallback("06"),
      title: markFallback("Productive"),
      body: markFallback(
        'We focus on outcomes, not activity. Every effort should create measurable impact for the communities we serve.'
      ),
    },
    {
      number: markFallback("07"),
      title: markFallback("Good-Looking"),
      body: markFallback(
        'We show up with pride, professionalism and positivity—because excellence is reflected in everything we do.'
      ),
    },
    {
      number: markFallback("08"),
      title: markFallback("Dynamic"),
      body: markFallback(
        'We move with urgency, adapt quickly and embrace change because communities cannot wait.'
      ),
    },
    {
      number: markFallback("09"),
      title: markFallback("Hard Working"),
      body: markFallback(
        'We go the extra mile, doing whatever it takes to create lasting impact.'
      ),
    },
    {
      number: markFallback("10"),
      title: markFallback("Creative"),
      body: markFallback(
        'We solve complex challenges with curiosity, innovation and practical thinking.'
      ),
    },
    {
      number: markFallback("11"),
      title: markFallback("Difference Makers"),
      body: markFallback(
        'We measure our success by the lives we transform and the communities we strengthen.'
      ),
    },
  ],
};
