const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateProfile } = require('../middleware/validation');
const router = express.Router();

router.get('/', getProfile);
router.put('/', protect, authorize('admin'), upload.fields([
  { name: 'profile_image', maxCount: 1 },
  { name: 'resume_file', maxCount: 1 }
]), validateProfile, updateProfile);

module.exports = router;
