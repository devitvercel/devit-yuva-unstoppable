import {markFallback} from "@/lib/utils";
import type {IndividualBlogHeroSection} from "@/types/individualBlog/individualBlog.types";

export const heroDataFallback: IndividualBlogHeroSection = {
  heading: markFallback("Other Initiatives"),
  title: markFallback("Yuva Volunteer"),
  highlightedTitle: markFallback("Movement"),
  body: markFallback("Yuva Unstoppable gratefully acknowledges the support received from our partners who believe in our efforts, champion our cause and remain UNSTOPPABLE with us."),
};