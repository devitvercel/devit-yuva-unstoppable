import {markFallback} from "@/lib/utils";
import type {UnSdgsNarrativeSectionType} from "@/types/unSdgs/unSdgs.types";

export const narrativeDataFallback: UnSdgsNarrativeSectionType = {
  heading: markFallback("The Foundation"),
  titlePlain: markFallback("A global blueprint, executed "),
  titleHighlight: markFallback("locally."),
  paragraphs: [
    markFallback(
      "The 2030 Agenda for Sustainable Development Goals is the global blueprint adopted by all United Nations Member States in 2015. It serves as a shared plan of action to end poverty, protect the planet, and ensure that all people enjoy peace and prosperity by the year 2030."
    ),
    markFallback(
      "At Yuva Unstoppable, we believe that systemic change is only possible when local action is aligned with a global vision. We do not view the 17 Sustainable Development Goals (SDGs) as abstract targets but as the essential benchmarks for the dignity and development of the communities we serve. "
    ),
    markFallback(
      "We ensure to embed these global indictors in our grassroot work making sure that every smart classroom, every sanitation block, and every scholarship we deliver contributes directly to the sustainable India of tomorrow."
    ),
  ],
};
