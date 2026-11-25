'use client';

import React from "react";
import {cn} from "@/lib/utils";
import {useAccordion} from "@/components/common/accordion/AccordionContext";

interface AccordionItemProps {
  index: number;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  titleClassName?: string;
  activeTitleClassName?: string;
  bodyClassName?: string;
  iconClassName?: string;
  icon?: React.ComponentType<{ fill?: string; className?: string }>;
}

export default function AccordionItem({
                                        index,
                                        title,
                                        children,
                                        icon,
                                        iconClassName,
                                        className,
                                        activeClassName,
                                        titleClassName,
                                        activeTitleClassName,
                                        bodyClassName,
                                      }: AccordionItemProps) {
  const {selected, setSelected} = useAccordion();
  const isOpen = selected === index;
  const Icon = icon;

  return (
    <div
      onClick={() => setSelected(isOpen ? -1 : index)}
      className={cn(className, isOpen && activeClassName)}
    >
      <button
        type="button"
        className="w-full text-left flex flex-row items-center gap-4"
        aria-expanded={isOpen}
      >
        <span className={cn("flex-1", isOpen && "mb-1.5", titleClassName, isOpen && activeTitleClassName)}>
          {title}
        </span>
        {Icon ? (
          <Icon
            fill={isOpen ? "#CE2028" : "#B0A898"}
            className={cn(
              "transition-all duration-300",
              isOpen ? "w-10" : "w-7.5",
              iconClassName
            )}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "shrink-0 transition-all duration-300",
              isOpen ? "w-5 rotate-180 text-primary-red" : "w-4 rotate-0 text-[#B0A898]",
              iconClassName
            )}
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        )}
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className={cn("overflow-hidden", bodyClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
