import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DRIVE_ID_RE = /^[a-zA-Z0-9_-]{10,}$/;

function driveDownloadUrl(fileId: string, uuid?: string): string {
  const url = new URL("https://drive.usercontent.google.com/download");
  url.searchParams.set("id", fileId);
  url.searchParams.set("export", "download");
  url.searchParams.set("confirm", "t");
  if (uuid) url.searchParams.set("uuid", uuid);
  return url.toString();
}

function cookieHeader(res: Response): string {
  const raw =
    typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [];
  return raw
    .map((cookie) => cookie.split(";")[0]?.trim())
    .filter(Boolean)
    .join("; ");
}

/** Pull the real file URL out of Google’s download-confirm HTML. */
function extractConfirmedUrl(html: string, fileId: string): string | null {
  const href = html.match(
    /https:\/\/drive\.usercontent\.google\.com\/download\?[^"'>\s]+/i
  );
  if (href) return href[0].replace(/&amp;/g, "&");

  const uuid =
    html.match(/name=["']uuid["']\s+value=["']([^"']+)["']/i)?.[1] ??
    html.match(/[?&]uuid=([0-9a-f-]{8,})/i)?.[1];
  if (uuid) return driveDownloadUrl(fileId, uuid);

  return null;
}

function contentTypeFor(upstream: Response): string {
  const type = upstream.headers.get("content-type") ?? "";
  if (type && !type.includes("text/html")) return type.split(";")[0].trim();

  const disposition = upstream.headers.get("content-disposition") ?? "";
  const name = disposition.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i)?.[1] ?? "";
  const ext = name.toLowerCase().split(".").pop() ?? "";
  if (ext === "webm") return "video/webm";
  if (ext === "ogg" || ext === "ogv") return "video/ogg";
  if (ext === "mov") return "video/quicktime";
  return "video/mp4";
}

async function openDriveFile(fileId: string, range: string | null): Promise<Response> {
  const headers: Record<string, string> = {
    "User-Agent": "Mozilla/5.0",
    Accept: "video/*,application/octet-stream,*/*",
  };
  if (range) headers.Range = range;

  let res = await fetch(driveDownloadUrl(fileId), {
    headers,
    redirect: "follow",
    cache: "no-store",
  });

  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) return res;

  const html = await res.text();
  const nextUrl = extractConfirmedUrl(html, fileId);
  if (!nextUrl) return res;

  const cookies = cookieHeader(res);
  res = await fetch(nextUrl, {
    headers: {
      ...headers,
      ...(cookies ? { Cookie: cookies } : {}),
    },
    redirect: "follow",
    cache: "no-store",
  });
  return res;
}

/**
 * GET /api/media/drive?id=FILE_ID
 * Streams a publicly shared Google Drive file as a normal video,
 * so the gallery player does not depend on Google’s iframe embed.
 */
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id")?.trim() ?? "";
  if (!DRIVE_ID_RE.test(id)) {
    return NextResponse.json({ message: "Invalid Google Drive file." }, { status: 400 });
  }

  try {
    const upstream = await openDriveFile(id, req.headers.get("range"));
    const type = upstream.headers.get("content-type") ?? "";

    if (!upstream.ok && upstream.status !== 206) {
      return NextResponse.json(
        { message: "This Google Drive video could not be opened. Share it as Anyone with the link." },
        { status: 502 }
      );
    }

    if (type.includes("text/html") || !upstream.body) {
      return NextResponse.json(
        { message: "Google Drive did not return a video file. Share it as Anyone with the link." },
        { status: 502 }
      );
    }

    const headers = new Headers();
    headers.set("Content-Type", contentTypeFor(upstream));
    headers.set("Accept-Ranges", upstream.headers.get("accept-ranges") ?? "bytes");
    headers.set("Cache-Control", "private, max-age=3600");

    const length = upstream.headers.get("content-length");
    if (length) headers.set("Content-Length", length);
    const contentRange = upstream.headers.get("content-range");
    if (contentRange) headers.set("Content-Range", contentRange);

    return new Response(upstream.body, { status: upstream.status, headers });
  } catch (err) {
    console.error("[api/media/drive] Failed", err);
    return NextResponse.json(
      { message: "This Google Drive video could not be opened." },
      { status: 502 }
    );
  }
}
