# Testing Guide

## Overview

This guide covers testing strategies for both backend and frontend.

## Backend Testing

### Setup

```bash
cd backend
npm install --save-dev jest supertest
```

### Test Structure

```
backend/
├── tests/
│   ├── auth.test.js
│   ├── profile.test.js
│   ├── projects.test.js
│   └── contacts.test.js
```

### Example Test: Auth Controller

```javascript
// tests/auth.test.js
const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@portfolio.com',
          password: 'admin123'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.success).toBe(true);
    });

    it('should reject invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@portfolio.com',
          password: 'wrongpassword'
        });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({});
      
      expect(res.statusCode).toBe(400);
    });
  });
});
```

### Example Test: Projects Controller

```javascript
// tests/projects.test.js
const request = require('supertest');
const app = require('../server');

let authToken;

beforeAll(async () => {
  // Login to get token
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin@portfolio.com',
      password: 'admin123'
    });
  authToken = res.body.token;
});

describe('Projects Endpoints', () => {
  describe('GET /api/projects', () => {
    it('should get all projects', async () => {
      const res = await request(app).get('/api/projects');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
    });

    it('should support pagination', async () => {
      const res = await request(app)
        .get('/api/projects?page=1&limit=5');
      
      expect(res.body.pagination.page).toBe(1);
      expect(res.body.pagination.limit).toBe(5);
    });
  });

  describe('POST /api/projects', () => {
    it('should create project with valid data', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Project',
          description: 'Test description',
          tech_stack: 'React, Node.js',
          github_link: 'https://github.com/test/project',
          live_link: 'https://test.com'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it('should reject without authentication', async () => {
      const res = await request(app)
        .post('/api/projects')
        .send({
          title: 'Test Project',
          description: 'Test description'
        });
      
      expect(res.statusCode).toBe(401);
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});
      
      expect(res.statusCode).toBe(400);
    });
  });
});
```

### Running Backend Tests

```bash
cd backend
npm test
```

---

## Frontend Testing

### Setup

```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Test Structure

```
frontend/src/
├── __tests__/
│   ├── components/
│   │   ├── Navbar.test.js
│   │   └── ProtectedRoute.test.js
│   └── pages/
│       ├── Home.test.js
│       ├── Login.test.js
│       └── Projects.test.js
```

### Example Test: Navbar Component

```javascript
// __tests__/components/Navbar.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar theme="light" toggleTheme={() => {}} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(
      <BrowserRouter>
        <Navbar theme="light" toggleTheme={() => {}} />
      </BrowserRouter>
    );
    
    const themeButton = screen.getByRole('button');
    expect(themeButton).toBeInTheDocument();
  });
});
```

### Example Test: Login Page

```javascript
// __tests__/pages/Login.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import API from '../../utils/api';

jest.mock('../../utils/api');

describe('Login Page', () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    API.post.mockResolvedValue({
      data: {
        token: 'fake-token',
        user: { id: 1, email: 'admin@portfolio.com' }
      }
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'admin@portfolio.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'admin123' }
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-token');
    });
  });

  it('displays error on failed login', async () => {
    API.post.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } }
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@email.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpass' }
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});
```

### Running Frontend Tests

```bash
cd frontend
npm test
```

---

## E2E Testing with Cypress

### Setup

```bash
cd frontend
npm install --save-dev cypress
npx cypress open
```

### Example E2E Test

```javascript
// cypress/e2e/login.cy.js
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should login successfully', () => {
    cy.get('input[name="email"]').type('admin@portfolio.com');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.contains('Admin Panel').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[name="email"]').type('wrong@email.com');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Invalid credentials').should('be.visible');
  });
});
```

---

## Manual Testing Checklist

### Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout functionality
- [ ] Protected routes redirect to login
- [ ] Token expiration handling

### Profile Management
- [ ] View profile on home page
- [ ] Update profile information
- [ ] Upload profile image
- [ ] Update resume link
- [ ] Validation errors display

### Projects
- [ ] View all projects
- [ ] Pagination works correctly
- [ ] Create new project
- [ ] Upload project image
- [ ] Edit existing project
- [ ] Delete project
- [ ] Validation errors display

### Contact Form
- [ ] Submit contact form
- [ ] Validation errors display
- [ ] Success message shows
- [ ] Admin can view messages
- [ ] Mark messages as read

### UI/UX
- [ ] Theme toggle works
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Loading states display
- [ ] Error states display
- [ ] Navigation works correctly

### Security
- [ ] Cannot access admin routes without login
- [ ] Token required for protected endpoints
- [ ] File upload restrictions work
- [ ] Rate limiting works
- [ ] CORS configured correctly

---

## Performance Testing

### Backend Load Testing

```bash
npm install -g artillery
```

Create `load-test.yml`:
```yaml
config:
  target: 'http://localhost:5000'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - flow:
      - get:
          url: '/api/projects'
      - get:
          url: '/api/profile'
```

Run test:
```bash
artillery run load-test.yml
```

### Frontend Performance

Use Lighthouse in Chrome DevTools:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. Review performance metrics

---

## Test Coverage

### Backend Coverage

```bash
cd backend
npm test -- --coverage
```

Target coverage:
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

### Frontend Coverage

```bash
cd frontend
npm test -- --coverage --watchAll=false
```

---

## Continuous Integration

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm ci
      - run: cd backend && npm test

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend && npm ci
      - run: cd frontend && npm test -- --watchAll=false
```

---

## Best Practices

1. **Write tests first** (TDD approach)
2. **Test user behavior**, not implementation
3. **Keep tests isolated** and independent
4. **Use descriptive test names**
5. **Mock external dependencies**
6. **Test edge cases** and error scenarios
7. **Maintain test coverage** above 80%
8. **Run tests before commits**
9. **Update tests** when code changes
10. **Review test failures** carefully
