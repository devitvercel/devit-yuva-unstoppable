import Image from "next/image";
import type {LifeAtYuvaHeroSectionType} from "@/types/lifeAtYuva/lifeAtYuva.types";

function LifeAtYuvaHeroSection({hero}: {hero: LifeAtYuvaHeroSectionType}) {
  return (
    <section className="relative mt-16.25 xl:mt-19.5 h-[min(760px,calc(100vh-65px))] xl:h-[min(760px,calc(100vh-78px))] overflow-hidden bg-[#b2ad9e]">
      <Image
        src={hero.img.src}
        alt={hero.img.alt || hero.heading || hero.title || "Life at Yuva Hero Image"}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.61)] from-[60.99%] to-transparent" />
      <div className="relative z-10 flex h-full w-916/1000 xl:w-888/1000 mx-auto flex-col items-center justify-center gap-4 text-center px-4">
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-[1px] bg-white" aria-hidden />
          <p className="font-dm-sans text-[11px] font-bold uppercase tracking-[2.2px] text-white">
            {hero.heading}
          </p>
        </div>
        <h1 className="font-fraunces-italics text-[clamp(40px,8vw,72px)] leading-none tracking-[-2.16px] text-white">
          <span className="text-primary-red">{hero.highlightedTitle}</span>{" "}
          {hero.title}
        </h1>
        <p className="max-w-[937px] font-sans text-[18px] font-medium leading-[28.8px] text-[rgba(255,255,255,0.85)]">
          {hero.body}
        </p>
      </div>
    </section>
  );
}

export default LifeAtYuvaHeroSection;
