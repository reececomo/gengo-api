# Gengo API

A TypeScript [Gengo API v2](http://developers.gengo.com/v2/api_methods/) client with promises.


### Getting started

```typescript
const gengo = initGengoAPI({
  publicKey: 'YOUR_GENGO_PUBLIC_KEY',
  privateKey: 'YOUR_GENGO_PRIVATE_KEY',
  useSandbox: true,
})

// Or using default env vars: GENGO_PUBLIC_KEY, GENGO_PRIVATE_KEY, GENGO_USE_SANDBOX
// const gengo = initGengoAPI();

const jobsRequest = {
  commment: 'My first translation order',
  jobs: [
    {
      type: 'text',
      slug: 'my-warm-greeting',
      body_src: 'Hello there',
      lc_src: 'en',             // English
      lc_tgt: 'es',             // Spanish
      tier: 'pro',              // Advanced Tier
    }
  ]
}

// Check price
const totalPrice: Money = await gengo.service.getQuote(jobRequest)
  .jobs.reduce((acc, job) => acc.add(new Money(job.credits, job.currency)), new Money(0, 'USD'))

if (totalPrice.isGreaterThan('10.00')) {
  throw 'too expensive!'
}

// Send to translators!
await gengo.account.submitJobs(jobRequest)

// Approve jobs later...
const jobIds = await gengo.jobs.listJobs({ status: 'reviewable' })
  .forEach(job => {
    await gengo.job.updateJob({ id: job.job_id, action: 'approve' })
  })
```

  
### Methods

#### Account methods

 - `gengo.account.getStats()`
 - `gengo.account.getMe()`
 - `gengo.account.getBalance()`
 - `gengo.account.getPreferredTranslators()`

#### Job methods

 - `gengo.job.getJob(jobId)`
 - `gengo.job.updateJob({ id: jobId, action: 'approve' })`
 - `gengo.job.cancelJob(jobId)`
 - `gengo.job.getJobFeedback(jobId)`
 - `gengo.job.getJobRevisions(jobId)`
 - `gengo.job.getJobRevision({ id: jobId, revId: revisionId })`
 - `gengo.job.getJobComments(jobId)`
 - `gengo.job.postJobComment({ id: jobId, body: 'Great job!' })`

#### Jobs methods

 - `gengo.jobs.submitJobs(jobsRequest)`
 - `gengo.jobs.listJobs({ status: 'approved' })`
 - `gengo.jobs.getJobsById([jobId, jobId2])`

#### Order methods

 - `gengo.order.getOrderJobs(orderId)`
 - `gengo.order.cancelOrderJobs(orderId)`
 - `gengo.order.getOrderComments(orderId)`
 - `gengo.order.postOrderComment({ id: orderId, body: 'Great job!' })`

#### Glossary methods

 - `gengo.glossary.getGlossaries()`
 - `gengo.glossary.getGlossary(glossaryId)`

#### Service methods

 - `gengo.service.getLanguagePairs({ lc_src: 'en' })`
 - `gengo.service.getLanguages()`
 - `gengo.service.getQuote(jobsRequest)`

  
### Error handling

If you need to handle errors granularly, bad Gengo API responses are thrown as `GengoAPIError` objects.

```typescript
try {
  const comments = await gengo.job.getJobComments(2303)
} catch (error) {
  if (error instanceof GengoAPIError) {
    console.log(error.underlyingCode)
    console.log(error.underlyingMessage)
  }
}
```
