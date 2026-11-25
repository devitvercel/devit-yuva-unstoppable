import React from "react";
import type {NumbersSectionType} from "@/types/programme/programme.types";
import Image from "next/image";
import {cn, parseStatNumber} from "@/lib/utils";
import CountUp from "@/components/common/CountUp";

function NumbersSection4({numbers}: {numbers: NumbersSectionType}) {
  const count = numbers.numbers.length;
  // Keep 4 stats on one desktop row; fall back to 3-col for other counts.
  const gridClass =
    count === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : count === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="relative w-full overflow-hidden py-8 xl:py-16">
      <Image
        src={numbers?.img?.src || ""}
        alt={numbers?.img?.alt || numbers?.title || "Yuva Unstoppable Statistics Background"}
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[rgba(10,7,4,0.72)]" />

      <div className="relative z-10 w-916/1000 xl:w-888/1000 mx-auto flex flex-col items-center gap-14">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-[1px] bg-white shrink-0" />
            <p className="font-sans text-[11px] font-bold tracking-[2.2px] text-white uppercase">
              {numbers.heading}
            </p>
          </div>
          <h2 className="typo-h1 text-white">{numbers.title}</h2>
          <p className="font-sans text-[11px] font-semibold tracking-[2px] text-[#FFFFFFD4]">
            {numbers.body}
          </p>
        </div>

        <div className={cn("w-full grid gap-x-6 xl:gap-x-8 gap-y-12", gridClass)}>
          {numbers.numbers.map((number, index) => {
            const {prefix, value, suffix, hasSeparator} = parseStatNumber(number.title);
            return (
              <div key={index} className="flex flex-col items-center gap-5 min-w-0">
                <div className="size-16 flex items-center justify-center bg-[#FFFFFF1A] rounded-xl shrink-0">
                  {<number.icon stroke={"#FFFFFF"} />}
                </div>
                <p className="typo-h1 text-[clamp(28px,20px+2vw,52px)]! text-white text-center">
                  {prefix ? <span>{prefix}</span> : null}
                  <CountUp to={value} separator={hasSeparator ? "," : ""} />
                  <span className={/[a-zA-Z]/.test(suffix) ? "text-[28px]!" : ""}>
                    {suffix}
                  </span>
                </p>
                <p className="w-full max-w-[11rem] xl:max-w-none xl:w-4/5 text-center mx-auto text-[#FFFFFFAD]! typo-body2 uppercase">
                  {number.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NumbersSection4;