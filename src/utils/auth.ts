import crypto from "crypto";

/**
 * @see https://developers.gengo.com/v2/authentication/#signing-calls
 */
export type CallSignature = {
  /** Timestamp of the call */
  ts: number;
  /** API Key */
  api_key: string;
  /** HMAC */
  api_sig: string;
};

/**
 * Generates the call signature required for API calls.
 */
export const generateCallSignature = (
  publicKey: string,
  privateKey: string
): CallSignature => {
  const ts = Math.floor(Date.now() / 1_000);
  const hmac = crypto.createHmac("sha1", privateKey).update(ts.toString()).digest("hex");

  return {
    ts,
    api_key: publicKey,
    api_sig: hmac,
  };
};
