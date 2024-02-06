const express = require('express');
const router = express.Router();

const { createRole } = require('../controllers/roleController.js');



router.post('/', createRole);



module.exports = router;