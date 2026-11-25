import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/common/animations/Reveal";
import ArticlesSection from "@/components/media/articlesSection/ArticlesSection";
import GallerySection from "@/components/media/gallerySection/GallerySection";
import MediaCtaSection from "@/components/media/MediaCtaSection";
import MediaHero from "@/components/media/MediaHero";
import {
  buildMetadata,
  buildMetadataFromYoast,
  buildFallbackMetadata,
} from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { fetchPageMeta } from "@/lib/wordpress";
import { getMediaPageData, resolveMediaWpSlug } from "@/services/media/media.service";

function resolveMediaFallbackTitle(slug: string): string {
  if (slug === "blogs") return "Blogs & Stories";
  if (slug === "press-and-media") return "Press & Media Coverage";
  if (slug === "gallery") return "Photo & Media Gallery";
  return "Media";
}

export async function generateMetadata(slug: string): Promise<Metadata> {
  const wpSlug = resolveMediaWpSlug(slug) ?? slug;
  const pageMeta = await fetchPageMeta(wpSlug);
  const canonical = { canonicalPath: `/${slug}` };
  const fallback = {
    title: `${pageMeta?.title || resolveMediaFallbackTitle(slug)} — Yuva Unstoppable`,
    description:
      "Stories, reports and partnerships from Yuva Unstoppable across India — blogs, press coverage, and our photo gallery.",
  };

  if (!pageMeta) return buildFallbackMetadata(fallback, canonical);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, fallback, canonical);
  if (pageMeta.seo)
    return buildMetadata(pageMeta.seo, pageMeta.title || fallback.title, canonical);

  return buildFallbackMetadata(fallback, canonical);
}

export default async function MediaPage({ slug }: { slug: string }) {
  // No server-side URL params: the route stays ISR/CDN-cached. Deep-link
  // params (?q, ?tab, ?category) are applied client-side on mount.
  const [data, pageMeta] = await Promise.all([
    getMediaPageData(slug),
    fetchPageMeta(resolveMediaWpSlug(slug) ?? slug),
  ]);

  if (!data) notFound();

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F7F5F2]">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <Reveal>
        <MediaHero hero={data.hero} disableOptimization={slug === "press-and-media"} />
      </Reveal>

      {data.template === 3 ? (
        <Reveal delay={0.123}>
          <GallerySection
            tabs={data.tabs}
            categories={data.categories}
            items={data.gallery}
          />
        </Reveal>
      ) : data.template === 4 ? (
        <Reveal delay={0.123}>
          <ArticlesSection
            categories={data.categories}
            articles={data.articles}
            variant={slug === "press-and-media" ? "press" : "blog"}
          />
        </Reveal>
      ) : null}

      <Reveal>
        <MediaCtaSection cta={data.cta} />
      </Reveal>
    </main>
  );
}
