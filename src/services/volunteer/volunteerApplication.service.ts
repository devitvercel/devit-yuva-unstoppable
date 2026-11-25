import { submitVolunteerApplication } from "@/lib/wordpress";
import type { WPApiResponse } from "@/types/wordpress.types";
import type {
  VolunteerApplicationPayload,
  VolunteerApplicationResponse,
} from "@/types/volunteer/volunteerApplication.types";

/**
 * Submit a volunteer application. Wraps the WP helper in the same never-throw
 * envelope contract used by contact and newsletter.
 */
export const submitVolunteerApplicationEnquiry = async (
  payload: VolunteerApplicationPayload
): Promise<WPApiResponse<VolunteerApplicationResponse>> => {
  try {
    return await submitVolunteerApplication(payload);
  } catch (err) {
    console.error("[submitVolunteerApplicationEnquiry] Unexpected error", err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      status: 500,
    };
  }
};
