import type {RealWorldChangeSectionType} from "@/types/programme/programme.types";
import {markFallback} from "@/lib/utils";

export const viewDataFallback: RealWorldChangeSectionType = {
  heading: markFallback("view"),
  title: markFallback("Our Vision for 2030"),
  body: [
    markFallback("Our work is just beginning. We have set an ambitious goal to support 15,000 students by 2030. We are building more than just a scholarship program; we are building a pipeline of high-trajectory careers that will shape the future of this country.")
  ],
  img: {src: "/assets/pages/programme/view-img-v2.avif", alt: "real world change img"}
}