const express = require('express');
const router = express.Router();

const { createCandidate } = require('../controllers/candidateController.js');


router.put('/', createCandidate);

module.exports = router;