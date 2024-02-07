const express = require('express');
const router = express.Router();

const { updateOrCreateTime } = require("../controllers/timeController");
const { adminOnly } = require("../middleware/AuthUser");
const { verifyToken } = require("../middleware/verifyToken");



//Admin can set the start and end dates for the election period
router.post('/', verifyToken, adminOnly, updateOrCreateTime)

module.exports = router