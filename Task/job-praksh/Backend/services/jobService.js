// new code

const fetchJobs = require('./fetchJobs');
const Job = require('../models/Job');
const ImportLog = require('../models/ImportLog');

exports.importJobs = async (req) => {
  const jobs = await fetchJobs();
  let newCount = 0, updatedCount = 0, failed = [];

  for (const job of jobs) {
    try {
      const existing = await Job.findOne({ url: job.url });
      if (existing) {
        await Job.updateOne({ _id: existing._id }, job);
        updatedCount++;
      } else {
        await new Job(job).save();
        newCount++;
      }
    } catch (e) {
      failed.push({ reason: e.message, data: job });
    }
  }

  const log = await ImportLog.create({
    totalFetched: jobs.length,
    totalImported: newCount + updatedCount,
    newJobs: newCount,
    updatedJobs: updatedCount,
    failedJobs: failed,
  });

  // Emit to frontend via Socket.IO
  const io = req?.app?.get('io');
  if (io) {
    io.emit('importLog', log);
  }

  return { total: jobs.length, new: newCount, updated: updatedCount, failed: failed.length };
};
