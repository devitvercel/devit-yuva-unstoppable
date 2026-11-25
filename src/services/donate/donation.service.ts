import { createDonationRecord, updateDonationStatus, fetchDonationPurposes } from "@/lib/wordpress";
import type { WPApiResponse } from "@/types/wordpress.types";
import type {
  DonationPurposeOption,
  DonationRecordInput,
  DonationResponse,
  DonationStatusUpdate,
} from "@/types/donate/donation.types";

/**
 * Donation persistence service — never-throw wrappers around the WP helpers.
 * Mirrors the volunteer/newsletter service pattern so callers get a uniform
 * `WPApiResponse` and never need try/catch.
 */

export const saveDonationRecord = async (
  payload: DonationRecordInput
): Promise<WPApiResponse<DonationResponse>> => {
  try {
    return await createDonationRecord(payload);
  } catch (err) {
    console.error("[saveDonationRecord] Unexpected error", err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      status: 500,
    };
  }
};

export const saveDonationStatus = async (
  payload: DonationStatusUpdate
): Promise<WPApiResponse<DonationResponse>> => {
  try {
    return await updateDonationStatus(payload);
  } catch (err) {
    console.error("[saveDonationStatus] Unexpected error", err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      status: 500,
    };
  }
};

/** Purpose dropdown options for the donate form (WP-managed, with fallback). */
export const getDonationPurposes = async (): Promise<
  WPApiResponse<DonationPurposeOption[]>
> => {
  try {
    return await fetchDonationPurposes();
  } catch (err) {
    console.error("[getDonationPurposes] Unexpected error", err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      status: 500,
    };
  }
};
