const ImportLog = require('../models/ImportLog');
exports.getLogs = async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ timestamp: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
