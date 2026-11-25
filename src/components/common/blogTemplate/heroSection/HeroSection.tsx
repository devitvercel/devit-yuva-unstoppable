import React from "react";
import Image from "next/image";
import Reveal from "@/components/common/animations/Reveal";
import type { BlogTemplateHero } from "@/types/programme/blogTemplate.types";

interface HeroSectionProps {
  hero: BlogTemplateHero;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  // Split title to style first word differently
  const words = hero.title.trim().split(/\s+/);
  const firstWord = words[0] || "";
  const remainingWords = words.slice(1).join(" ");

  return (
    <section className="relative flex flex-col justify-center items-center text-center text-white h-[calc(100vh-65px)] xl:h-[calc(100vh-75px)] px-6 w-full mt-16.75 xl:mt-18.5">
      <Image
        src={hero.img.src}
        alt={hero.img.alt}
        fill
        priority
        className="absolute inset-0 object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-1 flex flex-col items-center justify-center max-w-full">
        <Reveal>
          <div className="flex items-center gap-[9px] mb-3 justify-center">
            <div className="bg-white rounded-[1px] size-[6.5px] shrink-0" />
            <p className="font-sans font-bold text-[11px] text-white tracking-[2.2px] uppercase leading-none">
              {hero.kicker}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-serif italic font-medium text-[42px] md:text-[72px] text-white tracking-[-2.16px] leading-[1.1] mb-5">
            {remainingWords ? (
              <>
                <span className="text-white italic">{firstWord}</span>{" "}
                <span className="text-primary-red italic font-medium">{remainingWords}</span>
              </>
            ) : (
              <span className="text-white italic">{hero.title}</span>
            )}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-sans font-medium text-[16px] md:text-[18px] leading-7 md:leading-[28.8px] text-white/85 text-center max-w-[937px] px-4">
            {hero.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
