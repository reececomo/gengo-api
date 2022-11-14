/**
 * 🎉 Gengo API (V2) interface.
 */
export interface GengoAPI {
  /**
   * Account methods
   *
   * Endpoints that deal with Account information on Gengo API.
   */
  account: {
    /**
     * Retrieves account stats, such as orders made.
     * @see https://developers.gengo.com/v2/api_methods/account/#stats-get
     */
    getStats: () => Promise<AccountStatsResponse>;

    /**
     * Retrieves account information, such as email.
     * @see https://developers.gengo.com/v2/api_methods/account/#me-get
     */
    getMe: () => Promise<AccountMeResponse>;

    /**
     * Retrieves account balance in credits.
     * @see https://developers.gengo.com/v2/api_methods/account/#balance-get
     */
    getBalance: () => Promise<AccountBalanceReponse>;

    /**
     * Retrieves preferred translators set by user.
     * @see https://developers.gengo.com/v2/api_methods/account/#preferred-translators-get
     */
    getPreferredTranslators: () => Promise<AccountPreferredTranslatorsResponse>;
  };

  /**
   * Job Methods
   *
   * Endpoints that deal with singular Job tasks and information on Gengo API.
   */
  job: {
    /**
     * Retrieves a specific job.
     * @see https://developers.gengo.com/v2/api_methods/job/#job-get
     */
    getJob: (jobId: JobID) => Promise<JobResponse>;

    /**
     * Updates a job to translate.
     * Request should be no larger than 100MB.
     * Comments should not exceed more than 25,000 characters.
     * @see https://developers.gengo.com/v2/api_methods/job/#job-put
     */
    updateJob: (request: JobUpdateRequest) => Promise<Empty>;

    /**
     * Cancels the job. You can only cancel a job if it has not been started already by a translator.
     * @see https://developers.gengo.com/v2/api_methods/job/#job-delete
     */
    cancelJob: (jobId: JobID) => Promise<Empty>;

    /**
     * Gets list of revision resources for a job.
     * Revisions are created each time a translator or Senior Translator updates the text.
     * @see https://developers.gengo.com/v2/api_methods/job/#revisions-get
     */
    getJobRevisions: (jobId: JobID) => Promise<JobRevisionsResponse>;

    /**
     * Gets a specific revision for a job.
     * @see https://developers.gengo.com/v2/api_methods/job/#revision-get
     */
    getJobRevision: (data: {
      id: JobID;
      revId: RevisionID;
    }) => Promise<JobRevisionResponse>;

    /**
     * Retrieves the feedback you have submitted for a particular job.
     * @see https://developers.gengo.com/v2/api_methods/job/#feedback-get
     */
    getJobFeedback: (jobId: JobID) => Promise<JobFeedbackResponse>;

    /**
     * Retrieves the comment thread for a job.
     * @see https://developers.gengo.com/v2/api_methods/job/#comments-get
     */
    getJobComments: (jobId: JobID) => Promise<CommentsResponse>;

    /**
     * Submits a new comment to the job’s comment thread.
     * @see https://developers.gengo.com/v2/api_methods/job/#comment-post
     */
    postJobComment: (data: { id: JobID; body: string }) => Promise<Empty>;
  };

  /**
   * Jobs methods
   *
   * Endpoints that deal with Jobs on the Gengo API.
   */
  jobs: {
    /**
     * Submits a job or group of jobs to translate.
     * If all jobs which are placed in one order have same language pair and level then those jobs will be grouped.
     * @see https://developers.gengo.com/v2/api_methods/jobs/#jobs-post
     */
    submitJobs: (jobsRequest: JobsCreateRequest) => Promise<JobsPostResponse>;

    /**
     * Retrieves a list of resources for the most recent jobs filtered by the given parameters.
     *
     * Note:
     * - If you only use count, you’ll get the most recent count jobs
     * - If you use count with timestamp_after, you’ll get count jobs submitted since timestamp_after
     * - If you only use timestamp_after, you’ll get all jobs submitted since timestamp_after
     *
     * @see https://developers.gengo.com/v2/api_methods/jobs/#jobs-get
     */
    listJobs: (data?: JobsListRequest) => Promise<JobsGetResponse>;

    /**
     * Retrieves a list of jobs. They are requested by a comma-separated list of job ids.
     * @see https://developers.gengo.com/v2/api_methods/jobs/#jobs-by-id-get
     */
    getJobsById: (jobs: JobID | JobID[]) => Promise<JobsByIdResponse>;
  };

  /**
   * Order methods
   *
   * Endpoints that deal with Order on the Gengo API.
   */
  order: {
    /**
     * Retrieves a group of jobs that were previously submitted together by their order id.
     * @see https://developers.gengo.com/v2/api_methods/order/#order-get
     */
    getOrderJobs: (orderId: OrderID) => Promise<OrderResponse>;

    /**
     * Cancels all available jobs in an order.
     * Please keep in mind that this will not cancel jobs that are in another status (e.g. pending, reviewable, etc.).
     * @see https://developers.gengo.com/v2/api_methods/order/#order-delete
     */
    cancelOrderJobs: (orderId: OrderID) => Promise<OrderResponse>;

    /**
     * Retrieves the comment thread for an order.
     * @see https://developers.gengo.com/v2/api_methods/order/#comments-get
     */
    getOrderComments: (orderId: OrderID) => Promise<CommentsResponse>;

    /**
     * Submits a new comment to the order's comment thread.
     * @see https://developers.gengo.com/v2/api_methods/order/#comment-post
     */
    postOrderComment: (data: { id: JobID; body: string }) => Promise<Empty>;
  };

  /**
   * Glossary methods
   *
   * Endpoints that deal with Glossaries on the Gengo API.
   */
  glossary: {
    /**
     * Retrieves a list of glossaries that belongs to the authenticated user.
     * @see https://developers.gengo.com/v2/api_methods/glossary/#glossaries-get
     */
    getGlossaries: () => Promise<GlossaryEntry[]>;

    /**
     * Retrieves a glossary by ID.
     * @see https://developers.gengo.com/v2/api_methods/glossary/#glossary-get
     */
    getGlossary: (glossaryId: GlossaryID) => Promise<GlossaryEntry>;
  };

  /**
   * Service methods
   *
   * Endpoints that deal with Service on the Gengo API.
   */
  service: {
    /**
     * Returns supported translation language pairs, tiers, and credit prices.
     * @see https://developers.gengo.com/v2/api_methods/service/#language-pairs-get
     */
    getLanguagePairs: (
      data: LanguagePairsGetRequest
    ) => Promise<LanguagePairEntry[]>;

    /**
     * Returns a list of supported languages and their language codes.
     * @see https://developers.gengo.com/v2/api_methods/service/#languages-get
     */
    getLanguages: () => Promise<LanguageEntry[]>;

    /**
     * Returns credit quote and unit count for text based on content, tier, and language pair for job or jobs submitted.
     * @see https://developers.gengo.com/v2/api_methods/service/#quote-post
     */
    getQuote: (data: JobsCreateRequest) => Promise<ServiceQuoteResponse>;
  };
}

//
// -- Underlying types for https://developers.gengo.com/v2/api_methods --
//

// Utility only
export type Empty = unknown;

// Confirmed
export type JobID = number;
export type RevisionID = number;
export type OrderID = number;
export type GlossaryID = number;
export type GengoJobServices = "translation" | "edit";
export type GengoJobStatus =
  | "available"
  | "pending"
  | "reviewable"
  | "approved"
  | "rejected"
  | "canceled"
  | "hold"
  | "queued"
  | "revising";
export type GengoTier = "standard" | "pro";
export type GengoLanguageUnit = "word" | "character";
export type GengoBoolean = 0 | 1;
export type GengoCustomData = JSON;
export type GengoJobType = "text" | "file";
export type GengoLanguageCode =
  | "ar"
  | "bg"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "en"
  | "en-gb"
  | "es"
  | "es-la"
  | "fi"
  | "fr"
  | "fr-ca"
  | "he"
  | "hu"
  | "id"
  | "it"
  | "ja"
  | "ko"
  | "ms"
  | "nl"
  | "no"
  | "pl"
  | "pt"
  | "pt-br"
  | "ro"
  | "ru"
  | "sk"
  | "sr"
  | "sv"
  | "th"
  | "tl"
  | "tr"
  | "uk"
  | "vi"
  | "zh"
  | "zh-hk"
  | "zh-tw";
export type GengoBillingType = "Pre-pay" | string; // TODO: Check if this is incomplete.
export type GengoCustomerType = "Retail" | string; // TODO: Check if this is incomplete.
export type GengoCurrency = "USD" | string; // TODO: Check if this is incomplete.
export type GengoCredits = string;

//
// -- Objects --
//

export type GengoResponse<T> =
  | {
      opstat: "error";
      err: {
        code: number;
        msg: string;
      };
    }
  | {
      opstat: "ok";
      response: T;
    };

export type GengoJobSubmission = {
  /**
   * Job type. Either ‘text’ (default) or ‘file’.
   * Use ‘file’ for ordering file jobs via the API using job identifiers from the file quote function
   */
  type: GengoJobType;

  /** Job title. For internally storing, can be generic */
  slug: string;

  /** Original body of text (to be translated) */
  body_src: string;

  /** Source language code */
  lc_src: GengoLanguageCode;

  /** Target language code */
  lc_tgt: GengoLanguageCode;

  /** Quality level (“standard” or “pro”) */
  tier: GengoTier;

  /**
   * Instructions or comments for translator to consider when translating. It is strongly encouraged to provide a detailed comment for the translator.
   */
  comment?: string;

  /**
   * Links to an external file providing extra context to a job.
   */
  attachments?: Array<{
    /**
     * Link to an external file providing extra context to a job. Only accepts public URLs with http(s) scheme.
     */
    url: string;

    /**
     * The name of the external file to be attached ex| ‘image.jpg’/’video.mp4’/’audio.mpeg’/...
     */
    filename: string;

    /**
     * The following mime types will display a preview to the translator: image/bmp|jpg|jpeg|png|gif, video/mp4, audio/mpeg.
     * Other mime types will display a download link to the translator.
     */
    mime_type: string;
  }>;

  /**
   * REQUIRED IF type = 'file'
   * The identifier returned as a response from the file quote method (e.g. identifier = ‘2ea3a2dbea3be97375ceaf03200fb184’)
   */
  identifier?: string;

  /**
   * Whether to automatically approve jobs after they’ve been translated. Default is false.
   * If false, completed jobs will await review and approval by customer for 72 hours
   */
  auto_approve?: GengoBoolean;

  /** The full URL to which we will send system updates (completed jobs, new comments, etc.) */
  callback_url?: string;

  /**
   * The position of the job in a group of jobs. Starts at 1. When the job group is displayed to translators, this ensures that ordering is maintained.
   */
  position?: number;

  /** Id of the glossary that you want to use */
  glossary_id?: number;

  /**
   * The full URL to which we will send system updates (completed jobs, new comments, etc.)
   */
  custom_data?: GengoCustomData;

  /**
   * Whether or not to override duplicate detection and force a new translation. (always returns a fresh translation, even if the term has been translated before)
   */
  force?: GengoBoolean;

  /** Whether to use translators from the preferred translators list associated with the account */
  use_preferred?: GengoBoolean;

  /** Plus service. To place a translation order with extra quality assurance ex| ‘services’: [‘translation’, ‘edit’] */
  services?: GengoJobServices[];

  /** Describing the purpose of the translation ex| “Personal use/Business/Online content/Web or app localization/Other... */
  purpose?: string;

  /** Describing the tone for the translation ex| “Informal/Friendly/Business/Formal/Other... */
  tone?: string;

  /**
   * If as_group is set to 0 each job can be picked up by a different translator. Default: 1
   */
  as_group?: GengoBoolean;

  /** Expresses character limit of translation. Should always be greater than 0 */
  max_chars?: number;
};

export type GengoTranslator = {
  last_login: number;
  id: number;
};

export type GengoPreferredTranslator = {
  lc_tgt: GengoLanguageCode;
  lc_src: GengoLanguageCode;
  tier: GengoTier;
  translators: GengoTranslator[];
};

export type GlossaryEntry = {
  id: number;
  customer_user_id: number;
  source_language_id: number;
  target_languages: unknown[];
  is_public: boolean;
  unit_count: number;
  description: string | null;
  source_language_code: string;
  ctime: string;
  title: string;
  status: number;
};

export type FileJobResponseFields = {
  file_url_src: string;
  file_url_tgt: string;
};

export type TextJobResponseFields = {
  body_src: string;
  body_tgt: string;
};

export type GenericJobResponseFields = {
  job_id: JobID;
  credits: GengoCredits;
  auto_approve: GengoBoolean;
  /** In seconds */
  eta: number;
  file_download_ready: boolean;
  order_id: OrderID;
  lc_tgt: GengoLanguageCode;
  unit_count: number;
  lc_src: GengoLanguageCode;
  slug: string;
  callback_url: string;
  currency: GengoCurrency;
  tier: GengoTier;
  ctime: number;
  status: GengoJobStatus;
};

export type JobResponseFields = GenericJobResponseFields &
  (FileJobResponseFields | TextJobResponseFields);

export type Order = {
  jobs_queued: number;
  jobs_reviewable: JobID[];
  jobs_available: JobID[];
  jobs_pending: JobID[];
  jobs_approved: JobID[];
  jobs_revising: JobID[];
  jobs_cancelled: JobID[];
  jobs_held: JobID[];
  order_id: OrderID;
  total_credits: GengoCredits;
  total_units: number;
  total_jobs: number;
  currency: GengoCurrency;
};

export type LanguagePairEntry = {
  unit_price: number;
  lc_tgt: GengoLanguageCode;
  lc_src: GengoLanguageCode;
  tier: GengoTier;
  currency: GengoCurrency;
};

export type LanguageEntry = {
  unit_type: GengoLanguageUnit;
  lc: GengoLanguageCode;
  localized_name: string;
  /** For debugging purposes. */
  language: string;
};

export type JobQuoteEntry = {
  type: GengoJobType;
  custom_data: GengoCustomData;
  credits: number;
  eta: number;
  unit_count: string;
  lc_src_detected: GengoLanguageCode;
  currency: GengoCurrency;
};

//
// -- Requests --
//

export type JobUpdateRequest =
  | {
      id: JobID;
      action: "revise";
      comment: string;
    }
  | {
      id: JobID;
      action: "approve";
      /** 1 (poor) to 5 (fantastic) */
      rating?: 1 | 2 | 3 | 4 | 5 | undefined;
      /** Comments for the translator */
      for_translator?: string | undefined;
      /** Comments for Gengo staff */
      for_mygengo?: string | undefined;
      /** Whether Gengo can share this feedback publicly, including the source and target text */
      public?: 0 | 1 | undefined;
    }
  | {
      id: JobID;
      action: "reject";
      reason: "quality" | "incomplete" | "other";
      comment: string;
      /**
       * “requeue” (default) or “cancel” - If you choose “requeue” the job will be rejected
       * and then passed onto another translator. If you choose “cancel” the job will be completely
       * cancelled upon rejection.
       */
      follow_up: "requeue" | "cancel";
    };

export type JobsCreateRequest = {
  /** Instructions for translators on the entire order go here. */
  comment?: string;
  /** An array of Job Payloads. */
  jobs: GengoJobSubmission[];
};

export type JobsListRequest = {
  status?: GengoJobStatus;
  timestamp_after?: number;
  /** Defaults to 10 (maximum 200) */
  count?: number;
};

export type LanguagePairsGetRequest = {
  lc_src?: GengoLanguageCode;
};

//
// -- Responses --
//

/**
 * https://developers.gengo.com/v2/api_methods/account/#stats-get
 */
export type AccountStatsResponse = {
  credits_spent: number;
  user_since: number;
  currency: GengoCurrency;
  billing_type: GengoBillingType;
  customer_type: GengoCustomerType;
};

/**
 * https://developers.gengo.com/v2/api_methods/account/#me-get
 */
export type AccountMeResponse = {
  email: string;
  full_name: string;
  display_name: string;
  language_code: GengoLanguageCode;
};

/**
 * https://developers.gengo.com/v2/api_methods/account/#balance-get
 */
export type AccountBalanceReponse = {
  credits: number;
  currency: GengoCurrency;
};

/**
 * https://developers.gengo.com/v2/api_methods/account/#preferred-translators-get
 */
export type AccountPreferredTranslatorsResponse = GengoPreferredTranslator[];

/**
 * https://developers.gengo.com/v2/api_methods/job/#job-get
 */
export type JobResponse = {
  job: JobResponseFields;
};

/**
 * https://developers.gengo.com/v2/api_methods/job/#feedback-get
 */
export type JobFeedbackResponse = {
  feedback:
    | undefined
    | {
        for_translator: string;
        rating: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // Check if this goes to 5 or 10?
      };
};

/**
 * https://developers.gengo.com/v2/api_methods/job/#revisions-get
 */
export type JobRevisionsResponse = {
  job_id: JobID;
  revisions: Array<{
    rev_id: RevisionID;
    ctime: string;
  }>;
};

/**
 * https://developers.gengo.com/v2/api_methods/job/#revision-get
 */
export type JobRevisionResponse = {
  revision: {
    body_tgt: string;
    ctime: string;
  };
};

/**
 * https://developers.gengo.com/v2/api_methods/job/#comments-get
 */
export type CommentsResponse = {
  thread: Array<{
    body: string;
    author: "translator" | string;
    ctime: number;
  }>;
};

/**
 * https://developers.gengo.com/v2/api_methods/jobs/#jobs-post
 */
export type JobsPostResponse = {
  job_count: number;
  order_id: OrderID;
  credits_used: string;
  currency: GengoCurrency;

  /**
   * If there are any jobs inside a payload that are repeats of any other jobs in the same payload, the response will return the same translated text of the previous jobs that were sent.
   */
  jobs?: Array<{
    job_id: JobID;
    order_id: OrderID;
    slug: string;
    body_src: string;
    body_tgt: string;
    lc_src: GengoLanguageCode;
    lc_tgt: GengoLanguageCode;
    unit_count: string;
    tier: GengoTier;
    credits: number;
    status: GengoJobStatus;
    eta: number;
    callback_url?: string;
    auto_approve: GengoBoolean;
    ctime: number;
    custom_data: GengoCustomData;
    file_download_ready: boolean;

    currency: GengoCurrency;
    services: GengoJobServices[];
  }>;
};

/**
 * https://developers.gengo.com/v2/api_methods/jobs/#jobs-get
 */
export type JobsGetResponse = Array<{
  job_id: JobID;
  ctime: number;
}>;

/**
 * https://developers.gengo.com/v2/api_methods/jobs/#jobs-by-id-get
 */
export type JobsByIdResponse = {
  jobs: JobResponseFields[];
};

/**
 * https://developers.gengo.com/v2/api_methods/order/#order-get
 */
export type OrderResponse = {
  order: Order;
};

/**
 * https://developers.gengo.com/v2/api_methods/service/#quote-post
 */
export type ServiceQuoteResponse = {
  jobs: JobQuoteEntry[];
};
