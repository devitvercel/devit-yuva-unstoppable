import type {Metadata} from "next";
import UnSdgsPage from "@/components/unSdgs/UnSdgsPage";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Alignment with UN SDGs — Yuva Unstoppable",
  description:
    "Discover how Yuva Unstoppable aligns grassroots work with the UN Sustainable Development Goals across education, health, equity, climate, and partnerships.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.ALIGNMENT_WITH_UN_SDGS };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.ALIGNMENT_WITH_UN_SDGS);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

export default function Page() {
  return <UnSdgsPage/>;
}

export const revalidate = 86400;
