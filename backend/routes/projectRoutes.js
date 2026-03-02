const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateProject } = require('../middleware/validation');
const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, authorize('admin'), upload.single('image'), validateProject, createProject);
router.put('/:id', protect, authorize('admin'), upload.single('image'), validateProject, updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);

module.exports = router;
