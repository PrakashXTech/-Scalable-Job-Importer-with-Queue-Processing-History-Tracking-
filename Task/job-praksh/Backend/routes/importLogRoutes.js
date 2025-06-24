const express = require('express');
const router = express.Router();
const importLogController = require('../controllers/importLogController');
router.get('/', importLogController.getLogs);
module.exports = router;
