import request from 'request';
import { promisify } from 'util';

import { generateCallSignature } from './utils/auth';
import { GengoAPIClientError, GengoAPIError, GengoUnexpectedError } from './utils/errors';
import {
  AccountBalanceReponse,
  AccountPreferredTranslatorsResponse,
  AccountStatsResponse,
  Empty,
  GengoAPI,
  GlossaryEntry,
  GlossaryID,
  CommentsResponse,
  JobFeedbackResponse,
  JobID,
  JobResponse,
  JobRevisionResponse,
  JobRevisionsResponse,
  JobsByIdResponse,
  JobsCreateRequest,
  JobsGetResponse,
  JobsListRequest,
  JobsPostResponse,
  JobUpdateRequest,
  LanguageEntry,
  LanguagePairEntry,
  LanguagePairsGetRequest,
  OrderID,
  OrderResponse,
  RevisionID,
  ServiceQuoteResponse,
  GengoResponse,
  AccountMeResponse,
} from './utils/types';

/** Re-export types & errors */
export * from './utils/types';
export * from './utils/errors';
export * from './utils/webhooks';

const promiseRequest = promisify(request);
const REQUEST_TIMEOUT_PERIOD = 300_000; // 5 mins

export enum GengoEnvironment {
  Live = 'https://api.gengo.com/v2/',
  Sandbox = 'http://api.sandbox.gengo.com/v2/'
}

export interface Config {
  publicKey?: string;
  privateKey?: string;
  useSandbox?: boolean;
}

interface Credentials {
  publicKey: string;
  privateKey: string;
  environment: GengoEnvironment;
}

/**
 * 
 * @param config 
 * @returns 
 */
export const initGengoAPI = (config?: Config): GengoAPI => {
  const publicKey = config?.publicKey || process.env.GENGO_PUBLIC_KEY;
  const privateKey = config?.privateKey || process.env.GENGO_PRIVATE_KEY;
  const useSandbox = config?.useSandbox || process.env.GENGO_USE_SANDBOX || false;

  // Check credentials supplied.
  if (publicKey === undefined || privateKey === undefined) {
    throw new Error('Gengo API Client missing public or private key.');
  }

  const creds: Credentials = {
    publicKey,
    privateKey,
    environment: useSandbox ? GengoEnvironment.Sandbox : GengoEnvironment.Live,
  };

  return {
    account: {
      getStats: () => _req('GET', 'account/stats', creds) as Promise<AccountStatsResponse>,
      getMe: () => _req('GET', 'account/me', creds) as Promise<AccountMeResponse>,
      getBalance: () => _req('GET', 'account/balance', creds) as Promise<AccountBalanceReponse>,
      getPreferredTranslators: () => _req('GET', 'account/preferred_translators', creds) as Promise<AccountPreferredTranslatorsResponse>,
    },
    job: {
      getJob: (jobId: JobID) => _req('GET', `translate/job/${jobId}`, creds) as Promise<JobResponse>,
      updateJob: (data: JobUpdateRequest) => _req('PUT', `translate/job/${data.id}`, creds, data) as Promise<Empty>,
      cancelJob: (jobId: JobID) => _req('DELETE', `translate/job/${jobId}`, creds) as Promise<Empty>,
      getJobFeedback: (jobId: JobID) => _req('GET', `translate/job/${jobId}/feedback`, creds) as Promise<JobFeedbackResponse>,
      getJobRevisions: (jobId: JobID) => _req('GET', `translate/job/${jobId}/revisions`, creds) as Promise<JobRevisionsResponse>,
      getJobRevision: (data: { id: JobID, revId: RevisionID }) => _req('GET', `translate/job/${data.id}/revision/${data.revId}`, creds) as Promise<JobRevisionResponse>,
      getJobComments: (jobId: JobID) => _req('GET', `translate/job/${jobId}/comments`, creds) as Promise<CommentsResponse>,
      postJobComment: (data: { id: JobID, body: string }) => _req('POST', `translate/job/${data.id}/`, creds, data) as Promise<Empty>,
    },
    jobs: {
      submitJobs: (data: JobsCreateRequest) => _req('POST', 'translate/jobs', creds, data) as Promise<JobsPostResponse>,
      listJobs: (data?: JobsListRequest) => _req('GET', 'translate/jobs', creds, data) as Promise<JobsGetResponse>,
      getJobsById: (jobOrJobs: JobID | JobID[]) => _req('GET', 'translate/jobs', creds, Array.isArray(jobOrJobs) ? jobOrJobs.join(',') : jobOrJobs) as Promise<JobsByIdResponse>,
    },
    order: {
      getOrderJobs: (orderId: OrderID) => _req('GET', `translate/order/${orderId}`, creds) as Promise<OrderResponse>,
      cancelOrderJobs: (orderId: OrderID) => _req('DELETE', `translate/order/${orderId}`, creds) as Promise<OrderResponse>,
      getOrderComments: (orderId: OrderID) => _req('GET', `translate/order/${orderId}/comments`, creds) as Promise<CommentsResponse>,
      postOrderComment: (data: { id: JobID, body: string }) => _req('POST', `translate/order/${data.id}/`, creds, data) as Promise<Empty>,
    },
    glossary: {
      getGlossaries: () => _req('GET', 'translate/glossary', creds) as Promise<GlossaryEntry[]>,
      getGlossary: (glossaryId: GlossaryID) => _req('GET', `translate/glossary/${glossaryId}`, creds) as Promise<GlossaryEntry>,
    },
    service: {
      getLanguagePairs: (data: LanguagePairsGetRequest) => _req('GET', 'translate/service/language_pairs', creds, data) as Promise<LanguagePairEntry[]>,
      getLanguages: () => _req('GET', 'translate/service/languages', creds) as Promise<LanguageEntry[]>,
      getQuote: (data: JobsCreateRequest) => _req('POST', 'translate/service/quote', creds, data) as Promise<ServiceQuoteResponse>,
    }
  };
};

/**
 * Makes a request to the Gengo API, and unwraps the 'response' key.
 */
const _req = async <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', uri: string, creds: Credentials, data?: unknown): Promise<T> => {
  const isPUTorPOST = method === 'PUT' || method === 'POST';
  const headers = { 'Accept': 'application/json' };
  const callSignature = generateCallSignature(creds.publicKey, creds.privateKey);

  const options = {
    method,
    timeout: REQUEST_TIMEOUT_PERIOD,
    uri: `${creds.environment}${uri}`,
    headers,

    // Request body
    form: isPUTorPOST ? {
      data: JSON.stringify(data),
      ...callSignature,
    } : undefined,

    // Query string
    qs: isPUTorPOST ? undefined : {
      ...(data || {}),
      ...callSignature,
    },
  };

  // Safely unwrap the request.
  return promiseRequest(options)
    // Wrap unexpected failures.
    .catch(err => { throw new GengoUnexpectedError(err) })
    // Unwrap 'response' key, or handle known errors.
    .then(res => {
      let body: GengoResponse<T>

      try {
        body = (res.body === Object(res.body)) ? res.body : JSON.parse(res.body);
      } catch (error) {
        throw new GengoAPIClientError(`Failed to parse Gengo response: ${res.body}`)
      }

      // Check operational status.
      if (body.opstat === 'error') {
        throw new GengoAPIError(body.err.code, body.err.msg);
      } else if (body.opstat === 'ok') {
        return body.response;
      }

      throw new GengoUnexpectedError(`'opstat' responded with unexpected value.'${body || 'undefined'}'`);
    });
};
