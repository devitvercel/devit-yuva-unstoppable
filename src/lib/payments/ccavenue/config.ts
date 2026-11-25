/**
 * CCAvenue configuration — resolved entirely from server-only env vars.
 * ---------------------------------------------------------------------------
 * Dropping in real credentials is all that's required to go live:
 *
 *   CCAVENUE_MERCHANT_ID   = 1234567
 *   CCAVENUE_ACCESS_CODE   = AVXXXXXXXXXXXX
 *   CCAVENUE_WORKING_KEY   = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   (SECRET)
 *   CCAVENUE_MODE          = test | production                 (default: test)
 *
 * None of these may be prefixed with NEXT_PUBLIC_ — they must stay server-side.
 */

export type CCAvenueMode = "test" | "production";

export interface CCAvenueConfig {
  merchantId: string;
  accessCode: string;
  workingKey: string;
  mode: CCAvenueMode;
  /** Fully-qualified transaction endpoint for the active mode. */
  transactionUrl: string;
}

/** CCAvenue checkout endpoints per environment. */
const TRANSACTION_URLS: Record<CCAvenueMode, string> = {
  test: "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
  production:
    "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
};

function resolveMode(raw: string | undefined): CCAvenueMode {
  return raw?.trim().toLowerCase() === "production" ? "production" : "test";
}

/**
 * Read + validate CCAvenue config from the environment.
 * @throws if any required credential is missing (fail fast in API routes).
 */
export function getCCAvenueConfig(): CCAvenueConfig {
  const merchantId = process.env.CCAVENUE_MERCHANT_ID?.trim() ?? "";
  const accessCode = process.env.CCAVENUE_ACCESS_CODE?.trim() ?? "";
  const workingKey = process.env.CCAVENUE_WORKING_KEY?.trim() ?? "";
  const mode = resolveMode(process.env.CCAVENUE_MODE);

  const missing: string[] = [];
  if (!merchantId) missing.push("CCAVENUE_MERCHANT_ID");
  if (!accessCode) missing.push("CCAVENUE_ACCESS_CODE");
  if (!workingKey) missing.push("CCAVENUE_WORKING_KEY");

  if (missing.length > 0) {
    throw new Error(
      `[ccavenue] Missing required env var(s): ${missing.join(", ")}. ` +
        `Add them to your environment to enable payments.`
    );
  }

  return {
    merchantId,
    accessCode,
    workingKey,
    mode,
    transactionUrl: TRANSACTION_URLS[mode],
  };
}

/** True when all CCAvenue credentials are present (non-throwing check). */
export function isCCAvenueConfigured(): boolean {
  return Boolean(
    process.env.CCAVENUE_MERCHANT_ID?.trim() &&
      process.env.CCAVENUE_ACCESS_CODE?.trim() &&
      process.env.CCAVENUE_WORKING_KEY?.trim()
  );
}
