const express = require('express');
const router = express.Router();

const { getAllUser } = require('../controllers/userController.js');


router.get('/', getAllUser);

module.exports = router;