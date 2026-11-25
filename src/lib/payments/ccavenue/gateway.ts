import type {
  CreatePaymentInput,
  GatewayCallbackBody,
  PaymentGateway,
  PaymentInitiation,
  PaymentStatus,
  PaymentVerificationResult,
} from "@/lib/payments/types";
import { ccavenueDecrypt, ccavenueEncrypt } from "@/lib/payments/ccavenue/crypto";
import { getCCAvenueConfig } from "@/lib/payments/ccavenue/config";

/**
 * CCAvenue gateway — implements the shared `PaymentGateway` contract using
 * CCAvenue's AES-encrypted form-POST checkout ("Billing Page / Non-Seamless").
 */

/** Serialize a flat map into CCAvenue's `key=value&...` form (URL-encoded). */
function toQueryString(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

/** Parse CCAvenue's decrypted `key=value&...` response into a map. */
function parseQueryString(query: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const pair of query.split("&")) {
    if (!pair) continue;
    const idx = pair.indexOf("=");
    const key = idx >= 0 ? pair.slice(0, idx) : pair;
    const value = idx >= 0 ? pair.slice(idx + 1) : "";
    out[decodeURIComponent(key)] = decodeURIComponent(value);
  }
  return out;
}

/** Map CCAvenue's `order_status` vocabulary onto our normalized statuses. */
function mapOrderStatus(orderStatus: string | undefined): PaymentStatus {
  switch ((orderStatus ?? "").trim().toLowerCase()) {
    case "success":
      return "success";
    case "aborted":
      return "aborted";
    case "failure":
      return "failed";
    case "invalid":
      return "invalid";
    default:
      return "pending";
  }
}

export class CCAvenueGateway implements PaymentGateway {
  readonly id = "ccavenue" as const;

  createPayment(input: CreatePaymentInput): PaymentInitiation {
    const config = getCCAvenueConfig();

    const billingName = `${input.customer.firstName} ${input.customer.lastName}`.trim();

    // CCAvenue request parameters. merchant_param1/2 carry app metadata that is
    // echoed back verbatim in the response for reconciliation.
    const params: Record<string, string> = {
      merchant_id: config.merchantId,
      order_id: input.orderId,
      currency: input.currency,
      amount: input.amount.toFixed(2),
      redirect_url: input.redirectUrl,
      cancel_url: input.cancelUrl,
      language: "EN",
      billing_name: billingName,
      billing_email: input.customer.email,
      billing_tel: input.customer.phone,
      merchant_param1: input.frequency,
      merchant_param2: input.customer.pan ?? "",
      merchant_param3: input.customer.purpose ?? "",
    };

    if (input.customer.address) {
      params.billing_address = input.customer.address;
    }

    const encRequest = ccavenueEncrypt(toQueryString(params), config.workingKey);

    return {
      gateway: this.id,
      method: "POST",
      action: config.transactionUrl,
      fields: {
        encRequest,
        access_code: config.accessCode,
      },
    };
  }

  verifyResponse(body: GatewayCallbackBody): PaymentVerificationResult {
    const config = getCCAvenueConfig();
    const encResp = body.encResp ?? body.encresp ?? "";

    if (!encResp) {
      return {
        orderId: body.order_id ?? "",
        status: "invalid",
        message: "Missing encrypted response from gateway.",
        raw: body,
      };
    }

    let data: Record<string, string>;
    try {
      data = parseQueryString(ccavenueDecrypt(encResp, config.workingKey));
    } catch (err) {
      return {
        orderId: body.order_id ?? "",
        status: "invalid",
        message:
          err instanceof Error
            ? `Failed to decrypt gateway response: ${err.message}`
            : "Failed to decrypt gateway response.",
        raw: body,
      };
    }

    const amountRaw = data.amount ?? data.mer_amount;
    const amount = amountRaw ? Number(amountRaw) : undefined;

    return {
      orderId: data.order_id ?? "",
      status: mapOrderStatus(data.order_status),
      amount: Number.isFinite(amount) ? amount : undefined,
      currency: data.currency || undefined,
      trackingId: data.tracking_id || undefined,
      bankRefNo: data.bank_ref_no || undefined,
      paymentMode: data.payment_mode || undefined,
      message: data.status_message || data.failure_message || undefined,
      raw: data,
    };
  }
}
