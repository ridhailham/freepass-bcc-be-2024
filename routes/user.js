const express = require('express');
const router = express.Router();

const { getAllUser, destroyUser } = require('../controllers/userController.js');
const { adminOnly } = require('../middleware/AuthUser.js');
const { verifyToken } = require('../middleware/verifyToken.js');


router.get('/', verifyToken, adminOnly, getAllUser);
router.get('/:id', verifyToken, adminOnly, destroyUser);

module.exports = router;