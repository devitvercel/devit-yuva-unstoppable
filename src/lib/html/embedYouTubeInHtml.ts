import { extractYouTubeVideoId } from "@/lib/videoEmbed"

function youtubeIframeHtml(videoId: string): string {
  return (
    `<div class="yuva-video-embed">` +
    `<iframe ` +
    `src="https://www.youtube.com/embed/${videoId}?rel=0" ` +
    `title="YouTube video" ` +
    `allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ` +
    `allowfullscreen ` +
    `loading="lazy" ` +
    `referrerpolicy="strict-origin-when-cross-origin"` +
    `></iframe>` +
    `</div>`
  )
}

const YOUTUBE_HREF =
  /https?:\/\/(?:www\.)?(?:youtube\.com\/[^"'\s<>]+|youtu\.be\/[^"'\s<>]+)/i

/**
 * Turns YouTube links from WordPress post HTML into responsive iframe embeds.
 * Handles bare URL paragraphs, link-only paragraphs, and wp-block-embed figures.
 * Existing YouTube iframes are wrapped for aspect-ratio styling when needed.
 */
export function embedYouTubeInHtml(html: string): string {
  if (!html || !/youtu\.?be/i.test(html)) return html

  let result = html

  // WordPress embed blocks (URL-only or already iframed).
  result = result.replace(
    /<figure\b[^>]*class="[^"]*wp-block-embed[^"]*"[^>]*>[\s\S]*?<\/figure>/gi,
    (block) => {
      if (/yuva-video-embed/.test(block)) return block

      const iframeMatch = block.match(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/i)
      if (iframeMatch) {
        const id = extractYouTubeVideoId(iframeMatch[0])
        return id ? youtubeIframeHtml(id) : block
      }

      const id = extractYouTubeVideoId(block)
      return id ? youtubeIframeHtml(id) : block
    }
  )

  // Paragraph that is only a YouTube link.
  result = result.replace(
    /<p\b[^>]*>\s*<a\b[^>]*href=["']([^"']+)["'][^>]*>[\s\S]*?<\/a>\s*<\/p>/gi,
    (match, href: string) => {
      if (!YOUTUBE_HREF.test(href)) return match
      const id = extractYouTubeVideoId(href)
      return id ? youtubeIframeHtml(id) : match
    }
  )

  // Paragraph that is only a bare YouTube URL.
  result = result.replace(
    /<p\b[^>]*>\s*(https?:\/\/(?:www\.)?(?:youtube\.com\/[^\s<]+|youtu\.be\/[^\s<]+))\s*<\/p>/gi,
    (match, url: string) => {
      const id = extractYouTubeVideoId(url)
      return id ? youtubeIframeHtml(id) : match
    }
  )

  // Standalone YouTube iframes from oEmbed (not already wrapped).
  result = result.replace(
    /<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi,
    (iframe, offset: number, full: string) => {
      if (!/youtu/i.test(iframe)) return iframe
      const before = full.slice(Math.max(0, offset - 48), offset)
      if (before.includes("yuva-video-embed")) return iframe
      const id = extractYouTubeVideoId(iframe)
      return id ? youtubeIframeHtml(id) : iframe
    }
  )

  return result
}
