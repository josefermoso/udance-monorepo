# Best Practices

## Code Quality Standards

### Design Principles
- **Single Responsibility**: Each module/component should have one clear purpose
- **SOLID Principles**: Strict adherence to all SOLID principles
- **Simplicity First**: Always prefer simple, elegant solutions over complex ones
- **DRY (Don't Repeat Yourself)**: Check existing codebase before creating new functionality

## Memory Bank File Structure
**IMPORTANT**: All project documentation and tracking files MUST be created inside the `memory-bank/` directory:
- `tasks.md` → Track active and completed tasks
- `*.md` documentation → All project docs belong here

### Code Organization
- **File Size Limit**: Maximum 300-400 lines per file - refactor when approaching this limit
- **Clean Codebase**: Maintain organized file structure and clear naming conventions
- **No Temporary Scripts**: Avoid creating one-time scripts in files
- **Cyclomatic Complexity**: Keep functions simple with low complexity

### Development Practices
- **Environment Awareness**: Code must account for dev, test, and prod environments
- **Conservative Changes**: Only make requested changes or those clearly related to the request
- **Pattern Consistency**: Exhaust existing patterns before introducing new ones
- **Clean Migration**: Remove old implementations when introducing new patterns

### Data Handling
- **No Mock Data in Production**: Mocking is only for tests, never for dev/prod
- **No Stub Patterns**: Avoid fake data patterns that affect runtime environments
- **Real Data Only**: Use actual data sources for development and production

### Testing Standards
- **Test Coverage**: Comprehensive unit and integration tests
- **Mock Isolation**: Keep mocks strictly in test environments
- **E2E Testing**: Playwright tests for critical user journeys

### Code Review Checklist
- [ ] Single responsibility maintained
- [ ] No code duplication
- [ ] File size under 400 lines
- [ ] Environment-specific code properly handled
- [ ] No unnecessary patterns introduced
- [ ] No mock/stub data in runtime code

### Environment Management
- **Never Overwrite .env**: Always confirm before modifying environment files
- **Environment Separation**: Clear boundaries between dev, test, and production
- **Configuration Safety**: Double-check environment-specific configurations

### Performance Considerations
- **Scalability**: Anticipate future growth in all implementations
- **Edge Optimization**: Leverage Cloudflare edge capabilities
- **Bundle Size**: Monitor and optimize bundle sizes
- **Lazy Loading**: Implement where appropriate

### Security Practices
- **Authentication**: Proper NextAuth.js implementation
- **Authorization**: Role-based access control enforcement
- **Data Validation**: Zod schemas for all user inputs
- **Environment Variables**: Secure handling of sensitive data
