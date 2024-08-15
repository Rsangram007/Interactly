const express = require('express');
const router = express.Router();
const twilioController = require('./twilioController');

router.post('/send-ivr-call', twilioController.sendIvrCall);
router.post('/ivr-response', twilioController.handleIvrResponse);

module.exports = router;
