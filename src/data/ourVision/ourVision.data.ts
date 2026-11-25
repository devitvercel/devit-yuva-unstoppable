import {markFallback} from "@/lib/utils";
import type {OurVisionSectionType} from "@/types/ourVision/ourVision.types";

export const ourVisionDataFallback: OurVisionSectionType = {
  heading: markFallback("OUR VISION"),
  title: markFallback("A just, equitable and sustainable world where no one is left behind."),
  body: [
    markFallback("To ignite the potential of India’s youth by transforming their learning environments and bridging the digital divide. We strive to provide every child with the dignity of clean, sustainable infrastructure while nurturing a generation defined by self-belief, compassion, and the passion to pay it forward.")
  ],
  pillars: [
    {
      id: 1,
      title: markFallback("Systemic Transformation"),
      body: markFallback("We move beyond isolated projects, embedding technology and accountability directly into public schools and Anganwadi centers to create self-sustaining resilience hubs."),
    },
    {
      id: 2,
      title: markFallback("Holistic Lifecycle Support"),
      body: markFallback("We treat education, health, and skilling as one journey. By converging these services, we ensure positive outcomes that last from early childhood all the way to employment."),
    },
    {
      id: 3,
      title: markFallback("Bridging the Impact Gap"),
      body: markFallback("We eliminate \"impact leakage\" by directing philanthropy exactly where it is needed most, ensuring that high-value inputs translate into measurable growth and lasting well-being for millions of children and mothers across India."),
    },
    {
      id: 4,
      title: markFallback("Scalable Innovation"),
      body: markFallback("By bridging government, corporates, and communities, we’ve built an ecosystem that scales impact far beyond what any single organization could achieve."),
    }
  ]
};