"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HeroSectionType } from "@/types/home/home.types";
import { PrimaryButton } from "@/components/common/Buttons";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  AccentSparks,
  DecorativeRing,
  DecorativeRingFilled,
} from "../../../../public/SVGs/svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/common/carousel";

interface HeroSectionProps {
  hero: HeroSectionType;
}

const isHindi = (text: string) => /[\u0900-\u097F]/.test(text);

const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadLess = () => {
    const element = document.getElementById("hero");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setTimeout(() => {
        setIsExpanded(false);
      }, 300);
    } else {
      setIsExpanded(false);
    }
  };
  
  const paragraphs = hero.body1.split("\n\n");
  const showReadMore = paragraphs.length > 2;
  const initialText = paragraphs.slice(0, 2).join("\n\n");
  const remainingText = paragraphs.slice(2).join("\n\n");
  
  return (
    <section className={"pt-19 xl:pt-22.5 flex flex-col gap-5 xl:gap-18"} id="hero" >
      <div className="w-916/1000 xl:w-888/1000 mx-auto xl:pt-7.75 pt-5 flex flex-col xl:flex-row xl:flex-wrap gap-5 xl:gap-16">
        <div className="w-full xl:w-53/100 flex justify-center flex-col gap-10 ">
          <div className="flex flex-col gap-8 ">
            <div className="flex flex-col gap-4 md:gap-5 ">
              <p className={"typo-body2 uppercase text-primary-red"}>
                {hero.eyebrow}
              </p>
              <h1 className="typo-h1 w-9/10 xl:text-[59px] xl:w-full">
                {hero.title1}{" "}
                <span className={"text-primary-red"}>
                  {hero.highlightedTitle}
                </span>{" "}
                {hero.title2}
              </h1>
              <div
                className={
                  "typo-body1 font-normal! lg:font-medium! text-[#3A312A] xl:w-75/100"
                }
              >
                <p className="whitespace-pre-line inline">
                  {initialText}
                </p>
                {!isExpanded && showReadMore && (
                  <>
                    <span>... </span>
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="text-primary-red font-semibold underline underline-offset-4 decoration-1 hover:decoration-2 transition-all inline-block cursor-pointer"
                    >
                      read more
                    </button>
                  </>
                )}

                <AnimatePresence>
                  {isExpanded && showReadMore && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="whitespace-pre-line pt-6">
                        {remainingText}
                      </p>
                      <button
                        onClick={handleReadLess}
                        className="text-primary-red font-semibold underline underline-offset-4 decoration-1 hover:decoration-2 transition-all inline-block mt-2 cursor-pointer"
                      >
                        read less
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              <PrimaryButton
                href={hero.cta2.href}
                rightIcon={
                  <ArrowRightIcon className={"text-[#FBF7EF] size-5 transition-transform duration-300 group-hover:translate-x-1.5"} />
                }
                label={hero.cta2.text}
                btnClassName={"py-3 px-6 xl:py-4.5 xl:px-9 gap-1 group"}
                hasHoverEffect={true}
              />
              {/* <PrimaryButton
                href={hero.cta2.href}
                label={hero.cta2.text}
                btnClassName={
                  "bg-[#FBF7EF] border border-[#241E19] text-[#241E19] py-3 px-6 xl:py-4.5 xl:px-9 hover:bg-primary-red hover:text-white hover:border-primary-red transition-all duration-300"
                }
                hasHoverEffect={true}
              /> */}
            </div>
          </div>
          {/* <div className="">
            <p className="typo-body2 text-[#6B5F54] uppercase">{hero.body2}</p>
          </div> */}
        </div>
        <div className="flex-1">
          <div className="relative h-[420px] sm:h-[500px] xl:h-[570px] w-full max-w-[540px] aspect-[540/680] xl:sticky xl:top-32">
            {hero.img?.src ? (
              <Image
                src={hero.img.src}
                alt={hero.img.alt || "Yuva Unstoppable Transforming Government Schools"}
                width={540}
                height={680}
                priority
                fetchPriority="high"
                sizes="(max-width: 1280px) 100vw, 540px"
                className={"object-cover rounded-sm h-full w-full relative z-2"}
              />
            ) : (
              <div className="w-[540px] h-[570px] bg-stone-200 rounded-sm relative z-2" />
            )}
            <div className="hidden xl:block absolute -top-6 -left-6">
              <DecorativeRing />
            </div>
            <div className="hidden xl:block absolute -bottom-8 -right-8">
              <DecorativeRingFilled />
            </div>
            <div className="hidden xl:block absolute -right-11.25 -top-10">
              <AccentSparks />
            </div>
            <div className="absolute bottom-3 left-9 z-3 2xl:max-w-fit md:max-w-fit w-92/100 xl:max-w-103/100 xl:w-103/100">
              <div className="bg-[#FBF7EFF2] rounded-sm py-3.5 px-4.5 items-center backdrop-blur-[5px] flex flex-row flex-wrap gap-2 shadow-[0_8px_24px_0_rgba(36,30,25,0.12)]">
                <span
                  className={
                    "shrink-0 text-primary-red font-fraunces-italics! typo-body5 font-semibold!"
                  }
                >
                  {hero.badge.title}
                </span>
                <span className={"flex-1 uppercase typo-body2 font-extrabold!"}>
                  {hero.badge.body}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile/Tablet View (< 1024px): Autoscroll Carousel */}
      <Carousel
        options={{ loop: true, dragFree: true }}
        autoScroll={{
          speed: 0.8,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
        }}
        className="w-full lg:hidden py-5 border-y border-[#241E191F] overflow-hidden pointer-events-none"
      >
        <CarouselContent containerClassName="align-middle items-center flex">
          {hero.keywords.map((keyword, index) => {
            const isHindiWord = isHindi(keyword);
            return (
              <CarouselItem
                key={index}
                className="basis-auto flex flex-row items-center gap-6 pl-6 select-none shrink-0"
              >
                <span
                  className={cn(
                    "typo-body5 text-[22px]!",
                    isHindiWord
                      ? "font-hindi font-normal! text-primary-red -mb-2"
                      : "text-[#6B5F54] font-semibold! font-fraunces-italics",
                  )}
                >
                  {keyword}
                </span>
                <span className="typo-body5 text-[22px]! font-semibold! text-[#6B5F54] font-fraunces-italics">
                  ·
                </span>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Desktop View (>= 1024px): Static Grid/Flex Layout */}
      <div className="hidden lg:flex flex-row flex-wrap gap-5 xl:gap-6 justify-center py-5 border-y border-[#241E191F]">
        {hero.keywords.map((keyword, index) => {
          const isHindiWord = isHindi(keyword);
          return (
            <React.Fragment key={index}>
              <span
                className={cn(
                  "typo-body5 text-[22px]!",
                  isHindiWord
                    ? "font-hindi font-normal! text-primary-red -mb-2"
                    : "text-[#6B5F54] font-semibold! font-fraunces-italics",
                )}
              >
                {keyword}
              </span>
              {index < hero.keywords.length - 1 && (
                <span className="typo-body5 text-[22px]! font-semibold! text-[#6B5F54] font-fraunces-italics">
                  ·
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
