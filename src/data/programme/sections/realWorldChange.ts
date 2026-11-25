import {markFallback} from "@/lib/utils";

import type {RealWorldChangeSectionType} from "@/types/programme/programme.types";

export const realWorldChangeDataFallback: RealWorldChangeSectionType = {
  heading: markFallback("real-world change"),
  title: markFallback("Transparency Through Technology"),
  body: [
    markFallback("We believe in the power of data to drive real-world change. We have launched a dedicated digital platform in collaboration with Infosys Co-founder S.D Shibulal Ji, designed to bring total transparency to our scholarship ecosystem. This platform enables our corporate partners to track the academic progress and growth of the students they support in real-time, ensuring that every contribution creates a measurable, lasting impact.")
  ],
  img: { src: "/assets/pages/programme/real-world-change-img.avif", alt: "real world change img" }
}