# Email Configuration Guide

## Overview

The contact reply feature is now working! However, to actually send emails, you need to configure email settings in your `.env` file.

## Current Behavior

**Without Email Configuration (Current):**
- ✅ Reply button works
- ✅ Contact marked as read
- ⚠️ Email NOT sent (just logged)
- ℹ️ You'll see a warning message

**With Email Configuration:**
- ✅ Reply button works
- ✅ Contact marked as read
- ✅ Email sent to the contact
- ✅ Full reply functionality

---

## Setup Instructions

### Option 1: Using Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate an App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password

3. **Update your `.env` file**:
   ```env
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   EMAIL_FROM_NAME=Your Name
   ```

4. **Restart backend server**:
   ```bash
   cd backend
   npm run dev
   ```

---

### Option 2: Using Other Email Providers

#### Outlook/Hotmail
```env
# In email.js, change service to 'hotmail'
EMAIL_USER=your.email@outlook.com
EMAIL_PASSWORD=your_password
```

#### Custom SMTP
Edit `backend/config/email.js`:
```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

---

## Testing Email Configuration

### Test 1: Send a Contact Message

1. Go to `http://localhost:3000/contact`
2. Fill out and submit the form
3. Go to Dashboard → Messages
4. Click the message
5. Click "Reply"
6. Type a message and send

### Test 2: Check for Success

**Email Configured:**
```
✅ Reply sent successfully via email
```

**Email NOT Configured:**
```
⚠️ Reply logged successfully. Note: Email sending is not configured.
```

---

## Troubleshooting

### Error: "Invalid login"
**Solution:** Make sure you're using an App Password, not your regular Gmail password.

### Error: "Connection timeout"
**Solution:** 
- Check your internet connection
- Verify SMTP server is accessible
- Try a different email provider

### Error: "Authentication failed"
**Solution:**
- Double-check email and password in `.env`
- Ensure no extra spaces in the values
- Try generating a new App Password

### Still not working?
**Check backend console** for detailed error messages.

---

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file to Git
- Keep your email password secure
- Use App Passwords, not regular passwords
- For production, use professional email services like:
  - SendGrid
  - AWS SES
  - Mailgun
  - Postmark

---

## Alternative: Skip Email Configuration

If you don't want to set up email:

1. The reply feature will still work
2. Replies will be logged but not sent
3. You can manually email contacts from your email client
4. Contact will still be marked as read

This is fine for development and testing!

---

## Production Setup

For production, consider using a transactional email service:

### SendGrid (Free tier: 100 emails/day)
```javascript
// npm install @sendgrid/mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  const msg = { to, from: 'noreply@yourdomain.com', subject, text, html };
  await sgMail.send(msg);
};
```

### AWS SES (Very affordable)
```javascript
// npm install @aws-sdk/client-ses
// Use AWS SES SDK
```

---

## Summary

| Feature | Without Email Setup | With Email Setup |
|---------|-------------------|------------------|
| Reply Button | ✅ Works | ✅ Works |
| Mark as Read | ✅ Works | ✅ Works |
| Send Email | ❌ Not sent | ✅ Sent |
| Development | ✅ Fine | ✅ Better |
| Production | ❌ Not recommended | ✅ Required |

---

## Quick Setup Checklist

- [ ] Enable Gmail 2FA
- [ ] Generate App Password
- [ ] Update `.env` file
- [ ] Restart backend
- [ ] Test reply feature
- [ ] Verify email received

---

**Need help?** The system works fine without email config for now. Set it up when you're ready to go live!
