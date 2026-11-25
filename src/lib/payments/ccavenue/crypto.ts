import crypto from "node:crypto";

/**
 * CCAvenue AES encryption helpers.
 * ---------------------------------------------------------------------------
 * CCAvenue's legacy checkout exchanges an AES-128-CBC ciphertext (hex encoded):
 *   - Key: the MD5 digest (16 raw bytes) of the merchant Working Key.
 *   - IV : a fixed 16-byte sequence 0x00..0x0f, mandated by CCAvenue.
 *
 * SERVER-ONLY. The Working Key must never reach the browser, so this module
 * imports node:crypto and must only be used inside route handlers / server code.
 */

/** CCAvenue's fixed initialization vector (bytes 0x00 through 0x0f). */
const CCAVENUE_IV = Buffer.from([
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c,
  0x0d, 0x0e, 0x0f,
]);

/** Derive the 16-byte AES key from the Working Key (MD5 of the raw key). */
function deriveKey(workingKey: string): Buffer {
  return crypto.createHash("md5").update(workingKey, "utf8").digest();
}

/**
 * Encrypt a plaintext payload (typically a `key=value&...` string) for CCAvenue.
 * @returns lowercase hex ciphertext to send as `encRequest`.
 */
export function ccavenueEncrypt(plainText: string, workingKey: string): string {
  const key = deriveKey(workingKey);
  const cipher = crypto.createCipheriv("aes-128-cbc", key, CCAVENUE_IV);
  return cipher.update(plainText, "utf8", "hex") + cipher.final("hex");
}

/**
 * Decrypt an `encResp` hex ciphertext returned by CCAvenue.
 * @returns the decrypted `key=value&...` string.
 */
export function ccavenueDecrypt(encText: string, workingKey: string): string {
  const key = deriveKey(workingKey);
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, CCAVENUE_IV);
  // CCAvenue may pad the hex with trailing nulls/whitespace; normalize first.
  const normalized = encText.trim().replace(/[^0-9a-fA-F]/g, "");
  return decipher.update(normalized, "hex", "utf8") + decipher.final("utf8");
}
