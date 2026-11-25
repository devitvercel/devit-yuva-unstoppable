import { CCAvenueGateway } from "@/lib/payments/ccavenue/gateway";
import type { PaymentGateway, PaymentGatewayId } from "@/lib/payments/types";

/**
 * Payment gateway registry + factory.
 * ---------------------------------------------------------------------------
 * Business code calls `getPaymentGateway()` and receives whichever provider is
 * configured via the `PAYMENT_GATEWAY` env var (default: "ccavenue"). Adding a
 * new provider is a two-line change here plus a new implementation file.
 */

export * from "@/lib/payments/types";

/** Lazily-instantiated singletons, keyed by gateway id. */
const registry: Partial<Record<PaymentGatewayId, PaymentGateway>> = {};

function createGateway(id: PaymentGatewayId): PaymentGateway {
  switch (id) {
    case "ccavenue":
      return new CCAvenueGateway();
    default:
      throw new Error(`[payments] Unsupported gateway "${id}".`);
  }
}

/** Resolve the active gateway id from env (defaults to CCAvenue). */
export function getActiveGatewayId(): PaymentGatewayId {
  const raw = process.env.PAYMENT_GATEWAY?.trim().toLowerCase();
  return (raw as PaymentGatewayId) || "ccavenue";
}

/** Get the configured payment gateway implementation (cached per id). */
export function getPaymentGateway(
  id: PaymentGatewayId = getActiveGatewayId()
): PaymentGateway {
  return (registry[id] ??= createGateway(id));
}

/** Default donation currency (major units), overridable via env. */
export function getPaymentCurrency(): string {
  return process.env.PAYMENT_CURRENCY?.trim().toUpperCase() || "INR";
}
