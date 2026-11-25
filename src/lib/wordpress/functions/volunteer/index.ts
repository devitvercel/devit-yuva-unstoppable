import { WP_CONFIG } from "@/config/wordpress.config";
import { wpFetch } from "@/lib/wordpress/wpFetch";
import type { WPApiResponse } from "@/types/wordpress.types";
import type {
  VolunteerApplicationPayload,
  VolunteerApplicationResponse,
} from "@/types/volunteer/volunteerApplication.types";

/**
 * Volunteer application submission helper.
 * POSTs to the custom `yuva/v1/volunteer` route and returns the standard envelope.
 */
export const submitVolunteerApplication = async (
  payload: VolunteerApplicationPayload
): Promise<WPApiResponse<VolunteerApplicationResponse>> => {
  const url = WP_CONFIG.endpoints.volunteer;

  console.log(`[submitVolunteerApplication] POST ${url}`);

  try {
    const res = await wpFetch(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = (await res.json().catch(() => null)) as VolunteerApplicationResponse | null;

    if (!res.ok) {
      return {
        data: null,
        error: body?.message ?? `Volunteer API returned ${res.status}`,
        status: res.status,
      };
    }

    return { data: body ?? {}, error: null, status: 200 };
  } catch (err) {
    console.error("[submitVolunteerApplication] Failed", err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown fetch error",
      status: 500,
    };
  }
};
