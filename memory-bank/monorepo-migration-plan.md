# 🏗️ Plan de Migración a Monorepo - uDance

## 🎯 **Objetivo**
Migrar el proyecto actual Next.js a un monorepo que soporte:
- **Web Desktop**: Sitio para usuarios finales
- **Admin Desktop**: Panel para locales/administradores  
- **PWA Mobile**: App para usuarios finales (instalable)
- **Componentes Compartidos**: UI + Storybook + Testing

## 📁 **Estructura Final**

```
udance-monorepo/
├── apps/
│   ├── web/              # Next.js - Sitio usuarios (desktop)
│   ├── admin/            # Next.js - Panel admin (desktop)
│   └── pwa/              # Next.js + PWA - App usuarios (mobile)
├── packages/
│   ├── ui/               # Componentes + Storybook
│   ├── shared/           # Utils, types, API client
│   ├── database/         # Schema Supabase + migrations
│   └── testing/          # Configuración testing compartida
├── tools/
│   ├── eslint-config/    # ESLint config compartido
│   ├── prettier-config/  # Prettier config compartido
│   └── tsconfig/         # TypeScript configs base
├── docs/                 # Documentación del proyecto
├── memory-bank/          # Memory Bank compartido
├── .github/
│   └── workflows/        # CI/CD para todas las apps
├── package.json          # Root workspace (pnpm)
├── pnpm-workspace.yaml   # Configuración workspaces
├── playwright.config.ts  # Configuración E2E global
└── turbo.json           # Configuración Turborepo
```

## 🛠️ **Tecnologías y Herramientas**

### **Package Manager & Monorepo**
- **pnpm**: Workspaces + eficiencia de disco
- **Turborepo**: Build caching + task orchestration
- **Changesets**: Versionado de packages

### **Testing Stack**
- **Jest**: Unit tests en packages/
- **React Testing Library**: Component testing
- **Playwright**: E2E tests cross-app
- **Storybook**: Visual testing + documentación

### **Quality Tools**
- **Husky**: Git hooks para todas las apps
- **ESLint**: Configuración compartida
- **Prettier**: Formateo unificado
- **TypeScript**: Strict mode + project references

### **CI/CD**
- **GitHub Actions**: Multi-app deployments
- **Vercel**: Deployment de todas las apps
- **Supabase CLI**: Database migrations

## 📋 **Plan de Migración Detallado**

### **FASE 1: Setup Base del Monorepo (2-3 horas)**

#### 1.1 Crear estructura inicial
```bash
# Crear directorio del monorepo
mkdir udance-monorepo
cd udance-monorepo

# Inicializar workspace root
pnpm init

# Crear estructura de directorios
mkdir -p apps/{web,admin,pwa}
mkdir -p packages/{ui,shared,database,testing}
mkdir -p tools/{eslint-config,prettier-config,tsconfig}
mkdir -p .github/workflows
```

#### 1.2 Configurar pnpm workspaces
```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'tools/*'
```

```json
# package.json root
{
  "name": "udance-monorepo",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "test:e2e": "playwright test",
    "storybook": "pnpm --filter ui storybook",
    "dev:web": "pnpm --filter web dev",
    "dev:admin": "pnpm --filter admin dev",
    "dev:pwa": "pnpm --filter pwa dev"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.1",
    "@playwright/test": "^1.40.0",
    "turbo": "^1.11.0",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0"
  }
}
```

#### 1.3 Configurar Turborepo
```json
# turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "storybook-static/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "storybook": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### **FASE 2: Migrar Proyecto Actual (1-2 horas)**

#### 2.1 Migrar a apps/web/
```bash
# Copiar proyecto actual a apps/web
cp -r ../udance/* apps/web/
cd apps/web

# Actualizar package.json
{
  "name": "@udance/web",
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "test": "jest"
  },
  "dependencies": {
    "next": "15.3.4",
    "@udance/ui": "workspace:*",
    "@udance/shared": "workspace:*"
  }
}
```

#### 2.2 Mover recursos compartidos
```bash
# Mover documentación al root
mv apps/web/docs ./
mv apps/web/memory-bank ./

# Mover configuraciones a tools/
mv apps/web/eslint.config.js tools/eslint-config/
mv apps/web/prettier.config.js tools/prettier-config/
mv apps/web/tsconfig.json tools/tsconfig/base.json
```

### **FASE 3: Crear Apps Restantes (2-3 horas)**

#### 3.1 Configurar apps/admin/
```bash
cd apps/admin
pnpm init

# Crear estructura Next.js básica
mkdir -p src/{app,components,lib}
```

```json
# apps/admin/package.json
{
  "name": "@udance/admin",
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "15.3.4",
    "@udance/ui": "workspace:*",
    "@udance/shared": "workspace:*"
  }
}
```

#### 3.2 Configurar apps/pwa/
```bash
cd apps/pwa
pnpm init

# Crear estructura PWA
mkdir -p src/{app,components,lib}
mkdir public
```

```json
# apps/pwa/package.json
{
  "name": "@udance/pwa",
  "scripts": {
    "dev": "next dev -p 3002",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "15.3.4",
    "next-pwa": "5.6.0",
    "@udance/ui": "workspace:*",
    "@udance/shared": "workspace:*"
  }
}
```

### **FASE 4: Configurar Packages Compartidos (3-4 horas)**

#### 4.1 packages/ui/ (Componentes + Storybook)
```bash
cd packages/ui
pnpm init

# Instalar dependencias
pnpm add react react-dom typescript
pnpm add -D @storybook/nextjs @storybook/react storybook
pnpm add -D @types/react @types/react-dom

# Inicializar Storybook
npx storybook@latest init
```

```json
# packages/ui/package.json
{
  "name": "@udance/ui",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test": "jest"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

#### 4.2 packages/shared/ (Utils + Types + API)
```bash
cd packages/shared
pnpm init
mkdir -p src/{utils,types,api,hooks}
```

```json
# packages/shared/package.json
{
  "name": "@udance/shared",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0",
    "zustand": "^4.4.0"
  }
}
```

#### 4.3 packages/database/ (Schema + Migrations)
```bash
cd packages/database
pnpm init
mkdir -p {migrations,seeds,types}
pnpm add -D @supabase/cli
```

#### 4.4 packages/testing/ (Config Testing)
```bash
cd packages/testing
pnpm init

# Configuraciones Jest compartidas
mkdir -p configs
```

```json
# packages/testing/package.json
{
  "name": "@udance/testing",
  "main": "configs/jest.config.js",
  "dependencies": {
    "jest": "^29.0.0",
    "@testing-library/react": "^13.0.0",
    "@testing-library/jest-dom": "^6.0.0"
  }
}
```

### **FASE 5: Configurar Playwright E2E (1-2 horas)**

#### 5.1 Configuración global de Playwright
```bash
# En el root del monorepo
pnpm add -D @playwright/test
npx playwright install
```

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'web-desktop',
      testDir: './e2e/web',
      use: { baseURL: 'http://localhost:3000' }
    },
    {
      name: 'admin-desktop', 
      testDir: './e2e/admin',
      use: { baseURL: 'http://localhost:3001' }
    },
    {
      name: 'pwa-mobile',
      testDir: './e2e/pwa',
      use: { 
        baseURL: 'http://localhost:3002',
        viewport: { width: 375, height: 667 }
      }
    }
  ],
  webServer: [
    { command: 'pnpm dev:web', port: 3000 },
    { command: 'pnpm dev:admin', port: 3001 }, 
    { command: 'pnpm dev:pwa', port: 3002 }
  ]
});
```

#### 5.2 Estructura de tests E2E
```
e2e/
├── web/
│   ├── auth.spec.ts
│   ├── search.spec.ts
│   └── booking.spec.ts
├── admin/
│   ├── dashboard.spec.ts
│   ├── classes.spec.ts
│   └── analytics.spec.ts
├── pwa/
│   ├── install.spec.ts
│   ├── offline.spec.ts
│   └── search.spec.ts
└── shared/
    ├── fixtures/
    └── utils/
```

### **FASE 6: Configurar Quality Tools (1-2 horas)**

#### 6.1 ESLint compartido
```bash
cd tools/eslint-config
pnpm init
```

```json
# tools/eslint-config/package.json
{
  "name": "@udance/eslint-config",
  "main": "index.js",
  "dependencies": {
    "@next/eslint-config-next": "^14.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "eslint-config-prettier": "^9.0.0"
  }
}
```

#### 6.2 Husky para todo el monorepo
```bash
# En el root
pnpm add -D husky lint-staged
npx husky init
```

```bash
# .husky/pre-commit
echo "🔍 Running pre-commit checks..."
pnpm lint-staged
```

```json
# package.json root - lint-staged
{
  "lint-staged": {
    "apps/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "packages/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### **FASE 7: CI/CD Multi-App (2-3 horas)**

#### 7.1 GitHub Actions para el monorepo
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm test:e2e

  deploy-web:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_WEB }}
          working-directory: ./apps/web

  deploy-admin:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy Admin to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_ADMIN }}
          working-directory: ./apps/admin

  deploy-pwa:
    needs: test  
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy PWA to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_PWA }}
          working-directory: ./apps/pwa
```

## ⚡ **Scripts de Desarrollo Principales**

```bash
# Desarrollo
pnpm dev                  # Todas las apps en paralelo
pnpm dev:web             # Solo sitio usuarios (puerto 3000)
pnpm dev:admin           # Solo panel admin (puerto 3001)  
pnpm dev:pwa             # Solo PWA mobile (puerto 3002)

# Storybook y testing
pnpm storybook           # Componentes UI (puerto 6006)
pnpm test                # Unit tests todas las apps
pnpm test:e2e            # E2E tests con Playwright

# Build y deploy
pnpm build               # Build todas las apps
pnpm lint                # Lint todo el monorepo
pnpm format              # Format código

# Package management
pnpm add lodash --filter web       # Agregar dep a app específica
pnpm add -D jest --filter ui       # Dev dep a package específico
pnpm add react --workspace-root    # Dep al workspace root
```

## 📊 **Timeline de Migración**

| Fase | Duración | Descripción |
|------|----------|-------------|
| **Fase 1** | 2-3h | Setup base monorepo + tooling |
| **Fase 2** | 1-2h | Migrar proyecto actual a apps/web |
| **Fase 3** | 2-3h | Crear apps/admin y apps/pwa |
| **Fase 4** | 3-4h | Configurar packages compartidos + Storybook |
| **Fase 5** | 1-2h | Setup Playwright E2E |
| **Fase 6** | 1-2h | Configurar quality tools |
| **Fase 7** | 2-3h | CI/CD multi-app |
| **Testing** | 2-3h | Verificar todo funciona |

**Total estimado: 14-21 horas** (2-3 días de trabajo)

## ✅ **Criterios de Éxito**

- [ ] Todas las apps buildean sin errores
- [ ] Storybook muestra componentes correctamente
- [ ] Tests unitarios pasan en todos los packages
- [ ] E2E tests cubren flujos principales
- [ ] CI/CD deploya las 3 apps independientemente
- [ ] Husky bloquea commits con errores
- [ ] Hot reload funciona en desarrollo
- [ ] Dependencias compartidas funcionan correctamente

## 🚀 **Siguientes Pasos Inmediatos**

1. **Confirmar el plan** - ¿Estás de acuerdo con esta estructura?
2. **Empezar Fase 1** - Crear estructura base del monorepo
3. **Migrar gradualmente** - Una fase a la vez para evitar romper nada
4. **Testing continuo** - Verificar que cada fase funciona antes de continuar

¿Quieres que empecemos con la Fase 1 o tienes alguna pregunta sobre la estructura propuesta? 