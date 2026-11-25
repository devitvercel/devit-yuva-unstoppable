import React from 'react';
import type { VolunteerApplicationSectionType } from "@/types/volunteer/volunteer.types";
import {TickIcon} from "../../../../public/SVGs/svg";
import VolunteerForm from "@/components/volunteer/volunteerApplicationSection/VolunteerForm";

function VolunteerApplicationSection({volunteerApplication}: { volunteerApplication: VolunteerApplicationSectionType }) {
  return (
    <section id="volunteer-form" className={"bg-white py-14 xl:py-28.5"}>
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col xl:flex-row gap-10 xl:gap-20">
        <div className="xl:w-45/100 flex flex-col gap-7">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap flex-row gap-2.5 items-center">
              <div className="size-1.5 rounded-[1px] bg-primary-red"/>
              <p className="typo-body2 shrink-0 uppercase text-primary-red font-extrabold!">{volunteerApplication.heading}</p>
            </div>
            <div className="flex flex-col gap-4.5">
              <h2 className="typo-h2">
                {volunteerApplication.title}<br/>
                <span className={"text-primary-red"}>{volunteerApplication.highlightedTitle}</span>
              </h2>
              <p className={"typo-body3 text-[#6B6761]"}>{volunteerApplication.body}</p>
            </div>
          </div>
          <div className="bg-[linear-gradient(135deg,#CE2028_0%,#A3171E_70.72%)] p-7 flex flex-col gap-3.5 rounded-xl">
            <p className={"typo-h4 text-[18px]! text-[#FFFFFFEB]"}>&quot;{volunteerApplication.quote.quote}&quot;</p>
            <p className={"typo-body2 text-[#FFFFFFD1] uppercase tracking-[1.32px]"}>{volunteerApplication.quote.role} · {volunteerApplication.quote.service}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            {volunteerApplication.points.map((point, index) => (
              <div key={index} className={"flex flex-row gap-2"}>
                <div className="size-6 flex items-center justify-center rounded-full bg-[#2C5F3F1F]">
                  <TickIcon/>
                </div>
                <p className="flex-1 typo-body3 text-[#6B6761] font-semibold!">{point}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <VolunteerForm />
        </div>
      </div>
    </section>
  );
}

export default VolunteerApplicationSection;