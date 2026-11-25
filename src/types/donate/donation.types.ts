import type {
  DonationFrequency,
  PaymentStatus,
} from "@/lib/payments/types";

/**
 * Donation submission types + validation.
 * ---------------------------------------------------------------------------
 * Kept separate from `donate.types.ts` (which is page content only). These types
 * cover the checkout payload, the WordPress record, and status updates.
 *
 * Purpose dropdown options are managed in WordPress (Donations → Purposes) and
 * loaded at runtime. `DONATION_PURPOSES` is only a fallback if WP is unreachable.
 */

/** Fallback Purpose options when WordPress is unreachable. */
export const DONATION_PURPOSES = [
  "Yuva Unstoppable",
  "Disaster Relief & Emergency support",
  "Sponsor Education",
  "Healthcare & Nutrition",
  "Skill Development & Youth Empowerment",
  "Women Empowerment",
  "Environment & Tree plantation",
  "General Support",
  "Others",
] as const;

/** Purpose label selected on the donate form (managed in WP admin). */
export type DonationPurpose = string;

export interface DonationPurposeOption {
  id: string;
  label: string;
}

/** Payload posted from the donate form to `/api/donate`. */
export interface DonationPayload {
  amount: number;
  frequency: DonationFrequency;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pan: string;
  address: string;
  purpose: DonationPurpose;
}

/** Record persisted to WordPress when a pending order is created. */
export interface DonationRecordInput {
  orderId: string;
  amount: number;
  currency: string;
  frequency: DonationFrequency;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pan: string;
  address: string;
  purpose: DonationPurpose;
}

/** Status update sent to WordPress after the gateway callback. */
export interface DonationStatusUpdate {
  orderId: string;
  status: PaymentStatus;
  trackingId?: string;
  bankRefNo?: string;
  paymentMode?: string;
  amount?: number;
  currency?: string;
  /** Gateway status/failure message. */
  message?: string;
  /** Full decrypted gateway response, stored as JSON for auditing. */
  raw?: Record<string, string>;
}

/** Uniform envelope returned by the WP donation routes. */
export interface DonationResponse {
  success?: boolean;
  code?: string;
  message?: string;
}

export interface DonationPurposesResponse {
  success?: boolean;
  purposes?: DonationPurposeOption[];
}

export interface DonationValidation {
  valid: boolean;
  data: DonationPayload;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,15}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

/** Minimum accepted donation amount (major currency units). */
export const MIN_DONATION_AMOUNT = 1;
/** Upper guard to reject obviously bad amounts before hitting the gateway. */
export const MAX_DONATION_AMOUNT = 10_00_000; // ₹10,00,000

function normalizeFrequency(raw: unknown): DonationFrequency {
  return raw === "monthly" ? "monthly" : "once";
}

/** Trim + validate a donation payload before creating an order. */
export function validateDonation(raw: unknown): DonationValidation {
  const obj = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  const amountNum =
    typeof obj.amount === "number"
      ? obj.amount
      : Number(typeof obj.amount === "string" ? obj.amount.trim() : NaN);

  const purposeRaw = typeof obj.purpose === "string" ? obj.purpose.trim() : "";
  const purpose = purposeRaw.slice(0, 120);

  const data: DonationPayload = {
    amount: Number.isFinite(amountNum) ? Math.round(amountNum) : 0,
    frequency: normalizeFrequency(obj.frequency),
    firstName: typeof obj.firstName === "string" ? obj.firstName.trim() : "",
    lastName: typeof obj.lastName === "string" ? obj.lastName.trim() : "",
    email: typeof obj.email === "string" ? obj.email.trim() : "",
    phone: typeof obj.phone === "string" ? obj.phone.trim() : "",
    pan: typeof obj.pan === "string" ? obj.pan.trim().toUpperCase() : "",
    address: typeof obj.address === "string" ? obj.address.trim() : "",
    purpose,
  };

  if (!data.amount || data.amount < MIN_DONATION_AMOUNT) {
    return { valid: false, data, message: "Please enter a valid donation amount." };
  }
  if (data.amount > MAX_DONATION_AMOUNT) {
    return {
      valid: false,
      data,
      message: "That amount is too large. Please contact us for major gifts.",
    };
  }
  if (!data.firstName) {
    return { valid: false, data, message: "Please enter your first name." };
  }
  if (!data.lastName) {
    return { valid: false, data, message: "Please enter your last name." };
  }
  if (!data.email || !EMAIL_RE.test(data.email)) {
    return { valid: false, data, message: "Please enter a valid email address." };
  }
  if (!data.phone || !PHONE_RE.test(data.phone)) {
    return { valid: false, data, message: "Please enter a valid phone number." };
  }
  if (!data.pan || !PAN_RE.test(data.pan)) {
    return {
      valid: false,
      data,
      message: "Please enter a valid PAN number (e.g. ABCDE1234F).",
    };
  }
  if (!data.address) {
    return { valid: false, data, message: "Please enter your address." };
  }
  if (!data.purpose) {
    return { valid: false, data, message: "Please select a donation purpose." };
  }

  return { valid: true, data, message: "" };
}
