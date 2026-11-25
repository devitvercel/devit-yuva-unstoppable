import crypto from "node:crypto";

/**
 * Generate a unique, human-readable donation order id.
 * Format: `YUVA-YYYYMMDDHHmmss-XXXXXX` (UTC timestamp + short random suffix).
 * Example: `YUVA-20260708120500-3F9A2C`
 */
export function generateOrderId(prefix = "YUVA"): string {
  const now = new Date();
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");

  const stamp =
    `${now.getUTCFullYear()}` +
    `${pad(now.getUTCMonth() + 1)}` +
    `${pad(now.getUTCDate())}` +
    `${pad(now.getUTCHours())}` +
    `${pad(now.getUTCMinutes())}` +
    `${pad(now.getUTCSeconds())}`;

  const suffix = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `${prefix}-${stamp}-${suffix}`;
}
