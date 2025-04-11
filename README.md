# HooTans Starter

A modern & lightweight [turborepo](https://turbo.build/repo/docs) supporting modular components, shared configs, containerized deployments, and 100% type-safety.

## Stack Overview

```
apps
  ├─ web - React (Vite) + Tanstack (router, query, form) + Tailwind CSS
  └─ server - Hono (API & auth wrapper)
packages
  ├─ api - tRPC with Valibot
  ├─ auth - Better Auth
  ├─ db - Drizzle ORM (PostgreSQL)
  └─ ui - Tailwind CSS + Shadcn/Radix UI
tools
  ├─ biome - Linting & formatting
  ├─ tailwind - CSS utilities
  ├─ typescript - Type checking
  └─ vitest - Testing
```

## Key Features

- Modern stack with latest releases: React 19, Tailwind CSS v4, tRPC v11, pnpm v10
- Tanstack Router + Hono instead of Next.js.
- Biome.js over ESLint + Prettier for that vroom-vroom linting and formatting.
- Better Auth instead of Auth.js for simpler and straightforward authentication.
- Valibot for validation instead of Zod for minimal bundle sizes.
- Tanstack Form instead of React Hook Form for more robust form solution.
- Per-package environment variables (turborepo best practice)
- Docker/Podman containerization for production deployment

## Documentation

- [Getting Started](docs/getting-started.md) - Prerequisites and setup
- [Development](docs/development.md) - Working with packages, components, tools, and route generation
- [Containerization](docs/containerization.md) - Docker/Podman setup
- [Deployment](docs/deployment.md) - Deployment options and instructions
- [Testing](docs/testing.md) - Testing with Vitest
- [Configuration](docs/configuration.md) - Environment variables and other settings

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables
pnpm env:copy-example

# Start database (requires Docker)
docker compose up db --detach

# Push schema to database
pnpm db:push

# Start development servers
pnpm dev
```

Access the applications at:
- Web: http://localhost:8085
- Server: http://localhost:3035

## License

MIT
