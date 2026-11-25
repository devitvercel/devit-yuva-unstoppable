import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleItem } from "@/types/media/media.types";

function categoryLabel(category: string, tag?: string) {
  if (tag) return tag.toUpperCase();
  return category.replace(/-/g, " ").toUpperCase();
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function PressArticleCard({ article }: { article: ArticleItem }) {
  const label = categoryLabel(article.category, article.tag);
  const external = isExternalHref(article.href);

  return (
    <article className="group flex flex-col h-full">
      <Link
        href={article.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex flex-col h-full bg-[#fff0f0] rounded-[6px] px-5 py-8 transition-all duration-300 hover:shadow-md"
      >
        <div className="flex flex-col h-full justify-between gap-8">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center justify-center rounded-[6px] bg-primary-red/10 px-4 py-1.5 font-sans text-base font-bold uppercase text-primary-red">
              {label}
            </span>
            <time className="font-sans text-base font-semibold text-[#1f2a37]/90 uppercase whitespace-nowrap">
              <span aria-hidden>• </span>
              {article.date}
            </time>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-[18px]">
              {article.source && (
                <div className="flex items-center gap-1.5">
                  {article.sourceLogo?.src ? (
                    <div className="relative size-[30px] shrink-0 overflow-hidden rounded-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.sourceLogo.src}
                        alt={article.sourceLogo.alt || article.source || article.title || "Press Source Logo"}
                        width={30}
                        height={30}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <span
                      className="size-[30px] shrink-0 rounded-full bg-[#d1d5db]"
                      aria-hidden
                    />
                  )}
                  <p className="font-sans text-base font-semibold leading-[1.5] text-[#1f2a37]/70">
                    {article.source}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-[#1f2a37] line-clamp-3 transition-colors duration-200 group-hover:text-primary-red">
                  {article.title}
                </h3>

                <p className="font-sans text-base font-semibold leading-[1.5] text-[#1f2a37]/70 line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 font-sans text-lg font-medium leading-[1.1] tracking-[-0.36px] text-primary-red">
              Read more
              <ArrowUpRight className="size-6 shrink-0" strokeWidth={2} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PressArticleCard;
