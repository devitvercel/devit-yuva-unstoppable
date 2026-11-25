import {SITE_BASE_URL} from "@/constants/wp.constants";

/**
 * Site-wide Organization + WebSite JSON-LD.
 * Rendered once in the root layout so every page has structured data even when
 * Yoast schema is absent. Yoast graphs strip these types to avoid duplicates.
 */
export default function SiteJsonLd() {
  const siteUrl = SITE_BASE_URL.replace(/\/$/, "");

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Yuva Unstoppable",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/assets/logos/logo-dark.png`,
          width: 125,
          height: 65,
        },
        sameAs: [
          "https://www.facebook.com/yuvaunstoppableindia/",
          "https://twitter.com/unstoppableyuva",
          "https://www.linkedin.com/company/yuvaunstoppableindia/",
          "https://www.instagram.com/yuva_unstoppable/",
          "https://www.youtube.com/channel/UC-C1JZrgRqXTdCdkJzbOjZQ",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Yuva Unstoppable",
        publisher: {"@id": `${siteUrl}/#organization`},
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(graph)}}
    />
  );
}
