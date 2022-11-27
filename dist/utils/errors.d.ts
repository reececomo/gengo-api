/**
 * Wraps any error thrown due to an unexpected client issue.
 */
export declare class GengoAPIClientError extends Error {
}
/**
 * Wraps any error thrown from the API itself as a 200 code.
 */
export declare class GengoUnexpectedError extends Error {
}
/**
 * Wraps any error thrown for opstat='error'.
 */
export declare class GengoAPIError extends Error {
    underlyingCode: number;
    underlyingMessage: string;
    constructor(code: number, msg: string);
}
