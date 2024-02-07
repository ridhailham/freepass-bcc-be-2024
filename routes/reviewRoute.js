const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken.js');
const { createorUpdateReview } = require('../controllers/reviewController.js');
const { userOnly } = require('../middleware/AuthUser.js');

// User can comment on candidate’s posts
router.post('/:postingId', verifyToken, userOnly, createorUpdateReview);

module.exports = router;