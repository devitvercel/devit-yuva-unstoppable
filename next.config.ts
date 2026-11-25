import type {NextConfig} from "next";
import {FRAME_SRC_DOMAINS} from "./src/lib/csp";

/**
 * Security response headers for all routes.
 * Tuned for Next.js + WP media + Google Maps / YouTube / Vimeo embeds.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    // frame-ancestors duplicates clickjacking protection for modern browsers;
    // X-Frame-Options covers older ones.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      // "form-action 'self'",
      "form-action 'self' https://test.ccavenue.com https://secure.ccavenue.com",
      "frame-ancestors 'self'",
      "object-src 'none'",
      // Next.js App Router + JSON-LD inline scripts need 'unsafe-inline'.
      // 'unsafe-eval' is required by Next.js in development; keep for build parity.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://yuvaunstoppable.org/cms,https://cms.yuvaunstoppable.org/cms, https://*.hostingersite.com", ,
      "media-src 'self' https: blob:",
      `frame-src ${FRAME_SRC_DOMAINS}`,
      "worker-src 'self' blob:",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Prevents Next.js from sending `X-Powered-By: Next.js`
  poweredByHeader: false,
  compress: true,
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "embla-carousel-react",
      "embla-carousel-autoplay",
      "embla-carousel-auto-scroll",
    ],
  },
  // images: {
  //   formats: ["image/avif", "image/webp"],
  //   minimumCacheTTL: 3600,
  //   deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
  //   imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  //   // The local WordPress backend resolves to a loopback IP (localhost → ::1/127.0.0.1).
  //   // Next 16 blocks optimizing images that resolve to private IPs by default (SSRF guard);
  //   // allow it for local dev against the Dockerized WP. Safe here — the host is our own backend.
  //   dangerouslyAllowLocalIP: true,
  //   remotePatterns: [
  //     {protocol: "http", hostname: "localhost", port: "8086", pathname: "/wp-content/uploads/**"},
  //     {protocol: "http", hostname: "127.0.0.1", port: "8086", pathname: "/wp-content/uploads/**"},
  //     {
  //       protocol: "https",
  //       hostname: "darkslategray-termite-229360.hostingersite.com",
  //       port: "",
  //       pathname: "/**"
  //     },
  //     {
  //     protocol: "https",
  //     hostname: "yuvaunstoppable.org",
  //     pathname: "/cms/**",
  //   },
     
  //   {
  //       protocol: "https",
  //       hostname: "cms.yuvaunstoppable.org",
  //       port: "",
  //       pathname: "/**",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "yuvaunstoppable.org",
  //       port: "",
  //       pathname: "/**",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "www.yuvaunstoppable.org",
  //       port: "",
  //       pathname: "/**",
  //     },
  //     {protocol: "https", hostname: "img.youtube.com", pathname: "/vi/**"},
  //     {protocol: "https", hostname: "i.vimeocdn.com", pathname: "/**"},
  //   ],
  // },
  images: {
  unoptimized: true,
},
  async headers() {
    return [
      {
        // Match all routes including `/` (Next requires an explicit root entry).
        source: "/:path*",
        headers: [
          ...securityHeaders,
          {
            key: "Link",
            value: '<https://cms.yuvaunstoppable.org/cms>; rel="preconnect"; crossorigin, <https://fonts.gstatic.com>; rel="preconnect"; crossorigin',
          },
        ],
      },
      {
        source: "/",
        headers: securityHeaders,
      },
      {
        // Long-cache immutable static brand/media assets (audit #41).
        source: "/:path*.(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
