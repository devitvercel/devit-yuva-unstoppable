import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {FRAME_SRC_DOMAINS} from "@/lib/csp";

/**
 * Next.js 16 network boundary (formerly middleware).
 * Applies security headers on every matched response so ZAP / browsers
 * see CSP, clickjacking, and content-type protections on all HTML pages.
 */
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "X-DNS-Prefetch-Control": "on",
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    // "form-action 'self'",
    "form-action 'self' https://test.ccavenue.com https://secure.ccavenue.com",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://cms.yuvaunstoppable.org https://yuvaunstoppable.org https://www.yuvaunstoppable.org https://*.hostingersite.com",
    "media-src 'self' https: blob:",
    `frame-src ${FRAME_SRC_DOMAINS}`,
    "worker-src 'self' blob:",
  ].join("; "),
};

export function proxy(_request: NextRequest) {
  const response = NextResponse.next();

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  response.headers.delete("x-powered-by");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|favicon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
