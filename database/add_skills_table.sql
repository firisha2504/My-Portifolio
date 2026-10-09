-- ============================================
-- ADD SKILLS TABLE TO PORTFOLIO DATABASE
-- ============================================
-- Run this to add skills management to your database
-- ============================================

USE portfolio_db;

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(50) NOT NULL,
  category_icon VARCHAR(10) NOT NULL,
  skill_name VARCHAR(100) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default skills
INSERT INTO skills (category, category_icon, skill_name, display_order) VALUES
-- Frontend Skills
('Frontend', '💻', 'React.js', 1),
('Frontend', '💻', 'TypeScript', 2),
('Frontend', '💻', 'Tailwind CSS', 3),
('Frontend', '💻', 'Next.js', 4),

-- Backend Skills
('Backend', '⚙️', 'Node.js', 1),
('Backend', '⚙️', 'Express', 2),
('Backend', '⚙️', 'REST APIs', 3),
('Backend', '⚙️', 'GraphQL', 4),

-- Database Skills
('Database', '🗄️', 'MySQL', 1),
('Database', '🗄️', 'PostgreSQL', 2),
('Database', '🗄️', 'MongoDB', 3),
('Database', '🗄️', 'Redis', 4),

-- DevOps Skills
('DevOps', '🚀', 'Docker', 1),
('DevOps', '🚀', 'CI/CD', 2),
('DevOps', '🚀', 'AWS', 3),
('DevOps', '🚀', 'Linux', 4),

-- Mobile Skills
('Mobile', '📱', 'React Native', 1),
('Mobile', '📱', 'PWA', 2),
('Mobile', '📱', 'Responsive Design', 3),

-- Tools
('Tools', '🛠️', 'Git', 1),
('Tools', '🛠️', 'VS Code', 2),
('Tools', '🛠️', 'Figma', 3),
('Tools', '🛠️', 'Postman', 4);

-- ============================================
-- SETUP COMPLETE!
-- ============================================
