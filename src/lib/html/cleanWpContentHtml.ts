/**
 * Cleanup for WordPress post HTML before dangerouslySetInnerHTML:
 * 1. strip every <br>
 * 2. drop empty spacer paragraphs
 * 3. pull consecutive image blocks into a horizontal `.yuva-image-row`
 *
 * Imported posts wrap each image in its own <p> / <div class="wp-block-image">,
 * which forces a vertical stack even after <br> removal — those wrappers are
 * what this groups.
 */

function stripAllBreaks(html: string): string {
  return html.replace(/<br\s*\/?>/gi, "");
}

function stripEmptyParagraphs(html: string): string {
  return html.replace(
    /<p\b[^>]*>\s*(?:&nbsp;|&#160;|\s)*<\/p>/gi,
    ""
  );
}

function stripEmptyDivs(html: string): string {
  return html.replace(/<div\b[^>]*>\s*<\/div>/gi, "");
}

/** True full-bleed images stay on their own row. */
function isFullBleed(block: string): boolean {
  return /size-full|alignfull|alignwide/i.test(block);
}

/**
 * One image-only block from classic or block editor:
 * - <div class="wp-block-image">…</div>
 * - <figure>…</figure>
 * - <p><img></p> / <p><a><img></a></p>
 * - bare <img> / <a><img></a>
 */
const IMAGE_UNIT =
  /(?:<div\b[^>]*\bwp-block-image\b[^>]*>[\s\S]*?<\/div>)|(?:<figure\b[^>]*>[\s\S]*?<\/figure>)|(?:<p\b[^>]*>\s*(?:<a\b[^>]*>\s*)?<img\b[^>]*>\s*(?:<\/a>\s*)?<\/p>)|(?:(?:<a\b[^>]*>\s*)?<img\b[^>]*>\s*(?:<\/a>)?)/gi;

/** Gap between image blocks that still counts as "adjacent". */
function isImageGap(between: string): boolean {
  return /^(?:\s|&nbsp;|&#160;|<p\b[^>]*>\s*(?:&nbsp;|&#160;|\s)*<\/p>|<div\b[^>]*>\s*<\/div>)*$/i.test(
    between
  );
}

/** Prefer the inner <img> (or linked img / figure) so the row stays compact. */
function extractImageMarkup(block: string): string {
  const figure = block.match(/<figure\b[^>]*>[\s\S]*?<\/figure>/i);
  if (figure) return figure[0];

  const linked = block.match(
    /(?:<a\b[^>]*>\s*)?<img\b[^>]*>\s*(?:<\/a>)?/i
  );
  if (linked) return linked[0];

  return block;
}

function groupConsecutiveImages(html: string): string {
  const units: {start: number; end: number; html: string}[] = [];

  IMAGE_UNIT.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = IMAGE_UNIT.exec(html)) !== null) {
    units.push({
      start: match.index,
      end: match.index + match[0].length,
      html: match[0],
    });
  }

  if (units.length === 0) return html;

  type Run = {start: number; end: number; items: string[]};
  const runs: Run[] = [];
  let current: Run | null = null;

  for (const unit of units) {
    const between =
      current === null ? "" : html.slice(current.end, unit.start);
    const canJoin =
      current !== null &&
      isImageGap(between) &&
      !isFullBleed(unit.html) &&
      !current.items.some(isFullBleed);

    if (canJoin && current) {
      current.items.push(unit.html);
      current.end = unit.end;
    } else {
      if (current) runs.push(current);
      current = {
        start: unit.start,
        end: unit.end,
        items: [unit.html],
      };
    }
  }
  if (current) runs.push(current);

  const parts: string[] = [];
  let lastIndex = 0;

  for (const run of runs) {
    if (lastIndex < run.start) {
      parts.push(html.slice(lastIndex, run.start));
    }

    if (run.items.length >= 2 && !run.items.some(isFullBleed)) {
      parts.push(
        `<div class="yuva-image-row">${run.items
          .map(extractImageMarkup)
          .join("")}</div>`
      );
    } else {
      parts.push(...run.items);
    }

    lastIndex = run.end;
  }

  if (lastIndex < html.length) {
    parts.push(html.slice(lastIndex));
  }

  return parts.join("");
}

function demoteContentHeadings(html: string): string {
  // Hero already owns the page H1 — demote any body H1s to H2.
  return html
    .replace(/<h1(\b[^>]*)>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>");
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Ensure every <img> has a non-empty, descriptive alt attribute. */
function ensureImageAlts(html: string): string {
  return html.replace(/<img\b([^>]*)\/?>/gi, (full, attrs: string) => {
    const existingAlt = attrs.match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1]?.trim();
    if (existingAlt && existingAlt.length > 0) return full;

    const title = attrs.match(/\btitle\s*=\s*["']([^"']*)["']/i)?.[1]?.trim();
    const src = attrs.match(/\bsrc\s*=\s*["']([^"']*)["']/i)?.[1] ?? "";
    let alt = title || "";
    if (!alt && src) {
      const file = decodeURIComponent(src.split("/").pop()?.split("?")[0] ?? "");
      alt = file
        .replace(/\.[a-z0-9]+$/i, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\d{2,}\b/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }
    if (!alt) {
      alt = "Yuva Unstoppable Initiative Image";
    }

    const cleanAttrs = attrs.replace(/\balt\s*=\s*["'][^"']*["']/gi, "").trim();
    const closing = /\/\s*>$/.test(full) ? " />" : ">";
    return `<img ${cleanAttrs} alt="${escapeAttr(alt)}"${closing}`;
  });
}

function ensureImageDimensionsAndLazy(html: string): string {
  return html.replace(/<img\b([^>]*)\/?>/gi, (full, attrs: string) => {
    let updatedAttrs = attrs;

    if (!/\bloading\s*=/i.test(updatedAttrs)) {
      updatedAttrs += ' loading="lazy"';
    }
    if (!/\bdecoding\s*=/i.test(updatedAttrs)) {
      updatedAttrs += ' decoding="async"';
    }

    const hasWidth = /\bwidth\s*=/i.test(updatedAttrs);
    const hasHeight = /\bheight\s*=/i.test(updatedAttrs);
    if (!hasWidth) {
      updatedAttrs += ' width="800"';
    }
    if (!hasHeight) {
      updatedAttrs += ' height="450"';
    }

    const closing = /\/\s*>$/.test(full) ? " />" : ">";
    return `<img ${updatedAttrs.trim()}${closing}`;
  });
}

export function cleanWpContentHtml(html: string): string {
  if (!html?.trim()) return html || "";

  let result = stripAllBreaks(html);
  result = stripEmptyParagraphs(result);
  result = stripEmptyDivs(result);
  result = demoteContentHeadings(result);
  result = ensureImageAlts(result);
  result = ensureImageDimensionsAndLazy(result);
  result = groupConsecutiveImages(result);
  result = stripEmptyParagraphs(result);
  return result.trim();
}
