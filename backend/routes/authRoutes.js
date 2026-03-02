const express = require('express');
const { login, register, updateProfile, getProfile } = require('../controllers/authController');
const { authLimiter } = require('../middleware/security');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/login', authLimiter, login);
router.post('/register', authLimiter, register);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
