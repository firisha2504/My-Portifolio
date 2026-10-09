# Professional Full-Stack Portfolio

Production-ready portfolio website built with React, Node.js, Express, and MySQL.

> **🚀 New here?** Check the [docs folder](docs/README.md) for all guides and documentation!

## ✨ Features

- **Public Pages:** Home, About, Projects, Contact
- **Admin Dashboard:** Full-featured admin panel
- **Profile Management:** Update profile with image upload
- **Projects CRUD:** Create, read, update, delete projects with pagination
- **Skills Management:** Add, edit, organize skills by category
- **Contact System:** Contact form with email reply functionality
- **Authentication:** JWT-based auth with role-based access control
- **Theme Toggle:** Dark/Light mode support
- **Responsive Design:** Mobile-first, works on all devices
- **Image Upload:** Cloudinary integration with local fallback

## 🛠️ Tech Stack

**Frontend:** React, React Router, Axios  
**Backend:** Node.js, Express, MySQL  
**Security:** JWT, bcrypt, CORS, rate limiting  
**Storage:** Cloudinary (images), MySQL (data)  
**Email:** Nodemailer (Gmail/SMTP)

## 📚 Documentation

All documentation is organized in the [docs folder](docs/):

- **[Skills Management Guide](docs/SKILLS_FEATURE_GUIDE.md)** - Complete skills system
- **[Email Setup Guide](docs/EMAIL_SETUP_GUIDE.md)** - Configure email replies
- **[Image Upload Guide](docs/CLOUDINARY_FIX.md)** - Cloudinary + local storage
- **[Troubleshooting](docs/FIX_PORT_IN_USE.md)** - Common issues and fixes

## 🚀 Quick Start

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)
- npm or yarn

### 1. Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd My-Portifolio

# Install dependencies
cd backend && npm install
cd ../frontend && npm install
```

### 2. Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE portfolio_db;
exit;

# Run schema
mysql -u root -p portfolio_db < database/complete_setup.sql

# Setup skills table
mysql -u root -p portfolio_db < database/add_skills_table.sql
```

Or use the setup script:
```bash
cd backend
node setup-skills.js
```

### 3. Configuration

**Backend** - Create `backend/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000

# Optional: Email (for contact replies)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM_NAME=Your Name

# Optional: Cloudinary (for image hosting)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend** - Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Dashboard: http://localhost:3000/dashboard

### 5. Default Login

```
Email: admin@portfolio.com
Password: admin123
```

**⚠️ Change these immediately after first login!**

## 📖 Features Documentation

### Skills Management
Manage your skills from the dashboard:
```
Dashboard → Skills → Add New Skill
```
**Guide:** [docs/SKILLS_FEATURE_GUIDE.md](docs/SKILLS_FEATURE_GUIDE.md)

### Email Replies
Reply to contact form submissions:
```
Dashboard → Messages → Reply
```
**Setup:** [docs/EMAIL_SETUP_GUIDE.md](docs/EMAIL_SETUP_GUIDE.md)

### Image Upload
Upload profile and project images:
- **Cloudinary:** Configure credentials in `.env`
- **Local:** Works out of the box, saves to `backend/uploads/`

**Guide:** [docs/CLOUDINARY_FIX.md](docs/CLOUDINARY_FIX.md)

## API Documentation

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new user

### Profile
- `GET /api/profile` - Get profile (public)
- `PUT /api/profile` - Update profile (admin only)

### Projects
- `GET /api/projects` - Get all projects with pagination
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Skills
- `GET /api/skills` - Get all skills grouped by category (public)
- `GET /api/skills/all` - Get all skills flat list (admin only)
- `GET /api/skills/categories` - Get unique categories (public)
- `POST /api/skills` - Create skill (admin only)
- `PUT /api/skills/:id` - Update skill (admin only)
- `DELETE /api/skills/:id` - Delete skill (admin only)

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all messages (admin only)
- `PUT /api/contacts/:id/read` - Mark as read (admin only)

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Role-based access control
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- Input validation
- Protected routes
- Environment variables

## Image Upload Configuration

This application supports two image storage options:

### Option 1: Local Storage (Default)
Images are automatically stored locally in the `backend/uploads` folder and served via the backend server. This works out of the box with no additional configuration needed.

### Option 2: Cloudinary (Recommended for Production)
For production environments, Cloudinary is recommended for better performance and scalability:

1. Sign up for a free account at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the Cloudinary dashboard
3. Update your `.env` file:
   ```
   CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
   CLOUDINARY_API_KEY=your_actual_api_key
   CLOUDINARY_API_SECRET=your_actual_api_secret
   ```
4. Restart your backend server

The application will automatically detect if Cloudinary is configured and use it; otherwise, it falls back to local storage.

## Deployment

### Backend (Node.js)
- Deploy to Heroku, Railway, or DigitalOcean
- Set environment variables
- Configure MySQL database

### Frontend (React)
- Build: `npm run build`
- Deploy to Vercel, Netlify, or AWS S3
- Update API URL in environment variables

### Database
- Use managed MySQL (AWS RDS, PlanetScale, etc.)
- Run schema.sql on production database
- Update connection credentials

## Default Admin Credentials

Email: `admin@portfolio.com`
Password: `admin123`

**Change these immediately after first login!**

## 🛠️ Utility Scripts

### Kill Port (Windows)
If you get "port already in use" error:
```bash
# Double-click or run:
.\scripts\kill-port-5000.bat
```

### Test Email Configuration
```bash
cd backend
node test-email.js
```

### Setup Skills Table
```bash
cd backend
node setup-skills.js
```

## 🔧 Troubleshooting

### Port 5000 Already in Use
```bash
.\scripts\kill-port-5000.bat
```
**Guide:** [docs/FIX_PORT_IN_USE.md](docs/FIX_PORT_IN_USE.md)

### Skills Not Loading (500 Error)
```bash
cd backend
node setup-skills.js
```
**Guide:** [docs/FIX_500_ERROR.md](docs/FIX_500_ERROR.md)

### Email Not Sending
Check spam folder (normal for development). For production setup, see email guide.
**Guide:** [docs/EMAIL_SETUP_GUIDE.md](docs/EMAIL_SETUP_GUIDE.md)

### Images Not Uploading
Works with local storage by default. Configure Cloudinary for cloud hosting.
**Guide:** [docs/CLOUDINARY_FIX.md](docs/CLOUDINARY_FIX.md)

## 📁 Project Structure

```
My-Portifolio/
├── backend/
│   ├── config/          # Database, Cloudinary, Email config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, validation, uploads
│   ├── routes/          # API routes
│   ├── uploads/         # Local file storage
│   ├── server.js        # Entry point
│   ├── setup-skills.js  # Skills setup utility
│   └── test-email.js    # Email test utility
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       ├── utils/       # API utilities
│       └── App.js       # Main app
├── database/
│   ├── complete_setup.sql    # Main schema
│   └── add_skills_table.sql  # Skills table
├── docs/                # All documentation
├── scripts/             # Utility scripts
└── README.md           # This file
```

## License

MIT


## 📝 Additional Resources

- **[Complete Documentation](docs/README.md)** - All guides in one place
- **[Skills Management](docs/SKILLS_FEATURE_GUIDE.md)** - Add and manage skills
- **[Email Configuration](docs/EMAIL_SETUP_GUIDE.md)** - Setup contact replies
- **[Troubleshooting Guide](docs/)** - Common issues and fixes

## 🙏 Support

For issues and questions:
1. Check [docs folder](docs/) for comprehensive guides
2. Review troubleshooting documentation
3. Check backend console for error messages
4. Open an issue on GitHub

---

**Built with ❤️ using React, Node.js, Express, and MySQL**
