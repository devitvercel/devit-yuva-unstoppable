import React from "react";
import type {OurStoryQuoteSectionType} from "@/types/ourStory/ourStory.types";

interface OurStoryQuoteSectionProps {
  quoteSection: OurStoryQuoteSectionType;
}

function HighlightedQuote({text, highlight}: { text: string; highlight?: string; }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className="text-primary-red italic">{highlight}</span>
      {after}
    </>
  );
}

const OurStoryQuoteSection: React.FC<OurStoryQuoteSectionProps> = ({quoteSection}) => {
  return (
    <section className="bg-white pt-15.5 xl:pt-27">
      <div
        className="relative w-916/1000 xl:w-888/1000 pb-6 xl:pb-15 border-b border-[rgba(26,24,21,0.10)] mx-auto flex flex-col items-center text-center gap-6">
        <blockquote className="relative flex flex-row items-start w-full md:w-7/10 text-center">
          <span
            className="font-fraunces-italics italic absolute -top-6 lg:-top-2 lg:-left-20 md:-left-10 font-semibold text-[64px] md:text-[132px] lg:text-[200px] leading-22.5 text-primary-red/10 shrink-0 select-none pointer-events-none"
            aria-hidden="true"
          >&quot;</span>
          <p
            className="font-fraunces-italics italic font-semibold text-[28px] lg:text-[40px] leading-tight tracking-[-0.5px] text-[#1a1815] text-center">
            <HighlightedQuote
              text={quoteSection.quote}
              highlight={quoteSection.quoteHighlight}
            />
          </p>
        </blockquote>

        {/* Attribution */}
        {quoteSection.attribution && (
          <p className="font-sans text-[11px] font-bold leading-normal tracking-[2.2px] text-[#6b6761] uppercase ">
            {quoteSection.attribution}
          </p>
        )}
      </div>
    </section>
  );
};

export default OurStoryQuoteSection;
