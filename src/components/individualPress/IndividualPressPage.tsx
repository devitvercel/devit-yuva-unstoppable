import type { Metadata } from "next";
import Reveal from "@/components/common/animations/Reveal";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import PressHeroSection from "@/components/individualPress/heroSection/PressHeroSection";
import PressContentSection from "@/components/individualPress/contentSection/PressContentSection";
import RelatedBlogsSection from "@/components/individualPress/relatedBlogsSection/RelatedBlogsSection";
import { getIndividualPressPageData } from "@/services/individualPress/individualPress.service";
import { fetchPressMeta } from "@/lib/wordpress";
import { buildMetadata, buildMetadataFromYoast, buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export async function generateMetadata(slug: string): Promise<Metadata> {
  const pressMeta = await fetchPressMeta(slug);
  const canonical = { canonicalPath: `/press-and-media/${slug}` };

  const fallback = {
    title: pressMeta?.title
      ? `${pressMeta.title} — Yuva Unstoppable`
      : "Press & Media — Yuva Unstoppable",
    description:
      pressMeta?.description ??
      "News, announcements and media coverage from Yuva Unstoppable.",
  };

  if (!pressMeta) return buildFallbackMetadata(fallback, canonical);

  if (pressMeta.yoast) {
    return buildMetadataFromYoast(pressMeta.yoast, fallback, canonical);
  }

  if (pressMeta.seo) {
    return buildMetadata(pressMeta.seo, pressMeta.title || fallback.title, canonical);
  }

  return buildFallbackMetadata(fallback, canonical);
}

export default async function IndividualPressPage({
  slug,
  from,
}: {
  slug: string;
  from?: string;
}) {
  const [data, pressMeta] = await Promise.all([
    getIndividualPressPageData(slug),
    fetchPressMeta(slug),
  ]);

  const backHref = from
    ? `/press-and-media?category=${encodeURIComponent(from)}`
    : "/press-and-media";

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F7F5F2]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Press & Media", path: "/press-and-media" },
          { name: data.hero.title || slug, path: `/press-and-media/${slug}` },
        ]}
      />
      {pressMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pressMeta.yoast.schema} />
      )}

      <PressHeroSection hero={data.hero} />

      <Reveal>
        <div className="w-916/1000 xl:w-888/1000 mx-auto px-4 md:px-10 xl:px-20 py-10 md:py-16 xl:py-20 flex flex-col gap-12 md:gap-16 xl:gap-20">
          <PressContentSection content={data.content} backHref={backHref} />
          <RelatedBlogsSection relatedBlogs={data.relatedBlogs} />
        </div>
      </Reveal>

      <Reveal>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </main>
  );
}
