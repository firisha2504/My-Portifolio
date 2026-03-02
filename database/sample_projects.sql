-- Sample Projects Data
USE portfolio_db;

-- Clear existing projects (optional)
-- DELETE FROM projects;

-- Insert Sample Projects
INSERT INTO projects (title, description, tech_stack, github_link, live_link, image_url) VALUES
(
  'E-Commerce Platform',
  'A full-stack e-commerce solution with payment integration, inventory management, and real-time order tracking. Features include user authentication, product search, shopping cart, and admin dashboard.',
  'React, Node.js, MySQL, Stripe',
  'https://github.com/yourusername/ecommerce',
  'https://ecommerce-demo.com',
  'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80'
),
(
  'Task Management App',
  'Collaborative project management tool with drag-and-drop boards, real-time updates, and team collaboration features. Includes task assignments, deadlines, and progress tracking.',
  'React, Express, PostgreSQL, Socket.io',
  'https://github.com/yourusername/task-manager',
  'https://taskmanager-demo.com',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
),
(
  'Social Media Dashboard',
  'Analytics dashboard aggregating data from multiple social platforms. Features real-time data visualization, engagement metrics, and automated reporting.',
  'React, TweetDeck, REST API, Chart.js',
  'https://github.com/yourusername/social-dashboard',
  'https://socialdash-demo.com',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
),
(
  'Real Estate Platform',
  'Property listing platform with map integration, advanced search filters, and virtual tours. Includes agent profiles and appointment scheduling.',
  'Next.js, Node.js, MongoDB, Mapbox',
  'https://github.com/yourusername/real-estate',
  'https://realestate-demo.com',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
),
(
  'Blog CMS',
  'Content management system with markdown editor, image uploads, SEO optimization, and analytics. Features include draft saving and scheduled publishing.',
  'React, Express, MySQL, Cloudinary',
  'https://github.com/yourusername/blog-cms',
  'https://blogcms-demo.com',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80'
),
(
  'Fitness Tracker',
  'Health and fitness tracking app with workout logging, progress charts, and goal setting. Includes calorie tracking and exercise library.',
  'React Native, Node.js, JWT',
  'https://github.com/yourusername/fitness-tracker',
  'https://fitness-demo.com',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80'
);
