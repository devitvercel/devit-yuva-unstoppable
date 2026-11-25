import React from 'react';
import type { OurVisionAmbitionSectionType } from "@/types/ourVision/ourVision.types";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/common/animations/Reveal";
import RevealStagger from "@/components/common/animations/RevealStagger";

const AmbitionSection = ({ ambition }: { ambition: OurVisionAmbitionSectionType }) => {
  return (
    <section
      className={"w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10 xl:gap-22.5 pb-5 md:pb-15 lg:pb-22.5 xl:pb-30"}>
      <div
        className="p-4 md:p-8 relative shadow-[0_12px_40px_0_rgba(26,24,21,0.06)] lg:p-12 xl:p-16 bg-white border overflow-hidden border-[#1A18152E] rounded-xl flex flex-col xl:flex-row xl:flex-wrap gap-5 xl:gap-16">
        <div className="absolute -bottom-5 lg:-bottom-11 right-0 lg:-right-7.25">
          <p
            className={"text-[96px] md:text-[148px]! lg:text-[200px] font-fraunces-italics text-[#CE20280D] font-black leading-24 md:leading-37 lg:leading-50"}>
            2030
          </p>
        </div>

        {/* Left Column: Description with Reveal */}
        <Reveal className="flex-1 flex flex-col relative z-2 gap-2 xl:gap-4">
          <div className="flex flex-col gap-3 xl:gap-4">
            <div className="flex flex-wrap flex-row gap-2.5 items-center">
              <div className="bg-primary-red size-1.5 rounded-[1px]" />
              <p className="shrink-0 typo-body2 text-primary-red">{ambition.heading}</p>
            </div>
            <h2 className="typo-h2">{ambition.title}</h2>
          </div>
          <div className="flex flex-col">
            {ambition.body.map((para, index) => (
              <p className="typo-body3 text-[#6B6761]" key={index}>
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Right Column: Ambitions with Staggered Reveal */}
        <RevealStagger className="flex-1 flex flex-col relative z-2 gap-3 xl:gap-4 justify-center">
          {ambition.ambitions.map((item, index) => (
            <div
              className={"bg-[#F7F5F2] xl:items-center rounded-lg border border-[#1A18152E] px-5.5 py-4.5 flex flex-col xl:flex-row xl:flex-wrap gap-0.5 xl:gap-5"}
              key={index}>
              <div className="flex-1 xl:flex-0 xl:shrink-0">
                <p className={"typo-h3 text-primary-red"}>{item.title}</p>
              </div>
              <div className="flex flex-col">
                <p className={"typo-body3 font-bold!"}>{item.subTitle}</p>
                <p className={"typo-body5 text-[#6B6761]"}>{item.body}</p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </div>

      {/* Bottom Section: Image block with Reveal */}
      <Reveal className="flex flex-col gap-3">
        <Image
          src={ambition.img.src}
          alt={ambition.img.alt || ambition.imgText || "Our Ambition"}
          width={1200}
          height={550}
          loading="lazy"
          sizes="100vw"
          className={"w-full h-137.5 object-cover rounded-md"}
        />
        <div className="flex flex-col">
          <p className={"typo-body5 text-[12px]! text-[#6B6761]"}>{ambition.imgText}</p>
          <Link href={ambition.href} className={"typo-body5 font-bold! text-[12px]! text-primary-red"}>
            10,000+ schools reached →
          </Link>
        </div>
      </Reveal>
    </section>
  );
};

export default AmbitionSection;
