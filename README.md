# Professional Full-Stack Portfolio

Production-ready portfolio website built with React, Node.js, Express, and MySQL.

> **🚀 New here?** Start with [START_HERE.md](START_HERE.md) for a quick overview and setup guide!

## Features

- Public pages (Home, About, Projects, Contact)
- Admin dashboard with authentication
- Profile management with image upload
- Projects CRUD with pagination
- Contact form with database storage
- JWT authentication & role-based access
- Dark/Light theme toggle
- Responsive design
- Cloudinary integration for images

## Tech Stack

**Frontend:** React, React Router, Axios
**Backend:** Node.js, Express, MySQL
**Security:** JWT, bcrypt, CORS, rate limiting
**Storage:** Cloudinary (images), MySQL (data)

## Setup Instructions

### 1. Database Setup

```bash
mysql -u root -p
```

Run the SQL schema:
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file (copy from `.env.example`):
```bash
cp ../.env.example .env
```

Update `.env` with your credentials:
- Database credentials
- JWT secret
- Cloudinary credentials (optional)

Generate admin password hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
```

Update the hash in `database/schema.sql` and re-run the INSERT statement.

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start
```

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

## Project Structure

```
portfolio/
├── backend/
│   ├── config/          # Database & Cloudinary config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, upload, error handling
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       ├── utils/       # API utilities
│       └── App.js       # Main app
└── database/
    └── schema.sql       # Database schema
```

## License

MIT
