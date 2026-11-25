import type { MediaPageData } from "@/types/media/media.types";
import { GALLERY_FALLBACK } from "./fallbacks/gallery.fallback";
import { BLOGS_FALLBACK } from "./fallbacks/blogs.fallback";
import { PRESS_AND_MEDIA_FALLBACK } from "./fallbacks/pressAndMedia.fallback";

export const MEDIA_FALLBACKS: Record<string, MediaPageData> = {
  gallery: GALLERY_FALLBACK,
  blogs: BLOGS_FALLBACK,
  "press-and-media": PRESS_AND_MEDIA_FALLBACK,
};
