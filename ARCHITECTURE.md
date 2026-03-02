# Portfolio Application Architecture

## System Overview

This is a full-stack portfolio application following clean architecture principles with clear separation of concerns.

## Architecture Pattern: MVC (Model-View-Controller)

### Backend Architecture

```
backend/
├── config/              # Configuration files
│   ├── db.js           # MySQL connection pool
│   └── cloudinary.js   # Cloudinary configuration
├── controllers/         # Business logic layer
│   ├── authController.js
│   ├── profileController.js
│   ├── projectController.js
│   └── contactController.js
├── middleware/          # Request processing
│   ├── auth.js         # JWT verification & authorization
│   ├── upload.js       # Multer file upload
│   └── errorHandler.js # Centralized error handling
├── routes/             # API endpoints
│   ├── authRoutes.js
│   ├── profileRoutes.js
│   ├── projectRoutes.js
│   └── contactRoutes.js
└── server.js           # Application entry point
```

### Frontend Architecture

```
frontend/src/
├── components/         # Reusable UI components
│   ├── Navbar.js
│   └── ProtectedRoute.js
├── pages/             # Page-level components
│   ├── Home.js
│   ├── About.js
│   ├── Projects.js
│   ├── Contact.js
│   ├── Login.js
│   └── Dashboard.js
├── utils/             # Utility functions
│   └── api.js         # Axios instance with interceptors
├── App.js             # Main application component
└── index.js           # React entry point
```

## Data Flow

### Public User Flow
1. User visits public pages (Home, About, Projects, Contact)
2. Frontend makes GET requests to backend API
3. Backend queries MySQL database
4. Data returned as JSON response
5. Frontend renders data in React components

### Admin Flow
1. Admin logs in via `/login`
2. Backend validates credentials and returns JWT token
3. Token stored in localStorage
4. Protected routes check for valid token
5. Admin can CRUD operations on profile/projects
6. File uploads sent to Cloudinary
7. Database updated with new data

## Security Layers

### 1. Authentication
- JWT tokens with expiration
- Bcrypt password hashing (10 salt rounds)
- Token stored in localStorage
- Axios interceptor adds token to requests

### 2. Authorization
- Role-based access control (admin/user)
- Middleware checks user role before protected operations
- Only admins can modify data

### 3. Input Validation
- Express-validator on backend
- Frontend form validation
- File type and size restrictions

### 4. API Protection
- CORS configuration (whitelist client URL)
- Rate limiting (100 requests per 15 minutes)
- Environment variables for secrets

## Database Schema

### Tables

**users**
- Stores admin credentials
- Password hashed with bcrypt
- Role field for authorization

**profile**
- Single row for portfolio owner info
- Profile image URL (Cloudinary)
- Resume link

**projects**
- Portfolio projects with pagination
- Tech stack, links, images
- Timestamps for sorting

**contacts**
- Contact form submissions
- Read/unread status
- Spam prevention via validation

## API Design

### RESTful Principles
- Resource-based URLs
- HTTP methods (GET, POST, PUT, DELETE)
- Proper status codes (200, 201, 400, 401, 403, 404, 500)
- JSON request/response format

### Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

## State Management

### Frontend State
- React useState for local component state
- No global state library (keeps it minimal)
- API calls trigger re-renders
- Theme stored in localStorage

### Backend State
- Stateless API (JWT for session)
- Database as single source of truth
- Connection pooling for MySQL

## File Upload Strategy

### Cloudinary (Recommended for Production)
- Images uploaded to cloud storage
- CDN delivery for fast loading
- Automatic optimization
- URL stored in database

### Local Storage (Development)
- Multer saves to `/uploads` directory
- Served as static files
- Not recommended for production

## Performance Optimizations

1. **Database**
   - Connection pooling
   - Indexed columns (id, created_at)
   - Pagination for large datasets

2. **Frontend**
   - Code splitting with React Router
   - Lazy loading images
   - CSS transitions for smooth UX

3. **API**
   - Rate limiting prevents abuse
   - Efficient queries (LIMIT, OFFSET)

## Deployment Architecture

### Production Setup
```
[Client Browser]
      ↓
[CDN - React Build]
      ↓
[Backend API - Node.js]
      ↓
[MySQL Database]
      ↓
[Cloudinary CDN]
```

### Recommended Services
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku, DigitalOcean
- **Database**: PlanetScale, AWS RDS
- **Images**: Cloudinary

## Error Handling

### Backend
- Try-catch blocks in all controllers
- Centralized error handler middleware
- Proper error messages and status codes
- Development vs production error details

### Frontend
- Error states in components
- User-friendly error messages
- Loading states during API calls
- Form validation feedback

## Scalability Considerations

### Current Architecture Supports
- Horizontal scaling of backend (stateless)
- Database read replicas
- CDN for static assets
- Caching layer (Redis) can be added

### Future Enhancements
- Add Redis for session management
- Implement search functionality
- Add analytics dashboard
- Email notifications for contacts
- Multi-language support
- Blog section with CMS

## Testing Strategy

### Backend Testing
- Unit tests for controllers
- Integration tests for API endpoints
- Database transaction rollback in tests

### Frontend Testing
- Component unit tests (Jest)
- Integration tests (React Testing Library)
- E2E tests (Cypress)

## Environment Configuration

### Development
- Local MySQL database
- Hot reload for both frontend/backend
- Detailed error messages
- CORS allows localhost

### Production
- Managed database service
- Environment variables for secrets
- Error logging service
- CORS restricted to production domain
- HTTPS only
- Compressed responses

## Monitoring & Logging

### Recommended Tools
- **Backend**: Winston for logging
- **Database**: Query performance monitoring
- **Uptime**: UptimeRobot, Pingdom
- **Errors**: Sentry for error tracking
- **Analytics**: Google Analytics

## Security Checklist

✅ Passwords hashed with bcrypt
✅ JWT tokens with expiration
✅ Environment variables for secrets
✅ CORS configuration
✅ Rate limiting
✅ Input validation
✅ SQL injection prevention (parameterized queries)
✅ XSS prevention (React escapes by default)
✅ File upload restrictions
✅ HTTPS in production
✅ Secure headers (helmet.js recommended)

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Backup database weekly
- Monitor error logs
- Review security advisories
- Optimize database queries
- Clean up unused images

### Code Quality
- ESLint for JavaScript
- Prettier for formatting
- Git hooks for pre-commit checks
- Code reviews for changes
