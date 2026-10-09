# 🔧 Deployment Troubleshooting Guide

Common issues and their solutions when deploying to Vercel and Render.

---

## 🖥️ Backend (Render) Issues

### ❌ Build Failed

**Error**: `npm install` fails

**Solutions**:
```bash
# Check package.json is valid JSON
# Ensure all dependencies are listed
# Verify Node version compatibility

# In Render settings, try setting:
Node Version: 18.x
```

**Error**: `Cannot find module`

**Solutions**:
- Ensure the module is in `dependencies`, not `devDependencies`
- Check if `node_modules` is in `.gitignore` (it should be)
- Verify import paths are correct

---

### ❌ Service Crashes on Start

**Error**: `Error: Cannot connect to database`

**Solutions**:
1. Verify database credentials in environment variables:
   ```
   DB_HOST=correct-host
   DB_USER=correct-user
   DB_PASSWORD=correct-password
   DB_NAME=correct-database-name
   ```

2. Check database is running and accessible

3. For PlanetScale, ensure connection string format:
   ```
   mysql://username:password@host/database?ssl={"rejectUnauthorized":true}
   ```

4. Test connection manually using database client

**Error**: `JWT_SECRET is not defined`

**Solutions**:
- Go to Render → Environment → Add variable:
  ```
  JWT_SECRET=your-strong-secret-key
  ```
- Redeploy service

**Error**: `Port already in use`

**Solutions**:
- Render assigns port automatically via PORT env variable
- Ensure your server.js uses: `process.env.PORT || 5000`
- Don't hardcode port numbers

---

### ❌ CORS Errors

**Error**: `Access-Control-Allow-Origin header is missing`

**Solutions**:

1. **Update CLIENT_URL** in Render environment:
   ```
   CLIENT_URL=https://your-exact-vercel-url.vercel.app
   ```
   (No trailing slash!)

2. **Check backend CORS config** in `server.js`:
   ```javascript
   const cors = require('cors');
   app.use(cors({
     origin: process.env.CLIENT_URL,
     credentials: true
   }));
   ```

3. **If using multiple domains**, update to array:
   ```javascript
   origin: [process.env.CLIENT_URL, 'https://other-domain.com']
   ```

4. **Redeploy** after changing environment variables

---

### ❌ Slow Response / Timeout

**Cause**: Free tier sleeps after 15 minutes of inactivity

**Solutions**:

1. **First request**: Wait 30-60 seconds for service to wake up
2. **Upgrade to paid plan** to prevent sleeping
3. **Use cron job** to ping service every 10 minutes (keep-alive):
   ```bash
   # Use service like cron-job.org or UptimeRobot
   # Ping: https://your-backend.onrender.com/api/health
   ```

**Error**: `Request timeout`

**Solutions**:
- Optimize database queries
- Add indexes to frequently queried columns
- Check for N+1 query problems
- Increase timeout in Render settings

---

### ❌ Environment Variables Not Working

**Problem**: Variables show as undefined

**Solutions**:

1. **Check spelling** - environment variable names are case-sensitive
2. **No quotes** - Enter values without quotes in Render dashboard
3. **Special characters** - Escape or use Render's secret feature
4. **Redeploy** - Changes require redeployment
5. **Restart** - Try manual restart from dashboard

---

## 🌐 Frontend (Vercel) Issues

### ❌ Build Failed

**Error**: `npm run build` fails

**Solutions**:

1. **Test locally first**:
   ```bash
   cd frontend
   npm run build
   ```
   Fix any errors that appear

2. **Check for**:
   - Linting errors (warnings are OK)
   - Import errors
   - Missing dependencies
   - Environment variables

3. **Clear cache** in Vercel:
   - Deployments → Your deployment → ⋮ Menu → Redeploy → Clear cache

**Error**: `Module not found`

**Solutions**:
- Check import paths use correct casing
- Ensure file extensions are included where needed
- Verify file exists at import path

---

### ❌ Environment Variable Issues

**Problem**: `REACT_APP_API_URL` is undefined

**Solutions**:

1. **Must start with `REACT_APP_`** - React requirement
2. **Add in Vercel dashboard**:
   - Settings → Environment Variables → Add
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend.onrender.com/api`
   - Environment: Production ✓
3. **Redeploy** - Changes require new deployment
4. **Check in build logs** - Should show during build

**Problem**: API calls go to wrong URL

**Solutions**:
- Build-time vs Runtime: React env vars are baked in at build time
- Redeploy after changing env vars
- Check browser console for actual URL being called

---

### ❌ 404 Errors on Page Refresh

**Problem**: Refreshing `/about` returns 404

**Solutions**:

1. **Verify `vercel.json` exists** in project root with correct routing:
   ```json
   {
     "routes": [
       { "src": "/(.*)", "dest": "/frontend/build/index.html" }
     ]
   }
   ```

2. **Check Root Directory** setting:
   - Should be `frontend` if structure is: `/frontend/src/...`
   - Check Project Settings → General → Root Directory

3. **Verify Build Output**:
   - Settings → General → Output Directory: `build`

---

### ❌ Assets Not Loading

**Problem**: CSS/JS files return 404

**Solutions**:

1. **Check `homepage` in package.json**:
   ```json
   {
     "homepage": "."
   }
   ```
   Or remove homepage field entirely

2. **Verify vercel.json routes**:
   ```json
   {
     "src": "/static/(.*)",
     "dest": "/frontend/build/static/$1"
   }
   ```

3. **Check build folder structure**:
   - Should have `/static/css/` and `/static/js/`

**Problem**: Images not loading

**Solutions**:
- Use relative paths: `./images/photo.jpg`
- Or absolute from public: `/images/photo.jpg`
- Or import in JS: `import logo from './logo.png'`

---

### ❌ Blank Page After Deployment

**Problem**: Page loads but shows nothing

**Solutions**:

1. **Open browser console** - check for errors
2. **Common causes**:
   - API URL incorrect
   - CORS blocking requests
   - JavaScript errors
   - Missing environment variables

3. **Check Network tab**:
   - Are API calls succeeding?
   - What status codes returned?
   - Check request/response

4. **Compare to local**:
   ```bash
   cd frontend
   REACT_APP_API_URL=https://your-backend.onrender.com/api npm start
   ```

---

## 🔗 Integration Issues

### ❌ Frontend Can't Reach Backend

**Checklist**:

1. **Test backend directly** in browser:
   ```
   https://your-backend.onrender.com/api/health
   ```
   Should return JSON response

2. **Check REACT_APP_API_URL**:
   - Correct URL? (copy from Render dashboard)
   - Ends with `/api`? (no trailing slash after api)
   - HTTPS? (not HTTP)

3. **Check CORS** in browser console:
   - Should NOT see CORS errors
   - If yes, fix CLIENT_URL in Render

4. **Check network**:
   - Open DevTools → Network
   - Try API call
   - Check request URL
   - Check response

---

### ❌ Authentication Not Working

**Problem**: Login succeeds but dashboard redirects to login

**Solutions**:

1. **Check JWT cookie/storage**:
   - DevTools → Application → Storage
   - Should see token stored
   - Check token expiry

2. **Check CORS credentials**:
   ```javascript
   // Backend
   cors({ credentials: true })
   
   // Frontend axios calls
   axios.defaults.withCredentials = true;
   ```

3. **Check JWT_SECRET**:
   - Same secret on all backend instances
   - Strong and unique

**Problem**: Token expires too quickly

**Solutions**:
- Update JWT_EXPIRE in Render: `JWT_EXPIRE=7d`
- Implement refresh token mechanism

---

### ❌ Images Not Uploading

**Problem**: Cloudinary upload fails

**Solutions**:

1. **Verify Cloudinary env vars** in Render:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

2. **Check Cloudinary account**:
   - Is it active?
   - Quota not exceeded?
   - Credentials correct?

3. **Check file size limits**:
   - Multer limit in upload.js
   - Cloudinary plan limits

4. **Alternative**: Use Render's persistent disk or S3

---

## 🗄️ Database Issues

### ❌ Cannot Connect

**Solutions**:

1. **PlanetScale**:
   - Check branch is not asleep
   - Verify connection string format
   - Enable SSL/TLS

2. **Railway**:
   - Database provisioned?
   - Check connection variables
   - Network accessible?

3. **Connection string format**:
   ```javascript
   // mysql2 format
   {
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     ssl: { rejectUnauthorized: true }
   }
   ```

---

### ❌ Queries Failing

**Error**: `Table doesn't exist`

**Solutions**:
- Run SQL migration scripts:
  - `complete_setup.sql`
  - `add_skills_table.sql`
- Check database selected
- Verify table names match queries

**Error**: `Column doesn't exist`

**Solutions**:
- Check schema matches code
- Run latest migrations
- Compare local vs production schema

---

## 🐛 General Debugging Steps

### Step-by-Step Debugging:

1. **Check logs**:
   - Render: Dashboard → Logs
   - Vercel: Deployments → Your deployment → Build Logs
   - Browser: DevTools Console

2. **Test backend separately**:
   ```bash
   # Use curl or Postman
   curl https://your-backend.onrender.com/api/health
   ```

3. **Test frontend separately**:
   ```bash
   # Run locally with production API
   cd frontend
   REACT_APP_API_URL=https://your-backend.onrender.com/api npm start
   ```

4. **Check environment**:
   - All variables set?
   - Values correct? (no typos)
   - Services redeployed after changes?

5. **Compare with working local setup**:
   - What's different?
   - Missing configuration?
   - Different versions?

---

## 🆘 Still Stuck?

### Get Help:

1. **Check service status**:
   - https://www.vercel-status.com/
   - https://status.render.com/

2. **Review documentation**:
   - Vercel: https://vercel.com/docs
   - Render: https://render.com/docs

3. **Search issues**:
   - GitHub issues for similar problems
   - Stack Overflow
   - Service-specific forums

4. **Contact support**:
   - Vercel support (if paid plan)
   - Render community Slack
   - Twitter/Discord communities

### Information to Include When Asking for Help:

- Error message (full text)
- Build/runtime logs
- Environment configuration (redact secrets!)
- Steps you've already tried
- Expected vs actual behavior

---

## 📊 Monitoring Tools

**Prevent issues before they happen:**

- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry, LogRocket
- **Analytics**: Google Analytics, Vercel Analytics
- **Logging**: Better Stack, Papertrail

---

Remember: Most deployment issues are configuration problems. Double-check environment variables, URLs, and CORS settings! 🎯
