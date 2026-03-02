const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateProfile } = require('../middleware/validation');
const router = express.Router();

router.get('/', getProfile);
router.put('/', protect, authorize('admin'), upload.single('profile_image'), validateProfile, updateProfile);

module.exports = router;
