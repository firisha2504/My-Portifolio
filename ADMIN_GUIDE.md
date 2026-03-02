# Admin Dashboard Guide

## How to Navigate from Admin Dashboard to Home Page

### Option 1: Using the Sidebar
1. Look at the left sidebar in the admin dashboard
2. Click on **"Back to Home"** link at the top of the navigation menu
3. This will take you back to the public home page

### Option 2: Using the Navbar
1. Click on the **"Portfolio"** logo in the top navbar
2. This will also navigate you to the home page

## How to Add a New Project

### Step-by-Step Instructions:

1. **Access Projects Section**
   - From the admin dashboard, click on **"Projects"** in the sidebar
   - Or navigate to: `http://localhost:3000/dashboard/projects`

2. **Open Add Project Form**
   - Click the **"Add New Project"** button at the top
   - A form will appear below the button

3. **Fill in Project Details**
   - **Project Title*** (Required): Enter the name of your project
   - **Project Description*** (Required): Describe what the project does
   - **Tech Stack** (Optional): List technologies used (e.g., "React, Node.js, MySQL")
   - **GitHub Link** (Optional): Full URL to your GitHub repository
   - **Live Demo Link** (Optional): Full URL to the live project
   - **Project Image URL** (Optional): Full URL to a project screenshot/image

4. **Submit the Project**
   - Click **"Add Project"** button
   - A success modal will appear confirming the project was added
   - The form will reset and the new project will appear in the list below

5. **Cancel Adding**
   - If you change your mind, click **"Cancel"** button to hide the form

## Managing Existing Projects

### View Projects
- All your projects are listed in the Projects section
- Each project shows:
  - Title
  - Description
  - Tech stack (if provided)

### Delete a Project
1. Find the project you want to delete
2. Click the **"Delete"** button on the right side
3. A confirmation modal will appear
4. Click **"Delete"** to confirm or **"Cancel"** to abort
5. A success modal will confirm the deletion

## Tips

- **Required Fields**: Fields marked with * must be filled
- **URLs**: Make sure to include `https://` or `http://` in all URL fields
- **Image URLs**: You can use image hosting services like:
  - Unsplash: `https://images.unsplash.com/...`
  - Imgur: `https://i.imgur.com/...`
  - Cloudinary: `https://res.cloudinary.com/...`
- **Tech Stack Format**: Separate technologies with commas (e.g., "React, Node.js, MySQL")

## Navigation Summary

```
Admin Dashboard
├── Back to Home (sidebar) → Public Home Page
├── Overview → Dashboard statistics
├── Profile → Update portfolio information
├── Projects → Add/Delete projects
├── Messages → View contact form submissions
├── Settings → Update admin credentials
└── Logout → Return to login page
```

## Keyboard Shortcuts

- **ESC**: Close any open modal
- **Click outside modal**: Also closes the modal

## Troubleshooting

### Project Not Adding?
- Check that Title and Description are filled
- Verify URLs start with `http://` or `https://`
- Check browser console for error messages

### Can't See New Project?
- Refresh the page
- Check if the project appears in the public Projects page

### Modal Not Closing?
- Click the "OK" or "Cancel" button
- Click outside the modal
- Press ESC key
