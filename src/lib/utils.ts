import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {WhatWeDoSectionType} from "@/types/home/home.types";
import {SchoolTransformationItemType} from "@/types/programme/programme.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Fallback labelling
 * ---------------------------------------------------------------------------
 * `markFallback` appends a " (fallback)" marker to static fallback copy when
 * `SHOW_FALLBACK_LABEL` is `true`. It is baked into the fallback data
 * (`src/data/<page>/*.data.ts`), so the marker only ever surfaces when the
 * parser actually substitutes a fallback — i.e. when the backend value was
 * empty/missing. Content that comes from the live endpoint is never marked.
 *
 * Toggle it via `.env`:
 *   NEXT_PUBLIC_SHOW_FALLBACK_LABEL=true   → fallback copy shows "(fallback)"
 *   NEXT_PUBLIC_SHOW_FALLBACK_LABEL=false  → fallback copy renders clean,
 *                                            indistinguishable from CMS data
 *
 * The `NEXT_PUBLIC_` prefix is required: this flag is read inside the baked
 * fallback data that ships to the browser, so it must be inlined client-side.
 * Anything other than the exact string "true" is treated as `false`.
 */
const SHOW_FALLBACK_LABEL = process.env.NEXT_PUBLIC_SHOW_FALLBACK_LABEL === "true";

/** Append the "(fallback)" marker to a fallback text value when enabled.*/
export function markFallback(value: string): string {
  return SHOW_FALLBACK_LABEL ? `${value} (fallback)` : value;
}

export function parseStatNumber(numStr: string | number): {
  prefix: string,
  value: number,
  suffix: string,
  hasSeparator: boolean
} {
  const str = String(numStr ?? '');
  const match = str.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  if (!match) {
    return {prefix: "", value: 0, suffix: str, hasSeparator: false};
  }
  const prefix = match[1];
  const numericPart = match[2];
  const suffix = match[3];

  const value = parseFloat(numericPart.replace(/,/g, ''));
  const hasSeparator = numericPart.includes(',') || value >= 1000;

  return {prefix, value, suffix, hasSeparator};
}

export const isProgrammeType = (
  program: WhatWeDoSectionType["programmes"][0] | SchoolTransformationItemType
): program is WhatWeDoSectionType["programmes"][0] => {
  return "href" in program;
};