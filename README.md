# Mini Cart - Shopping Cart Application

A full-stack shopping cart application built with Vue 3 and Hono, using a pnpm monorepo structure.

## Tech Stack

### Frontend
- **Vue 3** - Composition API with `<script setup>`
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server

### Backend
- **Hono** - Lightweight web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Shared
- **TypeScript** - Type safety across the monorepo
- **@cep/shared** - Shared types between frontend and backend

## Project Structure

```
├── apps/
│   ├── backend/          # Hono API server
│   │   ├── src/
│   │   │   ├── db/
│   │   │   │   ├── client/      # Database connection pool
│   │   │   │   ├── queries/     # Data access functions
│   │   │   │   ├── models/      # Table definitions
│   │   │   │   └── init/        # Database initialization
│   │   │   ├── routes/          # API route handlers
│   │   │   ├── middleware/      # Auth middleware
│   │   │   ├── utils/           # JWT helpers
│   │   │   └── server.ts        # Entry point
│   │   └── public/              # Built frontend (production)
│   │
│   └── frontend/         # Vue 3 SPA
│       └── src/
│           ├── components/      # Reusable components
│           ├── pages/           # Page components
│           ├── layouts/         # Layout wrappers
│           ├── store/           # Pinia stores
│           └── router/          # Vue Router config
│
└── packages/
    └── shared/           # Shared TypeScript types
```

## Prerequisites

- **Node.js** >= 22 (use [nvm](https://github.com/nvm-sh/nvm) to manage versions)
- **pnpm** (package manager)
- **PostgreSQL** running locally

```bash
# Check your Node version
node --version

# If needed, switch to Node 22+ with nvm
nvm install 22
nvm use 22
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up the database

Make sure PostgreSQL is running, then create the database:

```sql
CREATE DATABASE task_db;
```

Or update the connection settings in `apps/backend/src/db/client/index.ts`.

### 3. Initialize the database

This creates tables and seeds sample data:

```bash
# Development (runs TypeScript directly)
pnpm db:init

# Production (runs compiled JS after build)
pnpm db:init:prod
```

**Default user credentials:**
- Username: `demo_user`
- Password: `Password123`

### 4. Run development servers

Start both frontend and backend in parallel:

```bash
pnpm dev
```

Or run them separately:

```bash
pnpm dev:backend   # Runs on http://localhost:3000
pnpm dev:frontend  # Runs on http://localhost:5173
```

The frontend proxies `/api/*` requests to the backend.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start both frontend and backend in dev mode |
| `pnpm dev:backend` | Start backend only |
| `pnpm dev:frontend` | Start frontend only |
| `pnpm build` | Build both for production |
| `pnpm start:backend` | Run production backend |
| `pnpm db:init` | Initialize database (dev, uses tsx) |
| `pnpm db:init:prod` | Initialize database (prod, uses compiled JS) |
| `pnpm format` | Format code with Prettier |

## Features

- ✅ User authentication (JWT)
- ✅ Product listing with search and filter
- ✅ Add to cart functionality
- ✅ Prevent duplicate products in cart
- ✅ Shopping basket management
- ✅ Responsive design (mobile-first)
- ✅ Skeleton loading states

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/products` | Get all products | Yes |
| GET | `/api/basket` | Get user's basket | Yes |
| POST | `/api/basket` | Add item to basket | Yes |
| DELETE | `/api/basket/:id` | Remove item from basket | Yes |

## Production Build

```bash
# 1. Build everything
pnpm build

# 2. Initialize database (if not done yet)
pnpm db:init:prod

# 3. Start the backend (serves frontend from public/)
pnpm start:backend
```

The frontend is built into `apps/backend/public/` and served by the backend.
