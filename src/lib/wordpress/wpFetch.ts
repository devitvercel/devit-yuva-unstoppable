type WpFetchInit = RequestInit & {
  next?: {revalidate?: number};
};

if (
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_WP_INSECURE_SSL === "true"
) {
  // Hostinger staging certs (and some local networks) fail Node TLS verification.
  // Opt-in via .env — never enabled in production builds.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

/** Server-side fetch for WordPress REST API. */
export function wpFetch(
  input: RequestInfo | URL,
  init?: WpFetchInit
): Promise<Response> {
  return fetch(input, init);
}
