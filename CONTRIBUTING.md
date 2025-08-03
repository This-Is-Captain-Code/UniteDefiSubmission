# Contributing to SuiBridge

Thank you for your interest in contributing to SuiBridge! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database
- Git
- Basic knowledge of TypeScript, React, and blockchain concepts

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/suibridge.git
   cd suibridge
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🛠 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent indentation (2 spaces)

### Component Guidelines
- Use functional components with hooks
- Keep components focused and single-purpose
- Use proper TypeScript types
- Follow the existing component structure in `client/src/components/`

### API Development
- All endpoints should have proper error handling
- Use appropriate HTTP status codes
- Validate input with Zod schemas
- Follow RESTful conventions
- Document new endpoints

### Database Changes
- Update schema in `shared/schema.ts`
- Use Drizzle ORM patterns
- Run `npm run db:push` to apply changes
- Never write raw SQL migrations

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Writing Tests
- Write unit tests for new functions
- Add integration tests for API endpoints
- Test component rendering and interactions
- Ensure edge cases are covered

## 📝 Pull Request Process

### Before Submitting
1. **Test Your Changes**
   ```bash
   npm run test
   npm run build
   ```

2. **Check Code Quality**
   ```bash
   npm run lint
   npm run type-check
   ```

3. **Update Documentation**
   - Update README.md if needed
   - Add JSDoc comments for new functions
   - Update API documentation

### PR Guidelines
1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Commit Messages**
   - Use clear, descriptive commit messages
   - Start with a verb (Add, Fix, Update, Remove)
   - Keep first line under 50 characters
   - Add detailed description if needed

3. **Pull Request Template**
   - Describe what changes you made
   - Explain why the changes are needed
   - Link any related issues
   - Include screenshots for UI changes

## 🐛 Bug Reports

### Before Reporting
- Check existing issues
- Try to reproduce the bug
- Gather relevant information

### Bug Report Template
```markdown
**Describe the Bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox]
- Node Version: [e.g. 18.17.0]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How would you like this feature to work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context about the feature.
```

## 🏗 Architecture Guidelines

### Frontend Structure
```
client/src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom hooks
├── lib/            # Utilities and config
└── assets/         # Static assets
```

### Backend Structure
```
server/
├── routes.ts       # API routes
├── storage.ts      # Data layer
├── db.ts           # Database connection
└── utils/          # Server utilities
```

### Key Principles
- **Separation of Concerns**: Keep logic separated
- **Type Safety**: Use TypeScript throughout
- **Error Handling**: Comprehensive error management
- **Performance**: Optimize for production use
- **Security**: Follow security best practices

## 🔐 Security Guidelines

### Smart Contract Security
- All contracts must be audited
- Use established security patterns
- Test extensively before deployment
- Document security assumptions

### API Security
- Validate all inputs
- Use proper authentication
- Implement rate limiting
- Log security events

### Frontend Security
- Sanitize user inputs
- Use HTTPS in production
- Implement CSP headers
- Validate data from APIs

## 📊 Performance Guidelines

### Frontend Performance
- Minimize bundle size
- Use lazy loading
- Optimize images
- Implement proper caching

### Backend Performance
- Use database indexing
- Implement query optimization
- Add proper caching layers
- Monitor API response times

## 🎯 Contribution Areas

### High Priority
- Bug fixes
- Security improvements
- Performance optimizations
- Test coverage improvements

### Medium Priority
- New features
- UI/UX improvements
- Documentation updates
- Code refactoring

### Low Priority
- Minor enhancements
- Code cleanup
- Example applications
- Tutorial content

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on technical discussions

### Communication
- Use clear, professional language
- Be patient with questions
- Share knowledge and resources
- Collaborate openly

## 📞 Getting Help

### Channels
- **GitHub Issues**: For bugs and feature requests
- **Discord**: For real-time discussions
- **Email**: For security issues or private matters

### Resources
- **Documentation**: [docs.suibridge.com](https://docs.suibridge.com)
- **API Reference**: [api.suibridge.com](https://api.suibridge.com)
- **Code Examples**: Check the `examples/` directory

---

Thank you for contributing to SuiBridge! Together, we're building the future of cross-chain infrastructure.