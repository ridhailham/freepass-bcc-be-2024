const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getMyUser } = require('../controllers/AuthController.js');
const { logoutUser } = require('../controllers/AuthController.js');
const { verifyToken } = require('../middleware/verifyToken.js');


// New user can register account to the system
router.post('/register', registerUser);

// User can login to the system
router.post('/login', loginUser);

// User can logout to the system
router.post('/logout', verifyToken, logoutUser);

// api menampilkan data tabel user yang sudah login
router.get('/me',verifyToken, getMyUser);


module.exports = router;