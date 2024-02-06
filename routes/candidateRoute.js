const express = require('express');
const router = express.Router();

const { createCandidate, getAllCandidate } = require('../controllers/candidateController.js');
const { adminOnly, userOnly } = require('../middleware/AuthUser.js');
const { verifyToken } = require('../middleware/verifyToken.js');

// Users can view information about the candidates
router.get('/', verifyToken, userOnly, getAllCandidate)

// Admin can promote user to candidate
router.put('/', verifyToken, adminOnly, createCandidate);

module.exports = router;