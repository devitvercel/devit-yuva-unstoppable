import { NextResponse } from "next/server";
import { getPaymentGateway } from "@/lib/payments";
import type { GatewayCallbackBody } from "@/lib/payments/types";
import { resolveAppBaseUrl } from "@/lib/payments/appUrl";
import { saveDonationStatus } from "@/services/donate/donation.service";

/** CCAvenue crypto uses node:crypto — force the Node.js runtime. */
export const runtime = "nodejs";

/**
 * POST /api/donate/callback
 * ---------------------------------------------------------------------------
 * CCAvenue redirects the browser here (form-encoded) after payment for both the
 * redirect and cancel URLs. We:
 *   1. Decrypt + verify the response with the Working Key.
 *   2. Persist the final status to WordPress.
 *   3. Redirect the donor to the status page (which never sees any secret).
 */
export async function POST(req: Request) {
  const baseUrl = resolveAppBaseUrl(req);
  const statusPage = (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    // 303 converts the incoming POST into a GET, back to the donate page which
    // renders the result inline (see DonateForm).
    return NextResponse.redirect(`${baseUrl}/donate?${qs}#donate-form`, 303);
  };

  const body: GatewayCallbackBody = {};
  try {
    const form = await req.formData();
    for (const [key, value] of form.entries()) {
      body[key] = typeof value === "string" ? value : "";
    }
  } catch (err) {
    console.error("[api/donate/callback] Failed to read callback body", err);
    return statusPage({ status: "invalid" });
  }

  let result;
  try {
    result = getPaymentGateway().verifyResponse(body);
  } catch (err) {
    console.error("[api/donate/callback] Verification failed", err);
    return statusPage({ status: "invalid" });
  }

  const update = await saveDonationStatus({
    orderId: result.orderId,
    status: result.status,
    trackingId: result.trackingId,
    bankRefNo: result.bankRefNo,
    paymentMode: result.paymentMode,
    amount: result.amount,
    currency: result.currency,
    message: result.message,
    raw: result.raw,
  });
  if (update.error) {
    console.error(
      `[api/donate/callback] Status not saved for ${result.orderId}: ${update.error}`
    );
  }

  return statusPage({
    order: result.orderId,
    status: result.status,
    ...(result.amount ? { amount: String(result.amount) } : {}),
    // CCAvenue tracking_id — the reference admins search in the CCAvenue MARS dashboard.
    ...(result.trackingId ? { tracking: result.trackingId } : {}),
  });
}

/** Some CCAvenue configs may issue a GET on cancel — handle gracefully. */
export async function GET(req: Request) {
  const baseUrl = resolveAppBaseUrl(req);
  return NextResponse.redirect(`${baseUrl}/donate?status=aborted#donate-form`, 303);
}
