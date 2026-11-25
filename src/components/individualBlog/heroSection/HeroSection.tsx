import React from 'react';
import type {IndividualBlogHeroSection} from "@/types/individualBlog/individualBlog.types";

function HeroSection({hero}: { hero: IndividualBlogHeroSection }) {
  return (
    <section
      className="relative pt-32 xl:pt-48 w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-4 justify-center text-center">
      <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-[11px] font-bold tracking-[1.5px] text-[#6B6761] uppercase">
        <a href="/" className="hover:text-primary-red transition-colors">Home</a>
        <span className="text-primary-red">•</span>
        <a href="/blogs" className="hover:text-primary-red transition-colors">Blogs</a>
        <span className="text-primary-red">•</span>
        <span className="text-primary-red truncate max-w-[200px] sm:max-w-[320px]">{hero.title}</span>
      </nav>
      <div className="relative z-2 flex flex-col items-center justify-center gap-0">
        <div className="flex flex-row items-center flex-wrap gap-2.5">
          <div className="size-1.5 bg-primary-red rounded-[1px]"/>
          <p className="typo-body2 flex-1 text-primary-red">
            {hero.heading}
          </p>
        </div>
        <h1 className="typo-h1 text-[24px]! md:text-[38px]! lg:text-[52px]! text-[#241E19]">
          {hero.title}{" "}
          <span className="text-primary-red">{hero.highlightedTitle}</span>
        </h1>
      </div>
      {hero.body && (
        <p className="typo-body3 text-[#3A312A] lg:w-7/10 mx-auto">
          {hero.body}
        </p>
      )}
    </section>
  );
}

export default HeroSection;