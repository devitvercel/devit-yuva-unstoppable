import { WP_CONFIG } from "@/config/wordpress.config";
import { wpFetch } from "@/lib/wordpress/wpFetch";
import type { WPApiResponse } from "@/types/wordpress.types";
import type { ContactPayload, ContactResponse } from "@/types/contact/contact.types";

/**
 * Contact form submission helper
 * ---------------------------------------------------------------------------
 * POSTs a contact enquiry to the custom `yuva/v1/contact` route and returns the
 * standard `WPApiResponse` envelope, mirroring `subscribeToNewsletter`. This is a
 * mutation, so — unlike the page/media fetchers — it is NOT wrapped in
 * `React.cache` and uses `cache: "no-store"`.
 *
 * Like the rest of the WordPress layer it never throws: failures come back as an
 * envelope with a non-200 `status` and a human-readable `error`.
 */
export const submitContactForm = async (
  payload: ContactPayload
): Promise<WPApiResponse<ContactResponse>> => {
  const url = WP_CONFIG.endpoints.contact;

  console.log(`[submitContactForm] POST ${url} (type=${payload.type})`);

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

    // The plugin returns the same JSON envelope on success and error; read it
    // once and reuse for either branch (tolerate an empty / non-JSON body).
    const body = (await res.json().catch(() => null)) as ContactResponse | null;

    if (!res.ok) {
      return {
        data: null,
        error: body?.message ?? `Contact API returned ${res.status}`,
        status: res.status,
      };
    }

    return { data: body ?? {}, error: null, status: 200 };
  } catch (err) {
    console.error(`[submitContactForm] Failed for type="${payload.type}"`, err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown fetch error",
      status: 500,
    };
  }
};
