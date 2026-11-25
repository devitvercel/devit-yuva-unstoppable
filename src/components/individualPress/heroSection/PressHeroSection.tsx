import Image from "next/image";
import type { IndividualPressHeroSection } from "@/types/individualPress/individualPress.types";

function PressHeroSection({ hero }: { hero: IndividualPressHeroSection }) {
  return (
    <section className="relative w-full min-h-[320px] md:min-h-[400px] xl:h-[494px] flex flex-col justify-end overflow-hidden">
      {hero.img?.src && (
        <Image
          src={hero.img.src}
          alt={hero.img.alt || hero.title || "Press Release Cover Image"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/59" aria-hidden />

      <div className="relative z-10 w-full px-4 md:px-10 xl:px-16 pb-10 md:pb-12 xl:pb-14 pt-28 md:pt-32 xl:pt-[72px]">
        <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-3 items-start">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-bold tracking-[1.5px] text-white/80 uppercase mb-1">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-white/50">•</span>
            <a href="/press-and-media" className="hover:text-white transition-colors">Press & Media</a>
            <span className="text-white/50">•</span>
            <span className="text-white truncate max-w-[200px] sm:max-w-[320px]">{hero.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-[1px] bg-white shrink-0" aria-hidden />
            <p className="font-sans text-sm font-bold uppercase tracking-[2.8px] text-white">
              {hero.tag}
            </p>
          </div>

          <h1 className="font-serif italic text-[28px] md:text-[40px] xl:text-[52px] leading-[1.1] tracking-[-0.03em] text-white max-w-4xl">
            {hero.title}
          </h1>

          {hero.body && (
            <p className="font-work-sans text-base md:text-lg font-medium leading-[1.6] text-white/85 max-w-3xl">
              {hero.body}
            </p>
          )}

          <time className="font-sans text-sm font-bold uppercase tracking-[2.8px] text-white">
            {hero.date}
          </time>
        </div>
      </div>
    </section>
  );
}

export default PressHeroSection;
