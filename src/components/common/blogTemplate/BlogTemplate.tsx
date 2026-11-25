import React from "react";
import type {BlogTemplatePageData} from "@/types/programme/blogTemplate.types";
import HeroSection from "@/components/common/blogTemplate/heroSection/HeroSection";
import ArticlesSection from "@/components/common/blogTemplate/articlesSection/ArticlesSection";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";
import Reveal from "@/components/common/animations/Reveal";

interface BlogTemplateProps {
  data: BlogTemplatePageData;
}

export default function BlogTemplate({data}: BlogTemplateProps) {
  const {hero, articles, largeBanner} = data;

  return (
    <main className="flex flex-col min-h-screen bg-[#F7F5F2] overflow-x-clip">
      {/* Hero Section */}
      <HeroSection hero={hero}/>

      {/* Articles Grid Section */}
      <ArticlesSection articles={articles}/>

      {/* Large Banner Section */}
      <Reveal>
        <LargeBannerSection largeBanner={largeBanner} />
      </Reveal>
    </main>
  );
}
