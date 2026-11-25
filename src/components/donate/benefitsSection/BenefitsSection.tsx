import React from 'react';
import type {BenefitsSectionType} from "@/types/donate/donate.types";
import RevealStagger from "@/components/common/animations/RevealStagger";

interface BenefitsSectionProps {
  benefits: BenefitsSectionType;
}

function BenefitsSection({benefits}: BenefitsSectionProps) {
  return (
    <section
      className={"py-14 xl:py-24 w-916/1000 xl:w-888/1000 mx-auto flex flex-col xl:flex-row gap-10 xl:gap-18"}>
      <RevealStagger className={"xl:w-3/5 flex flex-col gap-3.5 justify-center min-h-full"}>
        <div className="">
          <h2 className={"typo-h2"}>
            {benefits.title}{" "}
            <span className={"text-primary-red"}>{benefits.highlightedTitle}</span>
          </h2>
          <p className={"typo-body3 text-[#6B6761]"}>{benefits.body}</p>
        </div>
      </RevealStagger>
      <RevealStagger className="flex-1 flex flex-col gap-4">
        {benefits.benefits.map(benefit => (
          <div
            className={"border border-[#1A18152E] rounded-lg bg-[#F7F5F2] px-5 py-4.5 flex flex-row justify-between gap-4 xl:gap-5"}
            key={benefit.id}>
            <div className="flex flex-row gap-4 xl:gap-5">
              <p className={"typo-h3 text-primary-red shrink-0"}>{benefit.id}</p>
              <div className="flex flex-col shrink-0">
                <p className={"typo-body3 text-[14px]! md:text-[16px]! font-bold!"}>{benefit.title}</p>
                <p className={"typo-body5 text-[12px]! md:text-[14px]! text-[#6B6761]"}>{benefit.body}</p>
              </div>
            </div>
            <benefit.icon/>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}

export default BenefitsSection;