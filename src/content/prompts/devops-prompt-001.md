---
title: "Docker Multi-Stage Build Generator Prompt"
description: "A prompt that generates optimized multi-stage Dockerfiles from application descriptions, minimizing image size and build time."
category: prompts
tags: ["docker", "multi-stage-builds", "dockerfile", "optimization"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt takes an application description and produces a production-ready multi-stage Dockerfile with clearly named stages, minimal runtime dependencies, and optimized layer caching.

## Prompt

```
You are a Dockerfile optimization expert. Generate a multi-stage Dockerfile for the following application:

Application: {{application_description}}
Language/Runtime: {{language_runtime}}
Build Tool: {{build_tool}}
Production Port: {{port}}
Required Runtime Dependencies: {{runtime_deps}}

Requirements:
1. Use named build stages (e.g., "deps", "builder", "runtime")
2. Choose the smallest viable base image for the runtime stage
3. Order layers to maximize build cache hits
4. Install only production dependencies in the final stage
5. Set a non-root USER for the runtime stage
6. Include a HEALTHCHECK instruction
7. Add descriptive LABELs (maintainer, version, description)
8. Use COPY --from to transfer only necessary artifacts

Output the complete Dockerfile with inline comments explaining each decision.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `application_description` | What the app does | "REST API for user management" |
| `language_runtime` | Language and version | "Node.js 20 LTS" |
| `build_tool` | Build system used | "npm with TypeScript compilation" |
| `port` | Port the app listens on | "3000" |
| `runtime_deps` | System packages needed at runtime | "none" or "libpq, imagemagick" |

## Example Output

```dockerfile
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production && cp -R node_modules /prod_modules
RUN npm ci

# Stage 2: Build application
FROM deps AS builder
COPY . .
RUN npm run build

# Stage 3: Production runtime
FROM node:20-alpine AS runtime
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --from=deps /prod_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]
```

## Variations

1. **Go Static Binary** — Replace the runtime stage with `FROM scratch` or `gcr.io/distroless/static` and copy a single statically compiled binary.
2. **Python with Wheels** — Add a stage that compiles wheels from requirements.txt, then pip install the `.whl` files in a clean slim image without build tools.
3. **Java with Jlink** — Use jlink in the builder stage to create a custom minimal JRE, then copy it to a debian-slim base for a JRE under 50MB.

## Best Model

Claude Sonnet 4.6 handles Dockerfile generation well. Use Claude Opus 4.6 for complex multi-service setups where understanding architectural trade-offs is important.
