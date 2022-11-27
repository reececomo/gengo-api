/**
 * @see https://developers.gengo.com/v2/authentication/#signing-calls
 */
export declare type CallSignature = {
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
export declare const generateCallSignature: (publicKey: string, privateKey: string) => CallSignature;
