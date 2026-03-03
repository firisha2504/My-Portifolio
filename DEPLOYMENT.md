# Deployment Guide

This guide covers deploying your portfolio to production.

## Prerequisites

- GitHub account
- Domain name (optional but recommended)
- Credit card for hosting services (most have free tiers)

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend + Database) - RECOMMENDED

**Best for:** Easy deployment, free tier available, automatic SSL

#### Step 1: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your portfolio repository

3. **Add MySQL Database**
   - In your project, click "New"
   - Select "Database" → "MySQL"
   - Railway will create a MySQL instance

4. **Configure Backend Service**
   - Click on your backend service
   - Go to "Variables" tab
   - Add these environment variables:
     ```
     NODE_ENV=production
     PORT=5000
     DB_HOST=<from Railway MySQL>
     DB_USER=<from Railway MySQL>
     DB_PASSWORD=<from Railway MySQL>
     DB_NAME=<from Railway MySQL>
     JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_characters
     JWT_EXPIRE=7d
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     CLIENT_URL=https://your-frontend-url.vercel.app
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASSWORD=your_app_password
     EMAIL_FROM_NAME=Your Portfolio
     ```

5. **Set Root Directory**
   - In Settings → "Root Directory" → Set to `backend`
   - In Settings → "Start Command" → Set to `node server.js`

6. **Deploy**
   - Railway will automatically deploy
   - Copy your backend URL (e.g., `https://your-app.railway.app`)

7. **Import Database**
   - Go to Railway MySQL service
   - Click "Connect"
   - Use the connection details to connect via MySQL client
   - Import `database/complete_setup.sql`

#### Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com/
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select "frontend" as root directory

3. **Configure Build Settings**
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Add Environment Variable**
   - Go to Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend.railway.app/api
     ```

5. **Update Frontend API Configuration**
   - Before deploying, update `frontend/src/utils/api.js`:
   ```javascript
   const API = axios.create({
     baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```

6. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your frontend
   - You'll get a URL like `https://your-portfolio.vercel.app`

7. **Update Backend CORS**
   - Go back to Railway backend
   - Update `CLIENT_URL` environment variable to your Vercel URL

---

### Option 2: Heroku (Full Stack)

**Best for:** All-in-one deployment

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-portfolio-name
   ```

4. **Add MySQL Database**
   ```bash
   heroku addons:create jawsdb:kitefin
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_secret
   heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
   # ... add all other variables
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

---

### Option 3: DigitalOcean / AWS / VPS

**Best for:** Full control, custom domain

1. **Create Droplet/EC2 Instance**
   - Ubuntu 22.04 LTS
   - At least 1GB RAM

2. **SSH into Server**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Dependencies**
   ```bash
   # Update system
   apt update && apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs

   # Install MySQL
   apt install -y mysql-server

   # Install Nginx
   apt install -y nginx

   # Install PM2
   npm install -g pm2
   ```

4. **Clone Repository**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/your-portfolio.git
   cd your-portfolio
   ```

5. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   nano .env  # Edit with production values
   ```

6. **Setup Database**
   ```bash
   mysql -u root -p
   # Run database/complete_setup.sql
   ```

7. **Build Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run build
   ```

8. **Configure Nginx**
   ```bash
   nano /etc/nginx/sites-available/portfolio
   ```

   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       # Frontend
       location / {
           root /var/www/your-portfolio/frontend/build;
           try_files $uri /index.html;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       # Uploads
       location /uploads {
           alias /var/www/your-portfolio/backend/uploads;
       }
   }
   ```

   Enable site:
   ```bash
   ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

9. **Start Backend with PM2**
   ```bash
   cd /var/www/your-portfolio/backend
   pm2 start server.js --name portfolio-backend
   pm2 startup
   pm2 save
   ```

10. **Setup SSL (Free with Let's Encrypt)**
    ```bash
    apt install -y certbot python3-certbot-nginx
    certbot --nginx -d your-domain.com
    ```

---

## Post-Deployment Checklist

- [ ] Test all features (login, projects, contact form)
- [ ] Verify email sending works
- [ ] Check file uploads work
- [ ] Test password reset
- [ ] Verify SSL certificate
- [ ] Update GitHub repository URL in footer
- [ ] Update contact information
- [ ] Test on mobile devices
- [ ] Check page load speed
- [ ] Setup monitoring (optional)

---

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=portfolio_db
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=https://your-frontend-domain.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM_NAME=Your Portfolio
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

---

## Troubleshooting

### CORS Errors
- Make sure `CLIENT_URL` in backend matches your frontend URL exactly
- Check backend CORS configuration in `server.js`

### Database Connection Failed
- Verify database credentials
- Check if database server is running
- Ensure database is accessible from your backend server

### File Upload Not Working
- Check Cloudinary credentials
- Verify file size limits
- Check server disk space

### Email Not Sending
- Verify Gmail app password
- Check if 2-Step Verification is enabled
- Try using a different email service

---

## Recommended: Use Docker (Advanced)

Your project includes `docker-compose.yml`. To deploy with Docker:

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Support

If you encounter issues during deployment, check:
1. Server logs
2. Browser console
3. Network tab in DevTools
4. Backend terminal output

Good luck with your deployment! 🚀
