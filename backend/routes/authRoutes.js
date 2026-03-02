const express = require('express');
const { login, register } = require('../controllers/authController');
const { authLimiter } = require('../middleware/security');
const router = express.Router();

router.post('/login', authLimiter, login);
router.post('/register', authLimiter, register);

module.exports = router;
