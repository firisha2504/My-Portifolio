const db = require('../config/db');
const cloudinary = require('../config/cloudinary');

exports.getProjects = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
    const [countResult] = await db.query('SELECT COUNT(*) as total FROM projects');

    res.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    console.log('Create project request received');
    console.log('Body:', req.body);
    console.log('File:', req.file);
    
    const { title, description, tech_stack, github_link, live_link } = req.body;
    let image_url = req.body.image_url;

    if (req.file) {
      console.log('Uploading image to Cloudinary...');
      const result = await cloudinary.uploader.upload(req.file.path);
      image_url = result.secure_url;
      console.log('Image uploaded:', image_url);
    }

    console.log('Inserting project into database...');
    const [result] = await db.query(
      'INSERT INTO projects (title, description, tech_stack, github_link, live_link, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, tech_stack, github_link, live_link, image_url]
    );

    console.log('Project created successfully');
    res.status(201).json({ success: true, message: 'Project created', id: result.insertId });
  } catch (error) {
    console.error('Error creating project:', error);
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { title, description, tech_stack, github_link, live_link } = req.body;
    let image_url = req.body.image_url;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image_url = result.secure_url;
    }

    await db.query(
      'UPDATE projects SET title = ?, description = ?, tech_stack = ?, github_link = ?, live_link = ?, image_url = ? WHERE id = ?',
      [title, description, tech_stack, github_link, live_link, image_url, req.params.id]
    );

    res.json({ success: true, message: 'Project updated' });
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};
