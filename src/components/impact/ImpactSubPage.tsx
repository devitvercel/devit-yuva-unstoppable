import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/common/animations/Reveal";
import ImpactCtaSection from "@/components/impact/ImpactCtaSection";
import ImpactSubpageHero from "@/components/impact/ImpactSubpageHero";
import AnnualReportsSection from "@/components/impact/annualReportsSection/AnnualReportsSection";
import PartnersSection from "@/components/impact/partnersSection/PartnersSection";
import {
  buildMetadata,
  buildMetadataFromYoast,
  buildFallbackMetadata,
} from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { fetchPageMeta } from "@/lib/wordpress";
import {
  getImpactSubpageData,
  resolveImpactSubpageWpSlug,
} from "@/services/impact/impactSubpage.service";

export async function generateMetadata(slug: string): Promise<Metadata> {
  const wpSlug = resolveImpactSubpageWpSlug(slug) ?? slug;
  const pageMeta = await fetchPageMeta(wpSlug);
  const canonical = { canonicalPath: `/${slug}` };
  const fallback = {
    title: `${pageMeta?.title || "Impact"} — Yuva Unstoppable`,
    description: "Partnerships, accountability and impact from Yuva Unstoppable.",
  };

  if (!pageMeta) return buildFallbackMetadata(fallback, canonical);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, fallback, canonical);
  if (pageMeta.seo)
    return buildMetadata(pageMeta.seo, pageMeta.title || fallback.title, canonical);

  return buildFallbackMetadata(fallback, canonical);
}

export default async function ImpactSubPage({ slug }: { slug: string }) {
  const [data, pageMeta] = await Promise.all([
    getImpactSubpageData(slug),
    fetchPageMeta(resolveImpactSubpageWpSlug(slug) ?? slug),
  ]);

  if (!data) notFound();

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F7F5F2]">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <Reveal>
        <ImpactSubpageHero hero={data.hero} />
      </Reveal>

      {data.template === 1 ? (
        <Reveal delay={0.123}>
          <PartnersSection
            tabs={data.tabs}
            partners={data.partners}
            initialTab={slug}
          />
        </Reveal>
      ) : (
        <Reveal delay={0.123}>
          <AnnualReportsSection reports={data.reports} categories={data.tabs} />
        </Reveal>
      )}

      <Reveal>
        <ImpactCtaSection cta={data.cta} />
      </Reveal>
    </main>
  );
}
