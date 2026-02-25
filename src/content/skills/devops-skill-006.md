---
title: "Docker Layer Caching for Faster Builds"
description: "A guide to ordering Dockerfile instructions and using BuildKit features to maximize layer cache hits and reduce build times."
category: skills
tags: ["docker", "caching", "buildkit", "performance"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Understanding Docker's layer caching mechanism is key to fast builds. This skill teaches you to order instructions and use BuildKit features to avoid unnecessary rebuilds.

## Steps

1. **Understand cache invalidation** — Any change to a layer invalidates all subsequent layers. Order from stable to volatile.
2. **Copy dependency files first** — Copy `package.json`, `requirements.txt`, or `go.mod` before copying source code.
3. **Install dependencies in a separate layer** — Run `npm ci` or `pip install` after copying manifests but before copying source.
4. **Use BuildKit cache mounts** — Mount package manager caches to persist across builds.
5. **Combine related RUN commands** — Merge commands that should invalidate together into single layers.
6. **Place volatile instructions last** — `COPY . .`, ARG with changing values, and labels with version info go at the end.
7. **Set up CI registry caching** — Configure `--cache-from` and `--cache-to` for CI environments.

## Example

```dockerfile
# syntax=docker/dockerfile:1

# BAD: Source copy before dependency install
# Any code change reruns npm ci
FROM node:20-alpine
COPY . .
RUN npm ci
RUN npm run build

# GOOD: Dependencies first, source second
FROM node:20-alpine AS deps
WORKDIR /app

# Layer 1: Dependencies (changes rarely)
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Layer 2: Source code (changes frequently)
COPY . .
RUN npm run build
```

```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1

# Build with registry-based caching for CI
docker build \
  --cache-from type=registry,ref=ghcr.io/myorg/myapp:cache \
  --cache-to type=registry,ref=ghcr.io/myorg/myapp:cache,mode=max \
  -t myapp:latest .
```

## When to Use

- Every Dockerfile benefits from cache optimization. Apply these patterns by default.
- Especially impactful in CI/CD pipelines where build time directly affects deployment velocity.
- Critical for monorepos where many services rebuild frequently.

## When NOT to Use

- When you intentionally need a clean build (use `--no-cache` flag).
- Security-sensitive builds where you want to ensure fresh package downloads every time.

## Prerequisites

- Docker with BuildKit support (Docker 18.09+, enabled by default in Docker Desktop)
- Understanding of your build dependency graph

## Pro Tips

1. **Use `--mount=type=cache` for apt** — `RUN --mount=type=cache,target=/var/cache/apt apt-get install -y pkg` avoids re-downloading packages across builds.
2. **Check cache hits with `--progress=plain`** — Build with `docker build --progress=plain .` to see which layers are cached vs rebuilt.
3. **Use `mode=max` for CI caching** — When pushing cache to a registry, `mode=max` caches all layers including intermediate stages, while `mode=min` only caches the final image layers.
