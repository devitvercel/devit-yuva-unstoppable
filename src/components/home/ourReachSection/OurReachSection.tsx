import React from 'react';
import Image from 'next/image';
import type {OurReachSectionType} from '@/types/home/home.types';
import CountUp from "@/components/common/CountUp";
import ReachDots from "./ReachDots";
import {PrimaryButton} from "@/components/common/Buttons";
import {ArrowRightIcon} from "lucide-react";
import {parseStatNumber} from "@/lib/utils";

const OurReachSection = ({ourReach}: { ourReach: OurReachSectionType }) => {
  return (
    <section
      className={"w-916/1000 xl:w-888/1000 mx-auto flex flex-col lg:flex-wrap lg:flex-row gap-30.5 xl:gap-16 py-6 xl:pb-0 xl:pt-10"}>
      <div className="lg:w-45/100 w-full flex flex-col gap-6 xl:gap-10 justify-center">
        <div className="flex flex-col gap-4 xl:gap-6">
          <p className="typo-body2 uppercase text-primary-red">{ourReach.heading}</p>
          <h2 className="typo-h2">{ourReach.title}</h2>
          <div className="typo-body3 text-[#3A312A]">{ourReach.body}</div>
        </div>
        <div className="flex flex-row flex-wrap gap-10">
          {ourReach.stats.map((stat, index) => {
            const parsed = typeof stat.number === 'number'
              ? { prefix: '', value: stat.number, suffix: stat.suffix ?? '', hasSeparator: stat.number >= 1000 }
              : parseStatNumber(String(stat.number) + (stat.suffix ?? ''));

            return (
              <div key={index} className={"flex flex-col gap-1.5"}>
                <div className="flex flex-row items-start tabular-nums">
                  {parsed.prefix ? (
                    <span className="typo-h2 text-[34px]! md:text-[38px]! lg:text-[40px]! text-primary-red">
                      {parsed.prefix}
                    </span>
                  ) : null}
                  <CountUp
                    className={"typo-h2 text-[34px]! md:text-[38px]! lg:text-[40px]! text-primary-red tabular-nums"}
                    from={0}
                    to={parsed.value}
                    separator={parsed.hasSeparator ? "," : ""}
                  />
                  {parsed.suffix ? (
                    <span className="typo-h2 text-[34px]! md:text-[38px]! lg:text-[40px]! text-primary-red">
                      {parsed.suffix}
                    </span>
                  ) : null}
                </div>
                <p className="typo-body2 text-[#3A312A] uppercase">{stat.title}</p>
              </div>
            );
          })}
        </div>
        {ourReach.cta?.href ? (
          <PrimaryButton
            href={ourReach.cta.href}
            label={ourReach.cta.text}
            rightIcon={
              <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            }
            btnClassName="w-fit py-3 px-6 xl:py-4 xl:px-8 gap-1 group"
            hasHoverEffect={true}
          />
        ) : null}
      </div>
      <div className="flex-1">
        <div className="w-full relative max-w-[640px] aspect-[640/720] mx-auto">
          <Image
            src={ourReach.img.src}
            alt={ourReach.img.alt || "India map outline showing Yuva Unstoppable reach across 22+ states"}
            width={640}
            height={720}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 640px"
            className={"w-full h-auto object-contain relative -z-1 px-4"}
          />
          <ReachDots />
        </div>
      </div>
    </section>
  );
};

export default OurReachSection;
