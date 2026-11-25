import { NextResponse } from "next/server";
import { submitContactEnquiry } from "@/services/contact/contact.service";
import { validateContact } from "@/types/contact/contact.types";

/**
 * Server-side proxy for contact-form submissions.
 * ---------------------------------------------------------------------------
 * The browser POSTs to /api/contact; this handler validates, then forwards to
 * the WordPress `yuva/v1/contact` route. Proxying keeps the WP backend URL
 * server-side and gives the client one stable, same-origin endpoint.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const check = validateContact(payload);
  if (!check.valid) {
    return NextResponse.json({ message: check.message }, { status: 400 });
  }

  const result = await submitContactEnquiry(check.data);

  if (result.error) {
    const status = result.status >= 400 && result.status < 500 ? result.status : 502;
    return NextResponse.json({ message: result.error }, { status });
  }

  return NextResponse.json(
    { message: result.data?.message ?? "Thanks! We will be in touch soon." },
    { status: 200 }
  );
}
