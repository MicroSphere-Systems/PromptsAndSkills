---
title: "Building Multi-Stage Docker Images"
description: "A step-by-step guide to creating multi-stage Docker builds that produce minimal production images with maximum build cache efficiency."
category: skills
tags: ["docker", "multi-stage-builds", "optimization", "containers"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Multi-stage builds are the most effective technique for reducing Docker image size. This skill walks you through converting a single-stage Dockerfile into an optimized multi-stage build.

## Steps

1. **Identify your build artifacts** — Determine exactly which files the application needs at runtime (compiled binaries, transpiled code, production dependencies).
2. **Choose your builder base image** — Select a full SDK or development image for the build stage (e.g., `node:20`, `golang:1.22`, `python:3.12`).
3. **Choose your runtime base image** — Select the smallest image that can run your artifacts (alpine, slim, distroless, or scratch).
4. **Create the dependency stage** — Copy only dependency manifests first (`package.json`, `requirements.txt`, `go.mod`) and install dependencies.
5. **Create the builder stage** — Copy source code and run the build command (compile, transpile, bundle).
6. **Create the runtime stage** — Start from your minimal base, copy only the built artifacts and production dependencies from previous stages.
7. **Add runtime configuration** — Set USER, EXPOSE, HEALTHCHECK, ENTRYPOINT, and CMD in the final stage.
8. **Build and verify** — Build the image, compare sizes, and test that the application runs correctly.

## Example

```dockerfile
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build application
FROM deps AS builder
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# Stage 3: Production runtime
FROM node:20-alpine AS runtime
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

# Copy only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application
COPY --from=builder /app/dist ./dist

USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]
```

```bash
# Build and compare
docker build -t myapp:multi-stage .
docker images myapp
# REPOSITORY   TAG            SIZE
# myapp        multi-stage    145MB
# (vs single-stage ~950MB)
```

## When to Use

- Any application that requires build tools (compilers, transpilers, bundlers) not needed at runtime.
- When your production image size exceeds 500MB and contains development dependencies.
- When deploying to environments where image pull time impacts startup latency (serverless, autoscaling).

## When NOT to Use

- Interpreted languages with no build step where the source code IS the artifact (simple Python scripts).
- When using pre-built binaries downloaded from a release page.
- When the build process requires runtime state (database migrations during build).

## Prerequisites

- Docker 17.05+ (multi-stage build support)
- BuildKit recommended (DOCKER_BUILDKIT=1) for better caching and parallel stage execution
- Understanding of your application's build process and runtime dependencies

## Pro Tips

1. **Name your stages** — Always use `AS stagename` instead of numeric references (`COPY --from=0`). Named stages are self-documenting and resilient to reordering.
2. **Build specific stages** — Use `docker build --target builder .` to build only up to a specific stage, useful for running tests in CI without producing the final image.
3. **Cache mounts for package managers** — Add `RUN --mount=type=cache,target=/root/.npm npm ci` to persist the npm cache between builds, dramatically speeding up dependency installation.
