const db = require('../config/db');
const { validationResult } = require('express-validator');

exports.createContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    await db.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    await db.query('UPDATE contacts SET is_read = TRUE WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Marked as read' });
  } catch (error) {
    next(error);
  }
};
