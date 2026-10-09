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

exports.deleteContact = async (req, res, next) => {
  try {
    await db.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.replyToContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Reply message is required' });
    }

    // Get contact details
    const [contacts] = await db.query('SELECT * FROM contacts WHERE id = ?', [id]);
    
    if (contacts.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    const contact = contacts[0];

    // Check if email is configured
    const isEmailConfigured = 
      process.env.EMAIL_USER && 
      process.env.EMAIL_PASSWORD &&
      process.env.EMAIL_USER !== 'your_email@gmail.com';

    if (!isEmailConfigured) {
      console.warn('Email not configured. Reply logged but not sent.');
      
      // Mark as read even if email isn't sent
      await db.query('UPDATE contacts SET is_read = TRUE WHERE id = ?', [id]);
      
      return res.json({ 
        success: true, 
        message: 'Reply logged successfully. Note: Email sending is not configured. Configure EMAIL_USER and EMAIL_PASSWORD in .env to send replies via email.',
        emailSent: false
      });
    }

    // Send reply email if configured
    try {
      const { sendEmail } = require('../config/email');

      const subject = `Re: ${contact.subject || 'Your message'}`;
      const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Hello ${contact.name},</h2>
          <p style="color: #666; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            This is a reply to your message: "${contact.message.substring(0, 100)}${contact.message.length > 100 ? '...' : ''}"
          </p>
        </div>
      `;

      await sendEmail(contact.email, subject, message, htmlMessage);

      // Mark as read
      await db.query('UPDATE contacts SET is_read = TRUE WHERE id = ?', [id]);

      res.json({ 
        success: true, 
        message: 'Reply sent successfully via email',
        emailSent: true
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      
      // Mark as read even if email fails
      await db.query('UPDATE contacts SET is_read = TRUE WHERE id = ?', [id]);
      
      res.json({ 
        success: true, 
        message: 'Reply logged but email sending failed. Please check email configuration.',
        emailSent: false,
        error: emailError.message
      });
    }
  } catch (error) {
    console.error('Error in replyToContact:', error);
    next(error);
  }
};
