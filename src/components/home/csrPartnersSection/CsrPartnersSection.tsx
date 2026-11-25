import React from 'react';
import type {CsrPartnersSectionType} from "@/types/home/home.types";
import Image from "next/image";

const CsrPartnersSection = ({csrPartners}: { csrPartners: CsrPartnersSectionType }) => {
  return (
    <section className={"bg-[#EBE8E2] py-8.5 xl:py-20"}>
      <div className="flex flex-col gap-5 xl:gap-7.5 w-916/1000 xl:w-888/1000 mx-auto">
        <div className="flex flex-col gap-4 items-center">
          <p className="typo-body2 text-primary-red">{csrPartners.eyebrow}</p>
          <h2 className="typo-h2 text-[#241E19]">{csrPartners.title}</h2>
          <p className="typo-body3 text-[#3A312A]  text-center">{csrPartners.body}</p>
        </div>
        <div
          className="grid items-center border-t border-l border-[#241E190F] grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {csrPartners.grids.map((gridItem, index) => (
            <div
              key={index}
              className="h-26.25 overflow-hidden border-r w-full border-b border-[#241E190F] relative"
            >
              <div
                style={{
                  '--delay-mobile': `${(index % 2) * 150}ms`,
                  '--delay-tablet': `${(index % 4) * 150}ms`,
                  '--delay-desktop': `${(index % 6) * 150}ms`,
                } as React.CSSProperties}
                className="flex flex-col h-[1000%] animate-logo-scroll-multi"
              >
                {gridItem.logos?.map((logo, logoIdx) => (
                  <div key={logoIdx} className="h-[10%] flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt || "Partner logo"}
                      width={139}
                      height={65}
                      loading="lazy"
                      sizes="139px"
                      className="py-5 px-3 mx-auto object-contain max-h-[85px] w-auto aspect-[139/65]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CsrPartnersSection;
