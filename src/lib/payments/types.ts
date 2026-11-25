/**
 * Gateway-agnostic payment contracts for Yuva.
 * ---------------------------------------------------------------------------
 * Business logic (donation flow, API routes) depends ONLY on these types, never
 * on a specific provider. To add Razorpay/Stripe later, implement
 * `PaymentGateway` and register it in `lib/payments/index.ts` — nothing else in
 * the app needs to change.
 */

/** Registered gateway implementations. Extend the union as you add gateways. */
export type PaymentGatewayId = "ccavenue";

/** Donation cadence chosen by the donor. */
export type DonationFrequency = "once" | "monthly";

/**
 * Normalized payment outcome, independent of any gateway's own vocabulary.
 * - success  — payment captured
 * - failed   — declined / errored at the bank or gateway
 * - aborted  — user cancelled / abandoned at the gateway
 * - pending  — awaiting confirmation (server-to-server status not yet known)
 * - invalid  — response failed verification (tampering / decrypt failure)
 */
export type PaymentStatus =
  | "success"
  | "failed"
  | "aborted"
  | "pending"
  | "invalid";

/** Donor identity forwarded to the gateway for billing + receipts. */
export interface PaymentCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pan?: string;
  address?: string;
  purpose?: string;
}

/** Everything a gateway needs to start a checkout for one order. */
export interface CreatePaymentInput {
  orderId: string;
  /** Amount in major currency units (e.g. rupees, not paise). */
  amount: number;
  currency: string;
  frequency: DonationFrequency;
  customer: PaymentCustomer;
  /** Absolute URL the gateway redirects to after payment. */
  redirectUrl: string;
  /** Absolute URL the gateway redirects to on cancel/abort. */
  cancelUrl: string;
}

/**
 * Instructions the browser follows to hand control to the gateway. For form-POST
 * gateways (CCAvenue) the client builds a hidden form from `fields` and submits
 * it to `action`.
 */
export interface PaymentInitiation {
  gateway: PaymentGatewayId;
  method: "POST" | "GET";
  /** Gateway checkout URL to submit/redirect to. */
  action: string;
  /** Hidden fields to send with the request. */
  fields: Record<string, string>;
}

/** Normalized, verified result decoded from the gateway's callback. */
export interface PaymentVerificationResult {
  orderId: string;
  status: PaymentStatus;
  amount?: number;
  currency?: string;
  trackingId?: string;
  bankRefNo?: string;
  paymentMode?: string;
  /** Human-readable status/failure message from the gateway, if any. */
  message?: string;
  /** Full decrypted key/value map for auditing/storage. */
  raw: Record<string, string>;
}

/** Raw callback payload from the gateway (parsed form fields). */
export type GatewayCallbackBody = Record<string, string>;

/**
 * The single interface every payment provider implements.
 */
export interface PaymentGateway {
  readonly id: PaymentGatewayId;

  /** Build the redirect/form instructions to start a checkout. */
  createPayment(input: CreatePaymentInput): PaymentInitiation;

  /** Decrypt + verify the gateway callback into a normalized result. */
  verifyResponse(body: GatewayCallbackBody): PaymentVerificationResult;
}
