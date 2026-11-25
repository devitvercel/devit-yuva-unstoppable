import type { Metadata } from "next";
import { SITE_BASE_URL } from "@/constants/wp.constants";

/**
 * Builds an absolute canonical URL for the public Next.js route.
 * Always uses SITE_BASE_URL — never WordPress / staging hostnames from Yoast.
 */
export function resolveCanonicalUrl(path: string): string {
  const base = SITE_BASE_URL.replace(/\/$/, "");
  const cleanPath = path.split("?")[0].replace(/\/+$/, "");
  const normalized = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

  if (!normalized || normalized === "/") {
    return base;
  }

  return `${base}${normalized}`;
}

/** Attach production canonical + matching og:url to any Metadata object. */
export function applyCanonical(metadata: Metadata, path: string): Metadata {
  const canonical = resolveCanonicalUrl(path);

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical,
    },
    openGraph: metadata.openGraph
      ? { ...metadata.openGraph, url: canonical }
      : { url: canonical },
  };
}
