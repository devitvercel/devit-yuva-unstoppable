/**
 * Newsletter subscription types + lightweight email validation.
 * ---------------------------------------------------------------------------
 * Yuva does not ship `zod`, so validation is a small inline helper. The
 * WordPress backend (newsletter-subscribe.php) is the authoritative validator;
 * this is just a fast client-side gate to avoid obviously bad requests.
 */

/** The uniform envelope returned by the WP `yuva/v1/newsletter` route. */
export interface NewsletterResponse {
  success?: boolean;
  /** Stable machine code: "subscribed" | "already_subscribed" | "invalid_email" | ... */
  code?: string;
  message?: string;
}

export interface NewsletterValidation {
  valid: boolean;
  email: string;
  message: string;
}

// Pragmatic email check — mirrors the strictness of the WP `is_email()` gate
// closely enough for a UX pre-check; the server has the final say.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim + validate an email. Returns the cleaned value and a displayable message on failure. */
export function validateNewsletterEmail(raw: unknown): NewsletterValidation {
  const email = typeof raw === "string" ? raw.trim() : "";
  if (email.length === 0) {
    return { valid: false, email, message: "Email is required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { valid: false, email, message: "Please enter a valid email address." };
  }
  return { valid: true, email, message: "" };
}
