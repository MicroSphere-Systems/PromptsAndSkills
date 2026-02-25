---
title: "Docker Compose Configuration Generator Prompt"
description: "A prompt that generates complete Docker Compose configurations for multi-service applications with proper networking and persistence."
category: prompts
tags: ["docker", "docker-compose", "orchestration", "development"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt produces a complete, production-quality `compose.yaml` for multi-service applications with proper networking, health checks, volumes, and environment management.

## Prompt

```
Generate a complete Docker Compose configuration for the following application stack:

Services: {{services_list}}
Environment: {{environment_type}}
Persistence Requirements: {{persistence_needs}}
External Access: {{external_access}}

Requirements:
1. Use the modern Compose specification (no version field)
2. Create separate networks for each communication tier (frontend, backend, data)
3. Use named volumes for all persistent data
4. Add health checks for every service with depends_on conditions
5. Use env_file references, never hardcoded secrets
6. Set resource limits (memory, CPU) appropriate for {{environment_type}}
7. Add restart policies
8. Include comments explaining each service's role
9. Use profiles for optional services (monitoring, debugging tools)

Output a complete compose.yaml file ready to use with `docker compose up`.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `services_list` | All services in the stack | "Next.js frontend, FastAPI backend, PostgreSQL 16, Redis 7, Nginx" |
| `environment_type` | Target environment | "development" or "staging" or "CI" |
| `persistence_needs` | What data must persist | "database data, uploaded files, Redis AOF" |
| `external_access` | How users reach the app | "Nginx on port 443 with TLS termination" |

## Example Output

```yaml
# Application stack: Next.js + FastAPI + PostgreSQL + Redis
services:
  nginx:
    image: nginx:1.25-alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    networks:
      - frontend
    depends_on:
      web:
        condition: service_healthy
    restart: unless-stopped

  web:
    build:
      context: ./frontend
      target: development
    volumes:
      - ./frontend/src:/app/src
    networks:
      - frontend
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000"]
      interval: 15s
      timeout: 5s
    restart: unless-stopped

  api:
    build: ./backend
    env_file: ./backend/.env
    networks:
      - frontend
      - backend
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"]
      interval: 15s
      timeout: 5s
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    env_file: ./db/.env
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/data
    networks:
      - backend
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
    restart: unless-stopped

volumes:
  pgdata:
  redisdata:

networks:
  frontend:
  backend:
```

## Variations

1. **CI Test Runner** — Add a `test` service that depends on all backends, runs the test suite, and exits. Use `docker compose run --rm test`.
2. **Monitoring Stack** — Add Prometheus, Grafana, and cAdvisor under a `monitoring` profile, activated with `docker compose --profile monitoring up`.
3. **Production-Like Staging** — Add resource limits, replicas, and TLS termination to simulate production topology on a single host.

## Best Model

Claude Sonnet 4.6 produces high-quality compose configurations. For complex multi-environment setups with overrides, Claude Opus 4.6 provides better architectural reasoning.
