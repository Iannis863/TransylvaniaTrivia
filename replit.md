# TransylvaniaTrivia

## Overview

TransylvaniaTrivia is a landing page for a weekly quiz night event held at Insomnia Restaurant. The application showcases event details, rules, prizes, quiz format, and provides a team registration system. The design follows a dark gothic theme with neon accents inspired by Transylvania/vampire aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom dark gothic theme
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Build Tool**: Vite with HMR support
- **Fonts**: Google Fonts (Creepster for display, Bebas Neue for headings, Inter for body)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints under `/api/*`
- **Development**: tsx for TypeScript execution, Vite middleware for HMR

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts`
- **Validation**: Zod schemas generated via drizzle-zod
- **Fallback**: In-memory storage available in `MemStorage` class for development

### Database Schema
Two main tables:
1. **users** - Basic user authentication (id, username, password)
2. **team_registrations** - Quiz team signups (teamName, captainName, email, phoneNumber, memberCount, createdAt)

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # UI components (sections, forms, ui primitives)
│   │   ├── pages/        # Route components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data access layer
│   └── db.ts         # Database connection
├── shared/           # Shared types and schemas
└── migrations/       # Drizzle database migrations
```

### Path Aliases
- `@/*` → `./client/src/*`
- `@shared/*` → `./shared/*`
- `@assets` → `./attached_assets`

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **pg**: Node.js PostgreSQL client
- **connect-pg-simple**: Session storage (if sessions needed)

### Key NPM Packages
- **drizzle-orm / drizzle-kit**: Database ORM and migration tooling
- **@tanstack/react-query**: Async state management
- **react-hook-form**: Form handling with Zod resolver
- **zod / zod-validation-error**: Schema validation
- **lucide-react / react-icons**: Icon libraries

### Build & Development
- **Vite**: Frontend bundler with React plugin
- **esbuild**: Production server bundling
- **tsx**: TypeScript execution for development

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`: Error overlay
- `@replit/vite-plugin-cartographer`: Dev tooling
- `@replit/vite-plugin-dev-banner`: Development banner