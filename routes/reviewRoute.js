const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken.js');
const { createorUpdateReview } = require('../controllers/reviewController.js');


router.post('/:productId', verifyToken, createorUpdateReview);

module.exports = router;