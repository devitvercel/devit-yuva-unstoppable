import {markFallback} from "@/lib/utils";
import type {StatsSectionType} from "@/types/home/home.types";

export const statsDataFallback: StatsSectionType = {
  heading: markFallback("By the numbers —"),
  stats: [
    {
      number: markFallback("7M+"),
      title: markFallback("BENEFICIARIES")
    },
    {
      number: markFallback("10,000+"),
      title: markFallback("SCHOLARS")
    },
    {
      number: markFallback("66.7cr+"),
      title: markFallback("TREES PLANTED")
    },
    {
      number: markFallback("10,000+"),
      title: markFallback("SCHOOLS")
    },
    {
      number: markFallback("1LKH+"),
      title: markFallback("ANGANWADI")
    }
  ]
}