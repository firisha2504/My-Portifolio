# 🚀 Quick Deploy Reference Card

Keep this handy during deployment.

---

## 📱 Service URLs

### Development
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- API: `http://localhost:5000/api`

### Production (Fill in after deployment)
- Frontend: `https://_________________________.vercel.app`
- Backend: `https://_________________________.onrender.com`
- API: `https://_________________________.onrender.com/api`
- Database: `_________________________________`

---

## 🔑 Environment Variables

### Backend (Render)

| Variable | Example | Required | Notes |
|----------|---------|----------|-------|
| NODE_ENV | `production` | ✅ | Always "production" |
| PORT | `10000` | ✅ | Render default |
| DB_HOST | `db.planetscale.com` | ✅ | From database service |
| DB_USER | `username` | ✅ | From database service |
| DB_PASSWORD | `********` | ✅ | From database service |
| DB_NAME | `portfolio_db` | ✅ | From database service |
| JWT_SECRET | `random_32+_chars` | ✅ | Generate strong key |
| JWT_EXPIRE | `7d` | ✅ | Token lifetime |
| CLIENT_URL | `https://app.vercel.app` | ✅ | Exact Vercel URL |
| CLOUDINARY_CLOUD_NAME | `your_cloud` | ⚠️ | If using images |
| CLOUDINARY_API_KEY | `123456789` | ⚠️ | If using images |
| CLOUDINARY_API_SECRET | `********` | ⚠️ | If using images |
| EMAIL_USER | `email@gmail.com` | ⚠️ | If using email |
| EMAIL_PASSWORD | `app_password` | ⚠️ | App-specific password |

### Frontend (Vercel)

| Variable | Example | Required |
|----------|---------|----------|
| REACT_APP_API_URL | `https://backend.onrender.com/api` | ✅ |

---

## 📋 Deploy Commands

### Render (Backend)
```
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### Vercel (Frontend)
```
Root Directory: frontend
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

---

## 🔍 Testing Endpoints

After deployment, test these URLs:

### Backend Health Check
```bash
curl https://your-backend.onrender.com/api/health
# Should return: {"success":true,"message":"API is running"}
```

### Backend API Endpoints
```bash
# Get projects (public)
curl https://your-backend.onrender.com/api/projects

# Get profile (public)
curl https://your-backend.onrender.com/api/profile

# Login (requires valid credentials)
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your_password"}'
```

### Frontend Pages
- Home: `https://your-app.vercel.app/`
- About: `https://your-app.vercel.app/about`
- Projects: `https://your-app.vercel.app/projects`
- Contact: `https://your-app.vercel.app/contact`
- Login: `https://your-app.vercel.app/login`
- Dashboard: `https://your-app.vercel.app/dashboard`

---

## 🗄️ Database Setup Commands

### Using Database Console (PlanetScale/Railway)

1. Run `complete_setup.sql` first
2. Run `add_skills_table.sql` second

### Or Using Command Line

```bash
# PlanetScale CLI
pscale shell portfolio-db main < database/complete_setup.sql
pscale shell portfolio-db main < database/add_skills_table.sql

# MySQL CLI (if direct access)
mysql -h HOST -u USER -p DATABASE < database/complete_setup.sql
mysql -h HOST -u USER -p DATABASE < database/add_skills_table.sql
```

---

## 🔐 Generate Strong Secrets

### JWT Secret (32+ characters)
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Python
python -c "import secrets; print(secrets.token_hex(32))"

# OpenSSL
openssl rand -hex 32
```

### Password Hash for Admin User
```bash
# If needed, run locally first
cd backend
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your_password', 10).then(console.log)"
```

---

## ⚡ Common Issues Quick Fix

| Issue | Solution |
|-------|----------|
| CORS Error | Update CLIENT_URL in Render with exact Vercel URL |
| 404 on refresh | Check vercel.json routing config exists |
| Can't connect to API | Verify REACT_APP_API_URL in Vercel env vars |
| Database error | Check all DB_* variables in Render |
| Service sleeping | Free tier - wait 30-60s or upgrade |
| Build fails | Check logs, verify dependencies, test locally |
| Blank page | Open browser console, check for errors |

---

## 📞 Dashboard Links

### Render
- Dashboard: https://dashboard.render.com
- Your Services: https://dashboard.render.com/web
- Logs: Click service → Logs tab
- Environment: Click service → Environment tab

### Vercel
- Dashboard: https://vercel.com/dashboard
- Your Projects: https://vercel.com/dashboard
- Deployments: Click project → Deployments
- Settings: Click project → Settings

### Database Services
- PlanetScale: https://app.planetscale.com
- Railway: https://railway.app
- Render PostgreSQL: https://dashboard.render.com

---

## 🔄 Redeploy After Changes

### Git Push (Automatic)
```bash
git add .
git commit -m "Update configuration"
git push origin main
# Both services auto-deploy
```

### Manual Redeploy
- **Render**: Dashboard → Service → Manual Deploy → Deploy latest commit
- **Vercel**: Dashboard → Project → Deployments → Redeploy

### Environment Variable Changes
1. Update variable in dashboard
2. Save changes
3. Service auto-redeploys (Render) or click Redeploy (Vercel)

---

## ✅ Deployment Checklist (Minimum)

- [ ] Database created and migrations run
- [ ] Backend deployed with all env vars
- [ ] Backend URL tested (health check)
- [ ] Frontend .env.production updated with backend URL
- [ ] Frontend deployed with env vars
- [ ] Frontend URL tested (home page loads)
- [ ] CLIENT_URL updated in backend with frontend URL
- [ ] Backend redeployed after CLIENT_URL update
- [ ] Login tested
- [ ] Contact form tested
- [ ] Admin dashboard accessible

---

## 🆘 Emergency Rollback

### Vercel
1. Go to Deployments
2. Find last working deployment
3. Click ⋮ menu → Promote to Production

### Render
1. Go to Service → Events
2. Find last successful deploy
3. Click Redeploy

### Database
1. Use backup from your database service
2. Or re-run SQL scripts from known-good state

---

## 📊 Monitoring (Post-Launch)

### Set Up Uptime Monitoring
- **UptimeRobot** (free): https://uptimerobot.com
  - Add: `https://your-backend.onrender.com/api/health`
  - Add: `https://your-frontend.vercel.app`
  - Check every 5 minutes

### Check Service Health
- Render: Dashboard → Service → Metrics
- Vercel: Dashboard → Project → Analytics
- Database: Service-specific monitoring

---

## 💡 Pro Tips

1. **Save your URLs** immediately after deployment
2. **Test thoroughly** before sharing publicly
3. **Keep credentials secure** - never commit .env files
4. **Monitor the free tier** usage to avoid surprises
5. **Set up alerts** for downtime
6. **Document** any custom configuration
7. **Regular backups** of database
8. **Update dependencies** regularly for security

---

## 🎉 Post-Deployment

After successful deployment:

1. **Update your resume** with live URL
2. **Add to LinkedIn** projects section
3. **Share on Twitter/social media**
4. **Add to portfolio** listings (GitHub profile, etc.)
5. **Monitor** for first few days
6. **Gather feedback** from users
7. **Iterate and improve**

---

**Need detailed help?** Check:
- `DEPLOYMENT_GUIDE.md` - Complete walkthrough
- `QUICK_DEPLOY.md` - Step-by-step checklist
- `DEPLOYMENT_TROUBLESHOOTING.md` - Fix common issues
- `PRODUCTION_CHECKLIST.md` - Pre-launch verification

**Last updated**: Your deployment date here
