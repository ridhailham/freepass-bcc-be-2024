const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getMyUser } = require('../controllers/AuthController.js');
const { logoutUser } = require('../controllers/AuthController.js');
const { verifyToken } = require('../middleware/verifyToken.js');



router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);
router.get('/me',verifyToken, getMyUser);


module.exports = router;