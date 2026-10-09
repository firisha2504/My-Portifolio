# 📚 Documentation Index

Quick access to all guides and documentation.

---

## 🚀 Quick Start

**First time setup:**
1. Follow main [README.md](../README.md) for installation
2. Run database setup scripts
3. Configure `.env` files
4. Start development servers

---

## 📖 Feature Guides

### Skills Management
**[SKILLS_FEATURE_GUIDE.md](SKILLS_FEATURE_GUIDE.md)** - Complete documentation
- How to add/edit/delete skills
- Organize by categories
- Display on About page
- API endpoints

**[QUICK_START_SKILLS.md](QUICK_START_SKILLS.md)** - Quick reference
- Fast setup guide
- Common tasks
- Examples

**[HOW_TO_ADD_SKILLS.txt](HOW_TO_ADD_SKILLS.txt)** - Visual step-by-step
- Beginner-friendly
- Screenshots and examples
- Common categories

**[SKILLS_SETUP_CHECKLIST.md](SKILLS_SETUP_CHECKLIST.md)** - Setup checklist
- Database setup
- Verification steps
- Troubleshooting

---

### Email Configuration
**[EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md)** - Complete email guide
- Gmail setup with App Password
- Other email providers
- Production setup (SendGrid, AWS SES)
- Testing configuration

---

### Image Upload
**[CLOUDINARY_FIX.md](CLOUDINARY_FIX.md)** - Image upload options
- Local storage (default)
- Cloudinary setup (production)
- How it works
- Configuration

---

## 🔧 Troubleshooting

**[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - All common issues
- Port conflicts
- Email problems
- Database errors
- API failures
- Image upload issues
- Login problems

---

## 📝 Quick Reference

### Add a Skill
```
Dashboard → Skills → Add New Skill
Category: Frontend
Name: Vue.js
Order: 5
```

### Setup Email
```bash
1. Get Gmail App Password
2. Update backend/.env
3. Restart backend
4. Test with: node test-email.js
```

### Fix Port Error
```bash
.\scripts\kill-port-5000.bat
```

### Setup Database
```bash
mysql -u root -p portfolio_db < database/complete_setup.sql
mysql -u root -p portfolio_db < database/add_skills_table.sql
```

---

## 🗂️ All Documentation Files

```
docs/
├── README.md                      # This file
├── TROUBLESHOOTING.md             # All troubleshooting
├── SKILLS_FEATURE_GUIDE.md        # Complete skills guide
├── SKILLS_SETUP_CHECKLIST.md      # Skills setup steps
├── QUICK_START_SKILLS.md          # Skills quick start
├── HOW_TO_ADD_SKILLS.txt          # Visual skills guide
├── EMAIL_SETUP_GUIDE.md           # Email configuration
└── CLOUDINARY_FIX.md              # Image upload guide
```

---

## 🎯 Common Tasks

| Task | Guide | Quick Command |
|------|-------|---------------|
| Add Skill | [Skills Guide](SKILLS_FEATURE_GUIDE.md) | Dashboard → Skills |
| Setup Email | [Email Guide](EMAIL_SETUP_GUIDE.md) | `node test-email.js` |
| Fix Port | [Troubleshooting](TROUBLESHOOTING.md) | `.\scripts\kill-port-5000.bat` |
| Setup DB | Main README | See database setup commands |
| Upload Images | [Image Guide](CLOUDINARY_FIX.md) | Works by default |

---

## 🆘 Need Help?

**Start with:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Covers 90% of issues

**By Topic:**
- **Skills not working** → [Troubleshooting](TROUBLESHOOTING.md#-skills-not-loading-500-error)
- **Email not sending** → [Troubleshooting](TROUBLESHOOTING.md#-email-not-sending--reply-not-working)
- **Images failing** → [Troubleshooting](TROUBLESHOOTING.md#-images-not-uploading)
- **Can't login** → [Troubleshooting](TROUBLESHOOTING.md#-cant-login-to-dashboard)
- **Port in use** → [Troubleshooting](TROUBLESHOOTING.md#-port-5000-already-in-use)

---

## ✅ Feature Status

| Feature | Status | Documentation |
|---------|--------|---------------|
| Skills Management | ✅ Working | [Guide](SKILLS_FEATURE_GUIDE.md) |
| Email Replies | ✅ Working | [Guide](EMAIL_SETUP_GUIDE.md) |
| Image Upload | ✅ Working | [Guide](CLOUDINARY_FIX.md) |
| All Others | ✅ Working | Main README |

---

**📖 All documentation is kept up-to-date and tested!**

---

## 🛠️ Common Tasks

### Adding a New Skill
1. Go to Dashboard → Skills
2. Click "Add New Skill"
3. Fill in: Category, Skill Name, Display Order
4. Save

**See:** [HOW_TO_ADD_SKILLS.txt](HOW_TO_ADD_SKILLS.txt)

---

### Setting Up Email Replies
1. Get Gmail App Password
2. Update `backend/.env` with credentials
3. Restart backend
4. Test reply feature

**See:** [EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md)

---

### Fixing Port Already in Use
1. Run `scripts/kill-port-5000.bat`
2. Or manually kill the process

**See:** [FIX_PORT_IN_USE.md](FIX_PORT_IN_USE.md)

---

## 📂 File Organization

```
docs/
├── README.md (this file)
├── Feature Guides/
│   ├── SKILLS_FEATURE_GUIDE.md
│   ├── EMAIL_SETUP_GUIDE.md
│   └── CLOUDINARY_FIX.md
├── Quick Starts/
│   ├── QUICK_START_SKILLS.md
│   ├── SETUP_SKILLS_NOW.md
│   └── HOW_TO_ADD_SKILLS.txt
├── Troubleshooting/
│   ├── FIX_PORT_IN_USE.md
│   ├── REPLY_NOT_WORKING_FIX.md
│   └── FIX_500_ERROR.md
└── Reference/
    ├── SKILLS_SETUP_CHECKLIST.md
    ├── CONTACT_REPLY_FIXED.md
    └── RUN_THIS_COMMAND.txt
```

---

## 🆘 Getting Help

### Problem: Skills not loading
**Solution:** Run `backend/setup-skills.js` to create the skills table
**See:** [FIX_500_ERROR.md](FIX_500_ERROR.md)

---

### Problem: Can't reply to contacts
**Solution:** Configure email in `backend/.env`
**See:** [EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md)

---

### Problem: Port 5000 in use
**Solution:** Run `scripts/kill-port-5000.bat`
**See:** [FIX_PORT_IN_USE.md](FIX_PORT_IN_USE.md)

---

### Problem: Images not uploading
**Solution:** Configure Cloudinary or use local storage
**See:** [CLOUDINARY_FIX.md](CLOUDINARY_FIX.md)

---

## 🎯 Feature Status

| Feature | Status | Documentation |
|---------|--------|---------------|
| Skills Management | ✅ Working | [Guide](SKILLS_FEATURE_GUIDE.md) |
| Email Replies | ✅ Working | [Guide](EMAIL_SETUP_GUIDE.md) |
| Image Upload | ✅ Working | [Guide](CLOUDINARY_FIX.md) |
| Contact Form | ✅ Working | [Guide](CONTACT_REPLY_FIXED.md) |
| Profile Management | ✅ Working | Main README |
| Projects CRUD | ✅ Working | Main README |
| Authentication | ✅ Working | Main README |

---

## 📝 Quick Reference

### Database Setup
```bash
mysql -u root -p portfolio_db < database/add_skills_table.sql
```

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm start
```

### Test Email
```bash
cd backend
node test-email.js
```

### Kill Port 5000
```bash
# Windows: Double-click
scripts/kill-port-5000.bat

# Or PowerShell:
.\scripts\kill-port-5000.ps1
```

---

## 🔗 External Resources

- [Cloudinary Account](https://cloudinary.com)
- [Gmail App Passwords](https://myaccount.google.com/apppasswords)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Node.js Docs](https://nodejs.org/docs)
- [React Documentation](https://react.dev)

---

**Last Updated:** All features working as of latest session
**Maintained by:** Portfolio Project
