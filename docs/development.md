# Development Guide

This guide covers the development workflow and tools for the HooTans Starter project.

## Working with a Single Package

Use [`pnpm --filter=<n>`](https://pnpm.io/filtering) (where `<n>` is defined in the `package.json` of each package).

Example usage:

```bash
# Install the nuqs package for our web application:
pnpm --filter=web install nuqs

# Format only the ui package:
pnpm --filter=@repo/ui format
```

You can get a list of all package names using the command below:

```bash
find . -maxdepth 3 -name "package.json" -exec grep '"name":' {} \;
```

## Adding New Shadcn Components

To install a single Shadcn/UI component, e.g., `button`, use the command:

```bash
pnpm ui-add button
```

You can also open an interactive session to select components using a TUI by not passing any arguments:

```bash
pnpm ui-add
```

- Press `i` to enter interactive mode on startup
- Use `j/k` (or arrow keys) to navigate up and down
- Use `<Space>` to toggle select your desired component(s)
- Hit `<Enter>` to install all selected components

## Adding New Better-Auth Plugins

When integrating more better-auth plugins, e.g.:

- [admin](https://better-auth.vercel.app/docs/plugins/admin)
- [organization](https://better-auth.vercel.app/docs/plugins/organization)

You should:

1. Modify the auth package server and client files in accordance with the plugin's respective documentations.

2. Run the interactive command:

   ```bash
   pnpm auth:schema:generate
   ```

   Press `i` to enter interactive mode, then `y` to overwrite [packages/db/src/schemas/auth.ts](packages/db/src/schemas/auth.ts).

3. Format and fix all linting issues, e.g., with:

   ```bash
   pnpm format:fix
   pnpm lint:fix
   ```

4. Push your new schema to the database:

   ```bash
   pnpm db:push
   ```

5. Occasionally, the type inference will not work immediately in your IDE (e.g., in VSCode).
   This can be resolved by running:

   ```bash
   pnpm clean && pnpm install
   ```

   followed by restarting your TS Server or reloading VSCode.

You can also refer to the [better-auth documentation](https://www.better-auth.com/docs/introduction).

## Tooling Scripts

All scripts are defined in [package.json](../package.json) and [turbo.json](../turbo.json):

```bash
pnpm clean                  # remove all .cache, .turbo, dist, node_modules

pnpm typecheck              # report typescript issues

pnpm format                 # format code with Biome
pnpm format:fix             # format code with Biome (alias)

pnpm lint                   # lint code with Biome
pnpm lint:fix               # lint code with Biome (alias)

pnpm biome:check            # check code with Biome (linting and formatting)
pnpm biome:format           # format code with Biome
pnpm biome:lint             # lint code with Biome

pnpx codemod pnpm/catalog   # migrate dependencies to pnpm-workspace.yaml
```

## Using Biome

This project uses [Biome](https://biomejs.dev/), a fast and modern linter and formatter that replaces both ESLint and Prettier. Biome is configured in the root `biome.json` file.

```bash
# Check code (both linting and formatting)
pnpm biome:check

# Format code
pnpm format
# or
pnpm biome:format

# Lint code
pnpm lint
# or
pnpm biome:lint
```

Biome is significantly faster than ESLint and Prettier, and provides a unified tool for both linting and formatting. The standard `format` and `lint` commands are now aliases to the Biome commands.

## Tanstack Router Configuration

The following is configured in [vite.config.ts](../apps/web/vite.config.ts) for the web application:

```ts
TanStackRouterVite({
  routeToken: 'layout',
  autoCodeSplitting: true,
}),
```

This enables the use of a `layout.tsx` file in each directory similar to Next.js. You can read more about this [here](https://github.com/TanStack/router/discussions/1102#discussioncomment-10946603).

Also, it is recommended that you exclude the `routerTree.gen.ts` from your IDE. For example, in VSCode, you can add the following `.vscode/settings.json` at the root of your turborepo:

```json
{
  "files.readonlyInclude": {
    "**/routeTree.gen.ts": true
  },
  "files.watcherExclude": {
    "**/routeTree.gen.ts": true
  },
  "search.exclude": {
    "**/routeTree.gen.ts": true
  }
}
```

### Route Generation

TanStack Router automatically generates route definitions based on the file structure in the `apps/web/src/routes` directory. Routes are automatically generated when you run the development server:

```bash
pnpm dev
```

However, sometimes you may need to manually regenerate routes after adding new route files or making significant changes to the routing structure. For example, when changing from "posts" to "tweets" feature, you'll need to regenerate the routes to include the new tweet routes.

To manually regenerate routes without starting the development server, use the following command:

```bash
# From the project root
pnpm generate-routes

# Or from the web app directory
cd apps/web
pnpm generate-routes
```

This will update the `apps/web/src/routeTree.gen.ts` file with the new route definitions.

#### Route Structure

The project follows a file-based routing structure:

- `apps/web/src/routes/__root.tsx` - The root layout component
- `apps/web/src/routes/_public/layout.tsx` - Layout for public routes
- `apps/web/src/routes/_protected/layout.tsx` - Layout for protected routes
- `apps/web/src/routes/_protected/tweets/index.tsx` - The tweets listing page
- `apps/web/src/routes/_protected/tweets/$tweetid/index.tsx` - Individual tweet page

#### Route Naming Conventions

- Files named `layout.tsx` define layout components
- Files named `index.tsx` define index routes
- Directories starting with `_` (like `_protected`) are used for layout grouping
- Directories starting with `$` (like `$tweetid`) are used for dynamic parameters

#### Troubleshooting

If you encounter issues with routes not being recognized:

1. Make sure your route files follow the correct naming conventions
2. Run `pnpm generate-routes` to manually regenerate the route tree
3. Check the `routeTree.gen.ts` file to see if your routes are included
4. Restart the development server with `pnpm dev`

For more information, refer to the [TanStack Router documentation](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing).
