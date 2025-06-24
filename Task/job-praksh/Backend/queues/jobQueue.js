// const { Queue } = require('bullmq');
// const redisConnection = require('../config/redis');

// const jobQueue = new Queue('jobs', {
//   connection: redisConnection,
// });

// module.exports = jobQueue;

// new code
const { Queue } = require('bullmq');
const connection = require('../config/redis');

const jobQueue = new Queue('jobs', {
  connection,
});

module.exports = jobQueue;

