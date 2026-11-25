import TheYuvaWaySection from "@/components/lifeAtYuva/theYuvaWaySection/TheYuvaWaySection";
import type {LifeAtYuvaTheYuvaWaySectionType} from "@/types/lifeAtYuva/lifeAtYuva.types";

/** Home-page Life @ Yuva fold — same content as Life @ Yuva “The Yuva Way”. */
const LifeAtYuvaSection = ({
  lifeAtYuva,
}: {
  lifeAtYuva: LifeAtYuvaTheYuvaWaySectionType;
}) => {
  return <TheYuvaWaySection theYuvaWay={lifeAtYuva} />;
};

export default LifeAtYuvaSection;
