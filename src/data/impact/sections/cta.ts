import type { ImpactSubpageCta } from "@/types/impact/impact.types";

export const defaultCta: ImpactSubpageCta = {
  eyebrow: "THE MISSION CONTINUES",
  title: "Together, We Are Unstoppable",
  body: "Every child, every meal, every classroom starts with one decision.",
  primary: { text: "Donate", href: "/donate" },
  secondary: { text: "Volunteer", href: "/volunteer" },
};

export const partnersCta: ImpactSubpageCta = {
  eyebrow: "THE MISSION CONTINUES",
  title: "Become a Partner",
  body: "Join an elite network of organizations committed to measurable global impact. Align your corporate social responsibility with a mission that prioritizes scale and institutional dignity.",
  primary: { text: "Partner With Us", href: "/contact-us" },
  secondary: { text: "", href: "" },
};
