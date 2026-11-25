import React from "react";
import { SITE_BASE_URL } from "@/constants/wp.constants";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

/**
 * BreadcrumbList JSON-LD schema renderer for deep pages (blogs, programmes, sub-pages).
 * Fixes audit check #53 (No breadcrumb navigation on deep pages).
 */
export default function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const siteUrl = SITE_BASE_URL.replace(/\/$/, "");

  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
