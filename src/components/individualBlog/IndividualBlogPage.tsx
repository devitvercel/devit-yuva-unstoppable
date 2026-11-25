import React from 'react';
import type {Metadata} from "next";
import HeroSection from "@/components/individualBlog/heroSection/HeroSection";
import ContentSection from "@/components/individualBlog/contentSection/ContentSection";
import InitiativesSection from "@/components/individualBlog/initiativesSection/InitiativesSection";
import {getIndividualBlogPageData} from "@/services/individualBlog/individualBlog.service";
import {fetchPostMeta} from "@/lib/wordpress";
import {buildMetadata, buildMetadataFromYoast, buildFallbackMetadata} from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import BlogArticleJsonLd from "@/components/seo/BlogArticleJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import Reveal from "@/components/common/animations/Reveal";

export async function generateMetadata(slug: string): Promise<Metadata> {
  const postMeta = await fetchPostMeta(slug);
  const canonical = { canonicalPath: `/blogs/${slug}` };

  const rawTitle = postMeta?.title || fallbackSafeTitle(slug);
  const fallback = {
    title: `${rawTitle} | Yuva Unstoppable Blog`,
    description:
      postMeta?.description ||
      `Read "${rawTitle}" on the Yuva Unstoppable blog. Discover stories of education and community transformation across India.`,
  };

  if (!postMeta) return buildFallbackMetadata(fallback, canonical);

  if (postMeta.yoast) {
    return buildMetadataFromYoast(postMeta.yoast, fallback, canonical);
  }

  if (postMeta.seo) {
    return buildMetadata(postMeta.seo, postMeta.title || fallback.title, canonical);
  }

  return buildFallbackMetadata(fallback, canonical);
}

export default async function IndividualBlogPage(
  {slug, from, listing}: {slug: string; from?: string; listing?: string}
) {
  const [data, postMeta] = await Promise.all([
    getIndividualBlogPageData(slug),
    fetchPostMeta(slug),
  ]);

  const backHref =
    listing === "blogs"
      ? "/blogs"
      : from
        ? `/voice-of-change?category=${encodeURIComponent(from)}`
        : "/voice-of-change";

  const articleTitle = data.hero.title || fallbackSafeTitle(slug);

  return (
    <main className="flex flex-col bg-[#F4EDE0D9] overflow-x-clip min-h-screen gap-10 xl:gap-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blogs", path: "/blogs" },
          { name: articleTitle, path: `/blogs/${slug}` },
        ]}
      />
      {postMeta?.yoast?.schema ? (
        <YoastSchemaRenderer schema={postMeta.yoast.schema} />
      ) : (
        <BlogArticleJsonLd
          title={articleTitle}
          description={postMeta?.description}
          slug={slug}
          datePublished={
            typeof postMeta?.yoast?.article_published_time === "string"
              ? postMeta.yoast.article_published_time
              : undefined
          }
          dateModified={postMeta?.yoast?.article_modified_time}
          image={postMeta?.yoast?.og_image?.[0]?.url}
          authorName="Yuva Unstoppable Team"
        />
      )}
      <HeroSection hero={data.hero}/>

      <Reveal>
        <ContentSection content={data.content} backHref={backHref}/>
      </Reveal>

      {/* <Reveal>
        <InitiativesSection initiatives={data.initiatives}/>
      </Reveal> */}

      <Reveal>
        <LargeBannerSection largeBanner={data.largeBanner} />
      </Reveal>
    </main>
  );
}

function fallbackSafeTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .slice(0, 8)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}