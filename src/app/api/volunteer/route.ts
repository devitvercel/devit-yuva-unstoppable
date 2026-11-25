import { NextResponse } from "next/server";
import { submitVolunteerApplicationEnquiry } from "@/services/volunteer/volunteerApplication.service";
import { validateVolunteerApplication } from "@/types/volunteer/volunteerApplication.types";

/**
 * Server-side proxy for volunteer application submissions.
 * The browser POSTs to /api/volunteer; this handler validates, then forwards to
 * the WordPress `yuva/v1/volunteer` route.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const check = validateVolunteerApplication(payload);
  if (!check.valid) {
    return NextResponse.json({ message: check.message }, { status: 400 });
  }

  const result = await submitVolunteerApplicationEnquiry(check.data);

  if (result.error) {
    const status = result.status >= 400 && result.status < 500 ? result.status : 502;
    return NextResponse.json({ message: result.error }, { status });
  }

  return NextResponse.json(
    {
      message:
        result.data?.message ??
        "Thanks! We have received your application and will be in touch soon.",
    },
    { status: 200 }
  );
}
