import React from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/common/animations/Reveal";
import type { BlogTemplateArticle } from "@/types/programme/blogTemplate.types";

interface ArticlesSectionProps {
  articles: BlogTemplateArticle[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <section className="w-916/1000 xl:w-888/1000 mx-auto py-16 md:py-30">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-6 justify-items-center w-full">
        {articles.map((article, index) => (
          <Reveal key={index} delay={0.1 * index}>
            <Link
              href={article.href || "#"}
              className="border border-[rgba(206,32,40,0.1)] hover:border-primary-red hover:shadow-[0px_4px_16px_rgba(206,32,40,0.25)] flex flex-col items-start pb-[30px] rounded-[6px] w-full bg-[#f7f5f2] transition-all duration-300 group h-full"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-423/248 overflow-hidden rounded-tl-[5px] rounded-tr-[5px] bg-[#f5f5f4] mb-[20px] shrink-0">
                <Image
                  src={article.img.src}
                  alt={article.img.alt || article.title}
                  fill
                  className="object-cover rounded-tl-[5px] rounded-tr-[5px] transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Date */}
              <div className="px-[20px] pb-[6px] w-full">
                <p className="font-sans font-medium text-[13px] md:text-[14px] text-[#5b403e] uppercase tracking-wider">
                  {article.date}
                </p>
              </div>

              {/* Content */}
              <div className="px-[20px] flex flex-col gap-1 w-full flex-grow mb-[20px]">
                <h3 className="font-serif font-medium text-[20px] md:text-[24px] text-[#271816] leading-[1.2] group-hover:text-primary-red transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="font-sans font-medium text-[14px] leading-6 text-[#5b403e]/70 line-clamp-4 mt-2">
                  {article.body}
                </p>
              </div>

              {/* Read More Link */}
              <div className="px-[20px] w-full flex justify-end mt-auto">
                <span className="font-sans font-medium text-[15px] md:text-[16px] text-[#a00416] hover:text-[#ce2028] transition-colors duration-200 uppercase tracking-wider">
                  Read More →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
