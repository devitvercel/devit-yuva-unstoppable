import type { Metadata } from "next";
import AwardsPage from "@/components/awardRecognition/AwardsPage";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Awards & Recognition — Yuva Unstoppable",
  description:
    "Explore the national and international awards, achievements, and recognition earned by Yuva Unstoppable.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.AWARD_RECOGNITION };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.AWARD_RECOGNITION);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

export default function Page() {
  return <AwardsPage />;
}

export const revalidate = 86400;
