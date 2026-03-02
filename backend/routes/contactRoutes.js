const express = require('express');
const { createContact, getContacts, markAsRead, deleteContact, replyToContact } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');
const { validateContact } = require('../middleware/validation');
const router = express.Router();

router.post('/', validateContact, createContact);
router.get('/', protect, authorize('admin'), getContacts);
router.put('/:id/read', protect, authorize('admin'), markAsRead);
router.post('/:id/reply', protect, authorize('admin'), replyToContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;
