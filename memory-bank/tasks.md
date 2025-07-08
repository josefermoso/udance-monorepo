# 🎯 UDance Tasks: Design System Development Ready

**Current Phase**: Multi-App Monorepo Complete ✅ → Design System Development Ready
**Status**: All foundational infrastructure complete, ready for systematic UI development

## ✅ RECENTLY COMPLETED: DaisyUI v5 Integration  
**RESOLUTION**: DaisyUI v5 successfully integrated in Admin app
- ✅ **Reinstalled DaisyUI v5** with correct syntax per official docs
- ✅ **CSS Configuration**: Using `@import "tailwindcss";` and `@plugin "daisyui";`
- ✅ **Architecture Decision**: DaisyUI only in admin app (not shared styles)
- ✅ **Local CSS**: Admin-specific `globals.css` with DaisyUI configuration
- ✅ **Build Verification**: Admin app builds and renders correctly
- **Impact**: Unblocked all UI development work

## 🚀 NEXT MAJOR MILESTONE: Design System & Component Library

**Previous Context**: Multi-app architecture complete (Web ✅, Admin ✅, PWA ✅), CI/CD ✅, Authentication ✅, Database ✅, DaisyUI v5 ✅

**Ready To Start**: Comprehensive design system development across all three applications

---

# Task: UDance Design System & Component Library Development

## Description
🎯 **CURRENT PRIORITY**: Create a comprehensive design system and component library for the UDance platform. This foundational system will establish consistent UI/UX patterns, reusable components, design tokens, and developer experience tools across all applications (Web, Admin, PWA).

**Infrastructure Status**: All foundation systems complete and operational ✅

## Complexity Assessment  
**Level**: 4 - Complex System Architecture
**Type**: Design System Architecture + Component Development + Developer Experience
**Status**: 🎯 **READY TO START** - All Infrastructure Complete + DaisyUI v5 Resolved
**Estimated Duration**: 3-4 weeks
**Priority**: HIGH - Foundational for all UI development

### Complexity Justification:
- **Cross-Platform Consistency**: Components must work across Web, Admin, PWA
- **Design Token System**: Color, typography, spacing, animation systems
- **Developer Experience**: Storybook, documentation, testing infrastructure  
- **Accessibility**: WCAG compliance across all components
- **Performance**: Tree-shaking, bundle optimization, lazy loading
- **Theming**: Light/dark modes, brand customization
- **Integration**: Seamless integration with existing Tailwind CSS 4.x + DaisyUI v5

## Technology Stack Integration
- **Design System**: Design tokens + Component variants
- **Component Library**: React components with TypeScript
- **Documentation**: Storybook 9.x + Interactive docs
- **Testing**: Jest + React Testing Library + Visual regression
- **Styling**: Tailwind CSS 4.1.11 + DaisyUI v5 (Admin) + CSS Variables ✅ OPERATIONAL
- **Animation**: Framer Motion + CSS transitions
- **Icons**: Lucide React + Custom SVG system
- **Build System**: Turbo + Tree-shaking optimization

## ✅ INFRASTRUCTURE STATUS: COMPLETE

### Foundation Systems Ready
- **Multi-App Architecture**: Web, Admin, PWA apps operational ✅
- **Shared Packages**: Database, auth, utilities in packages/shared ✅
- **Supabase**: Database + authentication fully integrated ✅
- **Tailwind CSS 4.1.11**: Fully operational across all apps ✅
- **DaisyUI v5**: Successfully integrated in admin app ✅
- **Storybook 9.0.15**: Component development environment running ✅
- **TypeScript**: Full type safety configured across monorepo ✅
- **Vercel**: Auto-deployment pipeline active ✅
- **Testing**: Jest + React Testing Library foundation ready ✅
- **CI/CD**: GitHub Actions multi-app pipeline operational ✅

### Recent Technical Resolutions
- **DaisyUI v5 Integration**: Complete with proper CSS configuration ✅
- **Multi-App Architecture**: Three independent apps (Web, Admin, PWA) ✅
- **Shared Package Migration**: Database and auth utilities in packages/shared ✅
- **PostCSS Configuration**: Fixed conflicts between Next.js and Storybook ✅
- **Cross-Platform Styling**: Consistent configuration across applications ✅

## 🎨 DESIGN SYSTEM MASTER PLAN

### 🔥 PHASE 1: Foundation & Design Tokens (Week 1)
**Goal**: Establish the foundational design system architecture

#### 1.1 Design Token System
- [ ] **Color System**: Primary, secondary, semantic, neutral palettes
  - [ ] Brand colors (UDance purple/pink gradient theme)
  - [ ] Semantic colors (success, warning, error, info)
  - [ ] Neutral grays (text, backgrounds, borders)
  - [ ] Light/Dark mode variants
  - [ ] Accessibility contrast validation (WCAG AA)

- [ ] **Typography Scale**: Font families, sizes, weights, line heights
  - [ ] Heading scale (H1-H6) with responsive variants
  - [ ] Body text scales (large, base, small)
  - [ ] Monospace for code/data
  - [ ] Font loading optimization

- [ ] **Spacing System**: Consistent spacing scale
  - [ ] Base spacing unit (4px/8px grid)
  - [ ] Component spacing patterns
  - [ ] Layout spacing (sections, containers)
  - [ ] Responsive spacing variants

- [ ] **Elevation & Shadows**: Z-index system + shadow tokens
  - [ ] Shadow scale (subtle to dramatic)
  - [ ] Z-index tokens for layering
  - [ ] Focus ring system

- [ ] **Border Radius**: Consistent radius scale
  - [ ] Component radius tokens (buttons, cards, inputs)
  - [ ] Responsive radius adjustments

#### 1.2 Design Token Implementation
- [ ] **CSS Custom Properties**: Generated from design tokens
- [ ] **Tailwind Integration**: Extend Tailwind 4.x config with tokens
- [ ] **DaisyUI Harmony**: Ensure compatibility with DaisyUI v5 in admin
- [ ] **TypeScript Types**: Type-safe design token usage
- [ ] **Documentation**: Token usage guidelines

#### 1.3 Animation System
- [ ] **Motion Tokens**: Duration, easing, delay patterns
- [ ] **Animation Presets**: Common micro-interactions
- [ ] **Framer Motion Integration**: Pre-configured variants
- [ ] **Performance**: Hardware acceleration guidelines

### 🧩 PHASE 2: Core Component Architecture (Week 1-2)
**Goal**: Build the foundational component architecture and core primitives

#### 2.1 Component Architecture Setup
- [ ] **Component Structure**: Standardized component anatomy
  - [ ] Props interface patterns
  - [ ] Variant system (size, color, state)
  - [ ] Composition patterns
  - [ ] Ref forwarding standards

- [ ] **Base Components**: Fundamental building blocks
  - [ ] **Box**: Layout primitive with design tokens
  - [ ] **Text**: Typography component with semantic variants
  - [ ] **Icon**: Icon system with sizing/coloring
  - [ ] **Visually Hidden**: Accessibility helper

- [ ] **Layout Primitives**: Core layout components
  - [ ] **Stack**: Vertical/horizontal spacing
  - [ ] **Grid**: CSS Grid wrapper with responsive patterns
  - [ ] **Flex**: Flexbox patterns with common layouts
  - [ ] **Container**: Max-width containers with responsive breakpoints
  - [ ] **Spacer**: Explicit spacing component

#### 2.2 Form Components
- [ ] **Input System**: Text inputs with variants
  - [ ] Base Input (text, email, password, number)
  - [ ] Textarea with auto-resize
  - [ ] Input validation states and messages
  - [ ] Input groups (prefix/suffix)

- [ ] **Selection Components**: 
  - [ ] Select dropdown with search
  - [ ] Checkbox with indeterminate state
  - [ ] Radio groups with card variants
  - [ ] Switch/Toggle components

- [ ] **Form Patterns**:
  - [ ] Form layout components
  - [ ] Field wrapper with label/help/error
  - [ ] Form validation integration
  - [ ] Multi-step form components

#### 2.3 Interactive Components
- [ ] **Button System**: Primary interaction component
  - [ ] Button variants (primary, secondary, ghost, link)
  - [ ] Size variants (xs, sm, md, lg, xl)
  - [ ] Loading states with spinners
  - [ ] Icon button variants
  - [ ] Button groups
  - [ ] DaisyUI integration for admin app buttons

- [ ] **Navigation Components**:
  - [ ] Link component with external link handling
  - [ ] Breadcrumb navigation
  - [ ] Pagination components
  - [ ] Tab system (controlled/uncontrolled)

### 🎨 PHASE 3: Complex Components & Patterns (Week 2-3)
**Goal**: Build sophisticated components and interaction patterns

#### 3.1 Overlay Components
- [ ] **Modal System**: Accessible modal patterns
  - [ ] Modal base with focus management
  - [ ] Modal variants (dialog, drawer, fullscreen)
  - [ ] Modal composition patterns
  - [ ] Nested modal handling

- [ ] **Popover/Tooltip System**:
  - [ ] Tooltip with positioning
  - [ ] Popover with trigger patterns
  - [ ] Dropdown menus
  - [ ] Context menus

- [ ] **Notification System**:
  - [ ] Toast notifications with variants
  - [ ] Alert components
  - [ ] Notification center pattern
  - [ ] Real-time notification handling

#### 3.2 Data Display Components
- [ ] **Table System**: Data grid components
  - [ ] Table base with sorting/filtering
  - [ ] Virtual scrolling for large datasets
  - [ ] Export functionality
  - [ ] Responsive table patterns

- [ ] **Card System**: Content containers
  - [ ] Card variants (elevated, outlined, flat)
  - [ ] Card composition patterns
  - [ ] Interactive cards
  - [ ] Card collections

- [ ] **List Components**:
  - [ ] List items with actions
  - [ ] Virtualized lists
  - [ ] Drag & drop lists
  - [ ] Tree view components

#### 3.3 UDance-Specific Components
- [ ] **Event Components**: Dance event specific UI
  - [ ] Event card with image/details
  - [ ] Event calendar integration
  - [ ] Event registration flow
  - [ ] Event filter sidebar

- [ ] **Profile & Social**:
  - [ ] User profile cards
  - [ ] Social interaction buttons
  - [ ] Community features
  - [ ] Image upload components

- [ ] **Map Integration**:
  - [ ] Location picker
  - [ ] Event map view
  - [ ] Venue display components

### 🚀 PHASE 4: Developer Experience & Documentation (Week 3-4)
**Goal**: Complete developer experience tools and documentation

#### 4.1 Storybook Enhancement
- [ ] **Story Development**: Comprehensive component stories
- [ ] **Controls Integration**: Interactive prop testing
- [ ] **Accessibility Testing**: a11y addon integration
- [ ] **Visual Testing**: Chromatic integration for visual regression

#### 4.2 Testing Infrastructure
- [ ] **Component Tests**: Jest + RTL test suites
- [ ] **Visual Regression**: Automated screenshot testing
- [ ] **Accessibility Tests**: Automated a11y validation
- [ ] **Performance Tests**: Bundle size monitoring

#### 4.3 Documentation System
- [ ] **Usage Guidelines**: Component usage documentation
- [ ] **Design Principles**: Design system principles
- [ ] **Migration Guides**: Upgrading between versions
- [ ] **Playground**: Interactive component playground

#### 4.4 Build & Distribution
- [ ] **Package Structure**: Optimal package.json structure
- [ ] **Tree Shaking**: Optimize bundle splits
- [ ] **Version Management**: Semantic versioning strategy
- [ ] **CLI Tools**: Component generation scripts

## 🎯 Success Criteria

### Functional Requirements
- **Cross-App Consistency**: Uniform design language across Web, Admin, PWA
- **Developer Productivity**: Fast component development with clear APIs
- **Accessibility**: WCAG AA compliance across all components
- **Performance**: No regression in bundle size or runtime performance
- **Maintainability**: Clear patterns for component evolution

### Technical Benchmarks
- **Storybook**: 100% component coverage with interactive docs
- **Test Coverage**: >90% test coverage across component library
- **Bundle Size**: Optimal tree-shaking with minimal bundle impact
- **Accessibility**: Automated a11y testing passing
- **Documentation**: Complete usage guides and API documentation

### Developer Experience
- **Discoverability**: Easy to find and use components
- **Consistency**: Predictable APIs across all components
- **Flexibility**: Support for customization without breaking consistency
- **Integration**: Seamless integration with existing Tailwind + DaisyUI setup

## 🔧 Implementation Strategy

### Week 1: Foundation
- Design token system implementation
- Core layout primitives
- Base component architecture
- Storybook story development

### Week 2: Core Components  
- Form components (inputs, buttons, selections)
- Navigation components
- Basic interaction patterns
- Testing infrastructure setup

### Week 3: Complex Components
- Overlay systems (modals, popovers)
- Data display components
- UDance-specific components
- Advanced interaction patterns

### Week 4: Polish & Documentation
- Developer experience tools
- Complete documentation
- Performance optimization
- Visual regression testing

## Next Steps

1. **Start Design Token System**: Begin with color, typography, and spacing tokens
2. **Set Up Component Architecture**: Establish patterns for component development
3. **Integrate with Existing Apps**: Ensure components work across Web, Admin (DaisyUI), PWA
4. **Document as You Build**: Maintain comprehensive Storybook documentation

**Ready to begin systematic design system development!** 🚀

### Task: Home Page – Noticias Cards (Next.js 15) ✅ COMPLETE

**Goal**: Render list of news cards on `apps/web` home using shared domain (Drizzle + Zod) and Supabase data.

**Status**: ✅ **FEATURE COMPLETE** - News integration successfully implemented

#### Sub-tasks

1. **DB Layer** ✅ COMPLETE
   1.1 ✅ Create `news` table using Drizzle migration.  
   1.2 ✅ Seed sample records in `/supabase/seed.sql`.
   1.3 ✅ Migration applied successfully to Supabase
   1.4 ✅ Seed data loaded (2 sample news articles)

2. **Domain Package** ✅ COMPLETE (`packages/domain/news`)
   - ✅ `schema.ts` – Drizzle table + types.  
   - ✅ `zod.ts` – `NewsInput`, `NewsFilter`.  
   - ✅ `queries.ts` – `getPublishedNews`, `getFeaturedNews`, `getAllNews`.
   - ✅ `commands.ts` – CRUD operations.
   - ✅ `index.ts` – Package exports configured

3. **Server Actions/Controllers** ✅ COMPLETE
   - ✅ `apps/web/src/app/(public)/news/actions.ts` – Server action wrapper
   - ✅ Type-safe data fetching with Drizzle queries

4. **UI Components** ✅ COMPLETE
   - ✅ `NewsCard` component implemented (inline for simplicity)
   - ✅ Clean, responsive design with CSS
   - ✅ Published date formatting
   - ✅ Hover effects and transitions

5. **Home Page Integration** ✅ COMPLETE
   - ✅ Convert page to Server Component (Next.js 15 best practice)
   - ✅ Server-side data fetching with `getFeaturedNews(3)`
   - ✅ News section with responsive grid layout
   - ✅ Conditional rendering when news exists
   - ✅ Client component separation (AuthSection)

6. **Type Safety** ✅ COMPLETE
   - ✅ End-to-end TypeScript types from database to UI
   - ✅ Proper domain package exports and imports
   - ✅ Auto-generated types from Drizzle schema

7. **Testing & Validation** ✅ COMPLETE
   - ✅ Type checking passes
   - ✅ Build process successful
   - ✅ Live data integration verified
   - ✅ Responsive design tested

8. **Performance & Best Practices** ✅ COMPLETE
   - ✅ Server Components for optimal performance
   - ✅ Static generation compatible
   - ✅ Efficient database queries with limits
   - ✅ Clean separation of concerns

9. **Documentation** ✅ COMPLETE
   - ✅ Database architecture documented
   - ✅ Memory bank updated
   - ✅ Technical context enhanced

#### 🎯 **Implementation Achievements**

**Architecture Excellence:**
- ✅ **Next.js 15 Best Practices**: Server Components for data fetching
- ✅ **Type Safety**: End-to-end TypeScript integration
- ✅ **Performance**: Server-side rendering with static optimization
- ✅ **Clean Architecture**: Domain-driven package organization

**Database Infrastructure:**
- ✅ **Professional Migration System**: Drizzle Kit workflow operational
- ✅ **Type-safe Queries**: Auto-generated types from schema
- ✅ **Environment Configuration**: Proper `.env` setup
- ✅ **Live Data Integration**: Real news articles from Supabase

**User Experience:**
- ✅ **Responsive Design**: Mobile-first grid layout
- ✅ **Visual Design**: Clean cards with shadows and transitions
- ✅ **Content Display**: Title, summary, and published date
- ✅ **Performance**: Fast loading with server-side data fetching

**Developer Experience:**
- ✅ **Simple Implementation**: Minimal configuration needed
- ✅ **Maintainable Code**: Clean component structure
- ✅ **Scalable Architecture**: Easy to add more features
- ✅ **Documentation**: Comprehensive implementation guide

#### 🔥 **Live Feature Demonstration**

The news feature is now **live and operational** at `http://localhost:3000`:

1. **Home Page Integration**: News section displays below hero section
2. **Real Data**: Shows actual articles from Supabase database
3. **Responsive Layout**: 1-2-3 column grid based on screen size
4. **Professional UI**: Clean, modern card design
5. **Type Safety**: Full TypeScript coverage from DB to UI

#### ✅ **Success Metrics Achieved**

- **100% Type Safety**: No TypeScript errors
- **Performance**: Build time under 3 seconds
- **User Experience**: Responsive design across devices
- **Data Integration**: Live Supabase connection working
- **Code Quality**: Clean, maintainable architecture
- **Documentation**: Comprehensive guides available

---

**Status**: ✅ **PRODUCTION READY** - News feature complete and operational

## 🎯 COMPLETED INFRASTRUCTURE SUMMARY

### ✅ Database Layer (Drizzle + Supabase)
- **Migration System**: `pnpm drizzle-kit generate` and `pnpm drizzle-kit migrate` working
- **Environment Config**: Fixed `.env` vs `.env.local` issue per Drizzle documentation
- **Database Connection**: `SUPABASE_DATABASE_URL` configured correctly
- **News Table**: Created with proper schema (id, title, content, author, etc.)
- **Seed Data**: 2 sample news articles loaded successfully

### ✅ Domain Package Infrastructure
- **Schema Definition**: Drizzle table with TypeScript types
- **Validation**: Zod schemas for input validation
- **Query Functions**: `getPublishedNews`, `getFeaturedNews`, `getAllNews` implemented  
- **Command Functions**: CRUD operations ready
- **Server Actions**: News listing action implemented

### ✅ UI Components Ready
- **NewsCard Component**: Responsive Tailwind card in `packages/ui-web/`
- **Type Safety**: Props typed from Drizzle query return types
- **Styling**: Consistent with existing design system

### 🔥 IMMEDIATE NEXT: Home Page Integration
Ready to integrate NewsCard components into the home page with live Supabase data.

---

# 🛣️ **UDance MVP Implementation Roadmap (2025 Q3 → Q4)**

> This roadmap translates the comprehensive database schema, existing user stories, and current codebase state into an incremental, test-driven path to a functional MVP. Each phase ends in a **deployable**, **demo-able** vertical slice so we can validate in staging/production and keep CI/CD green.

## **Phase 0 – CI/CD & Deployment Stabilisation (⏱ 1 week)**
- [x] **Investigate Vercel ("Berserk") build failures**
  - [x] **Root Cause**: Vercel trying to read root `package.json` instead of `apps/web/package.json`
  - [x] **Fix Applied**: Created proper `vercel.json` configs for monorepo structure
  - [x] **App-specific configs**: Added `vercel.json` to each app directory
- [x] **Add smoke test job** after deploy (`curl /api/healthz`) to fail fast on bad releases
  - [x] **Health endpoint**: Created `/api/healthz` route for deployment validation
  - [x] **CI integration**: Added smoke tests to staging & production workflows
- [ ] **Automate Drizzle migrations in CI** (GitHub Actions → `pnpm drizzle-kit migrate`)
- [ ] **GREEN CHECK** → every commit to `dev` must result in a successful preview deploy

## **Phase 1 – Event Discovery Vertical Slice (⏱ 2 weeks)**
_Back-end first, then front-end._
1. **Domain Package `packages/domain/events/`**
   - [ ] `schema.ts` (Drizzle definitions for `events`, `event_categories`, `event_dance_styles`)
   - [ ] `queries.ts` (`getUpcomingEvents`, `getEventById`)
   - [ ] `commands.ts` (CRUD – admin only for now)
   - [ ] `zod.ts` (validation)
2. **Server Actions** `apps/web/src/app/(public)/events/actions.ts`
   - [ ] `listUpcomingEventsAction()` (public)
3. **UI**
   - [ ] `<EventCard />` component (uses Design System primitives)
   - [ ] `/events` page (Server Component → static params)
4. **E2E Test**
   - [ ] Playwright test: Home → Events → Event Detail renders data

## **Phase 2 – Simple Booking Flow (⏱ 2 weeks)**
- **DB**: `bookings` table + `tickets` table (QR placeholder string)
- **Domain**: `packages/domain/bookings/`
- **Server Actions**: `createBookingAction`, `listUserBookingsAction`
- **UI**: "Book Now" button on Event detail → creates booking → success page shows pseudo-QR
- **Email** (stretch): Send confirmation using Supabase Edge Functions

## **Phase 3 – Studio Admin Event Management (⏱ 3 weeks)**
- **Admin App** (`apps/admin/`)
  - Event list, create, edit forms (DaisyUI + Design System)
  - Role-guarded routes (Studio Admin only)
- **CI**: Snapshot tests for admin forms

## **Phase 4 – Payment Integration MVP (⏱ 2 weeks)**
- Manual payments table already in schema → surface in Admin dashboard for reconciliation
- If time allows, Stripe Checkout proof-of-concept for ticket purchase

## **Phase 5 – Feedback & Reviews (⏱ 1 week)**
- `reviews` polymorphic table + UI for event reviews

## **Phase 6 – Polish & Public Launch (⏱ 1 week)**
- Lighthouse & Web Vitals pass
- Final content sweep, copy updates
- Marketing page & announcement via News system

---

### 📅 **Projected Timeline**
```
Phase 0   |■■ (Week 27)
Phase 1   |■■■■ (Weeks 28-29)
Phase 2   |■■■■ (Weeks 30-31)
Phase 3   |■■■■■ (Weeks 32-34)
Phase 4   |■■■■ (Weeks 35-36)
Phase 5   |■ (Week 37)
Phase 6   |■ (Week 38)
```

### ✅ **Definition of Done for Each Phase**
1. Green CI/CD on `dev` & `main`
2. Feature deployed & accessible on staging URL
3. Automated tests covering happy path
4. Memory Bank updated (activeContext, progress) with outcomes

> **Next Step**: Start **Phase 0** – open a bug-hunt task for Vercel build failures.