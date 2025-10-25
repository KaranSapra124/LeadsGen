const { createLead } = require('../Controller/LeadsController');

const router = require('express').Router();

// Leads Routes
router.post("/add/lead", createLead);

module.exports = router