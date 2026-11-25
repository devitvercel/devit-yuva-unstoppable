import ArticleCard from "@/components/media/articlesSection/ArticleCard";
import type { RelatedBlogsSectionType } from "@/types/individualPress/individualPress.types";

function RelatedBlogsSection({
  relatedBlogs,
}: {
  relatedBlogs: RelatedBlogsSectionType;
}) {
  if (relatedBlogs.articles.length === 0) return null;

  return (
    <section className="flex flex-col gap-8 md:gap-10">
      <h2 className="font-serif text-[32px] md:text-[44px] xl:text-[52px] leading-[1.1] tracking-[-0.03em] text-[#020202]">
        {relatedBlogs.title}{" "}
        <span className="text-primary-red italic">{relatedBlogs.highlightedTitle}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 md:gap-x-8 xl:gap-x-10 gap-y-6 md:gap-y-8">
        {relatedBlogs.articles.map((article, index) => (
          <ArticleCard
            key={`${article.title}-${index}`}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedBlogsSection;
