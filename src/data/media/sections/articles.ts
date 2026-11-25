import type { ArticleItem, MediaTab } from "@/types/media/media.types";

export const blogCategories: MediaTab[] = [
  { id: "all", label: "All" },
  { id: "education", label: "Education" },
  { id: "health", label: "Health" },
  { id: "community", label: "Community" },
  { id: "infrastructure", label: "Infrastructure" },
];

export const newsCategories: MediaTab[] = [
  { id: "all", label: "All" },
  { id: "press-release", label: "Press Releases" },
  { id: "news", label: "News" },
  { id: "media", label: "Media Coverage" },
];

const figmaExcerpt =
  "In bustling Haryana, amidst dreams as vast as the horizon, resides 18-year-old Chhavi asdfghjkl;'qwertyuiopertyuioprtyu.............";

function blogHref(slug: string, category: string): string {
  const params = new URLSearchParams({listing: "blogs"});
  if (category !== "all") params.set("from", category);
  return `/blogs/${slug}?${params}`;
}

export const blogArticles: ArticleItem[] = [
  {
    title: "Chhavi's Journey with Yuva Unstoppable",
    excerpt: figmaExcerpt,
    category: "education",
    tag: "Nuturing Dreams",
    date: "OCT 12, 2024",
    slug: "chhavis-journey-with-yuva-unstoppable",
    img: { src: "/assets/pages/blogs/blog-2.avif", alt: "Chhavi's Journey" },
    href: blogHref("chhavis-journey-with-yuva-unstoppable", "education"),
  },
  {
    title: "Chhavi's Journey with Yuva Unstoppable:",
    excerpt: figmaExcerpt,
    category: "health",
    tag: "Nuturing Dreams",
    date: "OCT 12, 2024",
    slug: "chhavis-journey-health",
    img: { src: "/assets/pages/blogs/blog-3.avif", alt: "Chhavi's Journey" },
    href: blogHref("chhavis-journey-health", "health"),
  },
  {
    title: "Chhavi's Journey with Yuva Unstoppable:",
    excerpt: figmaExcerpt,
    category: "community",
    tag: "Nuturing Dreams",
    date: "OCT 12, 2024",
    slug: "chhavis-journey-community",
    img: { src: "/assets/pages/blogs/blog-4.avif", alt: "Chhavi's Journey" },
    href: blogHref("chhavis-journey-community", "community"),
  },
  {
    title: "Chhavi's Journey with Yuva Unstoppable:",
    excerpt: figmaExcerpt,
    category: "infrastructure",
    tag: "Nuturing Dreams",
    date: "OCT 12, 2024",
    slug: "chhavis-journey-infrastructure",
    img: { src: "/assets/pages/blogs/blog-5.avif", alt: "Chhavi's Journey" },
    href: blogHref("chhavis-journey-infrastructure", "infrastructure"),
  },
  {
    title: "Chhavi's Journey with Yuva Unstoppable:",
    excerpt: figmaExcerpt,
    category: "education",
    tag: "Nuturing Dreams",
    date: "OCT 12, 2024",
    slug: "chhavis-journey-education-2",
    img: { src: "/assets/pages/blogs/blog-6.avif", alt: "Chhavi's Journey" },
    href: blogHref("chhavis-journey-education-2", "education"),
  },
  {
    title: "Chhavi's Journey with Yuva Unstoppable:",
    excerpt: figmaExcerpt,
    category: "health",
    tag: "Nuturing Dreams",
    date: "OCT 12, 2024",
    slug: "chhavis-journey-health-2",
    img: { src: "/assets/pages/blogs/blog-7.avif", alt: "Chhavi's Journey" },
    href: blogHref("chhavis-journey-health-2", "health"),
  },
];

export const pressArticles: ArticleItem[] = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed massa.",
    category: "news",
    tag: "NEWS",
    source: "Times Of India",
    date: "20 MAR 2026",
    href: "https://timesofindia.indiatimes.com/",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed massa.",
    category: "press-release",
    tag: "PRESS RELEASE",
    source: "Times Of India",
    date: "20 MAR 2026",
    href: "https://timesofindia.indiatimes.com/",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed massa.",
    category: "media",
    tag: "MEDIA COVERAGE",
    source: "Times Of India",
    date: "20 MAR 2026",
    href: "https://timesofindia.indiatimes.com/",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed massa.",
    category: "news",
    tag: "NEWS",
    source: "Times Of India",
    date: "20 MAR 2026",
    href: "https://timesofindia.indiatimes.com/",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed massa.",
    category: "press-release",
    tag: "PRESS RELEASE",
    source: "Times Of India",
    date: "20 MAR 2026",
    href: "https://timesofindia.indiatimes.com/",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper feugiat amet mattis sed massa.",
    category: "media",
    tag: "MEDIA COVERAGE",
    source: "Times Of India",
    date: "20 MAR 2026",
    href: "https://timesofindia.indiatimes.com/",
  },
];