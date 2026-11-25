import React from "react";
import type { WhatWeDoSectionType } from "@/types/home/home.types";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { SchoolTransformationItemType } from "@/types/programme/programme.types";
import { cn, isProgrammeType } from "@/lib/utils";

const ProgramCardContent = ({
  program,
  isEven,
  isActive,
  isIntro = false,
  displayIndex,
}: {
  program: WhatWeDoSectionType["programmes"][0] | SchoolTransformationItemType;
  isEven: boolean;
  isActive: boolean;
  isIntro?: boolean;
  displayIndex?: number;
}) => {
  if (isProgrammeType(program)) {
    const numberLabel =
      displayIndex !== undefined
        ? displayIndex < 10
          ? `0${displayIndex}`
          : String(displayIndex)
        : `0${program.index}`;

    return (
      <div
        className={cn(
          "lg:w-55/100 flex flex-col order-1",
          isEven ? "lg:order-2" : "lg:order-1",
          isIntro ? "gap-4" : "gap-5",
        )}
      >
        {!isIntro && (
          <p
            className={`typo-h1 leading-[90%] text-[60px]! md:text-[90px]! lg:text-[120px]! text-transparent [-webkit-text-stroke:1.5px_#CE2028] bg-clip-text bg-[linear-gradient(to_top,#CE2028_50%,transparent_50%)] bg-[length:100%_200%] bg-top group-hover:bg-bottom transition-[background-position] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "bg-bottom!" : ""}`}
          >
            {numberLabel}
          </p>
        )}
        {!isIntro && program.eyebrow ? (
          <p className="typo-body2 uppercase text-primary-red">
            {program.eyebrow}
          </p>
        ) : null}
        <h3 className="typo-h2 italic">{program.title}</h3>
        <p className="typo-body4">{program.body}</p>
        {!isIntro && <Link
          className="typo-body3 items-center font-extrabold! text-primary-red flex flex-wrap flex-row gap-1"
          href={program.href || "#"}
        >
          Learn more
          <ArrowRightIcon size={16} strokeWidth={3} />
        </Link>}
      </div>
    );
  }

  return (
    <div
      className={`lg:w-55/100 flex flex-col gap-5 order-1 ${isEven ? "lg:order-2" : "lg:order-1"}`}
    >
      <p
        className={`typo-h1 leading-[90%] text-[60px]! md:text-[90px]! lg:text-[120px]! text-transparent [-webkit-text-stroke:1.5px_#CE2028] bg-clip-text bg-[linear-gradient(to_top,#CE2028_50%,transparent_50%)] bg-[length:100%_200%] bg-top group-hover:bg-bottom transition-[background-position] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "bg-bottom!" : ""}`}
      >
        {Number(program?.index) < 10
          ? `0${Number(program.index)}`
          : program.index}
      </p>
      <h3 className="typo-h2 italic">{program?.title || ""}</h3>
      <div className="flex flex-col gap-6 mt-2">
        {(program?.points || []).map((point, ptIdx) => (
          <div key={ptIdx} className="flex flex-col gap-3">
            <h4 className="typo-body3 font-bold! text-primary-red">
              {point?.title || ""}
            </h4>
            <div className="flex flex-col gap-2.5">
              {(point?.body || []).map((para, paraIdx) => (
                <div key={paraIdx} className={"flex flex-wrap flex-row gap-2"}>
                  <ArrowRightIcon
                    className={"text-primary-red size-4 shrink-0 mt-1"}
                  />
                  <p className="flex-1 typo-body3 text-[14px]! text-[#6B6761]">
                    {para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramCardContent;
