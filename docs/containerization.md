# Containerization Guide

This guide explains how to use Docker/Podman with the HooTans Starter project.

## Overview

Both the `web` and `server` applications have been containerized. The containerization setup is defined in the following files:

- [compose.yaml](../compose.yaml) - Docker Compose configuration
- [apps/server/Dockerfile](../apps/server/Dockerfile) - Server application container
- [apps/web/Dockerfile](../apps/web/Dockerfile) - Web application container
- [apps/web/nginx.conf](../apps/web/nginx.conf) - Nginx configuration for the web application

## Running with Docker/Podman

You can start the containerized applications with the following commands:

```bash
# Start all applications
docker compose up --build
```

You can then access the web application at http://localhost:8085.

## Database Schema Migration with Docker

While you can use `pnpm db:push` on the host machine if you have installed all the required dependencies, it is also possible to do everything within Docker alone:

```bash
# Open a second terminal and run the command:
docker compose run --build --rm drizzle

# Upon completion, you will be inside the `drizzle` docker container instead
# of the host machine. It is now possible to push the schema with:
pnpm db:push
```

## Production Mode

Note that these containers are configured to run in production mode. This means:

1. The web application is built as a static site and served by Nginx
2. The server application runs in production mode with optimized settings
3. Environment variables need to be properly configured for production use

## Environment Variables for Containerized Deployment

For the **web** application, the `PUBLIC_SERVER_URL` variable is available at build time (as a Docker build argument), rather than an environment variable at runtime.

Both the **server** application's `PUBLIC_WEB_URL` and the **web** application's `PUBLIC_SERVER_URL` need to be set as internet-accessible URLs when deployed, e.g., `https://mycompany.com` and `https://api.mycompany.com`, rather than referencing `http://localhost:8085` like in development.

## Custom Configuration

You can customize the Docker/Podman setup by modifying the following files:

- **compose.yaml**: Adjust ports, volumes, and environment variables
- **Dockerfiles**: Modify build steps, base images, or dependencies
- **nginx.conf**: Change web server settings, caching, or routing

For more advanced containerization needs, refer to the [Deployment Guide](deployment.md).
