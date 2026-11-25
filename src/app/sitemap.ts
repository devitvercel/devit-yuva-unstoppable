import type { MetadataRoute } from "next";
import { fetchPosts } from "@/lib/wordpress";
import { PROGRAMME_ROUTE_CONFIG } from "@/constants/programme.routes.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";
import { SITE_BASE_URL } from "@/constants/wp.constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_BASE_URL.replace(/\/$/, "");

  const staticRoutes = [
    APP_ROUTES.HOME,
    APP_ROUTES.OUR_STORY,
    APP_ROUTES.OUR_VISION,
    APP_ROUTES.OUR_PEOPLE,
    APP_ROUTES.LIFE_AT_YUVA,
    APP_ROUTES.COMMUNITY_RESPONSE,
    APP_ROUTES.ALIGNMENT_WITH_UN_SDGS,
    APP_ROUTES.IMPACT,
    APP_ROUTES.ANNUAL_REPORTS,
    APP_ROUTES.DONORS_AND_AUDIT_PARTNERS,
    APP_ROUTES.GALLERY,
    APP_ROUTES.PRESS_AND_MEDIA,
    APP_ROUTES.BLOGS,
    APP_ROUTES.VOICE_OF_CHANGE,
    APP_ROUTES.AWARD_RECOGNITION,
    APP_ROUTES.CONTACT,
    APP_ROUTES.DONATE,
    APP_ROUTES.VOLUNTEER,
    APP_ROUTES.CAREERS,
    APP_ROUTES.TERMS,
    APP_ROUTES.PRIVACY,
    ...PROGRAMME_ROUTE_CONFIG.map((route) => `/${route.slug}`),
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === APP_ROUTES.HOME ? "daily" : "weekly",
    priority: route === APP_ROUTES.HOME ? 1.0 : 0.8,
  }));

  try {
    // Dynamic blog posts from WordPress
    const { posts } = await fetchPosts({ perPage: 100 });
    if (posts && Array.isArray(posts)) {
      posts.forEach((post) => {
        if (post.slug) {
          sitemapEntries.push({
            url: `${baseUrl}/blogs/${post.slug}`,
            lastModified: post.date ? new Date(post.date) : new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      });
    }
  } catch (error) {
    console.error("[Sitemap] Failed to fetch dynamic WordPress posts:", error);
  }

  return sitemapEntries;
}
