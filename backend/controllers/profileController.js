const db = require('../config/db');
const cloudinary = require('../config/cloudinary');

exports.getProfile = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM profile LIMIT 1');
    res.json({ success: true, data: rows[0] || {} });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, title, bio, resume_link } = req.body;
    let profile_image = req.body.profile_image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profile_image = result.secure_url;
    }

    const [existing] = await db.query('SELECT id FROM profile LIMIT 1');

    if (existing.length === 0) {
      await db.query(
        'INSERT INTO profile (name, title, bio, profile_image, resume_link) VALUES (?, ?, ?, ?, ?)',
        [name, title, bio, profile_image, resume_link]
      );
    } else {
      await db.query(
        'UPDATE profile SET name = ?, title = ?, bio = ?, profile_image = ?, resume_link = ? WHERE id = ?',
        [name, title, bio, profile_image, resume_link, existing[0].id]
      );
    }

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};
