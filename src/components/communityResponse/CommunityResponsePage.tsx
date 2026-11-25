import type { Metadata } from "next";
import BlogTemplate from "@/components/common/blogTemplate/BlogTemplate";
import { getCommunityResponsePageData } from "@/services/programme/communityResponse.service";
import { fetchPageMeta } from "@/lib/wordpress";
import {
  buildMetadata,
  buildMetadataFromYoast,
  buildFallbackMetadata,
} from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const SEO_FALLBACK = {
  title: "Community Response — Yuva Unstoppable",
  description:
    "Disaster relief, emergency response, and community welfare initiatives from Yuva Unstoppable across India.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.COMMUNITY_RESPONSE };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.COMMUNITY_RESPONSE);

  if (!pageMeta) return buildFallbackMetadata(SEO_FALLBACK, CANONICAL);
  if (pageMeta.yoast)
    return buildMetadataFromYoast(pageMeta.yoast, SEO_FALLBACK, CANONICAL);
  if (pageMeta.seo)
    return buildMetadata(
      pageMeta.seo,
      pageMeta.title || SEO_FALLBACK.title,
      CANONICAL
    );

  return buildFallbackMetadata(SEO_FALLBACK, CANONICAL);
}

export default async function CommunityResponsePage() {
  const [data, pageMeta] = await Promise.all([
    getCommunityResponsePageData(),
    fetchPageMeta(PAGE_SLUGS.COMMUNITY_RESPONSE),
  ]);

  return (
    <>
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <BlogTemplate data={data} />
    </>
  );
}
