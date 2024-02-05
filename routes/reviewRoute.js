const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken.js');
const { createReview } = require('../controllers/reviewController.js');


router.post('/:productId', verifyToken, createReview);

module.exports = router;