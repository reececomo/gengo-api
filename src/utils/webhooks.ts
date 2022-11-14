import {
  GengoTier,
  GengoJobStatus,
  GengoLanguageCode,
  GengoLanguageUnit,
} from "./types";

/**
 * Webhook event: Callback notification sent when:
 * - A job has been made available to our translators
 * - A job has been started by one of our translators
 * - A job is ready for review
 * - A job has been approved automatically
 * - A job is manually approved via our Gengo Dashboard customer interface
 *
 * Received as serialized string under the 'job' key.
 *
 * ```
 * const job = JSON.parse(body['job']) as GengoJobWebhookPayload
 * ```
 *
 * @see https://developers.gengo.com/v2/callback_urls/
 */
export type GengoJobWebhookPayload = {
  /** Gengo Job ID */
  job_id: string;

  /** Gengo Order ID */
  order_id: string;

  /** Source language */
  lc_src: GengoLanguageCode;

  /** Target language */
  lc_tgt: GengoLanguageCode;

  /** Source text */
  body_src: string;

  /** Received translation text (available in 'reviewable' and beyond) */
  body_tgt?: string;

  /** Translation status */
  status: GengoJobStatus;

  /** Whether the source language uses 'word' or 'character' to count units */
  unit_type: GengoLanguageUnit;

  /** Number of billable units counted */
  unit_count: string;

  /** Selected pricing tier */
  tier: GengoTier;

  /** Cost of translation */
  credits: string;

  /** Estimated time of arrival. Will be -1 if none. */
  eta: number;

  /** String of the Unix Timestamp for when this job was submitted */
  ctime: number;

  /** Whether the job is auto-approved or not */
  auto_approve: "0" | "1";

  /** Custom callback URL to be triggered for webhook updates */
  callback_url?: string;

  /** Job preview URL - this will be relative URL when status is 'available' */
  preview_url?: string;

  /** Used when status is 'reviewable', and to be used when updating job with 'reject' action */
  captcha_url?: string;
};

/**
 * Webhook event: A job has received a comment by a translator
 *
 * Received as serialized string under the 'comment' key.
 *
 * ```
 * const comment = JSON.parse(body['comment']) as GengoCommentWebhookPayload
 * ```
 *
 * @see https://developers.gengo.com/v2/callback_urls/
 */
export type GengoCommentWebhookPayload = {
  /** String of the Job ID for which comment applies */
  job_id: string;

  /** String of the comment body */
  body: string;

  /** Author of the comment */
  author: "translator";

  /** String of the Unix Timestamp for when this comment was submitted */
  ctime: string;

  /** String of the custom data associated with the job (if any) */
  custom_data?: string;

  /** String of the full URL of the target file */
  file_url_tgt?: string;
};
