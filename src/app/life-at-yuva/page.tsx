import type {Metadata} from "next";
import LifeAtYuvaPage from "@/components/lifeAtYuva/LifeAtYuvaPage";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Life @ Yuva — Yuva Unstoppable",
  description:
    "Meet the passionate people driving change across communities. Discover life at Yuva Unstoppable.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.LIFE_AT_YUVA };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.LIFE_AT_YUVA);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

export default function Page() {
  return <LifeAtYuvaPage />;
}

export const revalidate = 3600;
