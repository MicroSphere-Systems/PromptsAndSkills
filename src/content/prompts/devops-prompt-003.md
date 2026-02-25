---
title: "Docker Health Check Design Prompt"
description: "A prompt that generates comprehensive health check configurations for containerized services including endpoints and Dockerfile instructions."
category: prompts
tags: ["docker", "health-checks", "reliability", "monitoring"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt generates both the application-level health endpoint code and the Docker HEALTHCHECK instruction, ensuring orchestrators can accurately assess container health.

## Prompt

```
Design a comprehensive health check system for the following containerized service:

Service Type: {{service_type}}
Language/Framework: {{language_framework}}
Dependencies: {{dependencies}}
Startup Time: {{startup_time}}
Base Image: {{base_image}}

Generate:
1. An application-level /health endpoint that checks:
   - Service readiness (can it handle requests?)
   - Dependency connectivity (database, cache, message queue)
   - Disk space and memory thresholds (if applicable)
2. A Dockerfile HEALTHCHECK instruction with appropriate:
   - interval (how often to check)
   - timeout (max check duration)
   - start_period (grace period for startup)
   - retries (failures before marking unhealthy)
3. The health check command appropriate for the base image (curl, wget, or custom binary)

Return structured JSON from the health endpoint with status, checks, and response time.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `service_type` | Type of service | "REST API" or "background worker" or "gRPC service" |
| `language_framework` | Tech stack | "Python FastAPI" |
| `dependencies` | External services needed | "PostgreSQL, Redis, S3" |
| `startup_time` | Typical startup duration | "5 seconds" or "60 seconds for ML model loading" |
| `base_image` | Docker base image | "python:3.12-slim-bookworm" |

## Example Output

```python
# health.py - FastAPI health endpoint
from fastapi import APIRouter, Response
import asyncpg
import aioredis
import time

router = APIRouter()

@router.get("/health")
async def health_check(response: Response):
    start = time.monotonic()
    checks = {}

    # Check PostgreSQL
    try:
        conn = await asyncpg.connect(dsn=settings.DATABASE_URL, timeout=3)
        await conn.fetchval("SELECT 1")
        await conn.close()
        checks["postgres"] = "ok"
    except Exception as e:
        checks["postgres"] = f"error: {str(e)}"

    # Check Redis
    try:
        r = aioredis.from_url(settings.REDIS_URL)
        await r.ping()
        checks["redis"] = "ok"
    except Exception as e:
        checks["redis"] = f"error: {str(e)}"

    all_healthy = all(v == "ok" for v in checks.values())
    elapsed = round((time.monotonic() - start) * 1000, 2)

    if not all_healthy:
        response.status_code = 503

    return {
        "status": "healthy" if all_healthy else "degraded",
        "checks": checks,
        "response_time_ms": elapsed
    }
```

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1
```

## Variations

1. **Worker Health Check** — For background workers without HTTP endpoints, write a heartbeat timestamp to a file and check its age in the health command.
2. **gRPC Health Check** — Implement the gRPC Health Checking Protocol and use `grpc_health_probe` as the Docker health check command.
3. **Lightweight Liveness** — For services where dependency checks are expensive, create separate `/livez` (is the process alive?) and `/readyz` (can it serve traffic?) endpoints.

## Best Model

Claude Sonnet 4.6 is well-suited for generating health check implementations with proper error handling and timing.
