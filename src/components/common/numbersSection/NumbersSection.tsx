"use client";

import React from "react";
import Image from "next/image";
import {
  Building2,
  ChevronLeftIcon,
  ChevronRightIcon,
  GraduationCap,
  type LucideIcon,
  School,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import type {
  ImpactNumbersSectionType,
  ImpactStatItem,
} from "@/types/impact/impact.types";
import CountUp from "@/components/common/CountUp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextButton,
  CarouselPrevButton,
  carouselNavButtonClass,
} from "@/components/common/carousel";
import {cn, parseStatNumber} from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  "graduation-cap": GraduationCap,
  school: School,
  users: Users,
  "user-check": UserCheck,
  building: Building2,
  "trending-up": TrendingUp,
};

function getStatGridClass(index: number, total: number): string | undefined {
  const isLast = index === total - 1;

  // Keep an unpaired final stat centered at both grid breakpoints.
  if (total % 2 !== 0 && isLast) {
    return "md:col-span-2 md:w-1/2 md:justify-self-center lg:col-span-4 lg:w-1/4";
  }

  // Center a final pair within the desktop four-column grid.
  const pairedItems = total % 2 !== 0 ? total - 1 : total;
  if (pairedItems % 4 === 2 && index === pairedItems - 2) {
    return "lg:col-start-2";
  }

  return undefined;
}

function StatCard({
  stat,
  colClass,
}: {
  stat: ImpactStatItem;
  colClass?: string;
}) {
  const Icon = ICON_MAP[stat.icon] ?? Users;
  const {prefix, value, suffix, hasSeparator} = parseStatNumber(stat.value);

  return (
    <div
      className={`flex flex-row lg:flex-col items-start justify-center text-left lg:items-center lg:text-center gap-3 ${colClass ?? ""}`}
    >
      <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="typo-h1 text-[52px]! text-white leading-none!">
          {prefix ? <span>{prefix}</span> : null}
          <CountUp to={value} separator={hasSeparator ? "," : ""} duration={2} className="tabular-nums" />
          {suffix}
        </p>
        <p className="font-sans text-[13px] font-medium leading-[1.5] text-white/70 line-clamp-2 max-w-[200px] lg:max-w-50">
          {stat.description}
        </p>
        <p className="font-sans text-[10px] font-bold tracking-[2px] text-white/45 line-clamp-1 uppercase">
          {stat.category}
        </p>
      </div>
    </div>
  );
}

interface ImpactNumbersSectionProps {
  numbersSection: ImpactNumbersSectionType;
  /** Horizontal carousel with left/right nav. Default: grid layout. */
  scrollable?: boolean;
  /** Advance one slide at a time (only applies when `scrollable` is true). */
  autoScroll?: boolean;
}

const NumbersSection: React.FC<ImpactNumbersSectionProps> = ({
  numbersSection,
  scrollable = false,
  autoScroll = false,
}) => {
  return (
    <section
      className={`relative w-full ${scrollable ? "xl:h-auto" : "xl:h-screen"} overflow-hidden py-14 sm:py-16 xl:py-15`}
    >
      <Image
        src={numbersSection.img.src}
        alt={numbersSection.img.alt}
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[rgba(10,7,4,0.72)]" />

      <div className="relative z-10 w-916/1000 xl:w-888/1000 mx-auto flex flex-col items-center gap-10 sm:gap-12 xl:gap-14">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
            <p className="font-sans text-[11px] font-bold tracking-[2.2px] text-white/60 uppercase">
              {numbersSection.eyebrow}
            </p>
          </div>
          <h2 className="typo-h1 text-white text-balance">
            {numbersSection.title}
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="hidden sm:inline text-white/40 text-lg">—</span>
            <p className="font-sans text-[11px] font-semibold tracking-[2px] text-white/50 uppercase">
              {numbersSection.subtitle}
            </p>
            <span className="hidden sm:inline text-white/40 text-lg">—</span>
          </div>
        </div>

        {scrollable ? (
          <Carousel
            className="w-full"
            options={{
              align: "start",
              containScroll: "trimSnaps",
              loop: Boolean(autoScroll),
            }}
            autoplay={
              autoScroll
                ? {
                    delay: 3500,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }
                : false
            }
          >
            <div className="flex w-full items-center gap-5 xl:gap-8">
              <CarouselPrevButton
                className={cn(
                  carouselNavButtonClass,
                  "hidden sm:flex shrink-0"
                )}
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="size-5" strokeWidth={2} />
              </CarouselPrevButton>

              <CarouselContent className="min-w-0 flex-1">
                {numbersSection.stats.map((stat, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2 sm:px-3"
                  >
                    <StatCard stat={stat} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselNextButton
                className={cn(
                  carouselNavButtonClass,
                  "hidden sm:flex shrink-0"
                )}
                aria-label="Next slide"
              >
                <ChevronRightIcon className="size-5" strokeWidth={2} />
              </CarouselNextButton>
            </div>

            <div className="mt-7 flex items-center justify-center gap-4 sm:hidden">
              <CarouselPrevButton
                className={cn(carouselNavButtonClass, "shrink-0")}
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="size-5" strokeWidth={2} />
              </CarouselPrevButton>
              <CarouselNextButton
                className={cn(carouselNavButtonClass, "shrink-0")}
                aria-label="Next slide"
              >
                <ChevronRightIcon className="size-5" strokeWidth={2} />
              </CarouselNextButton>
            </div>
          </Carousel>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {numbersSection.stats.map((stat, i) => (
              <StatCard
                key={i}
                stat={stat}
                colClass={getStatGridClass(i, numbersSection.stats.length)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NumbersSection;
