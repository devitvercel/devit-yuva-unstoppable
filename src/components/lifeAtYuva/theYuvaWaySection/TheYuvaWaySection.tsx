import Reveal from "@/components/common/animations/Reveal";
import {PillarCard, PillarGrid} from "@/components/common/pillar";
import type {LifeAtYuvaTheYuvaWaySectionType} from "@/types/lifeAtYuva/lifeAtYuva.types";
import {cn} from "@/lib/utils";

function TheYuvaWaySection({
  theYuvaWay,
  className,
}: {
  theYuvaWay: LifeAtYuvaTheYuvaWaySectionType;
  className?: string;
}) {
  return (
    <section
      className={cn("bg-[#FDFBF7] py-12 md:py-16 xl:py-24", className)}
    >
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-8 xl:gap-10">
        <Reveal>
          <div className="flex flex-col gap-5 xl:gap-7">
            <p className="typo-body2 uppercase text-primary-red">
              {theYuvaWay.eyebrow}
            </p>

            <div className="flex flex-wrap flex-row gap-2.5 lg:gap-3 items-center">
              <span className="typo-h2 italic text-primary-red">
                {theYuvaWay.label}
              </span>
            </div>
          </div>
        </Reveal>

        <PillarGrid
          centerLastWhenOdd
          itemCount={theYuvaWay.pillars.length}
        >
          {theYuvaWay.pillars.map((pillar) => (
            <PillarCard
              key={pillar.number}
              number={pillar.number}
              title={pillar.title}
              body={pillar.body}
            />
          ))}
        </PillarGrid>
      </div>
    </section>
  );
}

export default TheYuvaWaySection;
