# Quick Start: Adding Skills to Your Portfolio

## Step 1: Setup Database (One-time only)

Open your MySQL/phpMyAdmin and run:

```bash
mysql -u root -p portfolio_db < database/add_skills_table.sql
```

This creates the `skills` table and adds default skills.

## Step 2: Restart Backend

```bash
cd backend
npm run dev
```

## Step 3: Access Dashboard

1. Go to `http://localhost:3000/login`
2. Login with your admin credentials
3. Click **"Skills"** in the sidebar
4. You'll see this interface:

```
┌─────────────────────────────────────────┐
│  Manage Skills                          │
│  Add, edit, or remove skills            │
│                                         │
│  [+ Add New Skill]                      │
│                                         │
│  💻 Frontend (4 skills)                 │
│  ┌──────────────┐  ┌──────────────┐   │
│  │ React.js   ✏️🗑️│  │ TypeScript ✏️🗑️│   │
│  │ Order: 1      │  │ Order: 2      │   │
│  └──────────────┘  └──────────────┘   │
│                                         │
│  ⚙️ Backend (4 skills)                  │
│  ┌──────────────┐  ┌──────────────┐   │
│  │ Node.js    ✏️🗑️│  │ Express    ✏️🗑️│   │
│  │ Order: 1      │  │ Order: 2      │   │
│  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────┘
```

## Step 4: Add a New Skill

Click **"Add New Skill"** and fill the form:

```
Category:      [Frontend ▼]  (auto-fills icon)
Icon:          💻
Skill Name:    Vue.js
Display Order: 5

[Add Skill] [Cancel]
```

## That's It!

Your skills will automatically appear on the **About page** at `http://localhost:3000/about`

## Quick Actions

### To Add Multiple Skills Quickly:
1. Click "Add New Skill"
2. Select category
3. Enter skill name
4. Click "Add Skill"
5. Repeat!

### To Reorder Skills:
1. Click the ✏️ edit icon
2. Change the "Display Order" number
3. Lower numbers appear first
4. Click "Update Skill"

### Example Display Orders:
- Most important skill: 1
- Second most important: 2
- Third most important: 3
- And so on...

## Common Categories

| When learning... | Use category |
|------------------|--------------|
| React, Vue, Angular | Frontend |
| Node.js, Python, Java | Backend |
| MySQL, MongoDB | Database |
| Docker, Kubernetes | DevOps |
| React Native, Flutter | Mobile |
| Git, VS Code, Postman | Tools |

---

**Pro Tip:** Keep skill names short and consistent. Use "React.js" not "React" to match industry standards!
