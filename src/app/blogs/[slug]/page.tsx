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
  fetchContentBySlugResult,
} from "@/lib/wordpress";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Real WP slugs are letters/digits/_/- (or %-encoded). Rejects .php, .env, dots, etc. */
const VALID_SLUG = /^[\p{L}\p{N}_%-]+$/u;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!VALID_SLUG.test(slug)) return {};
  return pageMetadata(slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!VALID_SLUG.test(slug)) notFound();

  const { item: post, missing, failed } = await fetchContentBySlugResult(
    BLOG_CONTENT_SOURCE,
    slug
  );

  if (missing) notFound();

  // Never render (and cache) placeholder content under a real blog URL. With
  // ISR, a thrown error keeps serving the last good cached page.
  if (failed) {
    throw new Error(`[blogs/${slug}] WordPress fetch failed`);
  }

  if (post) {
    const category = embeddedPrimaryCategory(post);
    if (isAwardsRecognitionCategory(category.slug, category.name)) {
      redirect(AWARDS_RECOGNITION_PAGE_PATH);
    }
  }

  return <IndividualBlogPage slug={slug} />;
}

// Route-segment config MUST live in the route file itself and be a static
// literal (Next rejects an imported const). 1 hour — keep in sync with
// REVALIDATE_TIME.POSTS, which drives the underlying fetches.
export const revalidate = 3600;

// A dynamic segment without generateStaticParams is only ISR-cached at runtime
// with force-static (see Next docs: generateStaticParams → "All paths at
// runtime"). Posts render on first visit and are cached; no rebuild needed.
export const dynamic = "force-static";
