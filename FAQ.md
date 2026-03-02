# Frequently Asked Questions (FAQ)

## General Questions

### What is this project?
A production-ready full-stack portfolio website built with React, Node.js, Express, and MySQL. It includes an admin dashboard for managing profile, projects, and contact messages.

### What technologies are used?
- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express, MySQL
- **Authentication**: JWT, bcrypt
- **File Storage**: Cloudinary (or local with Multer)
- **Security**: CORS, rate limiting, input validation

### Is this production-ready?
Yes! The application follows security best practices, includes error handling, validation, and is deployment-ready with Docker support.

---

## Setup Questions

### How do I install the project?
```bash
# Clone repository
git clone <repo-url>

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Set up database
mysql -u root -p < database/schema.sql

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Run backend
cd backend && npm run dev

# Run frontend (new terminal)
cd frontend && npm start
```

### What are the system requirements?
- Node.js 16 or higher
- MySQL 8.0 or higher
- npm or yarn
- 2GB RAM minimum
- Modern web browser

### How do I set up the database?
1. Install MySQL
2. Create database: `CREATE DATABASE portfolio_db;`
3. Run schema: `mysql -u root -p portfolio_db < database/schema.sql`
4. Update `.env` with database credentials

### How do I get Cloudinary credentials?
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Add to `.env` file

---

## Authentication Questions

### What are the default admin credentials?
- Email: `admin@portfolio.com`
- Password: `admin123`

**Important**: Change these immediately after first login!

### How do I change the admin password?
1. Login to dashboard
2. Create a new admin user with strong password
3. Delete the default admin user from database

Or generate a new hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your_new_password', 10))"
```
Then update in database.

### How long do JWT tokens last?
Default is 7 days. Configure in `.env`:
```
JWT_EXPIRE=7d
```

### Can I add more admin users?
Yes! Use the register endpoint or insert directly into database:
```sql
INSERT INTO users (username, email, password, role) 
VALUES ('newadmin', 'admin2@portfolio.com', 'hashed_password', 'admin');
```

---

## Features Questions

### How do I upload images?
Images are uploaded through the admin dashboard:
1. Login to dashboard
2. Go to Profile or Projects section
3. Use the file upload field
4. Images are automatically uploaded to Cloudinary

### How does pagination work?
Projects endpoint supports pagination:
```
GET /api/projects?page=1&limit=10
```
Default: page=1, limit=10

### Can I customize the theme?
Yes! Edit CSS variables in `frontend/src/index.css`:
```css
:root {
  --bg-primary: #ffffff;
  --accent: #0d6efd;
  /* etc */
}
```

### How do I add more pages?
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.js`
3. Add navigation link in `Navbar.js`

---

## Deployment Questions

### Where can I deploy this?
- **Frontend**: Vercel, Netlify, AWS S3
- **Backend**: Railway, Heroku, DigitalOcean
- **Database**: PlanetScale, AWS RDS, DigitalOcean

See `DEPLOYMENT.md` for detailed instructions.

### Do I need a domain name?
Not required, but recommended for production. You can use:
- Namecheap
- GoDaddy
- Google Domains

### How do I enable HTTPS?
- Automatic with Vercel/Netlify/Railway
- Use Let's Encrypt for VPS
- AWS Certificate Manager for AWS

### What about environment variables in production?
Set them in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Heroku: `heroku config:set VAR=value`
- Railway: Variables tab in dashboard

---

## Troubleshooting

### Database connection fails
Check:
- MySQL is running
- Credentials in `.env` are correct
- Database exists
- User has proper permissions

Test connection:
```bash
mysql -h localhost -u root -p portfolio_db
```

### CORS errors
Ensure `CLIENT_URL` in backend `.env` matches your frontend URL:
```
CLIENT_URL=http://localhost:3000
```

### JWT token invalid
- Check `JWT_SECRET` is set
- Verify token hasn't expired
- Ensure Authorization header format: `Bearer <token>`

### File upload fails
- Check Cloudinary credentials
- Verify file size (max 5MB)
- Ensure file type is image (jpg, png, gif)
- Check multer configuration

### Port already in use
Change port in `.env`:
```
PORT=5001
```

Or kill process using port:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

---

## Security Questions

### Is this application secure?
Yes, it implements:
- Password hashing
- JWT authentication
- Input validation
- Rate limiting
- CORS protection
- SQL injection prevention

See `SECURITY.md` for details.

### How do I report security issues?
Email security concerns to: [your-email@example.com]
Do NOT open public issues for security vulnerabilities.

### Should I use HTTPS?
Yes! Always use HTTPS in production. It's automatic with most hosting platforms.

### How often should I update dependencies?
Monthly security updates recommended:
```bash
npm audit
npm audit fix
```

---

## Customization Questions

### How do I change the logo?
Edit `frontend/src/components/Navbar.js`:
```javascript
<Link to="/" className="logo">Your Name</Link>
```

### Can I add a blog section?
Yes! You would need to:
1. Create blog table in database
2. Add blog controller and routes
3. Create blog components in frontend
4. Add rich text editor (e.g., TinyMCE)

### How do I add social media links?
Add to profile table:
```sql
ALTER TABLE profile ADD COLUMN social_links JSON;
```
Then update profile controller and frontend.

### Can I change the color scheme?
Yes! Edit CSS variables in `frontend/src/index.css`

---

## Performance Questions

### How many users can this handle?
Depends on hosting, but the architecture supports:
- Horizontal scaling
- Database read replicas
- CDN for static assets
- Caching layer (Redis)

### How do I improve performance?
1. Enable gzip compression
2. Use CDN for images
3. Add database indexes
4. Implement caching
5. Optimize images
6. Use production build

### Should I use a CDN?
Yes! Cloudinary acts as CDN for images. For frontend, use:
- Vercel Edge Network
- Netlify CDN
- CloudFront (AWS)

---

## Development Questions

### How do I contribute?
See `CONTRIBUTING.md` for guidelines.

### How do I run tests?
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

### How do I add new features?
1. Create feature branch
2. Implement feature
3. Add tests
4. Update documentation
5. Submit pull request

### What's the code structure?
See `ARCHITECTURE.md` for detailed explanation.

---

## Support

### Where can I get help?
- Read documentation files
- Check GitHub Issues
- Review API documentation
- Check deployment guide

### How do I report bugs?
Open an issue on GitHub with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

### Can I use this for commercial projects?
Yes! This project is MIT licensed. See `LICENSE` file.

---

## Additional Resources

- [README.md](README.md) - Getting started
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [SECURITY.md](SECURITY.md) - Security policy
- [TESTING.md](TESTING.md) - Testing guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
