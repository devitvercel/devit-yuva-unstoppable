import React, {useState} from 'react';
import {ArrowRight, Briefcase, ChevronDown, MapPin, Plus} from "lucide-react";
import {cn} from "@/lib/utils";
import type {CareersOpenRolesSectionType} from "@/types/careers/careers.types";
import {PrimaryButton} from "@/components/common/Buttons";

const getDeptTagColors = (dept: string) => {
  const normalized = dept.toLowerCase().trim();
  if (normalized.includes("programme")) {
    return {bg: "bg-[#E8F5EE]", text: "text-[#2C5F3F]"};
  } else if (normalized.includes("operation")) {
    return {bg: "bg-[#EBF0F7]", text: "text-[#1E3A5F]"};
  } else if (normalized.includes("communication")) {
    return {bg: "bg-[#FBEAEA]", text: "text-[#CE2028]"};
  } else if (normalized.includes("finance")) {
    return {bg: "bg-[#F5EDD8]", text: "text-[#B8894A]"};
  } else if (normalized.includes("technology")) {
    return {bg: "bg-[#F0EBF7]", text: "text-[#6B3FA0]"};
  }
  return {bg: "bg-primary-red/10", text: "text-primary-red"};
};

const getWhereLabel = (role: CareersOpenRolesSectionType['roles'][0]) => {
  if (role.where) return role.where;
  return null;
};

function Role({isOpen, toggleExpand, role, idx}: {
  isOpen: boolean,
  toggleExpand: (toggleIndex: number) => void,
  role: CareersOpenRolesSectionType['roles'][0],
  idx: number
}) {
  const tagColors = getDeptTagColors(role.department);
  const whereLabel = getWhereLabel(role);
  const [isRoleSectionOpen, setIsRoleSectionOpen] = useState(false);

  return (
    <div
      className="relative bg-white border-b border-[#1A18151A] overflow-hidden transition-all duration-300"
    >
      {/* Expanded Left Stripe Accent — desktop only */}
      {isOpen && (
        <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-[#CE2028] hidden md:block"/>
      )}

      {/* ── Mobile Layout (< md) ── */}
      <div className="md:hidden">
        {/* Header button — title + info + plus icon */}
        <button
          onClick={() => toggleExpand(idx)}
          className="w-full text-left flex items-center justify-between gap-4 hover:cursor-pointer transition-all duration-300 p-4 pb-0"
        >
          <div className="flex flex-col gap-2 min-w-0">
            <h3
              className={cn(
                "font-fraunces-italics italic font-normal text-[18px] leading-[1.4] transition-colors duration-300",
                isOpen ? "text-[#CE2028]" : "text-[#1A1815]"
              )}
            >
              {role.title}
            </h3>
            <div className="flex flex-col gap-0">
              <span className="flex items-center gap-1.5 text-[#6B6761] text-[12px] tracking-[0.24px]">
                <MapPin className="size-3 text-[#6B6761] shrink-0"/>
                {role.location}
              </span>
              <span className="flex items-center gap-1.5 text-[#6B6761] text-[12px] tracking-[0.24px]">
                <Briefcase className="size-3 text-[#6B6761] shrink-0"/>
                {role.type}{role.where ? ` · ${role.where}` : ""}
              </span>
            </div>
          </div>
          <div
            className={cn(
              "w-10 h-10 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300 shrink-0",
              isOpen
                ? "bg-[#CE2028] border-[#CE2028] text-white"
                : "bg-white border-[#1A18152E] text-[#6B6761]"
            )}
          >
            <Plus className={cn("size-3.5 transition-transform duration-300", isOpen && "rotate-45")}/>
          </div>
        </button>

        {/* Footer row: department tag + work mode */}
        <div className="flex items-center justify-between px-4 pt-8 pb-4">
          <span
            className={cn(
              "font-sans font-extrabold text-[12px] tracking-[1.54px] uppercase px-3.5 py-1.5 rounded-full shrink-0",
              tagColors.bg,
              tagColors.text
            )}
          >
            {role.department}
          </span>
          {whereLabel && (
            <span className="font-sans font-bold text-[12px] text-[#6B6761]">
              {whereLabel}
            </span>
          )}
        </div>

        {/* Expanded Content — Mobile */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-4 border-t border-[rgba(0,0,0,0.15)]">
              <div className="flex flex-col gap-6 pt-4">

                {/* Section: The Role (sub-accordion) */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setIsRoleSectionOpen(prev => !prev)}
                    className="flex items-center justify-between w-full cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="bg-[#CE2028] w-4 h-[1.5px] shrink-0"/>
                      <h4 className="font-sans font-extrabold text-[10.5px] tracking-[2.1px] text-[#CE2028] uppercase">
                        The Role
                      </h4>
                    </div>
                    <ChevronDown className={cn("size-2.5 text-[#6B6761] transition-transform duration-300", isRoleSectionOpen && "rotate-180")}/>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isRoleSectionOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="font-sans font-medium text-[12px] leading-[1.55] tracking-[0.24px] text-[#6B6761]">
                        {role.aboutTheRole}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section: What You'll Do */}
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-[#CE2028] w-4 h-[1.5px] shrink-0"/>
                    <h4 className="font-sans font-extrabold text-[10.5px] tracking-[2.1px] text-[#CE2028] uppercase">
                      What You&apos;ll Do
                    </h4>
                  </div>
                  {role.whatYouWillDo && role.whatYouWillDo.length > 0 && (
                    <ul className="flex flex-col gap-1">
                      {role.whatYouWillDo.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3.5 pt-2">
                          <div className="bg-[#CE2028] w-[5px] h-[5px] rounded-full shrink-0 mt-1.5"/>
                          <span className="font-sans font-normal text-[12px] leading-[1.55] tracking-[0.24px] text-[#1A1815]">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Section: Apply */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-[#CE2028] w-4 h-[1.5px] shrink-0"/>
                    <h4 className="font-sans font-extrabold text-[10.5px] tracking-[2.1px] text-[#CE2028] uppercase">
                      Apply
                    </h4>
                  </div>
                  <span className="font-sans font-medium text-[12px] leading-[18px] text-[#6B6761]">
                    Email us @<a href="mailto:careers@yuvaunstoppable.org"
                                  className="hover:text-[#CE2028] transition-colors">careers@yuvaunstoppable.org</a>{" "}
                  </span>
                  <PrimaryButton
                    label="Apply Now"
                    href={role.ctaHref}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5"/>}
                    btnClassName="py-3.5 px-7 rounded-full text-sm font-bold bg-[#CE2028] text-white flex items-center justify-center gap-2.5 w-fit"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop Layout (>= md) ── */}
      <div className="hidden md:block">
        {/* Header */}
        <button
          onClick={() => toggleExpand(idx)}
          className={cn(
            "w-full text-left flex flex-row items-center justify-between gap-4 hover:cursor-pointer transition-all duration-300",
            isOpen
              ? "pt-7.5 pb-7 pl-10 pr-8"
              : "py-7 px-8"
          )}
        >
          <div className="flex flex-col gap-2">
            <h3
              className={cn(
                "font-serif font-bold text-[22px] leading-6.5 tracking-[-0.33px] transition-colors duration-300",
                isOpen ? "text-[#CE2028]" : "text-[#1A1815]"
              )}
            >
              {role.title}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[#6B6761] font-semibold text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-[#6B6761]"/>
                {role.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="size-3.5 text-[#6B6761]"/>
                {role.type}{role.where ? ` · ${role.where}` : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5.5 shrink-0 self-center">
            <span
              className={cn(
                "font-sans font-extrabold text-[11px] tracking-[1.54px] uppercase px-3.5 py-1.5 rounded-full text-center shrink-0",
                tagColors.bg,
                tagColors.text
              )}
            >
              {role.department}
            </span>
            <div
              className={cn(
                "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0",
                isOpen
                  ? "bg-[#CE2028] border-[#CE2028] text-white"
                  : "bg-white border-[#1A18152E] text-[#6B6761]"
              )}
            >
              <Plus className={cn("size-3.5 transition-transform duration-300", isOpen && "rotate-45")}/>
            </div>
          </div>
        </button>

        {/* Expanded Content — Desktop */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="pl-10 pr-8 pt-0 pb-9 border-t border-[#1A18150D]">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 pt-7">

                {/* Column 1: The Role */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-3.5">
                    <div className="bg-primary-red w-1.5 h-1.5 rounded-[1px] shrink-0"/>
                    <h4 className="font-sans font-extrabold text-[10.5px] tracking-[2.1px] text-primary-red uppercase">The
                      Role</h4>
                  </div>
                  <p className="font-sans font-medium text-[14.5px] leading-6 text-[#6B6761]">
                    {role.aboutTheRole}
                  </p>
                </div>

                {/* Column 2: What You'll Do */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-3.5">
                    <div className="bg-primary-red w-1.5 h-1.5 rounded-[1px] shrink-0"/>
                    <h4
                      className="font-sans font-extrabold text-[10.5px] tracking-[2.1px] text-primary-red uppercase">What
                      You&apos;ll Do</h4>
                  </div>
                  {role.whatYouWillDo && role.whatYouWillDo.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {role.whatYouWillDo.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <div className="bg-[#CE2028] w-1.5 h-1.5 rounded-full shrink-0 mt-2"/>
                          <span className="font-sans font-medium text-[13.5px] leading-5 text-[#1A1815]">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Column 3: Apply — full width on tablet, single column on desktop */}
                <div className="flex flex-col col-span-2 xl:col-span-1">
                  <div className="flex items-center gap-2 mb-3.5">
                    <div className="bg-primary-red w-1.5 h-1.5 rounded-[1px] shrink-0"/>
                    <h4
                      className="font-sans font-extrabold text-[10.5px] tracking-[2.1px] text-primary-red uppercase">Apply</h4>
                  </div>
                  <div className="flex flex-col gap-3.5">
                    <PrimaryButton
                      label="Apply Now"
                      href={role.ctaHref}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5"/>}
                      btnClassName="py-3.5 px-7 rounded-full text-sm font-bold bg-[#CE2028] text-white flex items-center justify-center gap-2 w-fit"
                    />
                    <span className="font-sans font-medium text-[12px] leading-4.5 text-[#6B6761]">
                      Email us @ <a href="mailto:careers@yuvaunstoppable.org"
                                      className="underline hover:text-[#CE2028] transition-colors">careers@yuvaunstoppable.org</a>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Role;