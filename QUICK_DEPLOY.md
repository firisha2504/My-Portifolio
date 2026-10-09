# ⚡ Quick Deploy Checklist

Follow these steps in order for the fastest deployment.

## ✅ Pre-Deployment Checklist

- [ ] Code is working locally
- [ ] All changes committed to GitHub
- [ ] Environment variables documented
- [ ] Database schema finalized

---

## 🗄️ Step 1: Setup Database (Choose One)

### PlanetScale (Easiest - MySQL)
1. Sign up at https://planetscale.com
2. Create new database → "my-portfolio-db"
3. Click "Connect" → Copy credentials
4. Use web console to run:
   - `database/complete_setup.sql`
   - `database/add_skills_table.sql`

### Railway (Alternative - MySQL)
1. Sign up at https://railway.app
2. New Project → Add MySQL
3. Copy connection details
4. Use their console to run SQL scripts

---

## 🖥️ Step 2: Deploy Backend (Render)

1. **Go to**: https://dashboard.render.com/
2. **Click**: New + → Web Service
3. **Connect**: Your GitHub repo
4. **Configure**:
   ```
   Name: my-portfolio-backend
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

5. **Environment Variables** (click "Add Environment Variable"):
   ```
   NODE_ENV=production
   PORT=10000
   DB_HOST=[from database step]
   DB_USER=[from database step]
   DB_PASSWORD=[from database step]
   DB_NAME=[from database step]
   JWT_SECRET=[generate strong random string]
   JWT_EXPIRE=7d
   CLIENT_URL=[leave blank for now, update after Vercel]
   CLOUDINARY_CLOUD_NAME=[optional]
   CLOUDINARY_API_KEY=[optional]
   CLOUDINARY_API_SECRET=[optional]
   EMAIL_USER=[optional]
   EMAIL_PASSWORD=[optional]
   ```

6. **Deploy**: Click "Create Web Service"
7. **Wait**: 3-5 minutes for first deployment
8. **Copy URL**: `https://your-app-name.onrender.com`

---

## 🌐 Step 3: Deploy Frontend (Vercel)

### Update Configuration First:

1. **Edit**: `frontend/.env.production`
   ```env
   REACT_APP_API_URL=https://your-backend-name.onrender.com/api
   ```
   (Replace with your actual Render URL from Step 2)

2. **Commit**:
   ```bash
   git add frontend/.env.production
   git commit -m "Update production API URL"
   git push origin main
   ```

### Deploy to Vercel:

3. **Go to**: https://vercel.com/new
4. **Import**: Your GitHub repository
5. **Configure**:
   ```
   Framework: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   ```

6. **Environment Variable**:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-name.onrender.com/api`

7. **Deploy**: Click "Deploy"
8. **Wait**: 2-3 minutes
9. **Copy URL**: `https://your-project.vercel.app`

---

## 🔄 Step 4: Update Backend CORS

1. **Go back to**: Render dashboard
2. **Select**: Your backend service
3. **Environment**: Add/Update variable
   ```
   CLIENT_URL=https://your-project.vercel.app
   ```
4. **Save**: Service will auto-redeploy

---

## 🎯 Step 5: Initialize Application

### Option A: Use Render Shell
1. Render Dashboard → Your Service → Shell
2. Run:
   ```bash
   cd backend
   node setup-skills.js
   ```

### Option B: Manually via Database
Create admin user directly in your database using the admin credentials.

---

## ✨ Step 6: Test Your Deployment

Visit your Vercel URL and test:

1. **Home Page**: Should load without errors
2. **Contact Form**: Send a test message (`/contact`)
3. **Login**: Try admin login (`/login`)
4. **Dashboard**: Verify dashboard access (`/dashboard`)
5. **About Page**: Check if profile loads (`/about`)

---

## 🚨 Common Issues & Quick Fixes

### "Cannot connect to backend"
- ✅ Check `REACT_APP_API_URL` in Vercel environment variables
- ✅ Verify backend is running (visit backend URL directly)
- ✅ Check browser console for CORS errors

### "Database connection failed"
- ✅ Verify database credentials in Render environment
- ✅ Check if database is running
- ✅ Ensure database allows connections from Render IPs

### "Render service sleeping"
- Free tier sleeps after 15 min inactivity
- First request wakes it up (takes 30-60 seconds)
- Upgrade to paid plan to prevent sleeping

### "404 on page refresh"
- ✅ Verify `vercel.json` is in root directory
- ✅ Check routing configuration

---

## 📱 URLs After Deployment

Save these for reference:

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **Admin Panel**: `https://your-project.vercel.app/dashboard`
- **API Docs**: `https://your-backend.onrender.com/api`

---

## 🎊 You're Live!

Total time: ~20 minutes

Both services will auto-deploy on future git pushes to `main` branch.

**Next Steps**:
- Update your resume/LinkedIn with the live URL
- Share with potential employers
- Monitor using Vercel & Render dashboards
- Consider custom domain (available in both platforms)

Need help? Check `DEPLOYMENT_GUIDE.md` for detailed troubleshooting.
