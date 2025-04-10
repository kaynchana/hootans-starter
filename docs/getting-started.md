# Getting Started

This guide will help you set up the HooTans Starter project for local development.

## Prerequisites

Ensure the following tools are available on your system:

1. [Node.js](https://nodejs.org/en/download) (version 22+)
2. [pnpm](https://pnpm.io/installation) (version 10+)
3. [PostgreSQL](https://www.postgresql.org) database, which you can easily run using tools like:
   - [Docker](https://docs.docker.com/engine/install) and [Docker Compose](https://docs.docker.com/compose)
   - [Podman](https://podman.io/docs/installation) and [Podman Compose](https://github.com/containers/podman-compose)
   - [Supabase](https://supabase.com)'s free tier cloud database
   - [Neon](https://neon.tech) for serverless database

## Setup

```bash
# Clone the repository (replace YOUR_PROJECT_PATH)
git clone <your-repo-url> YOUR_PROJECT_PATH

# Enter the directory or open in your IDE (replace YOUR_PROJECT_PATH)
cd YOUR_PROJECT_PATH

# Install all dependencies for apps and packages
pnpm install

# Copy .env.example to .env for all applications and the @repo/db package
pnpm env:copy-example

# Start a local postgres instance in the background (e.g. using docker)
docker compose up db --detach

# Push the drizzle schema to your database
pnpm db:push
```

You can then start all applications with:

```bash
pnpm dev
```

By default, the following URLs will be accessible:

- Web application: http://localhost:8085
- Backend server: http://localhost:3035

## Using an External Database

When using an external PostgreSQL database (e.g., from [Supabase](https://supabase.com)), you can skip the step that spins up a local PostgreSQL instance with Docker.

Instead, you will need to modify the following environment variables:

1. `SERVER_POSTGRES_URL` in the file `apps/server/.env`
   - Used at runtime by the backend server in `pnpm dev`

2. `DB_POSTGRES_URL` in the file `packages/db/.env`
   - Used in database schema migrations with `pnpm db:push`

## Next Steps

Once you have the project up and running, you can:

- Explore the [Development Guide](development.md) to learn how to work with the codebase
- Check out the [Containerization Guide](containerization.md) for Docker/Podman setup
- Review the [Deployment Guide](deployment.md) for production deployment options
