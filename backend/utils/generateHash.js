const bcrypt = require('bcryptjs');

// Generate password hash for admin user
const password = process.argv[2] || 'admin123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }
  console.log('\nPassword:', password);
  console.log('Hash:', hash);
  console.log('\nUse this hash in your database INSERT statement.\n');
});
