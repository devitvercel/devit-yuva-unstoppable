import type {RealWorldChangeSectionType} from "@/types/programme/programme.types";
import {markFallback} from "@/lib/utils";

export const viewDataFallback: RealWorldChangeSectionType = {
  heading: markFallback("GROWTH"),
  title: markFallback("A Different Kind of Growth"),
  body: [
    markFallback("We don't look at \"environmental impact\" and \"economic development\" as two separate buckets. They are the same. A healthy ecosystem provides the resources for a healthy economy, and a healthy economy is the only way to ensure thousands of families have the freedom to plan for, and achieve, long-term success.")
  ],
  img: {src: "/assets/pages/programme/programme-template-4-img.avif", alt: "agroforestry growth"}
}