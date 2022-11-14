/**
 * Wraps any error thrown due to an unexpected client issue.
 */
export class GengoAPIClientError extends Error {}

/**
 * Wraps any error thrown from the API itself as a 200 code.
 */
export class GengoUnexpectedError extends Error {}

/**
 * Wraps any error thrown for opstat='error'.
 */
export class GengoAPIError extends Error {
  underlyingCode: number;
  underlyingMessage: string;

  constructor(code: number, msg: string) {
    super(`Gengo API responded with an error. Code: ${code}, Message: ${msg}`);

    this.underlyingCode = code;
    this.underlyingMessage = msg;
  }
}
