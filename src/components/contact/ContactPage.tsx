import type { Metadata } from "next";
import {getContactPageData} from "@/services/contact/contact.service";
import HeroSection from "@/components/contact/heroSection/HeroSection";
import ContactContainerSection from "@/components/contact/contactContainerSection/ContactContainerSection";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import Reveal from "@/components/common/animations/Reveal";
import { fetchPageMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";

const FALLBACK = {
  title: "Contact Us — Yuva Unstoppable",
  description: "Get in touch with the Yuva Unstoppable offices in India and the US.",
};

const CANONICAL = { canonicalPath: APP_ROUTES.CONTACT };

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await fetchPageMeta(PAGE_SLUGS.CONTACT);
  if (!pageMeta) return buildFallbackMetadata(FALLBACK, CANONICAL);
  if (pageMeta.yoast) return buildMetadataFromYoast(pageMeta.yoast, FALLBACK, CANONICAL);
  if (pageMeta.seo) return buildMetadata(pageMeta.seo, pageMeta.title || FALLBACK.title, CANONICAL);
  return buildFallbackMetadata(FALLBACK, CANONICAL);
}

export default async function ContactPage() {
  const [data, pageMeta] = await Promise.all([
    getContactPageData(),
    fetchPageMeta(PAGE_SLUGS.CONTACT),
  ]);

  return (
    <main className="flex flex-col overflow-x-clip">
      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema} />
      )}
      <HeroSection hero={data.hero}/>
      <Reveal>
        <ContactContainerSection contactContainer={data.contactContainer}/>
      </Reveal>
      <Reveal>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </main>
  );
}
