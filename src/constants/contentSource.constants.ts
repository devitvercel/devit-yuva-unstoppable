import {
  WP_ENDPOINTS,
  WP_QUERY,
} from "@/constants/wp.constants";

/**
 * Describes where a listing/detail page loads its editorial content from.
 * Change these objects to repoint blogs or press to a different post type
 * without touching component code.
 */
export interface ContentSource {
  /** Human-readable label for logs. */
  label: string;
  /** REST collection endpoint, e.g. /wp/v2/posts. */
  postsEndpoint: string;
  /** REST taxonomy endpoint, e.g. /wp/v2/categories. */
  taxonomyEndpoint: string;
  /** Query param used to filter by taxonomy id on the collection route. */
  taxonomyQueryParam: string;
  /** Property on the REST item that holds taxonomy term ids. */
  taxonomyFieldOnItem: string;
  /** Lean field set for list cards. */
  listFields: string;
  /** Field set for detail pages. */
  detailFields: string;
  /** Lean field set for generateMetadata(). */
  metaFields: string;
  /** Whether list/detail requests should ask for ?scf_format=standard. */
  includeScf: boolean;
  /** Frontend path prefix for detail pages, e.g. /blogs. */
  detailPathPrefix: string;
  /** Frontend listing path used for back links. */
  listingPath: string;
}

/**
 * Blog posts — shared by Voice of Change and the Media /blogs page.
 * Both read standard WordPress posts + post categories.
 */
export const BLOG_CONTENT_SOURCE: ContentSource = {
  label: "blog posts",
  postsEndpoint: WP_ENDPOINTS.POSTS,
  taxonomyEndpoint: WP_ENDPOINTS.CATEGORIES,
  taxonomyQueryParam: "categories",
  taxonomyFieldOnItem: "categories",
  listFields: WP_QUERY.POST_LIST_FIELDS,
  detailFields: WP_QUERY.POST_DETAIL_FIELDS,
  metaFields: WP_QUERY.POST_META_FIELDS,
  includeScf: false,
  detailPathPrefix: "/blogs",
  listingPath: "/blogs",
};

/**
 * Press coverage — separate custom post type, not mixed with blog posts.
 */
export const PRESS_CONTENT_SOURCE: ContentSource = {
  label: "press articles",
  postsEndpoint: WP_ENDPOINTS.PRESS_ARTICLES,
  taxonomyEndpoint: WP_ENDPOINTS.PRESS_CATEGORIES,
  taxonomyQueryParam: "press-category",
  taxonomyFieldOnItem: "press-category",
  listFields:
    "id,slug,date,title,excerpt,press-category,featured_media,scf",
  detailFields:
    "id,slug,date,title,excerpt,content,press-category,featured_media,scf",
  metaFields: WP_QUERY.PRESS_META_FIELDS,
  includeScf: true,
  detailPathPrefix: "/press-and-media",
  listingPath: "/press-and-media",
};

/** Max cards fetched for media listing grids (WP REST per_page cap is 100). */
export const MEDIA_ARTICLES_LIST_PER_PAGE = 100;

/** Max filter tabs shown on article listing pages, including the ALL tab. */
export const MEDIA_ARTICLES_MAX_TABS = 5;
