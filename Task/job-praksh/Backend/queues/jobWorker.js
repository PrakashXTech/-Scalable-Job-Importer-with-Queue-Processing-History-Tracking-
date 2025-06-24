// const { Worker } = require('bullmq');
// const jobService = require('../services/jobService');
// const redisConnection = require('../config/redis');

// const worker = new Worker('jobs', async job => {
//   await jobService.importJobs();
// }, {
//   connection: redisConnection,
//   concurrency: 5,
// });

// worker.on('completed', job => console.log(`Job ${job.id} completed`));
// worker.on('failed', (job, err) => console.error(`Job ${job.id} failed: ${err.message}`));

// module.exports = worker;

// new code

const { Worker } = require('bullmq');
const jobService = require('../services/jobService');
const connection = require('../config/redis');

const worker = new Worker('jobs', async job => {
  await jobService.importJobs();
}, {
  connection,
  concurrency: 5,
});

worker.on('completed', job => console.log(`Job ${job.id} completed`));
worker.on('failed', (job, err) => console.error(`Job ${job.id} failed: ${err.message}`));
