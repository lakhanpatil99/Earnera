# Earnera - Task & Earn Rewards Application

## Overview

Earnera is a mobile-first "Task & Earn Coins" web application similar to TaskBucks, RozDhan, or MPL. Users complete various tasks (watching ads, installing apps, taking surveys, daily check-ins) to earn virtual coins that can be withdrawn as real currency. The app features a modern, polished UI with smooth animations and a gamified earning experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Form Handling**: React Hook Form with Zod validation
- **Design Pattern**: Mobile-first, constrained to max-w-md to simulate phone interface on desktop

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod schemas for type-safe request/response handling
- **Session Management**: Express-session with MemoryStore (development) or connect-pg-simple (production)
- **Build System**: Custom build script using esbuild for server and Vite for client

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: shared/schema.ts (shared between frontend and backend)
- **Tables**: users, tasks, transactions
- **Storage Layer**: Abstracted through IStorage interface supporting both MemStorage (dev) and DatabaseStorage (prod)

### Authentication
- **Method**: Session-based authentication
- **Storage**: Server-side sessions with secure cookie
- **Protected Routes**: Client-side route guards checking session state via /api/auth/me endpoint

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components including shadcn/ui
    pages/        # Route pages (Splash, Auth, Home, Wallet, Profile)
    hooks/        # Custom React hooks for auth, tasks, wallet
    lib/          # Utilities and query client config
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Data access layer
  db.ts           # Database connection
shared/           # Shared code between frontend and backend
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod schemas
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, configured via DATABASE_URL environment variable
- **Drizzle Kit**: Database migrations and schema management (npm run db:push)

### UI Component Library
- **shadcn/ui**: Pre-built accessible components using Radix UI primitives
- **Radix UI**: Headless UI primitives for dialogs, dropdowns, toasts, etc.
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Frontend development server and build tool with HMR
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production server build

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session encryption (optional, has default)