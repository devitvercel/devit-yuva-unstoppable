import React from "react";
import Image from "next/image";
import type {OurStoryApproachSectionType} from "@/types/ourStory/ourStory.types";

interface OurStoryApproachSectionProps {
  approachSection: OurStoryApproachSectionType;
}


const OurStoryApproachSection: React.FC<OurStoryApproachSectionProps> = ({approachSection}) => {
  const {eyebrow, title, body, items, img} = approachSection;


  return (
    <section className="bg-white py-16 xl:py-33">
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-12.5 lg:gap-18">

        {/* Top: text + numbered list */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-12.5 lg:gap-16 items-start xl:border-b border-[rgba(26,24,21,0.18)] lg:pb-15">

          {/* Left: eyebrow + title + body */}
          <div className="flex flex-col gap-5 max-w-xs">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 bg-primary-red shrink-0"/>
              <p className="font-sans text-[11px] font-bold leading-normal tracking-[2.2px] text-primary-red uppercase">
                {eyebrow}
              </p>
            </div>
            <h2
              className="font-fraunces-italics italic font-semibold text-[30px] leading-8.25 tracking-[-0.6px] text-[#1a1815]">
              {title}
            </h2>
            <p className="font-sans text-[14px] font-medium leading-5.75 text-[#6b6761]">
              {body}
            </p>
          </div>

          {/* Right: numbered items */}
          <div className="flex col-span-2 flex-col gap-3 ">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5 p-5 rounded-lg border border-[rgba(26,24,21,0.18)] bg-[#F7F5F2]">
                <span
                  className="font-fraunces-italics italic font-normal text-[28px] leading-7 text-primary-red shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-[14px] font-bold leading-normal text-[#1a1815]">
                    {item.title}
                  </p>
                  <p className="font-sans text-[13.5px] font-medium leading-5 text-[#6b6761]">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: image + caption */}
        <div className="flex flex-col gap-3">
          <div className="relative rounded-md overflow-hidden h-135">
            <Image
              src={img.src}
              alt={img.alt || title || "Yuva Our Approach Image"}
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <p
            className="font-dm-sans text-[13px] font-medium px-1 bg-[url('/assets/pages/ourstory/f418c13f8f551a2fefa9dd0e6dca3f0a05387ba3.avif')] bg-bottom bg-clip-text text-transparent">
            Students at a Yuva-transformed school, Rajasthan — 2023
            <span className="font-semibold font-dm-sans text-primary-red"> 10,000+ schools reached →</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default OurStoryApproachSection;
