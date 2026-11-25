import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/common/animations/Reveal";
import ImpactCtaSection from "@/components/impact/ImpactCtaSection";
import ImpactSubpageHero from "@/components/impact/ImpactSubpageHero";
import PartnersSection from "@/components/impact/partnersSection/PartnersSection";
import {
  buildMetadata,
  buildMetadataFromYoast,
  buildFallbackMetadata,
} from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { fetchPageMeta } from "@/lib/wordpress";
import { APP_ROUTES } from "@/constants/navigation.constants";
import {
  getDonorsAndAuditPartnersPageData,
  DONORS_AND_AUDIT_PARTNERS_META_SLUG,
} from "@/services/impact/donorsAndAuditPartners.service";

const SEO_FALLBACK = {
  title: "Donors & Audit Partners — Yuva Unstoppable",
  description:
    "CSR donors and audit partners who support accountability and impact at Yuva Unstoppable.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.DONORS_AND_AUDIT_PARTNERS };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(DONORS_AND_AUDIT_PARTNERS_META_SLUG);

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

export default async function DonorsAndAuditPartnersPage() {
  const [data, pageMeta] = await Promise.all([
    getDonorsAndAuditPartnersPageData(),
    fetchPageMeta(DONORS_AND_AUDIT_PARTNERS_META_SLUG),
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

      <Reveal delay={0.123}>
        <PartnersSection tabs={data.tabs} partners={data.partners} />
      </Reveal>

      <Reveal>
        <ImpactCtaSection cta={data.cta} />
      </Reveal>
    </main>
  );
}
