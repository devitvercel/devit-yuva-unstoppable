"use client";

import React from 'react';
import type {CareersOpenRolesSectionType} from "@/types/careers/careers.types";
import RolesContainer from "@/components/careers/openRolesSection/RolesContainer";
import RevealStagger from "@/components/common/animations/RevealStagger";

function OpenRolesSection({openRoles}: { openRoles: CareersOpenRolesSectionType }) {
  return (
    <section className={"py-14 xl:py-25 flex flex-col gap-7 xl:gap-8"}>
      <RevealStagger>
        <div className="flex flex-col gap-4.5 w-916/1000 xl:w-888/1000 mx-auto">
          <div className="flex flex-row flex-wrap gap-2.5 items-center">
            <div className="bg-primary-red size-1.5 rounded-[1px]"/>
            <p className="typo-body2 text-primary-red uppercase shrink-0">{openRoles.heading}</p>
          </div>
          <h2 className={"typo-h2"}>
            {openRoles.title}{" "}
            <span className={"text-primary-red"}>{openRoles.highlightedTitle}</span>
          </h2>
        </div>
      </RevealStagger>
      <RevealStagger>
        <RolesContainer departments={openRoles.departments} roles={openRoles.roles}/>
      </RevealStagger>
    </section>
  );
}

export default OpenRolesSection;