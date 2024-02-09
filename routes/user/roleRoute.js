const express = require('express');
const router = express.Router();

const { createRole } = require('../../controllers/user/roleController.js');


// create role tidak dibutuhkan karena langsung inisiasi melalui fungsi di model
// router.post('/', createRole);



module.exports = router;