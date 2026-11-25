import {markFallback} from "@/lib/utils";
import type {UnSdgsMeasurementSectionType} from "@/types/unSdgs/unSdgs.types";

export const measurementDataFallback: UnSdgsMeasurementSectionType = {
  heading: markFallback("Evidence-Based Practice"),
  titlePlain: markFallback("How We Measure "),
  titleHighlight: markFallback("Our Contribution"),
  body: markFallback(
    "We hold our work to the highest standards of transparency. Our alignment with the SDGs is not a theoretical exercise; it is a measurable practice backed by rigorous monitoring, third-party verification, and live reporting."
  ),
  cards: [
    {
      number: markFallback("01"),
      title: markFallback("Data-Driven Interventions"),
      bodyParts: [
        {text: markFallback("Every project is mapped against ")},
        {text: markFallback("specific SDG indicators"), bold: true},
        {
          text: markFallback(
            " before, during, and after implementation. We monitor attendance shifts, health metrics, and academic performance to ensure our impact is sustained — not just initially achieved."
          ),
        },
      ],
    },
    {
      number: markFallback("02"),
      title: markFallback("Independent Assessment"),
      bodyParts: [
        {text: markFallback("We collaborate with academic and research bodies — including the ")},
        {text: markFallback("London School of Economics India Observatory"), bold: true},
        {
          text: markFallback(
            " — to conduct independent impact evaluations. The data we present to partners is verified, peer-reviewed, and objective."
          ),
        },
      ],
    },
    {
      number: markFallback("03"),
      title: markFallback("Real-Time Reporting"),
      bodyParts: [
        {text: markFallback("Through our digital tracking systems, partners receive ")},
        {text: markFallback("live visibility"), bold: true},
        {
          text: markFallback(
            " into the link between their funding and the progress of specific SDG indicators — closing the gap between intention and outcome."
          ),
        },
      ],
    },
  ],
};
