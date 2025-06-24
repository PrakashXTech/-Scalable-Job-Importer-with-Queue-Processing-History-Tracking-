
const jobService = require('../services/jobService');

exports.importJobs = async (req, res) => {
  try {
    const result = await jobService.importJobs(req); // pass req
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
