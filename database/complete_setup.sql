-- ============================================
-- COMPLETE PORTFOLIO DATABASE SETUP
-- ============================================
-- This file contains all tables and sample data
-- Run this in phpMyAdmin or MySQL command line
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- ============================================
-- TABLES
-- ============================================

-- Users Table (Admin Authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Profile Table
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(150) NOT NULL,
  bio TEXT,
  profile_image VARCHAR(255),
  resume_link VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  tech_stack VARCHAR(255),
  github_link VARCHAR(255),
  live_link VARCHAR(255),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stats_years INT DEFAULT 5,
  stats_projects INT DEFAULT 30,
  stats_clients INT DEFAULT 15,
  stats_technologies INT DEFAULT 10,
  contact_location VARCHAR(255) DEFAULT 'San Francisco, CA',
  contact_email VARCHAR(255) DEFAULT 'hello@example.com',
  contact_phone VARCHAR(50) DEFAULT '+1 (555) 123-4567',
  social_github VARCHAR(255),
  social_linkedin VARCHAR(255),
  social_twitter VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- DEFAULT DATA
-- ============================================

-- Insert default admin user (username: admin, password: admin123)
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@portfolio.com', '$2a$10$vtS8mHLjh/pREV1a4RvIx.SYKw1U6uFGqoomc9UDQJlll6uEJmxce', 'admin')
ON DUPLICATE KEY UPDATE username=username;

-- Insert default profile
INSERT INTO profile (name, title, bio) 
VALUES ('Your Name', 'Full Stack Developer', 'Passionate developer building amazing web applications.')
ON DUPLICATE KEY UPDATE name=name;

-- Insert default site settings
INSERT INTO site_settings (stats_years, stats_projects, stats_clients, stats_technologies, contact_location, contact_email, contact_phone) 
VALUES (5, 30, 15, 10, 'San Francisco, CA', 'hello@example.com', '+1 (555) 123-4567')
ON DUPLICATE KEY UPDATE stats_years=stats_years;

-- ============================================
-- SAMPLE PROJECTS (Optional)
-- ============================================

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

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Default Login Credentials:
-- Username: admin
-- Password: admin123
-- ============================================
