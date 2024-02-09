const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')

const { registerUser, loginUser, getMyUser } = require('../controllers/AuthController.js');
const { logoutUser } = require('../controllers/AuthController.js');
const { verifyToken } = require('../middleware/verifyToken.js');
const { updateOrCreateProfile } = require('../controllers/profileController.js');


const storageProducts = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./assets/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
    
});

// Filter untuk menerima hanya data gambar
const imageFilter = function (req, file, cb) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('File format not supported'));
    }
};


const uploadFile = multer({
    storage: storageProducts,
    fileFilter: imageFilter
});


// New user can register account to the system
router.post('/register', uploadFile.single('image'), registerUser);

// User can login to the system
router.post('/login', loginUser);

// User can logout to the system
router.post('/logout', verifyToken, logoutUser);

// api menampilkan data tabel user yang sudah login
router.get('/me',verifyToken, getMyUser);


module.exports = router;