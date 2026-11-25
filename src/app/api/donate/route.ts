import { NextResponse } from "next/server";
import { getPaymentGateway, getPaymentCurrency } from "@/lib/payments";
import { generateOrderId } from "@/lib/payments/orderId";
import { resolveAppBaseUrl } from "@/lib/payments/appUrl";
import { saveDonationRecord } from "@/services/donate/donation.service";
import { validateDonation } from "@/types/donate/donation.types";

/** CCAvenue crypto uses node:crypto — force the Node.js runtime. */
export const runtime = "nodejs";

/**
 * POST /api/donate
 * ---------------------------------------------------------------------------
 * 1. Validate the donation payload.
 * 2. Generate an order id + persist a pending record in WordPress.
 * 3. Ask the configured payment gateway to build checkout instructions.
 * 4. Return { orderId, initiation } so the client can hand off to the gateway.
 *
 * The gateway Working Key / secrets never leave the server — the client only
 * receives the already-encrypted `encRequest` + public access code.
 */
export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const check = validateDonation(raw);
  if (!check.valid) {
    return NextResponse.json({ message: check.message }, { status: 400 });
  }
  const donation = check.data;

  const orderId = generateOrderId();
  const currency = getPaymentCurrency();

  const baseUrl = resolveAppBaseUrl(req);
  if (!baseUrl) {
    console.error("[api/donate] Could not resolve app base URL. Set SITE_URL.");
    return NextResponse.json(
      { message: "Payment is temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }
  const callbackUrl = `${baseUrl}/api/donate/callback`;

  // Persist a pending record first (best-effort). The callback re-confirms the
  // final status, so a transient WP failure here should not block the payment.
  const saved = await saveDonationRecord({
    orderId,
    amount: donation.amount,
    currency,
    frequency: donation.frequency,
    firstName: donation.firstName,
    lastName: donation.lastName,
    email: donation.email,
    phone: donation.phone,
    pan: donation.pan,
    address: donation.address,
    purpose: donation.purpose,
  });
  if (saved.error) {
    console.warn(`[api/donate] Pending record not saved: ${saved.error}`);
  }

  try {
    const gateway = getPaymentGateway();
    const initiation = gateway.createPayment({
      orderId,
      amount: donation.amount,
      currency,
      frequency: donation.frequency,
      customer: {
        firstName: donation.firstName,
        lastName: donation.lastName,
        email: donation.email,
        phone: donation.phone,
        pan: donation.pan,
        address: donation.address,
        purpose: donation.purpose,
      },
      redirectUrl: callbackUrl,
      cancelUrl: callbackUrl,
    });

    return NextResponse.json({ orderId, initiation }, { status: 200 });
  } catch (err) {
    console.error("[api/donate] Gateway initiation failed", err);
    return NextResponse.json(
      { message: "Payment gateway is not configured. Please try again later." },
      { status: 502 }
    );
  }
}
