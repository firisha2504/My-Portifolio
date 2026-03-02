const bcrypt = require('bcryptjs');
const db = require('../config/db');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    console.log('Seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = ?',
      ['admin', 'admin@portfolio.com', hashedPassword, 'admin', hashedPassword]
    );
    console.log('✓ Admin user created');

    // Create default profile
    await db.query(
      `INSERT INTO profile (name, title, bio) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE name = name`,
      ['Your Name', 'Full Stack Developer', 'Passionate developer building amazing web applications.']
    );
    console.log('✓ Default profile created');

    // Create sample projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'Full-featured online shopping platform with payment integration',
        tech_stack: 'React, Node.js, MongoDB, Stripe',
        github_link: 'https://github.com/yourusername/ecommerce',
        live_link: 'https://ecommerce-demo.com'
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task management tool with real-time updates',
        tech_stack: 'React, Express, MySQL, Socket.io',
        github_link: 'https://github.com/yourusername/taskapp',
        live_link: 'https://taskapp-demo.com'
      },
      {
        title: 'Weather Dashboard',
        description: 'Real-time weather information with interactive maps',
        tech_stack: 'React, OpenWeather API, Chart.js',
        github_link: 'https://github.com/yourusername/weather',
        live_link: 'https://weather-demo.com'
      }
    ];

    for (const project of projects) {
      await db.query(
        'INSERT INTO projects (title, description, tech_stack, github_link, live_link) VALUES (?, ?, ?, ?, ?)',
        [project.title, project.description, project.tech_stack, project.github_link, project.live_link]
      );
    }
    console.log('✓ Sample projects created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@portfolio.com');
    console.log('Password: admin123\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
