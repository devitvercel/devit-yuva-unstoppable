import React from "react";
import Image from "next/image";
import {cn} from "@/lib/utils";
import type {OurStoryContentBlockType} from "@/types/ourStory/ourStory.types";

interface StoryContentBlockProps {
  block: OurStoryContentBlockType;
  index?: number;
  reverse?: boolean;
}

function HighlightedQuote({text, highlight}: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <strong className="text-primary-red font-semibold italic">{highlight}</strong>
      {after}
    </>
  );
}

const StoryContentBlock: React.FC<StoryContentBlockProps> = ({block, index = 0, reverse = false}) => {
  const num = String(index + 1).padStart(2, "0");
  const imageEl = (
    <div className={cn(
      "relative overflow-hidden aspect-3/4 lg:aspect-auto lg:h-full",
      reverse ? "lg:order-2" : "lg:order-1"
    )}>
      <Image
        src={block.img.src}
        alt={block.img.alt || block.title || "Yuva Story Content Image"}
        fill
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover z-40 object-center"
      />
      <div
        className={cn(
          "absolute z-50 bottom-5 rounded-md border border-[rgba(26,24,21,0.10)] bg-[rgba(255,255,255,0.94)] shadow-[0_4px_12px_0_rgba(26,24,21,0.08)] backdrop-blur-xs px-4 py-3 flex flex-col gap-0.5",
          reverse ? "left-5" : "left-5"
        )}
      >
        <p className="font-dm-sans text-[9px] font-extrabold tracking-[1.8px] text-[#6b6761] uppercase">
          {block.badge.label}
        </p>
        <p className="font-fraunces-italics text-[13px] font-semibold italic text-primary-red">
          {block.badge.detail}
        </p>
      </div>
    </div>
  );

  const textEl = (
    <div className={cn(
      "relative flex flex-col gap-3 px-2.5 pb-5 xl:gap-5 xl:px-15 justify-center py-10",
      reverse ? "lg:order-1" : "lg:order-2"
    )}>
      <span
        className="hidden xl:block pointer-events-none select-none absolute -bottom-16 -right-4 font-fraunces-italics italic font-semibold text-[200px] leading-none text-primary-red/7  z-10">
        {num}
      </span>
      <div className="flex z-20 items-center gap-3">
        <span className="inline-block w-4 h-px bg-[#6b6761] shrink-0"/>
        <p className="font-dm-sans text-[10px] font-semibold tracking-[2px] text-[#6b6761] uppercase">
          {block.eyebrow}
        </p>
      </div>

      <h2
        className="font-fraunces-italics typo-h3">{block.title}</h2>

      <div className="flex flex-col z-30 gap-4">
        {block.paragraphs.map((para, i) => (
          <p
            key={i}
            className="font-sans text-[15px] font-medium leading-6.5 text-[#6b6761] [&_strong]:font-bold [&_strong]:text-[#241e19]"
            dangerouslySetInnerHTML={{__html: para}}
          />
        ))}
      </div>

      {block.quote && (
        <blockquote
          className="border border-[rgba(26,24,21,0.18)] border-l-[3px] border-l-primary-red bg-white rounded-r-lg z-30 pl-5 pr-4 py-4">
          <p className="font-fraunces-italics text-[17px] font-semibold leading-relaxed text-[#241e19] italic">
            <HighlightedQuote text={block.quote} highlight={block.quoteHighlight}/>
          </p>
        </blockquote>
      )}
    </div>
  );

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-0 items-center overflow-hidden border border-[#1A18152E] bg-[#F7F5F2] rounded-2xl">
      {imageEl}
      {textEl}
    </div>
  );
};

export default StoryContentBlock;
