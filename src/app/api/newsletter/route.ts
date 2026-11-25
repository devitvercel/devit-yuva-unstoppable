import { NextResponse } from "next/server";
import { submitNewsletterSubscription } from "@/services/newsletter/newsletter.service";
import { validateNewsletterEmail } from "@/types/newsletter/newsletter.types";

/**
 * Server-side proxy for newsletter signups.
 * ---------------------------------------------------------------------------
 * The browser POSTs to /api/newsletter; this handler validates, then forwards
 * to the WordPress `yuva/v1/newsletter` route. Proxying keeps the WP backend
 * URL server-side and gives the client one stable, same-origin endpoint.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const email =
    payload && typeof payload === "object" && "email" in payload
      ? (payload as { email?: unknown }).email
      : undefined;

  const check = validateNewsletterEmail(email);
  if (!check.valid) {
    return NextResponse.json({ message: check.message }, { status: 400 });
  }

  const result = await submitNewsletterSubscription(check.email);

  if (result.error) {
    const status = result.status >= 400 && result.status < 500 ? result.status : 502;
    return NextResponse.json({ message: result.error }, { status });
  }

  return NextResponse.json(
    { message: result.data?.message ?? "Thanks for subscribing!" },
    { status: 200 }
  );
}
