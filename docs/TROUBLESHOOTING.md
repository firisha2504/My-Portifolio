# 🔧 Troubleshooting Guide

Common issues and solutions for your portfolio application.

---

## 🚨 Port 5000 Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

### Quick Fix (Windows)
```bash
# Double-click or run:
.\scripts\kill-port-5000.bat
```

### Manual Fix
```powershell
# Find process
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <process_id> /F
```

---

## 🔴 Skills Not Loading (500 Error)

**Error:**
```
500 Internal Server Error
GET /api/skills
```

**Cause:** Skills table doesn't exist in database

**Solution:**

### Option 1: Run Setup Script
```bash
cd backend
node setup-skills.js
```

### Option 2: Run SQL Manually
```bash
mysql -u root -p portfolio_db < database/add_skills_table.sql
```

**Then restart backend:**
```bash
cd backend
npm run dev
```

---

## 📧 Email Not Sending / Reply Not Working

**Symptoms:**
- Success message shows but no email received
- "Email not configured" message

**Solutions:**

### 1. Check Email Configuration

Verify `backend/.env` has real credentials:
```env
EMAIL_USER=your.email@gmail.com          # Real email
EMAIL_PASSWORD=your_app_password         # 16-char App Password
EMAIL_FROM_NAME=Your Name
```

**Common mistakes:**
- ❌ Spaces before/after values
- ❌ Using placeholder `your_email@gmail.com`
- ❌ Using regular password instead of App Password

### 2. Check Spam Folder

**Most common issue!** Emails go to spam when testing locally.

**Action:**
1. Check recipient's **Spam** folder
2. Find the reply email
3. Mark as "Not Spam"
4. Future emails will go to inbox

### 3. Test Email Configuration

```bash
cd backend
node test-email.js
```

**Expected output:**
```
✅ SUCCESS! Test email sent!
Check your inbox at: your.email@gmail.com
```

### 4. Get Gmail App Password

1. Enable 2FA: https://myaccount.google.com/security
2. Generate password: https://myaccount.google.com/apppasswords
3. Copy 16-character password (no spaces)
4. Update `backend/.env`
5. Restart backend

---

## 🖼️ Images Not Uploading

**Symptoms:**
- Upload fails
- 500 error on profile/project update

**Solutions:**

### For Local Storage (Default)
Works automatically! Images save to `backend/uploads/`

**If failing:**
1. Check `backend/uploads/` folder exists
2. Check write permissions
3. Restart backend

### For Cloudinary (Production)

**Option 1: Keep Using Local Storage**
- No action needed
- Works perfectly for development

**Option 2: Configure Cloudinary**
1. Sign up: https://cloudinary.com
2. Get credentials from dashboard
3. Update `backend/.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Restart backend

---

## 🔐 Can't Login to Dashboard

**Symptoms:**
- Invalid credentials error
- Wrong password

**Default Credentials:**
```
Email: admin@portfolio.com
Password: admin123
```

**If changed and forgotten:**

1. Generate new password hash:
   ```bash
   cd backend
   node -e "console.log(require('bcryptjs').hashSync('newpassword', 10))"
   ```

2. Update database:
   ```sql
   USE portfolio_db;
   UPDATE users 
   SET password = 'your_generated_hash' 
   WHERE email = 'admin@portfolio.com';
   ```

---

## 🗄️ Database Connection Failed

**Error:**
```
Error: connect ECONNREFUSED
Access denied for user 'root'
```

**Solutions:**

### 1. Check MySQL is Running
```bash
# Windows: Check Services
# Or restart MySQL
```

### 2. Verify Credentials
Check `backend/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
```

### 3. Check Database Exists
```sql
mysql -u root -p
SHOW DATABASES;
```

If `portfolio_db` missing:
```sql
CREATE DATABASE portfolio_db;
```

Then run setup:
```bash
mysql -u root -p portfolio_db < database/complete_setup.sql
```

---

## ⚠️ Validation Errors on Form Submit

**Error:**
```
400 Bad Request
Validation failed
```

**Common Causes:**

### Profile Form
- ✅ Name required
- ✅ Title required
- Bio optional
- Resume link optional

### Project Form
- ✅ Title required
- ✅ Description required
- Tech stack optional
- Links optional

### Contact Form
- ✅ Name required
- ✅ Valid email required
- ✅ Message required (min 10 characters)

---

## 🔄 Frontend Not Loading

**Symptoms:**
- Blank page
- "Cannot GET /"

**Solutions:**

### 1. Check Frontend is Running
```bash
cd frontend
npm start
```

Should open: http://localhost:3000

### 2. Check Port 3000
```powershell
netstat -ano | findstr :3000
```

If in use, kill it or change port in `frontend/package.json`

### 3. Clear Cache
```bash
# In frontend folder
rm -rf node_modules
npm install
npm start
```

---

## 🌐 API Requests Failing

**Error:**
```
Network Error
Failed to fetch
```

**Solutions:**

### 1. Check Backend is Running
```bash
cd backend
npm run dev
```

Should show: `Server running on port 5000`

### 2. Check API URL
Verify `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Check CORS
In `backend/.env`:
```env
CLIENT_URL=http://localhost:3000
```

---

## 🐛 Other Issues

### Clear Everything and Restart

**Full Reset:**
```bash
# Stop all servers (Ctrl+C)

# Backend
cd backend
rm -rf node_modules
npm install
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules
npm install
npm start
```

### Check Console Logs

**Backend Console:**
- Shows errors and warnings
- Look for stack traces

**Browser Console (F12):**
- Shows frontend errors
- Network tab shows API calls

---

## 📞 Still Having Issues?

1. **Check Backend Console** for errors
2. **Check Browser Console (F12)** for frontend errors
3. **Review relevant guide** in [docs/](README.md)
4. **Verify environment variables** in `.env` files
5. **Ensure all dependencies installed**: `npm install`

---

## 🔗 Related Guides

- [Email Setup](EMAIL_SETUP_GUIDE.md)
- [Skills Setup](SKILLS_FEATURE_GUIDE.md)
- [Image Upload](CLOUDINARY_FIX.md)
- [Port Conflicts](FIX_PORT_IN_USE.md)

---

**Most issues are configuration-related. Double-check your `.env` files!**
