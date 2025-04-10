# Deployment Guide

This guide covers various deployment options for the HooTans Starter project.

## Using Containers

You can deploy applications to any service that supports Docker deployment.

Using Docker Compose (see [compose.yaml](../compose.yaml)) is also an option, although this alone may not be production-ready at scale. However, it can be paired with:

- Reverse proxies and load balancers offered by tools like [Traefik](https://github.com/traefik/traefik) or [Caddy](https://github.com/caddyserver/caddy)
- Container orchestration platforms like [Docker Swarm](https://docs.docker.com/engine/swarm) and [Kubernetes](https://kubernetes.io)

### Self-Hosted PaaS Options

For a simpler deployment experience, consider setting up a Virtual Private Server (e.g., on [Hetzner](https://www.hetzner.com)) and make use of self-hostable PaaS software which automatically handles the complexity of deployment:

- **Coolify**
  - https://github.com/coollabsio/coolify
  - https://www.coolify.io
- **Dokploy**
  - https://github.com/Dokploy/dokploy
  - http://dokploy.com

## Using Major Platforms

### Web Application Deployment

The **web** application is a simple React static site powered by Vite, which is easily deployed to platforms such as GitHub/GitLab Pages, Vercel, and Netlify. You can refer to the [Vite documentation](https://vitejs.dev/guide/static-deploy) for deployment guides on all major platforms.

### Server Application Deployment

The **server** application uses the [Hono](https://hono.dev) web framework with the [Node.js runtime](https://hono.dev/docs/getting-started/nodejs). However, this can be exchanged with other runtimes before deploying to your chosen platforms. For example, deploying to Netlify is covered within [Hono's documentation](https://hono.dev/docs/getting-started/netlify#_4-deploy).

## Cross-Domain Considerations

Note that when deploying your web frontend and server backend to two different domains, you will need to [tweak your better-auth configurations](https://www.better-auth.com/docs/integrations/hono#cross-domain-cookies). Apple's Safari browser also does not support third-party cookies, so auth will not function as expected without any proxy workarounds.

To keep things simple, it is recommended that you host your frontend and backend on the same root domain and differ by subdomains. For example, the frontend can be served at either `example.com` or `web.example.com`, and the backend hosted at `api.example.com`.

## Environment Variables

When deploying, make sure to set the appropriate environment variables:

1. For the **web** application:
   - `PUBLIC_SERVER_URL` should point to your server's public URL

2. For the **server** application:
   - `PUBLIC_WEB_URL` should point to your web application's public URL
   - `SERVER_POSTGRES_URL` should point to your production database
   - Other authentication and security-related variables

Refer to the [Configuration Guide](configuration.md) for more details on environment variables.
