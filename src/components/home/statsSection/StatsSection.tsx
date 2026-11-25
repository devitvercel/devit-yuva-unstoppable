import React from 'react';
import type { StatsSectionType, StatItemType, StatGroupType, StatsRowType } from "@/types/home/home.types";
import CountUp from "@/components/common/CountUp";
import { cn, parseStatNumber } from "@/lib/utils";

// Support legacy flat stats structures
type LegacyStatsSectionType = {
  heading: string;
  stats: StatItemType[];
};

interface StatsSectionProps {
  stats: StatsSectionType | LegacyStatsSectionType;
  sectionClassName?: string;
  titleClassName?: string;
  noFontSize?: string;
  postfixFontSize?: string;
  contentClassName?: string;
  contentContainerClassName?: string;
  showCounterAnimation?: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  sectionClassName,
  titleClassName,
  noFontSize,
  postfixFontSize,
  contentClassName,
  contentContainerClassName,
  showCounterAnimation = true
}) => {
  const groups = (stats as any).groups as StatGroupType[] | undefined;
  const isGrouped = groups !== undefined && Array.isArray(groups);

  // Custom font size parameters that fit cleanly
  const numberFontSize = noFontSize ?? "text-[36px] md:text-[44px] lg:text-[50px] xl:text-[56px]";
  const affixFontSize = postfixFontSize ?? "text-[22px] md:text-[28px] lg:text-[34px] xl:text-[38px]";

  const renderStatCard = (item: StatItemType, index: number, isLast: boolean) => {
    const parsed = parseStatNumber(item.number);
    const isNumeric = parsed.value > 0 || parsed.prefix !== "" || parsed.suffix !== "";

    return (
      <div
        key={index}
        className="flex flex-col gap-2 flex-1 grow shrink min-w-[200px] text-center px-4"
      >
        <span className={cn("typo-h1 not-italic! text-primary-red leading-none whitespace-nowrap tabular-nums", numberFontSize)}>
          {isNumeric && showCounterAnimation ? (
            <>
              {parsed.prefix ? <span className={affixFontSize}>{parsed.prefix}</span> : null}
              <CountUp to={parsed.value} separator={parsed.hasSeparator ? "," : ""} />
              {parsed.suffix ? <span className={affixFontSize}>{parsed.suffix}</span> : null}
            </>
          ) : (
            <span>
              {parsed.prefix}
              {parsed.hasSeparator ? parsed.value.toLocaleString("en-US") : (item.number || parsed.value)}
              {parsed.suffix}
            </span>
          )}
        </span>
        <span className={cn("font-sans text-[13px] font-semibold text-[#3A312A] uppercase tracking-wide max-w-[240px] mx-auto leading-normal", titleClassName)}>
          {item.title}
        </span>
      </div>
    );
  };

  if (!isGrouped) {
    // Check if we have a rows-based structure
    const hasRows = (stats as any).rows && Array.isArray((stats as any).rows) && (stats as any).rows.length > 0;
    
    if (hasRows) {
      const rows = (stats as any).rows as StatsRowType[];
      return (
        <section
          className={cn("py-12.5 xl:py-20 bg-[linear-gradient(178deg,rgba(232,227,228,0.27)_2.09%,rgba(160,4,22,0.27)_98.25%),linear-gradient(178deg,rgba(232,227,228,0.27)_2.09%,rgba(160,4,22,0.27)_98.25%)]", sectionClassName)}
        >
          <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-4">
            {stats.heading && (
              <div className="text-center">
                <p className="typo-body2 uppercase text-primary-red">{stats.heading}</p>
              </div>
            )}

            <div className="flex flex-col gap-10 xl:gap-14">
              {rows.map((row, rowIndex) => {
                const count = row.stats.length;
                const numberCapPx = Math.min(80, Math.round((80 * 4) / count));
                const affixCapPx = Math.round(numberCapPx * 0.65);
                const legacyNumberFontSize = noFontSize ?? `clamp(2rem, ${(numberCapPx / 14.2).toFixed(2)}vw, ${numberCapPx}px)`;
                const legacyAffixFontSize = postfixFontSize ?? `clamp(1.5rem, ${(affixCapPx / 14.2).toFixed(2)}vw, ${affixCapPx}px)`;

                return (
                  <div key={rowIndex} className="flex flex-col gap-6 xl:gap-8">
                    {row.heading && row.heading !== stats.heading && (
                      <div className="text-center">
                      <h3 className="typo-h2 font-fraunces-italics text-primary-red">{row.heading}</h3>
                      </div>
                    )}
                    <div className={cn("flex flex-wrap xl:flex-nowrap gap-6 xl:gap-0", contentClassName)}>
                      {row.stats.map((item, index) => {
                        const parsed = parseStatNumber(item.number);
                        return (
                          <div
                            key={index}
                            className={cn("basis-[calc(50%-0.75rem)] xl:basis-0 grow shrink min-w-0 xl:border-r xl:border-[#A00416] last:border-0 flex flex-col gap-4", contentContainerClassName)}
                          >
                            <span
                              className="typo-h1 not-italic! text-center text-primary-red leading-none whitespace-nowrap tabular-nums"
                              style={{ fontSize: legacyNumberFontSize }}
                            >
                              {showCounterAnimation ? (
                                <>
                                  {parsed.prefix ? <span style={{ fontSize: legacyAffixFontSize }}>{parsed.prefix}</span> : null}
                                  <CountUp to={parsed.value} separator={parsed.hasSeparator ? "," : ""} />
                                  {parsed.suffix ? <span style={{ fontSize: legacyAffixFontSize }}>{parsed.suffix}</span> : null}
                                </>
                              ) : (
                                <>
                                  {parsed.prefix ? <span style={{ fontSize: legacyAffixFontSize }}>{parsed.prefix}</span> : null}
                                  {parsed.hasSeparator ? parsed.value.toLocaleString("en-US") : parsed.value}
                                  {parsed.suffix ? <span style={{ fontSize: legacyAffixFontSize }}>{parsed.suffix}</span> : null}
                                </>
                              )}
                            </span>
                            <span className={cn("typo-body2 text-center text-[#1A1815] uppercase", titleClassName)}>
                              {item.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    // Legacy Flat Render (originally used on /volunteer and /donate pages)
    const flatItems = (stats as LegacyStatsSectionType).stats || [];
    const count = flatItems.length;
    const numberCapPx = Math.min(80, Math.round((80 * 4) / count));
    const affixCapPx = Math.round(numberCapPx * 0.65);
    const legacyNumberFontSize = noFontSize ?? `clamp(2rem, ${(numberCapPx / 14.2).toFixed(2)}vw, ${numberCapPx}px)`;
    const legacyAffixFontSize = postfixFontSize ?? `clamp(1.5rem, ${(affixCapPx / 14.2).toFixed(2)}vw, ${affixCapPx}px)`;

    return (
      <section
        className={cn("py-12.5 xl:py-20 bg-[linear-gradient(178deg,rgba(232,227,228,0.27)_2.09%,rgba(160,4,22,0.27)_98.25%),linear-gradient(178deg,rgba(232,227,228,0.27)_2.09%,rgba(160,4,22,0.27)_98.25%)]", sectionClassName)}
      >
        <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-6 xl:gap-14">
          <div>
            <h3 className="typo-h2 font-fraunces-italics text-[20px]! text-center text-primary-red">{stats.heading}</h3>
          </div>
          <div className={cn("flex flex-wrap xl:flex-nowrap gap-6 xl:gap-0", contentClassName)}>
            {flatItems.map((item, index) => {
              const parsed = parseStatNumber(item.number);
              return (
                <div
                  key={index}
                  className={cn("basis-[calc(50%-0.75rem)] xl:basis-0 grow shrink min-w-0 xl:border-r xl:border-[#A00416] last:border-0 flex flex-col gap-4", contentContainerClassName)}
                >
                  <span
                    className="typo-h1 not-italic! text-center text-primary-red leading-none whitespace-nowrap tabular-nums"
                    style={{ fontSize: legacyNumberFontSize }}
                  >
                    {showCounterAnimation ? (
                      <>
                        {parsed.prefix ? <span style={{ fontSize: legacyAffixFontSize }}>{parsed.prefix}</span> : null}
                        <CountUp to={parsed.value} separator={parsed.hasSeparator ? "," : ""} />
                        {parsed.suffix ? <span style={{ fontSize: legacyAffixFontSize }}>{parsed.suffix}</span> : null}
                      </>
                    ) : (
                      <>
                        {parsed.prefix ? <span style={{ fontSize: legacyAffixFontSize }}>{parsed.prefix}</span> : null}
                        {parsed.hasSeparator ? parsed.value.toLocaleString("en-US") : parsed.value}
                        {parsed.suffix ? <span style={{ fontSize: legacyAffixFontSize }}>{parsed.suffix}</span> : null}
                      </>
                    )}
                  </span>
                  <span className={cn("typo-body2 text-center text-[#1A1815] uppercase", titleClassName)}>
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Grouped render for home page (Education row 1, Economic/Environment combined row 2)
  const educationGroup = groups?.find(g => g.category === "EDUCATION");
  const economicGroup = groups?.find(g => g.category === "ECONOMIC OPPORTUNITY");
  const environmentGroup = groups?.find(g => g.category === "ENVIRONMENT");

  return (
    <section
      className={cn(
        "py-16 xl:py-24 bg-[linear-gradient(180deg,rgba(244,237,224,0.4)_0%,rgba(206,32,40,0.06)_100%)]",
        sectionClassName
      )}
    >
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-12 lg:gap-16">
        
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="typo-h2 text-secondary-brown font-serif">{stats.heading}</h2>
        </div>

        {/* Rows Container */}
        <div className="flex flex-col gap-8 lg:gap-12">

          {/* Row 1: Education */}
          {educationGroup && (
            <div className="flex flex-col gap-6 bg-white/40 backdrop-blur-sm border border-[#241E190A] p-6 lg:p-10 rounded-2xl shadow-sm">
              <div className="text-center border-b border-[#241E190A] pb-4 mb-4">
                <p className="typo-body2 uppercase text-primary-red tracking-[2px] font-bold">
                  {educationGroup.category}
                </p>
              </div>
              <div className="flex flex-wrap lg:flex-nowrap gap-8 lg:gap-0 justify-around">
                {educationGroup.items.map((item, i) =>
                  renderStatCard(item, i, i === educationGroup.items.length - 1)
                )}
              </div>
            </div>
          )}

          {/* Row 2: Economic Opportunity & Environment (Combined) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Economic Opportunity Column */}
            {economicGroup && (
              <div className="flex flex-col gap-6 bg-white/40 backdrop-blur-sm border border-[#241E190A] p-6 lg:p-10 rounded-2xl shadow-sm">
                <div className="text-center border-b border-[#241E190A] pb-4 mb-4">
                  <p className="typo-body2 uppercase text-primary-red tracking-[2px] font-bold">
                    {economicGroup.category}
                  </p>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-6 justify-around">
                  {economicGroup.items.map((item, i) =>
                    renderStatCard(item, i, i === economicGroup.items.length - 1)
                  )}
                </div>
              </div>
            )}

            {/* Environment Column */}
            {environmentGroup && (
              <div className="flex flex-col gap-6 bg-white/40 backdrop-blur-sm border border-[#241E190A] p-6 lg:p-10 rounded-2xl shadow-sm">
                <div className="text-center border-b border-[#241E190A] pb-4 mb-4">
                  <p className="typo-body2 uppercase text-primary-red tracking-[2px] font-bold">
                    {environmentGroup.category}
                  </p>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-6 justify-around">
                  {environmentGroup.items.map((item, i) =>
                    renderStatCard(item, i, i === environmentGroup.items.length - 1)
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsSection;
