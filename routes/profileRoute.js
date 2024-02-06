const express = require('express');
const router = express.Router();
const { updateOrCreateProfile } = require('../controllers/profileController');
const { verifyToken } = require('../middleware/verifyToken.js');


// User can edit their profile account
router.post('/', verifyToken, updateOrCreateProfile);

module.exports = router;