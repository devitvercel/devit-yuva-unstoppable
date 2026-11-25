import {markFallback} from "@/lib/utils";

import type {RealWorldChangeSectionType} from "@/types/programme/programme.types";

export const realWorldChangeDataFallback: RealWorldChangeSectionType = {
  heading: markFallback("FUTURE"),
  title: markFallback("Let’s Build the Future"),
  body: [
    markFallback("This isn't just an environmental project. It is a commitment to the families who feed us and the infrastructure that supports their growth."),
    markFallback("Whether you’re a corporate partner looking to align your ESG goals with real, measurable human impact, or an individual wanting to support a sustainable, self-reliant future, there is a place for you here.")
  ],
  img: {src: "/assets/pages/programme/real-world-change-img.avif", alt: "real world change img"}
}