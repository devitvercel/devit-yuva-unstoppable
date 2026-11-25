import type {MetadataRoute} from "next";
import {SITE_BASE_URL} from "@/constants/wp.constants";

/** Generates /robots.txt — preferred over public/robots.txt when Next.js is running. */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE_BASE_URL.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/coming-soon"],
    },
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
