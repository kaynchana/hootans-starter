# Configuration Guide

This guide covers environment variables and other configuration settings for the HooTans Starter project.

## Environment Variables

This project follows the recommendation of:

- @tyleralbee in [this turborepo's GitHub discussion](https://github.com/vercel/turborepo/discussions/9458#discussioncomment-11443969)
- @cjkihl in [create-t3-turbo issue #397](https://github.com/t3-oss/create-t3-turbo/issues/397#issuecomment-1630028405)
- turborepo official docs on [environment variables best practices](https://turbo.build/repo/docs/crafting-your-repository/using-environment-variables#best-practices)

### Best Practices

It is recommended that:

1. Each application has a local `.env` file instead of a global `.env` at the root of your repository
2. Packages should be pure, i.e., rely on factory methods and receiving inputs to instantiate rather than consuming environment variables directly
   - One exception is the `@repo/db` package, which requires the `DB_POSTGRES_URL` variable for schema migration with `pnpm db:push`
3. Environment variables are prefixed, e.g., `SERVER_AUTH_SECRET` instead of `AUTH_SECRET`. Caching in the app's `turbo.json` can then be configured to use wildcards such as:
   ```json
   "tasks": {
      "build": {
        "env": ["SERVER_*"],
      }
    }
   ```

### Environment Variable Management

There is a script that creates a `.env` from `.env.example` of each app/package, which can be run with:

```bash
# NOTE: This will not overwrite existing local .env files
pnpm env:copy-example

# To reset any modifications to your .env and restore the examples, run:
pnpm env:remove
pnpm env:copy-example
```

It is recommended that any new apps that use environment variables follow the example script set in [apps/server/package.json](../apps/server/package.json).

## Key Environment Variables

### Web Application

- `PUBLIC_SERVER_URL`: URL of the server API (e.g., `http://localhost:3035` in development or `https://api.example.com` in production)

### Server Application

- `SERVER_POSTGRES_URL`: PostgreSQL connection string
- `SERVER_AUTH_SECRET`: Secret key for authentication
- `PUBLIC_WEB_URL`: URL of the web application (e.g., `http://localhost:8085` in development or `https://example.com` in production)

### Database Package

- `DB_POSTGRES_URL`: PostgreSQL connection string used for schema migrations

## Type-Safe Environment Variables

This project uses Valibot for type-safe environment variables. The validation schemas are defined in:

- `apps/web/src/env.ts` for the web application
- `apps/server/src/env.ts` for the server application

When adding new environment variables, make sure to update these validation schemas to maintain type safety throughout the application.

## Other Configuration Files

### Biome

Biome is configured in the root `biome.json` file. This configuration applies to all packages in the monorepo.

### TypeScript

TypeScript configuration is shared through the `@repo/typescript-config` package, with specific overrides in each package's `tsconfig.json` file.

### Tailwind CSS

Tailwind CSS configuration is shared through the `@repo/tailwind-config` package, ensuring consistent styling across all packages that use Tailwind.
