# 🚀 Deployment Guide

This guide will help you deploy your portfolio application using:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: PlanetScale, Railway, or Render PostgreSQL

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Render account (sign up at https://render.com)
- Database service account (PlanetScale, Railway, or use Render's PostgreSQL)

---

## Part 1: Database Setup

### Option A: PlanetScale (Recommended - MySQL)

1. **Create Database**:
   - Go to https://planetscale.com
   - Create a new database (free tier available)
   - Note your database credentials

2. **Initialize Schema**:
   - Connect to your database using the CLI or web console
   - Run the SQL scripts:
     ```bash
     # Run complete_setup.sql first
     # Then run add_skills_table.sql
     ```

3. **Get Connection String**:
   - Format: `mysql://username:password@host/database?ssl={"rejectUnauthorized":true}`

### Option B: Railway (MySQL)

1. Go to https://railway.app
2. Create new project → Add MySQL
3. Copy connection details from the MySQL service
4. Use Railway's web console to run your SQL scripts

### Option C: Render PostgreSQL

1. In Render dashboard, create a new PostgreSQL database
2. Note: You'll need to convert MySQL queries to PostgreSQL syntax
3. Get the connection string from Render

---

## Part 2: Backend Deployment (Render)

### Step 1: Prepare Repository

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy on Render

1. **Create Web Service**:
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

2. **Configure Service**:
   ```
   Name: my-portfolio-backend
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

3. **Set Environment Variables** (in Render dashboard):
   
   Click "Environment" and add these variables:

   ```
   NODE_ENV=production
   PORT=10000
   
   # Database (from Part 1)
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   
   # JWT
   JWT_SECRET=generate-a-strong-random-string-here
   JWT_EXPIRE=7d
   
   # Cloudinary (if using image uploads)
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   
   # Email (optional - for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM_NAME=Portfolio
   
   # Frontend URL (will update after Vercel deployment)
   CLIENT_URL=https://your-frontend.vercel.app
   ```

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-app-name.onrender.com`

### Step 3: Test Backend

Once deployed, test your API:
```
https://your-backend-name.onrender.com/api/health
```

---

## Part 3: Frontend Deployment (Vercel)

### Step 1: Update Frontend Configuration

1. **Update `.env.production`** (already done):
   ```env
   REACT_APP_API_URL=https://your-backend-name.onrender.com/api
   ```
   Replace `your-backend-name` with your actual Render service name.

2. **Commit changes**:
   ```bash
   git add frontend/.env.production
   git commit -m "Update production API URL"
   git push origin main
   ```

### Step 2: Deploy on Vercel

#### Method 1: Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. Add Environment Variable:
   - Go to Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-name.onrender.com/api`

5. Click "Deploy"

#### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

### Step 3: Update Backend CORS

After Vercel deployment, update your Render backend:

1. Go to Render dashboard → Your backend service → Environment
2. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL=https://your-project.vercel.app
   ```
3. Save and redeploy

---

## Part 4: Post-Deployment Setup

### 1. Initialize Admin User

SSH into your Render service or use Render shell:

```bash
# Using Render Shell (available in dashboard)
cd backend
node setup-skills.js
```

Or manually create admin user in your database.

### 2. Test Complete Flow

1. Visit your Vercel frontend URL
2. Try logging in at `/login`
3. Test contact form at `/contact`
4. Verify dashboard functionality

### 3. Update Security

1. **Change default credentials** in database
2. **Verify JWT_SECRET** is strong and unique
3. **Enable Cloudinary** for image uploads
4. **Test email** notifications

---

## 🔧 Configuration Files Reference

### Backend (Render) - render.yaml
- Already configured in your project
- Defines build and start commands
- Lists required environment variables

### Frontend (Vercel) - vercel.json
- Already configured in your project
- Handles routing for SPA
- Points to build directory

---

## 📝 Environment Variables Checklist

### Backend (Render)
- ✅ NODE_ENV
- ✅ PORT
- ✅ DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
- ✅ JWT_SECRET, JWT_EXPIRE
- ✅ CLIENT_URL
- ⚠️ CLOUDINARY_* (optional but recommended)
- ⚠️ EMAIL_* (optional)

### Frontend (Vercel)
- ✅ REACT_APP_API_URL

---

## 🐛 Troubleshooting

### Backend Issues

**Build fails on Render:**
- Check Node version compatibility
- Verify all dependencies are in package.json
- Check Render build logs

**Database connection fails:**
- Verify database credentials
- Check if database accepts connections from Render IPs
- Ensure SSL is configured correctly

**CORS errors:**
- Update CLIENT_URL in Render environment variables
- Verify Vercel URL is correct
- Check backend CORS configuration in server.js

### Frontend Issues

**Build fails on Vercel:**
- Check React Scripts version
- Verify all dependencies install correctly
- Review Vercel build logs

**API calls fail:**
- Verify REACT_APP_API_URL is correct
- Check browser console for errors
- Test backend URL directly in browser

**404 on page refresh:**
- Verify vercel.json routing configuration is correct
- Should already be configured properly

---

## 🔄 Continuous Deployment

Both Vercel and Render are now connected to your GitHub repository:

- **Push to main branch** → Automatic deployment
- **Pull requests** → Vercel creates preview deployments
- **Monitor deployments** in respective dashboards

---

## 📊 Monitoring

### Render
- View logs: Dashboard → Your Service → Logs
- Monitor usage: Dashboard → Your Service → Metrics

### Vercel
- View deployments: Dashboard → Your Project → Deployments
- Analytics: Dashboard → Your Project → Analytics

---

## 💰 Cost Estimates (Free Tiers)

- **Vercel**: Free for personal projects
- **Render**: Free tier includes 750 hours/month (enough for one service)
- **PlanetScale**: Free tier includes 5GB storage
- **Railway**: $5 free credit per month

**Note**: Render free tier sleeps after 15 minutes of inactivity. First request after sleep takes 30-60 seconds.

---

## 🎉 You're Done!

Your portfolio is now live:
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.onrender.com`

Share your portfolio with the world! 🌟
