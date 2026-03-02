# Project Structure

```
portfolio/
│
├── backend/                      # Backend Node.js/Express application
│   ├── config/                   # Configuration files
│   │   ├── db.js                # MySQL database connection
│   │   └── cloudinary.js        # Cloudinary configuration
│   │
│   ├── controllers/              # Business logic
│   │   ├── authController.js    # Authentication logic
│   │   ├── profileController.js # Profile management
│   │   ├── projectController.js # Projects CRUD
│   │   └── contactController.js # Contact form handling
│   │
│   ├── middleware/               # Express middleware
│   │   ├── auth.js              # JWT authentication
│   │   ├── errorHandler.js      # Error handling
│   │   ├── upload.js            # File upload (Multer)
│   │   ├── validation.js        # Input validation
│   │   └── security.js          # Security (rate limiting, helmet)
│   │
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js        # /api/auth/*
│   │   ├── profileRoutes.js     # /api/profile/*
│   │   ├── projectRoutes.js     # /api/projects/*
│   │   └── contactRoutes.js     # /api/contacts/*
│   │
│   ├── scripts/                  # Utility scripts
│   │   └── seedDatabase.js      # Database seeding
│   │
│   ├── utils/                    # Helper utilities
│   │   └── generateHash.js      # Password hash generator
│   │
│   ├── uploads/                  # Local file uploads (gitignored)
│   │
│   ├── .env.example             # Environment variables template
│   ├── .gitignore               # Git ignore rules
│   ├── Dockerfile               # Docker configuration
│   ├── package.json             # Dependencies and scripts
│   └── server.js                # Application entry point
│
├── frontend/                     # Frontend React application
│   ├── public/                   # Static files
│   │   └── index.html           # HTML template
│   │
│   ├── src/                      # Source code
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.js        # Navigation bar
│   │   │   ├── Navbar.css
│   │   │   └── ProtectedRoute.js # Route protection
│   │   │
│   │   ├── context/             # React Context
│   │   │   └── AuthContext.js   # Authentication context
│   │   │
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useFetch.js      # Data fetching hook
│   │   │
│   │   ├── pages/               # Page components
│   │   │   ├── Home.js          # Landing page
│   │   │   ├── Home.css
│   │   │   ├── About.js         # About page
│   │   │   ├── About.css
│   │   │   ├── Projects.js      # Projects listing
│   │   │   ├── Projects.css
│   │   │   ├── Contact.js       # Contact form
│   │   │   ├── Contact.css
│   │   │   ├── Login.js         # Admin login
│   │   │   ├── Login.css
│   │   │   ├── Dashboard.js     # Admin dashboard
│   │   │   └── Dashboard.css
│   │   │
│   │   ├── utils/               # Utility functions
│   │   │   └── api.js           # Axios configuration
│   │   │
│   │   ├── App.js               # Main application component
│   │   ├── App.css              # Global app styles
│   │   ├── index.js             # Application entry point
│   │   └── index.css            # Global styles & theme
│   │
│   ├── .env.example             # Environment variables template
│   ├── .gitignore               # Git ignore rules
│   ├── Dockerfile               # Docker configuration
│   └── package.json             # Dependencies and scripts
│
├── database/                     # Database files
│   └── schema.sql               # MySQL schema and seed data
│
├── .github/                      # GitHub configuration
│   └── workflows/
│       └── ci.yml               # CI/CD pipeline
│
├── .dockerignore                # Docker ignore rules
├── .env.example                 # Root environment variables
├── .gitignore                   # Root git ignore rules
├── docker-compose.yml           # Docker Compose configuration
├── setup.sh                     # Automated setup script
│
├── API_DOCUMENTATION.md         # API endpoints documentation
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guidelines
├── DEPLOYMENT.md                # Deployment instructions
├── LICENSE                      # MIT License
├── PROJECT_STRUCTURE.md         # This file
├── QUICKSTART.md                # Quick setup guide
├── README.md                    # Main documentation
├── TESTING.md                   # Testing guidelines
└── postman_collection.json      # Postman API collection

```

## Key Directories Explained

### Backend (`/backend`)
- **config/**: Database and third-party service configurations
- **controllers/**: Business logic separated from routes
- **middleware/**: Request processing (auth, validation, error handling)
- **routes/**: API endpoint definitions
- **scripts/**: Database seeding and utility scripts
- **utils/**: Helper functions

### Frontend (`/frontend`)
- **components/**: Reusable UI components
- **context/**: Global state management
- **hooks/**: Custom React hooks for reusable logic
- **pages/**: Full page components
- **utils/**: Helper functions and API configuration

### Database (`/database`)
- SQL schema with table definitions
- Default data seeding
- Relationships and constraints

### Documentation
- **README.md**: Main project documentation
- **QUICKSTART.md**: Fast setup guide
- **API_DOCUMENTATION.md**: Complete API reference
- **DEPLOYMENT.md**: Production deployment guides
- **TESTING.md**: Testing strategies and tools
- **CONTRIBUTING.md**: How to contribute
- **CHANGELOG.md**: Version history

## Architecture Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │ ──────> │   Backend   │ ──────> │   MySQL     │
│   (React)   │ <────── │  (Express)  │ <────── │  Database   │
└─────────────┘         └─────────────┘         └─────────────┘
      │                        │
      │                        │
      v                        v
┌─────────────┐         ┌─────────────┐
│  Cloudinary │         │     JWT     │
│   (Images)  │         │    (Auth)   │
└─────────────┘         └─────────────┘
```

## Data Flow

1. **User Request** → Frontend (React)
2. **API Call** → Backend (Express)
3. **Authentication** → JWT Middleware
4. **Authorization** → Role Check
5. **Validation** → Input Validation
6. **Business Logic** → Controller
7. **Database Query** → MySQL
8. **Response** → JSON to Frontend
9. **UI Update** → React State

## Security Layers

1. **Frontend**: Input validation, protected routes
2. **Backend**: JWT auth, rate limiting, CORS
3. **Database**: Prepared statements, constraints
4. **Network**: HTTPS, secure headers

## Deployment Structure

```
Production Environment
│
├── Frontend (Vercel/Netlify)
│   └── Static files served via CDN
│
├── Backend (Heroku/Railway/VPS)
│   └── Node.js server with PM2
│
├── Database (AWS RDS/PlanetScale)
│   └── Managed MySQL instance
│
└── Storage (Cloudinary)
    └── Image hosting and optimization
```
