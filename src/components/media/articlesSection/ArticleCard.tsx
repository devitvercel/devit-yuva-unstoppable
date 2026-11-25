import Image from "next/image";
import Link from "next/link";
import type { ArticleItem } from "@/types/media/media.types";

function resolveBlogHref(article: ArticleItem): string {
  if (article.href && !article.href.includes("/coming-soon")) {
    return article.href;
  }

  if (!article.slug) return "/blogs";

  const params = new URLSearchParams({listing: "blogs"});
  if (article.category && article.category !== "all") {
    params.set("from", article.category);
  }
  return `/blogs/${article.slug}?${params}`;
}

function ArticleCard({ article }: { article: ArticleItem }) {
  const tag = article.tag || article.category;
  const href = resolveBlogHref(article);

  return (
    <article className="group flex flex-col h-full">
      <Link href={href} className="flex flex-col h-full border border-[#DFDDDD85] rounded-[6px] transition-all duration-300 hover:border-primary-red hover:shadow-md">
        {article.img && (
          <div className="relative w-full aspect-[424/248] overflow-hidden rounded-[6px] bg-[#ffe9e7] border border-[#2D2A2614] transition-all duration-300 hover:border-primary-red hover:shadow-md">
            <Image
              src={article.img.src}
              alt={article.img.alt || article.title || "Blog Article Cover Image"}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className="flex flex-col flex-1 pt-5 md:pt-5 gap-2 md:gap-3 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-work-sans text-[12px] md:text-[14px] xl:text-[16px] font-medium text-[#a00416] capitalize">
              {tag}
            </span>
            <time className="font-work-sans text-[12px] md:text-[16px] font-medium text-[#5b403e] uppercase whitespace-nowrap">
              {article.date}
            </time>
          </div>

          <h3 className="font-fraunces-italics md:font-serif text-[20px] md:text-[24px] xl:text-[28px] font-normal leading-[1.35] xl:leading-[1.48] text-[#271816] line-clamp-2 transition-colors duration-200 group-hover:text-[#a00416]">
            {article.title}
          </h3>

          <p className="font-work-sans md:font-work-sans text-[14px] md:text-[16px] font-medium leading-[1.5] md:leading-6 text-[#5b403e] line-clamp-3">
            {article.excerpt}
          </p>

          <span className="font-work-sans text-[12px] md:text-[16px] font-medium text-[#a00416] mt-auto pt-1 self-end">
            Read More →
          </span>
        </div>
      </Link>
    </article>
  );
}

export default ArticleCard;
