import { NextResponse } from "next/server";
import { getDonationPurposes } from "@/services/donate/donation.service";
import { DONATION_PURPOSES } from "@/types/donate/donation.types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/donate/purposes
 * ---------------------------------------------------------------------------
 * Proxies the WordPress Purpose dropdown list to the browser so the donate
 * form stays in sync with Donations → Purposes in wp-admin.
 */
export async function GET() {
  const result = await getDonationPurposes();
  const purposes =
    result.data && result.data.length > 0
      ? result.data
      : DONATION_PURPOSES.map((label) => ({
          id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          label,
        }));

  return NextResponse.json(
    { success: true, purposes },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
