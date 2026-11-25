"use client";

import {useLayoutEffect, useState, type ReactNode} from "react";
import Link from "next/link";

const DEFAULT_BACK_HREF = "/voice-of-change";

/**
 * Blog "Go Back" link. Server HTML always renders a real, crawlable link to
 * /voice-of-change so the blog route can stay ISR. On mount it recomputes the
 * same href as before from the URL (?listing= / ?from=) without making the
 * route dynamic.
 */
export default function BackLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [href, setHref] = useState(DEFAULT_BACK_HREF);

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const listing = params.get("listing");
    const from = params.get("from");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from URL (external) on mount
    setHref(
      listing === "blogs"
        ? "/blogs"
        : from
          ? `/voice-of-change?category=${encodeURIComponent(from)}`
          : DEFAULT_BACK_HREF
    );
  }, []);

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
