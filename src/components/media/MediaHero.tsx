import Image from "next/image";
import type {MediaHero as Hero} from "@/types/media/media.types";

export default function MediaHero({
  hero,
  disableOptimization = false,
}: {
  hero: Hero;
  disableOptimization?: boolean;
}) {
  const words = hero.title.trim().split(/\s+/);
  const firstWord = words[0] || "";
  const remainingWords = words.slice(1).join(" ");

  return (
    <section className="relative mt-18.75 xl:mt-22.5 h-[calc(100vh-75px)] xl:h-[calc(100vh-90px)] flex items-center justify-center text-center text-white">
      {disableOptimization ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hero.img.src}
          alt={hero.img.alt || hero.title || "Press and Media Hero Image"}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <Image
          src={hero.img.src}
          alt={hero.img.alt || hero.title || "Press and Media Hero Image"}
          fill
          priority
          className="absolute inset-0 object-cover"
        />
      )}

      <div className="absolute inset-0 bg-[rgba(0,0,0,0.59)]" />

      <div className="relative z-1 w-916/1000 xl:w-888/1000 flex flex-col items-center gap-4 xl:gap-0 justify-center">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-[1px] bg-white" />
          <p className="typo-body2 uppercase text-white/90">
            {hero.eyebrow}
          </p>
        </div>

        <h1 className="typo-h1 leading-[1.1] tracking-tight">
          {remainingWords ? (
            <>
              <span className="text-primary-red italic">{firstWord}</span>{" "}
              <span className="text-white not-italic font-bold">
                {remainingWords}
              </span>
            </>
          ) : (
            <span className="text-white italic">{hero.title}</span>
          )}
        </h1>

        <p className="typo-body1 text-white/85 xl:w-7/10 mt-2 text-center">
          {hero.body}
        </p>
      </div>
    </section>
  );
}
