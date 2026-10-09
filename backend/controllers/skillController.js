const db = require('../config/db');

// Get all skills grouped by category
exports.getSkills = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills ORDER BY category, display_order');
    
    // Group skills by category
    const skillsByCategory = rows.reduce((acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = {
          title: category,
          icon: skill.category_icon,
          skills: []
        };
      }
      acc[category].skills.push({
        id: skill.id,
        name: skill.skill_name,
        display_order: skill.display_order
      });
      return acc;
    }, {});

    res.json({ 
      success: true, 
      data: Object.values(skillsByCategory)
    });
  } catch (error) {
    next(error);
  }
};

// Get all skills (flat list for admin)
exports.getAllSkills = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills ORDER BY category, display_order');
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

// Get single skill
exports.getSkill = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};

// Create new skill
exports.createSkill = async (req, res, next) => {
  try {
    console.log('Create skill request:', req.body);
    
    const { category, category_icon, skill_name, display_order } = req.body;

    const [result] = await db.query(
      'INSERT INTO skills (category, category_icon, skill_name, display_order) VALUES (?, ?, ?, ?)',
      [category, category_icon || '📌', skill_name, display_order || 0]
    );

    console.log('Skill created successfully');
    res.status(201).json({ 
      success: true, 
      message: 'Skill created successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating skill:', error);
    next(error);
  }
};

// Update skill
exports.updateSkill = async (req, res, next) => {
  try {
    const { category, category_icon, skill_name, display_order } = req.body;

    const [result] = await db.query(
      'UPDATE skills SET category = ?, category_icon = ?, skill_name = ?, display_order = ? WHERE id = ?',
      [category, category_icon, skill_name, display_order, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    res.json({ success: true, message: 'Skill updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete skill
exports.deleteSkill = async (req, res, next) => {
  try {
    const [result] = await db.query('DELETE FROM skills WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get all unique categories
exports.getCategories = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT DISTINCT category, category_icon FROM skills ORDER BY category');
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};
