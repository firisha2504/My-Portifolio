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
    console.log('Update profile request received');
    console.log('Body:', req.body);
    console.log('Files:', req.files);
    
    const { name, title, bio, resume_link } = req.body;
    
    // Get existing profile to preserve data if not uploading new files
    const [existing] = await db.query('SELECT * FROM profile LIMIT 1');
    let profile_image = existing.length > 0 ? existing[0].profile_image : null;
    let resume_file = existing.length > 0 ? existing[0].resume_link : resume_link;

    // Handle profile image upload to Cloudinary
    if (req.files && req.files.profile_image) {
      console.log('Uploading profile image to Cloudinary...');
      const result = await cloudinary.uploader.upload(req.files.profile_image[0].path);
      profile_image = result.secure_url;
      console.log('Profile image uploaded:', profile_image);
    } else if (req.file && req.file.fieldname === 'profile_image') {
      const result = await cloudinary.uploader.upload(req.file.path);
      profile_image = result.secure_url;
    }

    // Handle resume PDF upload - save locally and serve via backend
    if (req.files && req.files.resume_file) {
      console.log('Saving resume PDF locally...');
      const filename = req.files.resume_file[0].filename;
      // Create URL to serve the file from backend
      resume_file = `${process.env.CLIENT_URL?.replace('3000', '5000') || 'http://localhost:5000'}/uploads/${filename}`;
      console.log('Resume saved:', resume_file);
    }

    // Use resume_link if provided and no file uploaded
    if (resume_link && !req.files?.resume_file) {
      resume_file = resume_link;
    }

    console.log('Updating database...');
    if (existing.length === 0) {
      await db.query(
        'INSERT INTO profile (name, title, bio, profile_image, resume_link) VALUES (?, ?, ?, ?, ?)',
        [name, title, bio, profile_image, resume_file]
      );
    } else {
      await db.query(
        'UPDATE profile SET name = ?, title = ?, bio = ?, profile_image = ?, resume_link = ? WHERE id = ?',
        [name, title, bio, profile_image, resume_file, existing[0].id]
      );
    }

    console.log('Profile updated successfully');
    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    next(error);
  }
};
