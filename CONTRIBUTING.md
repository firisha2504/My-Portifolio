# Contributing Guide

Thank you for considering contributing to this portfolio project!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/portfolio.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit: `git commit -m "Add: your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

### Prerequisites
- Node.js 16+ and npm
- MySQL 8.0+
- Git

### Installation
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Code Style

### JavaScript/React
- Use ES6+ features
- Functional components with hooks
- Meaningful variable names
- Add comments for complex logic

### File Naming
- Components: PascalCase (e.g., `Navbar.js`)
- Utilities: camelCase (e.g., `api.js`)
- CSS: Match component name (e.g., `Navbar.css`)

### Code Formatting
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in objects/arrays

## Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add dark mode toggle
fix: resolve login authentication issue
docs: update API documentation
```

## Pull Request Process

1. Update README.md if needed
2. Update documentation for new features
3. Ensure all tests pass
4. Request review from maintainers
5. Address review feedback
6. Squash commits if requested

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Bug Reports

Include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

## Feature Requests

Include:
- Clear description of feature
- Use case and benefits
- Possible implementation approach
- Mockups or examples if applicable

## Code Review Checklist

- [ ] Code follows project style guide
- [ ] No console.logs in production code
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] Security considerations addressed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes (or documented)

## Areas for Contribution

### High Priority
- Add unit tests for controllers
- Implement email notifications
- Add search functionality
- Improve error messages
- Add loading skeletons

### Medium Priority
- Add blog section
- Implement analytics dashboard
- Add social media links
- Improve mobile responsiveness
- Add animations

### Low Priority
- Add multi-language support
- Add dark mode improvements
- Add more themes
- Add export functionality

## Questions?

Feel free to open an issue for any questions or clarifications.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
