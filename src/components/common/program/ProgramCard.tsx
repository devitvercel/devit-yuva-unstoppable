"use client";

import React from "react";
import type { WhatWeDoSectionType } from "@/types/home/home.types";
import Image from "next/image";
import ProgramCardContent from "@/components/common/program/ProgramCardContent";
import type { SchoolTransformationItemType } from "@/types/programme/programme.types";
import { DecorativeRing, TerracottaBlob } from "../../../../public/SVGs/svg";
import { cn, isProgrammeType } from "@/lib/utils";

const ProgramCard = ({
  programmes,
}: {
  programmes:
    | WhatWeDoSectionType["programmes"]
    | SchoolTransformationItemType[];
}) => {
  const [activeCardIndex, setActiveCardIndex] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const checkScreenSize = () => window.innerWidth < 1024;
    let observer: IntersectionObserver | null = null;
    let cards: NodeListOf<Element> | null = null;

    const timer = setTimeout(() => {
      if (!checkScreenSize()) return;

      const cardRatios = new Map<string, number>();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = entry.target.getAttribute("data-card-index");
            if (!index) return;

            if (entry.isIntersecting) {
              cardRatios.set(index, entry.intersectionRatio);
            } else {
              cardRatios.delete(index);
            }
          });

          let maxRatio = 0;
          let mostVisibleIndex: string | null = null;

          cardRatios.forEach((ratio, index) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              mostVisibleIndex = index;
            }
          });

          if (maxRatio >= 0.3 && mostVisibleIndex !== null) {
            setActiveCardIndex(mostVisibleIndex);
          } else {
            setActiveCardIndex(null);
          }
        },
        {
          threshold: [0.3, 0.6],
        },
      );

      cards = document.querySelectorAll("[data-card-index]");
      cards.forEach((card) => observer?.observe(card));
    }, 150);

    const handleResize = () => {
      if (!checkScreenSize()) {
        setActiveCardIndex(null);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (cards && observer) {
        cards.forEach((card) => observer?.unobserve(card));
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      {programmes.map((program, idx) => {
        const isEven = idx % 2 === 1;
        const isActive = activeCardIndex === String(idx);
        const isIntro = isProgrammeType(program) && idx === 0;
        const displayIndex = isProgrammeType(program) && !isIntro ? idx : undefined;
        // const hideFrame =
        //   isProgrammeType(program) &&
        //   program.href.replace(/\/$/, "") === "/school-transformation";

        return (
          <div
            className={cn(
              "border-y first:border-t-0 last:pb-0 last:border-b-0 border-[#241E191F] group flex flex-col lg:flex-row lg:flex-wrap gap-6 lg:gap-12 xl:gap-16",
              isIntro ? "pt-2 pb-8 lg:pt-1 lg:pb-7.5" : "py-8 lg:py-7.5",
            )}
            key={`program-${idx}`}
            data-card-index={idx}
          >
            {/* Text block */}
            <ProgramCardContent
              program={program}
              isEven={isEven}
              isActive={isActive}
              isIntro={isIntro}
              displayIndex={displayIndex}
            />

            {/* Image block */}
            <div
              className={`flex-1 order-2 ${isEven ? "lg:order-1" : "lg:order-2"}`}
            >
              <div className="relative">
                <TerracottaBlob
                  className={
                    "opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-20 -right-15"
                  }
                />
                {/* <DecorativeRing
                  className={
                    "opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -top-11 -left-13"
                  }
                /> */}
                {program?.img?.src ? (
                  <Image
                    src={program.img.src}
                    alt={program.img.alt || "program image"}
                    width={560}
                    height={448}
                    loading="lazy"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 560px"
                    className="w-full h-auto aspect-611/611 object-cover relative z-1"
                  />
                ) : (
                  <div className="w-full h-[448px] bg-stone-100 rounded-xl relative z-1 flex items-center justify-center text-stone-400">
                    No image available
                  </div>
                )}
                  <Image
                    src="/assets/pages/home/card-frame.avif"
                    alt="Yuva program card decorative frame"
                    role="presentation"
                    width={560}
                    height={448}
                    loading="lazy"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 560px"
                    className={`min-w-11/10 transition-opacity duration-300 ease-out group-hover:opacity-100 h-115/100 absolute -top-75/1000 -left-5/100 z-2 ${
                      isActive ? "opacity-100!" : "opacity-100"
                    }`}
                  />
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgramCard;
