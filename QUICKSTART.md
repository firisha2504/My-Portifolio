# Quick Start Guide

Get your portfolio running in 5 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- MySQL 8.0+ ([Download](https://dev.mysql.com/downloads/))
- Git ([Download](https://git-scm.com/))

## Option 1: Automated Setup (Linux/Mac)

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Run setup script
chmod +x setup.sh
./setup.sh
```

## Option 2: Manual Setup (All Platforms)

### Step 1: Database Setup (2 minutes)

```bash
# Login to MySQL
mysql -u root -p

# Create database and tables
CREATE DATABASE portfolio_db;
USE portfolio_db;
SOURCE database/schema.sql;
EXIT;
```

### Step 2: Backend Setup (2 minutes)

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your database credentials
# Update: DB_HOST, DB_USER, DB_PASSWORD, JWT_SECRET

# Generate admin password hash
npm run hash admin123

# Update the hash in database/schema.sql and re-run the INSERT statement

# Seed database
npm run seed

# Start backend
npm run dev
```

Backend should now be running on http://localhost:5000

### Step 3: Frontend Setup (1 minute)

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start frontend
npm start
```

Frontend should now be running on http://localhost:3000

## Option 3: Docker Setup (Easiest)

```bash
# Clone repository
git clone <your-repo-url>
cd portfolio

# Update environment variables in docker-compose.yml

# Start all services
docker-compose up -d

# Seed database
docker exec -it portfolio_backend npm run seed
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## First Steps

1. Open http://localhost:3000
2. Click "Login" and use:
   - Email: `admin@portfolio.com`
   - Password: `admin123`
3. Go to Dashboard → Profile
4. Update your information
5. Add your projects
6. Change your password!

## Common Issues

### Database Connection Error
```bash
# Check MySQL is running
sudo systemctl status mysql  # Linux
brew services list           # Mac
```

### Port Already in Use
```bash
# Backend (port 5000)
lsof -ti:5000 | xargs kill -9

# Frontend (port 3000)
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Reinstall dependencies
cd backend && rm -rf node_modules && npm install
cd frontend && rm -rf node_modules && npm install
```

## Next Steps

- [ ] Update profile information
- [ ] Add your projects
- [ ] Customize theme colors
- [ ] Configure Cloudinary for image hosting
- [ ] Deploy to production

## Need Help?

- Check [README.md](README.md) for detailed documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guides
- Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- Read [TESTING.md](TESTING.md) for testing instructions

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Heroku deployment
- Vercel/Netlify deployment
- VPS deployment
- Docker deployment
- Security checklist

---

**Congratulations! Your portfolio is now running! 🎉**
