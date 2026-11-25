import {markFallback} from "@/lib/utils";
import type {LifeAtYuvaTheYuvaWaySectionType} from "@/types/lifeAtYuva/lifeAtYuva.types";

export const theYuvaWayDataFallback: LifeAtYuvaTheYuvaWaySectionType = {
  eyebrow: markFallback("THE YUVA WAY"),
  label: markFallback("We Are:"),
  pillars: [
    {
      number: markFallback("01"),
      title: markFallback("Young"),
      body: markFallback(
        "We believe age is never a barrier to creating meaningful change. We lead with energy, optimism and purpose."
      ),
    },
    {
      number: markFallback("02"),
      title: markFallback("Productive"),
      body: markFallback(
        "We focus on outcomes, not activity. Every effort should create measurable impact for the communities we serve."
      ),
    },
    {
      number: markFallback("03"),
      title: markFallback("Good-Looking"),
      body: markFallback(
        "We show up with pride, professionalism and positivity—because excellence is reflected in everything we do."
      ),
    },
    {
      number: markFallback("04"),
      title: markFallback("Dynamic"),
      body: markFallback(
        "We move with urgency, adapt quickly and embrace change because communities cannot wait."
      ),
    },
    {
      number: markFallback("05"),
      title: markFallback("Hard Working"),
      body: markFallback(
        "We go the extra mile, doing whatever it takes to create lasting impact."
      ),
    },
    {
      number: markFallback("06"),
      title: markFallback("Creative"),
      body: markFallback(
        "We solve complex challenges with curiosity, innovation and practical thinking."
      ),
    },
    {
      number: markFallback("07"),
      title: markFallback("We will make a Difference"),
      body: markFallback(
        "We measure our success by the lives we transform and the communities we strengthen."
      ),
    },
  ],
};
