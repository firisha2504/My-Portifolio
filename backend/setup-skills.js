// Quick setup script to create skills table
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupSkills() {
  console.log('🚀 Setting up skills table...\n');
  
  let connection;
  
  try {
    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'portfolio_db'
    });
    
    console.log('✅ Connected to database');
    
    // Create skills table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT PRIMARY KEY AUTO_INCREMENT,
        category VARCHAR(50) NOT NULL,
        category_icon VARCHAR(10) NOT NULL,
        skill_name VARCHAR(100) NOT NULL,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Skills table created');
    
    // Check if skills already exist
    const [existing] = await connection.query('SELECT COUNT(*) as count FROM skills');
    
    if (existing[0].count > 0) {
      console.log(`ℹ️  Skills table already has ${existing[0].count} skills. Skipping insert.`);
      console.log('\n✨ Setup complete! Skills table is ready.\n');
      return;
    }
    
    // Insert default skills
    const skills = [
      // Frontend Skills
      ['Frontend', '💻', 'React.js', 1],
      ['Frontend', '💻', 'TypeScript', 2],
      ['Frontend', '💻', 'Tailwind CSS', 3],
      ['Frontend', '💻', 'Next.js', 4],
      
      // Backend Skills
      ['Backend', '⚙️', 'Node.js', 1],
      ['Backend', '⚙️', 'Express', 2],
      ['Backend', '⚙️', 'REST APIs', 3],
      ['Backend', '⚙️', 'GraphQL', 4],
      
      // Database Skills
      ['Database', '🗄️', 'MySQL', 1],
      ['Database', '🗄️', 'PostgreSQL', 2],
      ['Database', '🗄️', 'MongoDB', 3],
      ['Database', '🗄️', 'Redis', 4],
      
      // DevOps Skills
      ['DevOps', '🚀', 'Docker', 1],
      ['DevOps', '🚀', 'CI/CD', 2],
      ['DevOps', '🚀', 'AWS', 3],
      ['DevOps', '🚀', 'Linux', 4],
      
      // Mobile Skills
      ['Mobile', '📱', 'React Native', 1],
      ['Mobile', '📱', 'PWA', 2],
      ['Mobile', '📱', 'Responsive Design', 3],
      
      // Tools
      ['Tools', '🛠️', 'Git', 1],
      ['Tools', '🛠️', 'VS Code', 2],
      ['Tools', '🛠️', 'Figma', 3],
      ['Tools', '🛠️', 'Postman', 4]
    ];
    
    await connection.query(
      'INSERT INTO skills (category, category_icon, skill_name, display_order) VALUES ?',
      [skills]
    );
    
    console.log(`✅ Inserted ${skills.length} default skills`);
    
    // Show summary
    const [categories] = await connection.query(
      'SELECT category, COUNT(*) as count FROM skills GROUP BY category ORDER BY category'
    );
    
    console.log('\n📊 Skills by category:');
    categories.forEach(cat => {
      console.log(`   ${cat.category}: ${cat.count} skills`);
    });
    
    console.log('\n✨ Setup complete! Skills table is ready.\n');
    console.log('Next steps:');
    console.log('  1. Refresh your browser (Ctrl + R)');
    console.log('  2. Visit http://localhost:3000/about to see skills');
    console.log('  3. Or go to Dashboard → Skills to manage them\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Make sure MySQL is running');
    console.error('  2. Check database credentials in .env file');
    console.error('  3. Verify portfolio_db database exists');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupSkills();
