import { WP_CONFIG } from "@/config/wordpress.config";
import { wpFetch } from "@/lib/wordpress/wpFetch";
import type { WPApiResponse } from "@/types/wordpress.types";
import type {
  DonationPurposeOption,
  DonationPurposesResponse,
  DonationRecordInput,
  DonationResponse,
  DonationStatusUpdate,
} from "@/types/donate/donation.types";
import { DONATION_PURPOSES } from "@/types/donate/donation.types";

/**
 * Donation persistence helpers (server-to-server).
 * ---------------------------------------------------------------------------
 * These call the secret-gated `yuva/v1/donation` routes and must only run on the
 * server (they read `WP_DONATION_SECRET`). Never import from client components.
 */

/** Shared secret sent to WordPress to authorize donation writes. */
function donationSecretHeader(): Record<string, string> {
  const secret = process.env.WP_DONATION_SECRET?.trim();
  return secret ? { "X-Yuva-Donation-Secret": secret } : {};
}

async function postDonation<T extends DonationResponse>(
  url: string,
  payload: unknown,
  label: string
): Promise<WPApiResponse<T>> {
  try {
    const res = await wpFetch(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...donationSecretHeader(),
      },
      body: JSON.stringify(payload),
    });

    const body = (await res.json().catch(() => null)) as T | null;

    if (!res.ok) {
      return {
        data: null,
        error: body?.message ?? `${label} returned ${res.status}`,
        status: res.status,
      };
    }

    return { data: body ?? ({} as T), error: null, status: res.status };
  } catch (err) {
    console.error(`[${label}] Failed`, err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown fetch error",
      status: 500,
    };
  }
}

/** Create a pending donation record in WordPress. */
export const createDonationRecord = (
  payload: DonationRecordInput
): Promise<WPApiResponse<DonationResponse>> => {
  const url = WP_CONFIG.endpoints.donation;
  console.log(`[createDonationRecord] POST ${url} order=${payload.orderId}`);
  return postDonation(url, payload, "createDonationRecord");
};

/** Update a donation record with the verified gateway result. */
export const updateDonationStatus = (
  payload: DonationStatusUpdate
): Promise<WPApiResponse<DonationResponse>> => {
  const url = WP_CONFIG.endpoints.donationUpdate;
  console.log(
    `[updateDonationStatus] POST ${url} order=${payload.orderId} status=${payload.status}`
  );
  return postDonation(url, payload, "updateDonationStatus");
};

/** Fallback list shaped like the WP response when the CMS is unreachable. */
function fallbackPurposeOptions(): DonationPurposeOption[] {
  return DONATION_PURPOSES.map((label) => ({
    id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    label,
  }));
}

/** Fetch Purpose dropdown options from WordPress (public GET). */
export async function fetchDonationPurposes(): Promise<
  WPApiResponse<DonationPurposeOption[]>
> {
  const url = WP_CONFIG.endpoints.donationPurposes;
  try {
    const res = await wpFetch(url, {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const body = (await res.json().catch(() => null)) as DonationPurposesResponse | null;

    if (!res.ok) {
      console.warn(`[fetchDonationPurposes] WP returned ${res.status}; using fallback`);
      return { data: fallbackPurposeOptions(), error: null, status: 200 };
    }

    const purposes = Array.isArray(body?.purposes)
      ? body!.purposes!
          .map((p) => ({
            id: typeof p?.id === "string" ? p.id : "",
            label: typeof p?.label === "string" ? p.label.trim() : "",
          }))
          .filter((p) => p.label)
      : [];

    if (purposes.length === 0) {
      return { data: fallbackPurposeOptions(), error: null, status: 200 };
    }

    return { data: purposes, error: null, status: res.status };
  } catch (err) {
    console.error("[fetchDonationPurposes] Failed", err);
    return { data: fallbackPurposeOptions(), error: null, status: 200 };
  }
}
