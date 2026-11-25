'use client';

import React from 'react';
import type {SupportSystemSectionType} from "@/types/programme/programme.types";
import SupportSystemTextContent from "@/components/programme/supportSystemSection/SupportSystemTextContent";
import Accordion from "@/components/common/accordion/Accordion";
import AccordionItem from "@/components/common/accordion/AccordionItem";
import {FancyArrowRightIcon} from "../../../../public/SVGs/svg";

function SupportSystemSection({supportSystem}: { supportSystem: SupportSystemSectionType }) {
  return (
    <section className={"py-7.5 xl:pt-41 xl:pb-25 bg-white"}>
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-7 xl:gap-7.5">
        <Accordion images={supportSystem.cards.map(c => c.img)} itemsClassName="xl:w-58/100">
          <SupportSystemTextContent content={supportSystem}/>
          {supportSystem.cards.map((card, i) => (
            <AccordionItem
              key={i}
              index={i}
              title={card.title}
              icon={FancyArrowRightIcon}
              className="flex flex-col px-5 py-8 border border-[#E2D9CC] cursor-pointer"
              activeClassName="border-b-primary-red"
              titleClassName="typo-h4 text-[clamp(16px,13.89px+0.56vw,22px)] text-[#020202] transition-colors duration-300"
              activeTitleClassName="text-primary-red"
              bodyClassName="w-83/100 xl:w-92/100"
            >
              <p className="text-[#7A7060] typo-body5">{card.body}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default SupportSystemSection;
