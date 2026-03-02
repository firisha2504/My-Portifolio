# Deployment Guide

Complete guide for deploying your portfolio to production.

---

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database schema applied to production DB
- [ ] Admin user created with strong password
- [ ] JWT secret is strong and unique
- [ ] Cloudinary account set up (if using)
- [ ] CORS configured for production domain
- [ ] Rate limiting configured
- [ ] Error logging set up
- [ ] SSL certificate ready (HTTPS)

---

## Database Deployment

### Option 1: PlanetScale (Recommended)

1. Create account at [planetscale.com](https://planetscale.com)
2. Create new database
3. Get connection string
4. Run schema:
```bash
mysql -h <host> -u <user> -p<password> <database> < database/schema.sql
```

### Option 2: AWS RDS

1. Create MySQL instance in AWS RDS
2. Configure security groups
3. Connect and run schema
4. Enable automated backups

### Option 3: DigitalOcean Managed Database

1. Create managed MySQL database
2. Add trusted sources
3. Connect and apply schema

---

## Backend Deployment

### Option 1: Railway (Easiest)

1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Login and initialize:
```bash
railway login
railway init
```

3. Add environment variables:
```bash
railway variables set PORT=5000
railway variables set DB_HOST=your_db_host
railway variables set DB_USER=your_db_user
railway variables set DB_PASSWORD=your_db_password
railway variables set DB_NAME=your_db_name
railway variables set JWT_SECRET=your_jwt_secret
railway variables set JWT_EXPIRE=7d
railway variables set CLOUDINARY_CLOUD_NAME=your_cloud_name
railway variables set CLOUDINARY_API_KEY=your_api_key
railway variables set CLOUDINARY_API_SECRET=your_api_secret
railway variables set CLIENT_URL=https://your-frontend-domain.com
```

4. Deploy:
```bash
railway up
```

5. Get deployment URL from Railway dashboard

---

### Option 2: Heroku

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create app:
```bash
cd backend
heroku create your-portfolio-api
```

3. Add environment variables:
```bash
heroku config:set PORT=5000
heroku config:set DB_HOST=your_db_host
heroku config:set DB_USER=your_db_user
heroku config:set DB_PASSWORD=your_db_password
heroku config:set DB_NAME=your_db_name
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set JWT_EXPIRE=7d
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
heroku config:set CLOUDINARY_API_KEY=your_api_key
heroku config:set CLOUDINARY_API_SECRET=your_api_secret
heroku config:set CLIENT_URL=https://your-frontend-domain.com
```

4. Deploy:
```bash
git push heroku main
```

---

### Option 3: DigitalOcean App Platform

1. Connect GitHub repository
2. Select backend folder
3. Set build command: `npm install`
4. Set run command: `npm start`
5. Add environment variables in dashboard
6. Deploy

---

### Option 4: VPS (Ubuntu Server)

1. SSH into server:
```bash
ssh root@your_server_ip
```

2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Install PM2:
```bash
npm install -g pm2
```

4. Clone repository:
```bash
git clone your-repo-url
cd portfolio/backend
npm install
```

5. Create `.env` file with production values

6. Start with PM2:
```bash
pm2 start server.js --name portfolio-api
pm2 save
pm2 startup
```

7. Set up Nginx reverse proxy:
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/portfolio
```

Add configuration:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. Set up SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Build frontend:
```bash
cd frontend
npm run build
```

3. Deploy:
```bash
vercel
```

4. Set environment variable in Vercel dashboard:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

5. Redeploy after setting env variable

---

### Option 2: Netlify

1. Build frontend:
```bash
cd frontend
npm run build
```

2. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod --dir=build
```

4. Set environment variable in Netlify dashboard:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

### Option 3: AWS S3 + CloudFront

1. Build frontend:
```bash
cd frontend
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://your-portfolio-bucket
```

3. Upload build:
```bash
aws s3 sync build/ s3://your-portfolio-bucket
```

4. Enable static website hosting in S3 console

5. Create CloudFront distribution pointing to S3 bucket

6. Update DNS to point to CloudFront URL

---

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
NODE_ENV=production

DB_HOST=your_production_db_host
DB_USER=your_db_user
DB_PASSWORD=your_strong_db_password
DB_NAME=portfolio_db

JWT_SECRET=your_very_strong_jwt_secret_min_32_chars
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=https://yourdomain.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

---

## Post-Deployment Steps

### 1. Test All Endpoints
```bash
# Test public endpoints
curl https://api.yourdomain.com/api/profile
curl https://api.yourdomain.com/api/projects

# Test login
curl -X POST https://api.yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"your_password"}'
```

### 2. Change Default Admin Password

1. Login to dashboard
2. Create new admin user with strong password
3. Delete default admin user

### 3. Set Up Monitoring

**Backend Monitoring:**
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure error tracking (Sentry)
- Enable application logs

**Database Monitoring:**
- Enable slow query logs
- Set up automated backups
- Monitor connection pool usage

### 4. Configure Backups

**Database Backups:**
```bash
# Daily backup script
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME > backup_$(date +%Y%m%d).sql
```

**Automated Backups:**
- Set up cron job for daily backups
- Store backups in S3 or similar
- Test restore process

### 5. Set Up CI/CD (Optional)

**GitHub Actions Example:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## Domain Configuration

### 1. Purchase Domain
- Namecheap, GoDaddy, or Google Domains

### 2. Configure DNS

**For Frontend (Vercel/Netlify):**
```
Type: A
Name: @
Value: [Platform IP]

Type: CNAME
Name: www
Value: [Platform domain]
```

**For Backend API:**
```
Type: A
Name: api
Value: [Server IP]
```

### 3. SSL Certificate
- Automatic with Vercel/Netlify/Railway
- Use Let's Encrypt for VPS
- AWS Certificate Manager for AWS

---

## Performance Optimization

### Backend
1. Enable gzip compression:
```javascript
const compression = require('compression');
app.use(compression());
```

2. Add caching headers:
```javascript
app.use('/uploads', express.static('uploads', {
  maxAge: '1y'
}));
```

3. Database indexing:
```sql
CREATE INDEX idx_created_at ON projects(created_at);
```

### Frontend
1. Enable production build optimizations
2. Use CDN for static assets
3. Implement lazy loading for images
4. Enable browser caching

---

## Security Hardening

### 1. Install Helmet.js
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 2. Update CORS for Production
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

### 3. Rate Limiting
Already implemented, but adjust for production:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});
```

### 4. Environment Variables
- Never commit `.env` files
- Use platform-specific secret management
- Rotate secrets regularly

---

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME
```

### CORS Errors
- Verify CLIENT_URL matches frontend domain
- Check HTTPS vs HTTP
- Ensure credentials are set correctly

### JWT Token Issues
- Verify JWT_SECRET is set
- Check token expiration
- Ensure Authorization header format: `Bearer <token>`

### File Upload Issues
- Check Cloudinary credentials
- Verify file size limits
- Ensure multer middleware is configured

---

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review error logs weekly
- [ ] Check database performance
- [ ] Monitor disk space
- [ ] Review security advisories
- [ ] Test backup restoration
- [ ] Update SSL certificates (if manual)

### Scaling Considerations
- Add Redis for caching
- Implement CDN for images
- Use load balancer for multiple instances
- Database read replicas
- Horizontal scaling with container orchestration

---

## Support & Resources

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React Deployment](https://create-react-app.dev/docs/deployment/)
- [MySQL Performance](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)
