import {markFallback} from "@/lib/utils";
import type {ProgrammeInfoSectionType} from "@/types/programme/programme.types";

export const programmeDataFallback: ProgrammeInfoSectionType = {
  heading: markFallback("ABOUT ANGANWADI TRANSFORMATION"),
  title: markFallback("The Difference Between a Dream and a Reality"),
  body: [
    markFallback("We believe that talent is equally distributed, but opportunity is not. For many of the brilliant students we meet, the path to becoming a doctor, an engineer, or a chartered accountant is blocked by a single, solvable hurdle: a financial gap of roughly 2 lakh rupees."),
    markFallback("That amount is often the difference between a student becoming a leader of the future and having to abandon their aspirations entirely. Our scholarship program isn’t just about bridging that financial divide; it’s about providing the stability required to focus entirely on excellence."),
  ],
}