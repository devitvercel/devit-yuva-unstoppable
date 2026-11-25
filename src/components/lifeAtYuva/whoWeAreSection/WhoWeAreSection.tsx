import Reveal from "@/components/common/animations/Reveal";
import {PillarCard, PillarGrid, PillarLabel} from "@/components/common/pillar";
import type {LifeAtYuvaWhoWeAreSectionType} from "@/types/lifeAtYuva/lifeAtYuva.types";

function WhoWeAreSection({
  whoWeAre,
}: {
  whoWeAre: LifeAtYuvaWhoWeAreSectionType;
}) {
  return (
    <section className="bg-[#FDFBF7] px-5 md:px-10 xl:px-20 pt-16 xl:pt-20 pb-4">
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-5 xl:gap-7">
        <Reveal>
          <PillarLabel>{whoWeAre.label}</PillarLabel>
        </Reveal>

        <PillarGrid>
          {whoWeAre.pillars.map((pillar) => (
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

export default WhoWeAreSection;
