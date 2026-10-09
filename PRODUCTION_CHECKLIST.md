# 📋 Production Deployment Checklist

Use this checklist before going live to ensure everything is configured correctly.

## 🔐 Security

- [ ] **JWT_SECRET** is a strong random string (min 32 characters)
- [ ] **Database password** is strong and unique
- [ ] **Email credentials** use app-specific passwords (not main password)
- [ ] **Admin password** is changed from default
- [ ] **.env files** are in .gitignore (never committed)
- [ ] **CORS** is restricted to your frontend domain only
- [ ] **Rate limiting** is enabled in backend
- [ ] **Helmet.js** security headers are active

## 🗄️ Database

- [ ] Database is hosted on reliable service (PlanetScale/Railway/Render)
- [ ] All SQL scripts executed successfully
  - [ ] `complete_setup.sql`
  - [ ] `add_skills_table.sql`
- [ ] Admin user created
- [ ] Test data verified
- [ ] Backups configured
- [ ] Connection string tested

## 🖥️ Backend (Render)

- [ ] Service deployed successfully
- [ ] All environment variables set:
  - [ ] NODE_ENV=production
  - [ ] PORT=10000
  - [ ] DB_* (all database credentials)
  - [ ] JWT_SECRET & JWT_EXPIRE
  - [ ] CLIENT_URL (Vercel URL)
  - [ ] CLOUDINARY_* (if using)
  - [ ] EMAIL_* (if using)
- [ ] Build completes without errors
- [ ] Service starts without crashes
- [ ] Health endpoint responds: `/api/health`
- [ ] API endpoints tested manually

## 🌐 Frontend (Vercel)

- [ ] Service deployed successfully
- [ ] Environment variable set:
  - [ ] REACT_APP_API_URL (Render backend URL)
- [ ] Build completes without errors
- [ ] All pages load correctly:
  - [ ] Home (`/`)
  - [ ] About (`/about`)
  - [ ] Projects (`/projects`)
  - [ ] Contact (`/contact`)
  - [ ] Login (`/login`)
  - [ ] Dashboard (`/dashboard`)
- [ ] SPA routing works (no 404 on refresh)
- [ ] Static assets load from `/static/`

## 🔗 Integration

- [ ] Frontend can reach backend API
- [ ] CORS configured correctly (no CORS errors in console)
- [ ] Authentication flow works:
  - [ ] Login successful
  - [ ] JWT token stored
  - [ ] Protected routes accessible
  - [ ] Logout works
- [ ] Contact form sends emails
- [ ] Image uploads work (if Cloudinary configured)
- [ ] All API calls succeed

## 🧪 Testing

- [ ] **Home Page**: Loads without errors
- [ ] **About Page**: Shows profile information
- [ ] **Projects Page**: Displays all projects
- [ ] **Contact Form**: 
  - [ ] Validates input
  - [ ] Sends message
  - [ ] Shows success message
  - [ ] Email received (if configured)
- [ ] **Login**:
  - [ ] Successful with correct credentials
  - [ ] Fails with incorrect credentials
  - [ ] Redirects to dashboard
- [ ] **Dashboard**:
  - [ ] Protected (redirects if not logged in)
  - [ ] All CRUD operations work:
    - [ ] Create project
    - [ ] Edit project
    - [ ] Delete project
    - [ ] Update profile
    - [ ] Manage skills
  - [ ] Image uploads work
  - [ ] Logout works
- [ ] **Mobile Responsive**: Test on different screen sizes
- [ ] **Browser Compatibility**: Test on Chrome, Firefox, Safari

## 📱 Performance

- [ ] Lighthouse audit run (aim for 90+):
  - [ ] Performance
  - [ ] Accessibility
  - [ ] Best Practices
  - [ ] SEO
- [ ] Images optimized
- [ ] No console errors in production
- [ ] Page load time acceptable (< 3 seconds)
- [ ] API response times acceptable (< 2 seconds)

## 🚀 Deployment Configuration

- [ ] **GitHub**: All code pushed to main branch
- [ ] **Vercel**: Connected to GitHub repo
- [ ] **Render**: Connected to GitHub repo
- [ ] **Auto-deploy**: Enabled on both platforms
- [ ] **Branch**: main branch selected for deployment
- [ ] **Build commands**: Verified in both configs

## 📝 Documentation

- [ ] README.md updated with live URLs
- [ ] API documentation complete
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Admin credentials stored securely

## 🔍 Monitoring

- [ ] **Render Dashboard**: 
  - [ ] Logs accessible
  - [ ] Metrics visible
  - [ ] Alerts configured (optional)
- [ ] **Vercel Dashboard**:
  - [ ] Deployment history visible
  - [ ] Analytics enabled
  - [ ] Error tracking active
- [ ] **Database**:
  - [ ] Connection monitoring
  - [ ] Storage usage checked

## 🌟 Final Checks

- [ ] **DNS**: Custom domain configured (if applicable)
- [ ] **SSL**: HTTPS enabled (automatic on Vercel/Render)
- [ ] **Favicon**: Shows correctly
- [ ] **Meta Tags**: SEO tags present
- [ ] **Social Preview**: OpenGraph tags for social sharing
- [ ] **404 Page**: Custom error page displays
- [ ] **Loading States**: All async operations show loading indicators
- [ ] **Error Messages**: User-friendly error messages display

## 📊 Post-Launch

- [ ] Live URL tested from different locations
- [ ] Live URL tested on different devices
- [ ] Shared with team/stakeholders
- [ ] Added to portfolio/resume
- [ ] Analytics tracking (Google Analytics, etc.)
- [ ] User feedback collected

## 🆘 Emergency Contacts

**Service Status Pages**:
- Vercel: https://www.vercel-status.com/
- Render: https://status.render.com/
- PlanetScale: https://status.planetscale.com/

**Rollback Plan**:
1. Vercel: Redeploy previous deployment from dashboard
2. Render: Redeploy previous deployment from dashboard
3. Database: Restore from backup

---

## ✅ Sign Off

- [ ] **Developer**: Tested and verified
- [ ] **Date**: _______________
- [ ] **Live URLs**:
  - Frontend: ___________________________________
  - Backend: ___________________________________
- [ ] **Ready for Production**: YES / NO

---

**Notes**: 
_Add any specific notes or known issues here_

---

When all items are checked, you're ready to share your portfolio with the world! 🎉
