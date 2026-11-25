/**
 * Resolve the app's public base URL for building absolute gateway callback URLs.
 * Priority: SITE_URL / NEXT_PUBLIC_SITE_URL env → request Origin → request Host.
 * The trailing slash is always stripped.
 */
export function resolveAppBaseUrl(req: Request): string {
  const fromEnv = process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");

  const origin = req.headers.get("origin");
  if (origin) return origin.replace(/\/+$/, "");

  const host = req.headers.get("host");
  if (host) {
    const proto = req.headers.get("x-forwarded-proto") ??
      (host.startsWith("localhost") || host.startsWith("127.0.0.1")
        ? "http"
        : "https");
    return `${proto}://${host}`;
  }

  // Last resort: relative-safe empty base (callback URLs would be invalid,
  // so callers should ensure SITE_URL is set in production).
  return "";
}
