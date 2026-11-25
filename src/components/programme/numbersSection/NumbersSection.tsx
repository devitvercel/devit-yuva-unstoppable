import React from 'react';
import type {NumbersSectionType} from "@/types/programme/programme.types";
import {parseStatNumber} from "@/lib/utils";
import CountUp from "@/components/common/CountUp";

function NumbersSection({numbers}: { numbers: NumbersSectionType }) {
  return (
    <section className="py-8 xl:py-16 bg-primary-red">
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-7.5">
        <div className="flex flex-col gap-3 items-center">
          <div className="flex flex-wrap flex-row gap-2.5 items-center">
            <div className="size-1.5 rounded-[1px] bg-white"/>
            <p className="typo-body2 shrink-0 uppercase text-white">{numbers.heading}</p>
          </div>
          <h2 className={"typo-h2 text-[clamp(32px,29.89px+0.56vw,38px)] text-white"}>{numbers.title}</h2>
          <p className={"typo-body3 text-[#FFFFFFD4] text-center xl:w-1/2"}>{numbers.body}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 md:gap-x-4 xl:gap-x-8">
          {numbers.numbers.map((number, index) => {
            const {prefix, value, suffix, hasSeparator} = parseStatNumber(number.title);
            return (
              <div key={index} className="flex flex-col items-center gap-5">
                <div className="size-16 flex items-center justify-center bg-[#FFFFFF1A] rounded-xl">
                  {<number.icon stroke={"#FFFFFF"}/>}
                </div>
                <p className={"typo-h1 text-[clamp(32px,22.85px+2.44vw,58px)]! text-white"}>
                  {prefix ? <span>{prefix}</span> : null}
                  <CountUp to={value} separator={hasSeparator ? "," : ""} />
                  <span className={/[a-zA-Z]/.test(suffix) ? "text-[32px]!" : ""}>{suffix}</span>
                </p>
                <p className={"xl:w-3/5 text-center mx-auto text-[#FFFFFFAD]! typo-body2 uppercase"}>{number.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default NumbersSection;