const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
router.post('/import', jobController.importJobs);
module.exports = router;
