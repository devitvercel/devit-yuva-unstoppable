import IndividualBlogPage, {
  generateMetadata as pageMetadata,
} from "@/components/individualBlog/IndividualBlogPage";
import { BLOG_CONTENT_SOURCE } from "@/constants/contentSource.constants";
import {
  AWARDS_RECOGNITION_PAGE_PATH,
  isAwardsRecognitionCategory,
} from "@/constants/awardsRecognition.constants";
import {
  embeddedPrimaryCategory,
  fetchContentBySlug,
} from "@/lib/wordpress";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string; listing?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return pageMetadata(slug);
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { from, listing } = await searchParams;

  const post = await fetchContentBySlug(BLOG_CONTENT_SOURCE, slug);
  if (post) {
    const category = embeddedPrimaryCategory(post);
    if (isAwardsRecognitionCategory(category.slug, category.name)) {
      redirect(AWARDS_RECOGNITION_PAGE_PATH);
    }
  }

  return <IndividualBlogPage slug={slug} from={from} listing={listing} />;
}

// Route-segment config MUST live in the route file itself and be a static
// literal (Next rejects an imported const). 5 min — keep in sync with
// REVALIDATE_TIME.POSTS, which drives the underlying fetches.
export const revalidate = 300;