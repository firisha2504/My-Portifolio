# Skills Management Feature Guide

## Overview
Your portfolio now includes a complete skills management system. You can add, edit, and delete skills from the Admin Dashboard, and they will automatically appear on the About page.

## Setup Instructions

### 1. Database Setup
Run the SQL script to create the skills table and add default skills:

```bash
mysql -u root -p portfolio_db < database/add_skills_table.sql
```

Or manually in phpMyAdmin/MySQL:
- Open `database/add_skills_table.sql`
- Copy and paste the contents
- Execute the queries

### 2. Restart Backend Server
If your backend is running, restart it to load the new skills routes:

```bash
cd backend
npm run dev
```

### 3. Access Skills Manager
1. Log in to your dashboard at `http://localhost:3000/dashboard`
2. Click on **"Skills"** in the sidebar menu
3. Start adding your skills!

## How to Use

### Adding a New Skill

1. Click **"Add New Skill"** button
2. Fill in the form:
   - **Category**: Choose from predefined categories (Frontend, Backend, Database, etc.)
   - **Category Icon**: Auto-filled when you select a category (can customize)
   - **Skill Name**: The name of the skill (e.g., "React.js", "Node.js", "Docker")
   - **Display Order**: Number to control the order within category (lower = first)
3. Click **"Add Skill"**

### Editing a Skill

1. Find the skill you want to edit
2. Click the ✏️ (edit) icon
3. Update the information
4. Click **"Update Skill"**

### Deleting a Skill

1. Find the skill you want to delete
2. Click the 🗑️ (delete) icon
3. Confirm the deletion

### Organizing Skills

- Skills are automatically grouped by **category**
- Within each category, skills are ordered by the **display_order** field
- Lower display_order numbers appear first

**Example:**
- React.js (display_order: 1)
- TypeScript (display_order: 2)
- Tailwind CSS (display_order: 3)

## Available Categories

The system comes with predefined categories:

| Category | Icon | Description |
|----------|------|-------------|
| Frontend | 💻 | Client-side technologies |
| Backend | ⚙️ | Server-side technologies |
| Database | 🗄️ | Database systems |
| DevOps | 🚀 | Deployment & infrastructure |
| Mobile | 📱 | Mobile development |
| Tools | 🛠️ | Development tools |
| Design | 🎨 | Design tools & skills |
| Testing | 🧪 | Testing frameworks |
| Cloud | ☁️ | Cloud platforms |
| Security | 🔒 | Security practices |

You can add custom categories by typing a new name and providing an emoji icon.

## Where Skills Appear

Skills are displayed on the **About page** (`/about`) in a clean, categorized layout. The page automatically fetches skills from the database, so any changes you make in the dashboard are instantly reflected.

## Default Skills

The system comes pre-populated with these default skills:

**Frontend:** React.js, TypeScript, Tailwind CSS, Next.js
**Backend:** Node.js, Express, REST APIs, GraphQL
**Database:** MySQL, PostgreSQL, MongoDB, Redis
**DevOps:** Docker, CI/CD, AWS, Linux
**Mobile:** React Native, PWA, Responsive Design
**Tools:** Git, VS Code, Figma, Postman

You can edit or delete these and add your own!

## Tips

1. **Keep skill names concise** - Short names look better in the UI
2. **Use consistent naming** - React.js vs React, Node.js vs NodeJS
3. **Organize by importance** - Put your strongest skills first using display_order
4. **Update regularly** - Add new skills as you learn them!
5. **Use emoji icons** - They're visually appealing and work across all platforms

## API Endpoints

The skills system uses these endpoints:

- `GET /api/skills` - Get all skills (public, grouped by category)
- `GET /api/skills/all` - Get all skills flat list (admin only)
- `GET /api/skills/categories` - Get unique categories (public)
- `POST /api/skills` - Create new skill (admin only)
- `PUT /api/skills/:id` - Update skill (admin only)
- `DELETE /api/skills/:id` - Delete skill (admin only)

## Troubleshooting

### Skills not appearing on About page?
- Check that the backend server is running
- Verify the skills table exists in the database
- Check browser console for errors

### Can't add/edit/delete skills?
- Make sure you're logged in as admin
- Verify your JWT token is valid
- Check that the skills route is properly loaded in server.js

### Database errors?
- Ensure you ran the `add_skills_table.sql` script
- Verify database connection in `.env` file
- Check that the skills table has the correct structure

## Files Modified/Created

### Backend:
- ✅ `backend/controllers/skillController.js` - Skills business logic
- ✅ `backend/routes/skillRoutes.js` - Skills API routes
- ✅ `backend/middleware/validation.js` - Added skill validation
- ✅ `backend/server.js` - Added skills route

### Frontend:
- ✅ `frontend/src/pages/Dashboard.js` - Added SkillsManager component
- ✅ `frontend/src/pages/About.js` - Updated to fetch skills from API

### Database:
- ✅ `database/add_skills_table.sql` - Skills table schema and default data

## Next Steps

1. ✅ Run the database migration
2. ✅ Restart your backend server
3. ✅ Log in to the dashboard
4. ✅ Navigate to Skills section
5. ✅ Start managing your skills!

Enjoy your new skills management system! 🎉
