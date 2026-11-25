import React from 'react';
import type {ProgrammeCommitmentSectionType} from "@/types/programme/programme.types";
import {cn} from "@/lib/utils";
import BigCard from "@/components/programme/commitmentSection/BigCard";
import SmallCard from "@/components/programme/commitmentSection/SmallCard";
import RevealStagger from "@/components/common/animations/RevealStagger";

const CommitmentSection = ({commitment}: { commitment: ProgrammeCommitmentSectionType }) => {
  return (
    <section
      className={"flex flex-col gap-10 xl:gap-5 w-916/1000 xl:w-888/1000 mx-auto pt-8 md:pt-11 xl:pt-14 mb-8 md:mb-14 xl:mb-20"}>
      <div className="flex flex-col gap-4.5">
        <RevealStagger key={"1"}>
          <div className="flex flex-wrap flex-row gap-2.5 justify-center items-center">
            <div className="size-1.5 rounded-[1px] bg-primary-red"/>
            <p className="typo-body2 shrink-0 uppercase text-primary-red">{commitment.heading}</p>
          </div>
          <h2 className={"typo-h2 text-center"}>{commitment.title}</h2>
          <p className={"typo-body1 text-[#5B403E] xl:w-4/5 mx-auto text-center"}>{commitment.body}</p>
        </ RevealStagger>
      </div>
      <RevealStagger key={"2"}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {commitment.cards.map((card, index) => (
            <div key={index}
                 className={cn("flex flex-col gap-5 bg-white rounded-xl border border-[#1A18152E] overflow-hidden p-4 xl:py-10 xl:px-9", index % 3 == 0 && "p-0 xl:p-0 lg:col-span-2 lg:flex-row lg:flex-wrap gap-0 lg:gap-0", index % 3 == 0 && (index / 3) % 2 !== 0 && "flex-col-reverse lg:flex-row-reverse")}>
              {index % 3 == 0 ? (
                <BigCard card={card}/>
              ) : (
                <SmallCard card={card}/>
              )}
            </div>
          ))}
        </div>
      </RevealStagger>
    </section>
  );
};

export default CommitmentSection;
