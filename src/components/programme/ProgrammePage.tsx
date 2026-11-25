import React from "react";
import type {Metadata} from "next";
import {getProgrammePageData, resolveProgrammeWpSlug} from "@/services/programme/programme.service";
import {fetchPageMeta} from "@/lib/wordpress";
import {buildMetadata, buildMetadataFromYoast, buildFallbackMetadata} from "@/lib/seo/metadata.builder";
import YoastSchemaRenderer from "@/lib/seo/YoastSchemaRenderer";
import HeroSection from "@/components/programme/heroSection/HeroSection";
import CommitmentSection from "@/components/programme/commitmentSection/CommitmentSection";
import ProgrammeLargeBannerSection
  from "@/components/programme/programmeLargeBannerSection/ProgrammeLargeBannerSection";
import Reveal from "@/components/common/animations/Reveal";
import ProgrammeSection from "@/components/programme/programmeSection/ProgrammeSection";
import SupportSystemSection from "@/components/programme/supportSystemSection/SupportSystemSection";
import RealWorldChangeSection from "@/components/programme/realWorldChangeSection/RealWorldChangeSection";
import NumbersSection from "@/components/programme/numbersSection/NumbersSection";
import StudentJourneySection from "@/components/programme/studentJourneySection/StudentJourneySection";
import WhyPartnerSection from "@/components/programme/whyPartnerSection/WhyPartnerSection";
import VoicesSection from "@/components/home/voicesSection/VoicesSection";
import {toVoicesSection} from "@/data/programme/sections/studentTestimonial";
import {notFound} from "next/navigation";
import NumbersSection4 from "@/components/programme/NumbersSection4/NumbersSection4";
import OurVisionSection from "@/components/programme/ourVisionSection/OurVisionSection";
import ProgramCard from "@/components/common/program/ProgramCard";


export async function generateMetadata(slug: string): Promise<Metadata> {
  // Metadata must query the same WP page as the content (the "-new" slug).
  const wpSlug = resolveProgrammeWpSlug(slug) ?? slug;
  const pageMeta = await fetchPageMeta(wpSlug);
  const canonical = { canonicalPath: `/${slug}` };

  const rawTitle = pageMeta?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const fallback = {
    title: `${rawTitle} | Yuva Unstoppable NGO India`,
    description: `Learn about our ${rawTitle} empowering government school students across India with digital literacy, smart classrooms, and holistic support.`,
  };

  if (!pageMeta) return buildFallbackMetadata(fallback, canonical);

  if (pageMeta.yoast) {
    return buildMetadataFromYoast(pageMeta.yoast, fallback, canonical);
  }

  if (pageMeta.seo) {
    return buildMetadata(pageMeta.seo, pageMeta.title || fallback.title, canonical);
  }

  return buildFallbackMetadata(fallback, canonical);
}

export default async function ProgrammePage({slug}: { slug: string }) {
  const wpSlug = resolveProgrammeWpSlug(slug) ?? slug;
  const [data, pageMeta] = await Promise.all([
    getProgrammePageData(slug),
    fetchPageMeta(wpSlug),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen overflow-x-clip">

      {pageMeta?.yoast?.schema && (
        <YoastSchemaRenderer schema={pageMeta.yoast.schema}/>
      )}
      {data.programmeTemplate.template == 1 ? (
        <>
        <Reveal delay={0.123}>
          <HeroSection hero={data.hero}/>
        </Reveal>
          <Reveal delay={0.123}>
            {data.programmeInfo && <ProgrammeSection programme={data.programmeInfo}/>}
          </Reveal>
          {data.programmeCommitment && <CommitmentSection commitment={data.programmeCommitment}/>}
          <Reveal>
            {data.numbers && <NumbersSection numbers={data.numbers}/>}
          </Reveal>
          {data.studentTestimonial && (
            <Reveal>
              <VoicesSection voices={toVoicesSection(data.studentTestimonial)} />
            </Reveal>
          )}
          <Reveal>
            {data.programmeLargeBanner &&
                <ProgrammeLargeBannerSection programmeLargeBanner={data.programmeLargeBanner}/>}
          </Reveal>
        </>
      ) : data.programmeTemplate.template == 2 ? (
        <>
        <Reveal>
          <HeroSection hero={data.hero}/>
        </Reveal>
        <Reveal delay={0.123}>
            {data.programmeInfo && <ProgrammeSection programme={data.programmeInfo}/>}
          </Reveal>
          <Reveal delay={0.123}>
            {data.supportSystem && <SupportSystemSection supportSystem={data.supportSystem}/>}
          </Reveal>
          <Reveal>
            {data.realWorldChange && <RealWorldChangeSection realWorldChange={data.realWorldChange}/>}
          </Reveal>
          <Reveal>
            {data.view &&
                <RealWorldChangeSection containerClassName={"xl:flex-row-reverse"} contentClassName={"text-[#1A1815]"}
                                        headingDotClassName={"bg-primary-red"}
                                        headingClassName={"text-primary-red"}
                                        sectionClassName={"bg-[#F7F5F2]"} paragraphClassName={"text-[#6B6761]"}
                                        realWorldChange={data.view}/>}
          </Reveal>
          <Reveal>
            {data.numbers && <NumbersSection numbers={data.numbers}/>}
          </Reveal>
          {data.studentTestimonial && (
            <Reveal>
              <VoicesSection voices={toVoicesSection(data.studentTestimonial)} />
            </Reveal>
          )}
          <Reveal>
            {data.programmeLargeBanner &&
                <ProgrammeLargeBannerSection programmeLargeBanner={data.programmeLargeBanner}/>}
          </Reveal>
        </>
      ) : data.programmeTemplate.template == 3 ? (
        <>
        <Reveal>
          <HeroSection hero={data.hero}/>
        </Reveal>
        <Reveal delay={0.123}>
            {data.programmeInfo && <ProgrammeSection programme={data.programmeInfo}/>}
          </Reveal>
          <Reveal delay={0.123}>
            {data.supportSystem && <SupportSystemSection supportSystem={data.supportSystem}/>}
          </Reveal>
          {data.studentJourney && <StudentJourneySection studentJourney={data.studentJourney}/>}
          {data.whyPartner && <WhyPartnerSection whyPartner={data.whyPartner}/>}
          <Reveal>
            {data.numbers && <NumbersSection numbers={data.numbers}/>}
          </Reveal>
          {data.studentTestimonial && (
            <Reveal>
              <VoicesSection voices={toVoicesSection(data.studentTestimonial)} />
            </Reveal>
          )}
          <Reveal>
            {data.programmeLargeBanner &&
                <ProgrammeLargeBannerSection programmeLargeBanner={data.programmeLargeBanner}/>}
          </Reveal>
        </>
      ) : data.programmeTemplate.template == 4 ? (
        <>
        <Reveal>
          <HeroSection hero={data.hero}/>
        </Reveal>
        <Reveal delay={0.123}>
            {data.programmeInfo && <ProgrammeSection programme={data.programmeInfo}/>}
          </Reveal>
          <Reveal delay={0.123}>
            {data.supportSystem && <SupportSystemSection supportSystem={data.supportSystem}/>}
          </Reveal>
          {data.ourVision && <OurVisionSection ourVision={data.ourVision}/>}
          <Reveal>
            {data.view &&
                <RealWorldChangeSection containerClassName={"xl:flex-row-reverse"} contentClassName={"text-[#1A1815]"}
                                        headingDotClassName={"bg-primary-red"}
                                        headingClassName={"text-primary-red"}
                                        sectionClassName={"bg-[#F7F5F2]"} paragraphClassName={"text-[#6B6761]"}
                                        realWorldChange={data.view}/>}
          </Reveal>
          <Reveal>
            {data.realWorldChange &&
                <RealWorldChangeSection containerClassName={"flex-col"} realWorldChange={data.realWorldChange}/>}
          </Reveal>
          <Reveal>
            {data.numbers && (data.numbers.img?.src && data.numbers.img?.alt) &&
                <NumbersSection4 numbers={data.numbers}/>}
          </Reveal>
          {data.studentTestimonial && (
            <Reveal>
              <VoicesSection voices={toVoicesSection(data.studentTestimonial)} />
            </Reveal>
          )}
          <Reveal>
            {data.programmeLargeBanner &&
                <ProgrammeLargeBannerSection programmeLargeBanner={data.programmeLargeBanner}/>}
          </Reveal>
        </>
      ) : data.programmeTemplate.template == 5 ? (
        <>
        <Reveal>
          <HeroSection hero={data.hero}/>
        </Reveal>
        <Reveal delay={0.123}>
            {data.programmes &&
                <section className={"py-7.5 xl:py-20 w-916/1000 xl:w-888/1000 mx-auto"}>
                    <ProgramCard programmes={data.programmes}/>
                </section>}
          </Reveal>
          <Reveal>
            {data.numbers && <NumbersSection numbers={data.numbers}/>}
          </Reveal>
          {data.studentTestimonial && (
            <Reveal>
              <VoicesSection voices={toVoicesSection(data.studentTestimonial)} />
            </Reveal>
          )}
          <Reveal>
            {data.programmeLargeBanner &&
                <ProgrammeLargeBannerSection programmeLargeBanner={data.programmeLargeBanner}/>}
          </Reveal>
        </>
      ) : null}
    </main>
  );
}
