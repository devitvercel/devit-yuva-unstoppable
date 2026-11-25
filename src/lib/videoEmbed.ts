export type VideoEmbed =
  | {type: "iframe"; src: string}
  | {type: "video"; src: string};

/** Platforms that render tall (portrait) embeds instead of 16:9. */
const TALL_EMBED_PATTERNS = /instagram\.com|facebook\.com\/plugins|tiktok\.com/i;

export function isTallEmbed(src: string): boolean {
  return TALL_EMBED_PATTERNS.test(src);
}

/** Pulls a URL out of iframe / video markup or returns the raw string. */
export function normalizeVideoInput(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  const iframeSrc = trimmed.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1];
  if (iframeSrc) return iframeSrc.trim();

  const videoSrc = trimmed.match(/<(?:video|source)[^>]+src=["']([^"']+)["']/i)?.[1];
  if (videoSrc) return videoSrc.trim();

  return trimmed;
}

/** Extracts a YouTube video id from a URL, embed src, or iframe snippet. */
export function extractYouTubeVideoId(input: string): string | null {
  const source = normalizeVideoInput(input);
  if (!source) return null;

  const embedMatch = source.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  const watchMatch = source.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (watchMatch) return watchMatch[1];

  return null;
}

/** Extracts a Vimeo video id from a URL or embed src. */
export function extractVimeoVideoId(input: string): string | null {
  const source = normalizeVideoInput(input);
  if (!source) return null;

  const embedMatch = source.match(/player\.vimeo\.com\/video\/(\d+)/);
  if (embedMatch) return embedMatch[1];

  const pageMatch = source.match(/vimeo\.com\/(\d+)/);
  if (pageMatch) return pageMatch[1];

  return null;
}

function youtubeEmbed(videoId: string): VideoEmbed {
  return {
    type: "iframe",
    src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
  };
}

function vimeoEmbed(videoId: string): VideoEmbed {
  return {
    type: "iframe",
    src: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
  };
}

/**
 * Google Drive file id from share, open, uc, or preview links.
 * Share links (`/view`) cannot be iframed — they must become `/preview`.
 */
export function extractGoogleDriveFileId(input: string): string | null {
  const source = normalizeVideoInput(input);
  if (!source) return null;
  if (!/drive\.google\.com|docs\.google\.com/i.test(source)) return null;

  const fileMatch = source.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];

  const idMatch = source.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];

  return null;
}

function googleDriveEmbed(fileId: string): VideoEmbed {
  // Play through our server so Google’s embed block never loads.
  return {
    type: "video",
    src: `/api/media/drive?id=${encodeURIComponent(fileId)}`,
  };
}

const DIRECT_VIDEO_RE = /\.(mp4|webm|ogg|ogv|mov|m4v|m3u8)(\?.*)?$/i;

/**
 * YouTube poster image (hqdefault is widely available; maxresdefault is not).
 * Accepts a video id or any YouTube URL / iframe snippet.
 */
export function getYouTubeThumbnailUrl(input: string): string | null {
  const videoId = extractYouTubeVideoId(input);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/** Resolves a video link to a thumbnail URL (YouTube sync, Vimeo via oEmbed). */
export async function getVideoThumbnailUrl(input: string): Promise<string | null> {
  const youtubeThumb = getYouTubeThumbnailUrl(input);
  if (youtubeThumb) return youtubeThumb;

  const vimeoId = extractVimeoVideoId(input);
  if (!vimeoId) return null;

  try {
    const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
      `https://vimeo.com/${vimeoId}`
    )}`;
    const res = await fetch(oembedUrl, {next: {revalidate: 86400}});
    if (!res.ok) return null;
    const data = (await res.json()) as {thumbnail_url?: string};
    return typeof data.thumbnail_url === "string" ? data.thumbnail_url : null;
  } catch {
    return null;
  }
}

/**
 * Converts common video inputs into embeddable sources.
 * Accepts plain URLs, embed URLs, or full iframe HTML from WordPress.
 */
function instagramEmbed(reelId: string): VideoEmbed {
  return {
    type: "iframe",
    src: `https://www.instagram.com/reel/${reelId}/embed/`,
  };
}

export function getVideoEmbed(input: string): VideoEmbed | null {
  const source = normalizeVideoInput(input);
  if (!source) return null;

  const youtubeId = extractYouTubeVideoId(source);
  if (youtubeId) return youtubeEmbed(youtubeId);

  const vimeoId = extractVimeoVideoId(source);
  if (vimeoId) return vimeoEmbed(vimeoId);

  const instagramMatch = source.match(
    /instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/
  );
  if (instagramMatch) return instagramEmbed(instagramMatch[1]);

  const driveId = extractGoogleDriveFileId(source);
  if (driveId) return googleDriveEmbed(driveId);

  if (DIRECT_VIDEO_RE.test(source)) {
    return {type: "video", src: source};
  }

  if (/^https?:\/\//i.test(source)) {
    return {type: "iframe", src: source};
  }

  return null;
}
