import { markFallback } from "@/lib/utils";
import type { RelatedBlogsSectionType } from "@/types/individualPress/individualPress.types";
import { blogArticles } from "@/data/media/sections/articles";

export const relatedBlogsDataFallback: RelatedBlogsSectionType = {
  title: markFallback("Related"),
  highlightedTitle: markFallback("Blogs"),
  articles: blogArticles.slice(0, 3).map((article) => ({
    ...article,
    href: article.href === "/coming-soon" ? "/blogs" : article.href,
  })),
};
