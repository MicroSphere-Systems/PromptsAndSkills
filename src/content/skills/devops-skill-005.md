---
title: "Docker Compose for Local Development"
description: "A step-by-step guide to setting up Docker Compose for efficient local development with hot-reloading, debugging, and service orchestration."
category: skills
tags: ["docker", "docker-compose", "development", "hot-reload"]
difficulty: beginner
date: 2026-02-25
featured: false
---

Docker Compose transforms local development by providing consistent, reproducible multi-service environments. This skill covers setting up a productive development workflow with Compose.

## Steps

1. **Define your services** — List every service your application depends on (databases, caches, message queues, APIs).
2. **Create compose.yaml** — Define each service with its image, ports, and configuration.
3. **Add bind mounts for hot-reload** — Mount your source code into containers so changes are reflected instantly.
4. **Configure health checks** — Add health checks to dependencies so your app waits for them to be ready.
5. **Use env_file for configuration** — Create `.env` files for environment variables, never hardcode secrets.
6. **Add development overrides** — Use `compose.override.yaml` for development-specific settings (debug ports, verbose logging).
7. **Create a startup script** — Add a `Makefile` or script with common commands (`make up`, `make logs`, `make reset`).

## Example

```yaml
# compose.yaml
services:
  app:
    build:
      context: .
      target: development
    volumes:
      - ./src:/app/src
      - /app/node_modules  # prevent overwriting container's node_modules
    ports:
      - "3000:3000"
      - "9229:9229"  # Node.js debugger
    env_file: .env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    command: npm run dev

  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: myapp_dev
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: devpass
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev"]
      interval: 5s
      timeout: 3s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s

volumes:
  pgdata:
```

```makefile
# Makefile
.PHONY: up down logs reset shell

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

reset:
	docker compose down -v
	docker compose up -d

shell:
	docker compose exec app sh
```

## When to Use

- Multi-service applications where running everything locally is complex.
- Onboarding new developers who need a working environment in one command.
- When you need environment parity between developers regardless of their host OS.

## When NOT to Use

- Single-service applications with no external dependencies (just run it natively).
- When Docker overhead impacts your development feedback loop (some languages are faster outside containers).

## Prerequisites

- Docker Desktop or Docker Engine with the Compose plugin installed
- Basic YAML syntax knowledge
- Understanding of your application's service dependencies

## Pro Tips

1. **Use Compose Watch (v2.22+)** — Replace bind mounts with `develop.watch` for smarter file syncing that triggers rebuilds only for dependency file changes and hot-reload for source changes.
2. **Anonymous volumes for node_modules** — Mount `/app/node_modules` as an anonymous volume to prevent host node_modules from overwriting the container's installed dependencies.
3. **Use profiles for optional services** — Add monitoring tools like pgAdmin or Redis Commander under a `tools` profile: `docker compose --profile tools up`.
