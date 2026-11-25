import {SITE_BASE_URL} from "@/constants/wp.constants";
import {normalizeSeoDescription, normalizeSeoTitle} from "@/lib/seo/seoMeta.utils";

type BlogArticleJsonLdProps = {
  title: string;
  description?: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
};

/**
 * Article JSON-LD for blog posts when Yoast schema is missing.
 * Safe to render alongside SiteJsonLd (Organization/WebSite).
 */
export default function BlogArticleJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  image,
  authorName = "Yuva Unstoppable Team",
}: BlogArticleJsonLdProps) {
  const siteUrl = SITE_BASE_URL.replace(/\/$/, "");
  const url = `${siteUrl}/blogs/${slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: normalizeSeoTitle(title),
    description: normalizeSeoDescription(
      description || "",
      "Stories of transformation from Yuva Unstoppable."
    ),
    mainEntityOfPage: {"@type": "WebPage", "@id": url},
    url,
    ...(datePublished && {datePublished}),
    ...(dateModified && {dateModified}),
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
    author: [
      {
        "@type": "Person",
        name: authorName,
      },
      {
        "@type": "Organization",
        name: "Yuva Unstoppable",
        url: siteUrl,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Yuva Unstoppable",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/logos/logo-dark.png`,
        width: 125,
        height: 65,
      },
    },
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
