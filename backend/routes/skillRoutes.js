const express = require('express');
const { 
  getSkills, 
  getAllSkills,
  getSkill, 
  createSkill, 
  updateSkill, 
  deleteSkill,
  getCategories
} = require('../controllers/skillController');
const { protect, authorize } = require('../middleware/auth');
const { validateSkill } = require('../middleware/validation');
const router = express.Router();

// Public routes
router.get('/', getSkills); // Get skills grouped by category
router.get('/categories', getCategories); // Get all unique categories

// Protected routes (admin only)
router.get('/all', protect, authorize('admin'), getAllSkills); // Get flat list for admin
router.get('/:id', protect, authorize('admin'), getSkill);
router.post('/', protect, authorize('admin'), validateSkill, createSkill);
router.put('/:id', protect, authorize('admin'), validateSkill, updateSkill);
router.delete('/:id', protect, authorize('admin'), deleteSkill);

module.exports = router;
