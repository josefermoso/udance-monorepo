# 🚀 CI/CD & Multi-Environment Comprehensive Plan

## 📊 Plan Overview

Este documento detalla la planificación completa para implementar CI/CD, ambientes múltiples, testing, y herramientas de calidad de código para UDance.

### ✅ Decisiones de Arquitectura Confirmadas

**Ambientes:**
- **Development**: Vercel subdomain + Supabase dev project
- **Staging**: Vercel subdomain + Supabase staging project  
- **Production**: Vercel subdomain + Supabase production project

**Testing Strategy:**
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API testing with test database
- **E2E Tests**: Playwright para flujos críticos

**Herramientas de Calidad:**
- **Husky**: Git hooks para pre-commit/pre-push
- **ESLint**: React/Next.js/TypeScript rules
- **Prettier**: Formateo automático
- **Conventional Commits**: Con Commitizen

**CI/CD Pipeline:**
- **GitHub Actions**: Para CI/CD completo
- **Branching Strategy**: main → prod, dev → staging, feature → dev

## 🔧 Implementación Detallada

### 1. CONFIGURACIÓN DE AMBIENTES

#### 1.1 Estructura de Branches
```
main (protected)          → Production
├── dev (protected)       → Staging  
├── feature/xxx           → Development (manual deploy)
└── hotfix/xxx           → Development → Production
```

#### 1.2 Vercel Projects Setup
```bash
# En Vercel Dashboard:
# Project 1: udance-dev (connected to any branch for testing)
# Project 2: udance-staging (auto-deploy from dev)  
# Project 3: udance-prod (auto-deploy from main)
```

#### 1.3 Supabase Projects Structure
```
Development: udance-dev-[random-id].supabase.co
Staging: udance-staging-[random-id].supabase.co  
Production: udance-prod-[random-id].supabase.co
```

#### 1.4 Environment Variables Matrix
| Variable | Development | Staging | Production |
|----------|-------------|---------|------------|
| NEXT_PUBLIC_SUPABASE_URL | dev-project-url | staging-project-url | prod-project-url |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | dev-anon-key | staging-anon-key | prod-anon-key |
| SUPABASE_SERVICE_ROLE_KEY | dev-service-key | staging-service-key | prod-service-key |
| GOOGLE_CLIENT_ID | same for all | same for all | same for all |
| GOOGLE_CLIENT_SECRET | same for all | same for all | same for all |
| NODE_ENV | development | staging | production |

### 2. HERRAMIENTAS DE CALIDAD DE CÓDIGO

#### 2.1 Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "commit": "cz",
    "prepare": "husky install"
  }
}
```

#### 2.2 Husky Configuration

**`.husky/pre-commit`**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Ejecutar lint-staged
npx lint-staged
```

**`.husky/pre-push`**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Type checking
npm run type-check

# Build verification
npm run build

# Run tests (solo unit tests en pre-push)
npm run test -- --passWithNoTests
```

**`.husky/commit-msg`**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Validate conventional commit format
npx commitlint --edit $1
```

#### 2.3 Lint-staged Configuration

**`lint-staged.config.js`**
```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'git add'
  ],
  '*.{json,md,css,scss}': [
    'prettier --write',
    'git add'
  ]
}
```

#### 2.4 ESLint Configuration

**`.eslintrc.json`**
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn"
  },
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  }
}
```

#### 2.5 Prettier Configuration

**`.prettierrc`**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### 2.6 Commitizen Configuration

**`.cz.json`**
```json
{
  "path": "cz-conventional-changelog",
  "types": {
    "feat": "Nueva funcionalidad",
    "fix": "Corrección de bug",
    "docs": "Documentación",
    "style": "Formateo",
    "refactor": "Refactoring",
    "test": "Tests",
    "chore": "Mantenimiento",
    "ci": "CI/CD",
    "perf": "Performance"
  }
}
```

### 3. GITHUB ACTIONS CI/CD

#### 3.1 CI Pipeline

**`.github/workflows/ci.yml`**
```yaml
name: Continuous Integration

on:
  pull_request:
    branches: [main, dev]
  push:
    branches: [main, dev]

jobs:
  quality-checks:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Type checking
        run: npm run type-check
        
      - name: Linting
        run: npm run lint
        
      - name: Format checking
        run: npm run format:check
        
      - name: Unit tests
        run: npm run test -- --coverage
        
      - name: Build verification
        run: npm run build
        
      - name: Security audit
        run: npm audit --audit-level=high

  e2e-tests:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Install Playwright
        run: npx playwright install --with-deps
        
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_TEST_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_TEST_ANON_KEY }}
```

#### 3.2 CD Pipeline

**`.github/workflows/deploy.yml`**
```yaml
name: Continuous Deployment

on:
  push:
    branches: [main, dev]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
        - staging
        - production

jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/dev' || (github.event_name == 'workflow_dispatch' && github.event.inputs.environment == 'staging')
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Deploy to Vercel Staging
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_STAGING }}
          vercel-args: '--prod'
          
      - name: Run post-deployment tests
        run: |
          # Health check
          curl -f https://udance-staging.vercel.app/api/health || exit 1

  deploy-production:
    if: github.ref == 'refs/heads/main' || (github.event_name == 'workflow_dispatch' && github.event.inputs.environment == 'production')
    runs-on: ubuntu-latest
    environment: production
    needs: [quality-checks] # Require CI to pass
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_PRODUCTION }}
          vercel-args: '--prod'
          
      - name: Run post-deployment tests
        run: |
          # Health check
          curl -f https://udance-prod.vercel.app/api/health || exit 1
          
      - name: Notify deployment success
        run: echo "🚀 Production deployment successful!"
```

### 4. TESTING INFRASTRUCTURE

#### 4.1 Jest Configuration

**`jest.config.js`**
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

**`jest.setup.js`**
```javascript
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))
```

#### 4.2 Playwright Configuration

**`playwright.config.ts`**
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3001',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
  },
})
```

### 5. DATABASE MIGRATIONS

#### 5.1 Supabase CLI Setup

**`supabase/config.toml`**
```toml
project_id = "your-project-id"

[api]
enabled = true
port = 54321
schemas = ["public", "graphql_public"]
extra_search_path = ["public", "extensions"]
max_rows = 1000

[db]
port = 54322
shadow_port = 54320
major_version = 15

[studio]
enabled = true
port = 54323

[auth]
enabled = true
site_url = "http://localhost:3001"
additional_redirect_urls = ["https://udance-staging.vercel.app", "https://udance-prod.vercel.app"]
jwt_expiry = 3600
enable_signup = true
```

#### 5.2 Migration Scripts

**`package.json` (Database Scripts)**
```json
{
  "scripts": {
    "db:start": "supabase start",
    "db:stop": "supabase stop",
    "db:reset": "supabase db reset",
    "db:migrate": "supabase db push",
    "db:generate-types": "supabase gen types typescript --local > src/lib/database.types.ts"
  }
}
```

### 6. GITHUB SECRETS REQUERIDOS

```
# Vercel
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID_STAGING
VERCEL_PROJECT_ID_PRODUCTION

# Supabase Testing
SUPABASE_TEST_URL
SUPABASE_TEST_ANON_KEY

# Optional: Notifications
SLACK_WEBHOOK_URL
DISCORD_WEBHOOK_URL
```

### 7. CHECKLIST DE IMPLEMENTACIÓN

#### Fase 1: Setup Básico (Día 1)
- [ ] Crear branches develop y configurar protección
- [ ] Configurar tres proyectos Vercel
- [ ] Crear tres proyectos Supabase
- [ ] Configurar variables de entorno

#### Fase 2: Herramientas de Calidad (Día 2)
- [ ] Instalar y configurar Husky
- [ ] Configurar ESLint y Prettier
- [ ] Setup Conventional Commits
- [ ] Configurar lint-staged

#### Fase 3: GitHub Actions (Día 3)
- [ ] Crear workflow CI
- [ ] Crear workflow CD
- [ ] Configurar GitHub Secrets
- [ ] Test pipelines

#### Fase 4: Testing (Día 4-5)
- [ ] Configurar Jest
- [ ] Setup Playwright
- [ ] Crear tests básicos
- [ ] Integrar en CI

#### Fase 5: Database (Día 6)
- [ ] Setup Supabase CLI
- [ ] Crear migraciones iniciales
- [ ] Test migrations en environments

#### Fase 6: Documentation & Training (Día 7)
- [ ] Documentar workflow
- [ ] Crear guías de desarrollo
- [ ] Test completo end-to-end

## 🎯 NEXT STEPS

1. **¿Confirmas este approach?** - Si te parece bien el plan completo
2. **¿Empezamos con la implementación?** - Comenzar con la configuración de ambientes
3. **¿Algún ajuste específico?** - Modificaciones al plan antes de implementar

Este plan te da una infraestructura de desarrollo profesional que escalará conforme crezca UDance. ¿Procedemos con la implementación? 