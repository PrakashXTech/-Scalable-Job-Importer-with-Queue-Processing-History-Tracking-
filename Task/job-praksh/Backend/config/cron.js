const cron = require('node-cron');
const jobService = require('../services/jobService');

function startCron(app) {
  cron.schedule('*/5 * * * *', async () => {
    console.log('[CRON] Running scheduled job import...');

    try {
      const fakeReq = { app }; 
      await jobService.importJobs(fakeReq);
      console.log('[CRON] Import completed successfully');
    } catch (err) {
      console.error('[CRON] Import failed:', err.message);
    }
  });
}

module.exports = startCron;
