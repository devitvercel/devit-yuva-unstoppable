import {markFallback} from "@/lib/utils";
import type {UnSdgsIndexSectionType} from "@/types/unSdgs/unSdgs.types";
import {sdgGoalsDataFallback} from "./sdgGoals.data";

export const sdgIndexDataFallback: UnSdgsIndexSectionType = {
  heading: markFallback("THE COMPLETE INDEX"),
  titlePlain: markFallback("All seventeen goals. "),
  titleHighlight: markFallback("Mapped."),
  goals: sdgGoalsDataFallback,
  defaultGoal: 1,
};
