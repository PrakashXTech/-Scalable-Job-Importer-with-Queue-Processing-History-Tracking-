// const { createClient } = require('redis');
// const redisClient = createClient({ url: process.env.REDIS_URL });
// redisClient.connect().catch(console.error);
// module.exports = redisClient;

// newcode
const Redis = require('ioredis');
const redisClient = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

redisClient.on('connect', () => {
  console.log('ioredis: connected');
});

redisClient.on('error', (err) => {
  console.error('ioredis: connection error', err);
});

module.exports = redisClient;
