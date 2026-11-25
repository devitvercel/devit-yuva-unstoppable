/**
 * Shared CSP frame-src allow-list.
 * Imported by next.config.ts and src/proxy.ts so the list is defined once.
 */
export const FRAME_SRC_DOMAINS = [
  "'self'",
  "https://www.google.com",
  "https://maps.google.com",
  "https://www.youtube.com",
  "https://youtube.com",
  "https://www.youtube-nocookie.com",
  "https://player.vimeo.com",
  "https://drive.google.com",
  "https://docs.google.com",
  "https://www.instagram.com",
  "https://instagram.com",
  "https://www.facebook.com",
  "https://www.tiktok.com",
  "https://platform.twitter.com",
  "https://syndication.twitter.com",
].join(" ");
