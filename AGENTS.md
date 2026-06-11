# AGENTS.md - AI Agent Onboarding Guide

## Project Overview

**Avatar** is a full-stack sports venue discovery platform with geographic search capabilities.

- **Frontend (Eva):** React 19 + TypeScript + Vite + Apollo GraphQL + MUI
- **Backend (Pandora):** Spring Boot 4.0+ + GraphQL + JPA + PostGIS spatial queries
- **Infrastructure:** Kubernetes (k3d) + Helm + Terraform + Docker
- **Testing:** Spring Boot GraphQL testing + Cucumber, PostgreSQL testcontainers

---

## Architecture Essentials

### Modular Backend (Spring Modulith Pattern)

Backend is organized into domain-driven modules under `pandora/src/main/java/com/avatar/pandora/`:

```
catalog/        # Homepage statistics/dashboard
user/           # Authentication, user management, email verification
venue/          # Venues (pitches) and locations (sports facilities)
notification/   # Email notifications
security/       # JWT security, auth configuration
shared/         # Common utilities and DTOs
configuration/  # Spring configuration beans
```

**Key Pattern:** Each module follows:
```
module/
├── controllers/      # @RestController with @QueryMapping/@MutationMapping
├── services/         # Business logic with @Service
├── models/           # JPA entities and DTOs (View objects)
├── repositories/     # @Repository interfaces extending JpaRepository/JpaSpecificationExecutor
├── specifications/   # JPA Specifications for complex queries
├── validators/       # Custom validators
├── exceptions/       # Module-specific exceptions
└── package-info.java # Module documentation
```

### Frontend Structure

```
eva/src/
├── pages/           # Route-level components (Home, LocationList, LocationDetail, etc.)
├── components/      # Reusable UI components, organized by domain (location/, venue/)
├── services/        # GraphQL queries and types (location.ts, venues.ts, home.ts)
├── i18n/           # Internationalization (en, hu, de)
├── theme/          # MUI theme configuration
└── main.tsx        # App entry with ApolloClient and Router setup
```

**Pages vs Components:** Pages map to routes; components are domain-organized sub-trees (e.g., `location/card/`, `location/detail/`, `location/map/`).

---

## Critical Development Workflows

### Local Development Setup

1. **Start services:**
   ```powershell
   docker compose up    # PostgreSQL + Mailhog
   ```

2. **Backend (Pandora):**
   ```powershell
   cd pandora
   ./gradlew bootRun    # or IDE run config, port 8080
   ```

3. **Frontend (Eva):**
   ```powershell
   cd eva
   npm install
   npm run dev          # Vite dev server, port 3000
   npm run codegen      # Generate GraphQL types from schema
   ```

### Build & Deployment (Just recipes)

```powershell
just build-all              # Docker images for both services
just build-deploy local     # Full local K8s deployment to k3d
just port-forward-backend   # Expose services locally
just logs-backend           # View backend logs
```

**Key Files:**
- `justfile` - Build/deployment automation (PowerShell)
- `compose.yaml` - Dev environment (PostgreSQL 16 with PostGIS, Mailhog)

### Testing Backend

```powershell
cd pandora
./gradlew test                              # All tests (test profile auto-enabled)
./gradlew test --tests "*VenueController*"  # Specific test
```

**Test Pattern:** `@AutoConfigureGraphQlTester` + GraphQL `.graphql` files in `src/test/resources/graphql-test/`:
- Tests use `httpGraphQlTester.documentName("queryName").execute()`
- Queries stored as `.graphql` files (e.g., `searchLocations.graphql`)

---

## Project-Specific Conventions

### GraphQL Integration

**Backend (@QueryMapping pattern):**
- Controllers use `@QueryMapping` for queries, `@MutationMapping` for mutations
- Arguments use `@Argument` annotation
- Return types are POJOs serialized by Spring GraphQL to schema

Example (venue/controllers/VenueController.java):
```java
@QueryMapping
public VenueView getVenue(@Argument Long id) {
    return venueService.getVenue(id);
}
```

**Frontend (Apollo + Code Generation):**
- `codegen.ts` generates types from `http://localhost:8080/graphql` schema
- Sources in `src/**/*.tsx` with gql queries
- Generated types in `src/gql/` (auto-generated, don't edit)
- Pattern: Define `gql` query inline in service files, use with `useQuery<GeneratedType>`

Example (eva/src/services/location.ts):
```typescript
export const SEARCH_LOCATIONS = gql`query SearchLocations(...) { ... }`;
export type SearchLocationResult = { searchLocations: SearchLocations };
```

**Running codegen:** Requires backend running. Execute: `npm run codegen` from eva/

### Data Models & Spatial Queries

**Geographic Data:**
- Locations have `geom` (PostGIS Point type: x/y coordinates)
- Backend uses Hibernate Spatial for spatial operations
- Venues linked to Locations with many-to-one relationship

**Filter Pattern:** 
- `Filter` DTOs in models contain null-able fields (e.g., `cities?`, `surfaceType?`)
- JPA `Specifications` used for dynamic filtering (see `venue/specifications/`)
- Results wrapped in `Page<T>` with pagination info

### Internationalization (i18n)

- 3 languages: English (en), Hungarian (hu), German (de)
- Locale files: `eva/src/i18n/locales/*.json`
- Usage: `const { t } = useTranslation()` → `t('key.path')`
- Auto-detection: localStorage first, then browser language

### Material-UI Theme

- Custom theme in `eva/src/theme/theme.ts`
- Colors mapped to surface types (e.g., `GRASS: '#5c7d45'`)
- Function helpers: `getSurfaceTypeColor()`, `getVenueTypeColor()` (eva/src/services/venues.ts)

### Authentication

- JWT tokens stored in localStorage (key: 'token')
- Token auto-included in Apollo requests via `SetContextLink` (App.tsx)
- Backend: Spring Security + `@EnableJpaAuditing` for audit timestamps

### Testing Patterns

**GraphQL Testing:** GraphQL queries stored as `.graphql` files in test resources, named to match test method expectations:
- File: `src/test/resources/graphql-test/locationDetails.graphql`
- Called in test: `httpGraphQlTester.documentName("locationDetails")`

**Spring Boot Annotations:** 
- `@AutoConfigureGraphQlTester` - GraphQL tester
- `@DirtiesContext` - Reset context before each test
- `@ActiveProfiles("test")` - Use test database (H2/testcontainers)
- `@Transactional` - Rollback after each test

---

## Cross-Component Communication

### Frontend Data Flow

1. **Page Component** (e.g., LocationList.tsx)
   - Uses `useQuery<GeneratedType>` hook with gql query from services
   - Manages local filters via `useState`
   - Routes to detail pages via React Router

2. **Service Layer** (e.g., services/location.ts)
   - Defines GraphQL queries as `gql` strings
   - Exports TypeScript types for results
   - Helper functions (e.g., `getSurfaceTypeColor`)

3. **Component Tree**
   - Card, Detail, Map components receive data as props
   - Search bar uses `useSearchParams()` to sync filter state with URL

### Backend Data Flow

1. **Controller** (@QueryMapping) → validates args with `@Argument`
2. **Service** → business logic, calls repository
3. **Repository** (JpaRepository/Specification) → SQL via JPA/Hibernate/PostGIS
4. **Model** (JPA entity) → serialized by Spring GraphQL to client

---

## Key Files for Understanding

### Backend
- `pandora/build.gradle` - Dependencies (Spring Modulith, GraphQL, Spatial)
- `pandora/PandoraApplication.java` - Boot class with `@EnableJpaAuditing`
- `pandora/src/main/resources/application.yml` - GraphQL endpoint config
- `pandora/src/test/resources/graphql-test/*.graphql` - Test query templates

### Frontend
- `eva/package.json` - Dependencies (Apollo, i18next, MUI, Leaflet)
- `eva/src/App.tsx` - Apollo client setup, routing, theme
- `eva/codegen.ts` - GraphQL code generation config
- `eva/src/services/*.ts` - GraphQL queries and type definitions
- `eva/src/i18n/locales/*.json` - Translation files
- `eva/src/theme/theme.ts` - MUI theme

### Infrastructure
- `infra/helm/eva/Chart.yaml` - Helm chart for deployments
- `infra/terraform/environments/` - IaC for K8s/cloud resources
- `justfile` - PowerShell automation for build/deploy
- `compose.yaml` - Local dev environment

---

## Important: Duplicate Modules Issue

⚠️ **Known Issue:** The backend has both `pandora/src/main/java/.../product/` and `.../venue/` with similar packages. This is likely a refactoring artifact. When adding features:
- Use **`venue/`** module (newer, has more complete examples)
- `product/` is deprecated; changes may not be reflected

---

## Plugin & Tool Chain

- **Backend:** Gradle with Spring Modulith, Hibernate ORM, GraalVM native build support
- **Frontend:** Vite with React plugin, ESLint
- **GraphQL Code Gen:** Generates Apollo client hooks (not used yet, but configured)
- **Testing:** JUnit 5, Cucumber, Testcontainers, Spring REST Docs
- **Deployment:** Docker, Kubernetes (k3d), Helm, Terraform
- **Email:** Mailhog (dev), SMTP (production via Spring Boot Mail)

