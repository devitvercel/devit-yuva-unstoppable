/** Volunteer type preference from the application form. */
export type VolunteerPreference = "students" | "community" | "operational";

/** Payload posted to /api/volunteer (forwarded to WP). */
export interface VolunteerApplicationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  preference: VolunteerPreference;
  availabilities: string[];
  skills: string;
  whyVolunteer: string;
  contribution: string;
}

/** Uniform envelope from WP `yuva/v1/volunteer`. */
export interface VolunteerApplicationResponse {
  success?: boolean;
  code?: string;
  message?: string;
}

export interface VolunteerApplicationValidation {
  valid: boolean;
  data: VolunteerApplicationPayload;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,15}$/;
const PREFERENCES = new Set<VolunteerPreference>(["students", "community", "operational"]);

export function normalizeVolunteerPreference(raw: unknown): VolunteerPreference {
  const value = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  return PREFERENCES.has(value as VolunteerPreference)
    ? (value as VolunteerPreference)
    : "students";
}

function normalizeAvailabilities(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Trim + validate a volunteer application before POST. */
export function validateVolunteerApplication(raw: unknown): VolunteerApplicationValidation {
  const obj = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  const data: VolunteerApplicationPayload = {
    firstName: typeof obj.firstName === "string" ? obj.firstName.trim() : "",
    lastName: typeof obj.lastName === "string" ? obj.lastName.trim() : "",
    email: typeof obj.email === "string" ? obj.email.trim() : "",
    phone: typeof obj.phone === "string" ? obj.phone.trim() : "",
    city: typeof obj.city === "string" ? obj.city.trim() : "",
    preference: normalizeVolunteerPreference(obj.preference),
    availabilities: normalizeAvailabilities(obj.availabilities),
    skills: typeof obj.skills === "string" ? obj.skills.trim() : "",
    whyVolunteer: typeof obj.whyVolunteer === "string" ? obj.whyVolunteer.trim() : "",
    contribution: typeof obj.contribution === "string" ? obj.contribution.trim() : "",
  };

  if (!data.firstName) {
    return { valid: false, data, message: "Please enter your first name." };
  }
  if (!data.lastName) {
    return { valid: false, data, message: "Please enter your last name." };
  }
  if (!data.email) {
    return { valid: false, data, message: "Email is required." };
  }
  if (!EMAIL_RE.test(data.email)) {
    return { valid: false, data, message: "Please enter a valid email address." };
  }
  if (data.phone && !PHONE_RE.test(data.phone)) {
    return { valid: false, data, message: "Please enter a valid phone number." };
  }
  if (!data.skills) {
    return { valid: false, data, message: "Please describe your skills or profession." };
  }
  if (!data.whyVolunteer) {
    return { valid: false, data, message: "Please tell us why you want to volunteer." };
  }
  if (!data.contribution) {
    return {
      valid: false,
      data,
      message: "Please describe how you'd like to contribute.",
    };
  }

  return { valid: true, data, message: "" };
}
