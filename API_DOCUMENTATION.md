# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All admin endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@portfolio.com",
    "role": "admin"
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Register
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Profile Endpoints

### Get Profile
```http
GET /api/profile
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "title": "Full Stack Developer",
    "bio": "Passionate developer...",
    "profile_image": "https://res.cloudinary.com/...",
    "resume_link": "https://example.com/resume.pdf",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Update Profile (Admin Only)
```http
PUT /api/profile
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
name: John Doe
title: Full Stack Developer
bio: Passionate developer building amazing applications
resume_link: https://example.com/resume.pdf
profile_image: [file]
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

---

## Projects Endpoints

### Get All Projects
```http
GET /api/projects?page=1&limit=10
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "E-commerce Platform",
      "description": "Full-featured online store",
      "tech_stack": "React, Node.js, MongoDB",
      "github_link": "https://github.com/user/project",
      "live_link": "https://project.com",
      "image_url": "https://res.cloudinary.com/...",
      "created_at": "2024-01-10T08:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

### Get Single Project
```http
GET /api/projects/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "E-commerce Platform",
    "description": "Full-featured online store",
    "tech_stack": "React, Node.js, MongoDB",
    "github_link": "https://github.com/user/project",
    "live_link": "https://project.com",
    "image_url": "https://res.cloudinary.com/...",
    "created_at": "2024-01-10T08:00:00.000Z"
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

### Create Project (Admin Only)
```http
POST /api/projects
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
title: E-commerce Platform
description: Full-featured online store with payment integration
tech_stack: React, Node.js, MongoDB, Stripe
github_link: https://github.com/user/project
live_link: https://project.com
image: [file]
```

**Response (201):**
```json
{
  "success": true,
  "message": "Project created",
  "id": 1
}
```

---

### Update Project (Admin Only)
```http
PUT /api/projects/:id
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:** (same as create)

**Response (200):**
```json
{
  "success": true,
  "message": "Project updated"
}
```

---

### Delete Project (Admin Only)
```http
DELETE /api/projects/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Project deleted"
}
```

---

## Contact Endpoints

### Submit Contact Form
```http
POST /api/contacts
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project..."
}
```

**Validation Rules:**
- `name`: Required, non-empty string
- `email`: Required, valid email format
- `subject`: Optional string
- `message`: Required, non-empty string

**Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Error (400):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

---

### Get All Contacts (Admin Only)
```http
GET /api/contacts
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "subject": "Project Inquiry",
      "message": "I would like to discuss...",
      "is_read": false,
      "created_at": "2024-01-15T14:30:00.000Z"
    }
  ]
}
```

---

### Mark Contact as Read (Admin Only)
```http
PUT /api/contacts/:id/read
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Marked as read"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [...]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role not authorized"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per window
- **Response when exceeded (429):**
```json
{
  "message": "Too many requests, please try again later."
}
```

---

## File Upload Specifications

### Allowed Image Types
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)

### File Size Limit
- Maximum: 5MB per file

### Upload Fields
- `profile_image`: Profile picture upload
- `image`: Project image upload

---

## Testing with cURL

### Login Example
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

### Get Projects Example
```bash
curl http://localhost:5000/api/projects?page=1&limit=5
```

### Create Project Example
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=My Project" \
  -F "description=Project description" \
  -F "tech_stack=React, Node.js" \
  -F "image=@/path/to/image.jpg"
```

---

## Testing with Postman

1. Import the API endpoints
2. Set base URL variable: `{{baseUrl}} = http://localhost:5000/api`
3. Create environment variable for token: `{{token}}`
4. Use `Bearer {{token}}` in Authorization header
5. For file uploads, use form-data body type
