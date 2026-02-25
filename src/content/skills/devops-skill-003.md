---
title: "Implementing Docker Container Health Checks"
description: "A step-by-step guide to adding health checks to Docker containers for automatic failure detection and recovery."
category: skills
tags: ["docker", "health-checks", "reliability", "monitoring"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Health checks let Docker (and orchestrators) know when a container is actually functional, not just running. This skill covers implementing health checks at both the Dockerfile and application level.

## Steps

1. **Choose the health check type** — HTTP endpoint for web services, TCP connection for databases, or command execution for workers.
2. **Implement the application health endpoint** — Create a `/health` or `/healthz` route that checks critical dependencies.
3. **Set timing parameters** — Configure interval, timeout, start_period, and retries based on your service characteristics.
4. **Add HEALTHCHECK to Dockerfile** — Include the instruction using a command appropriate for your base image.
5. **Test the health check** — Verify it passes when healthy and fails when dependencies are down.
6. **Integrate with orchestration** — Use `depends_on: condition: service_healthy` in Docker Compose.

## Example

```python
# Flask health endpoint
from flask import Flask, jsonify
import psycopg2
import redis

app = Flask(__name__)

@app.route("/health")
def health():
    status = {"status": "healthy", "checks": {}}
    healthy = True

    # Check PostgreSQL
    try:
        conn = psycopg2.connect(os.environ["DATABASE_URL"], connect_timeout=3)
        conn.close()
        status["checks"]["postgres"] = "ok"
    except Exception:
        status["checks"]["postgres"] = "failed"
        healthy = False

    # Check Redis
    try:
        r = redis.from_url(os.environ["REDIS_URL"], socket_timeout=3)
        r.ping()
        status["checks"]["redis"] = "ok"
    except Exception:
        status["checks"]["redis"] = "failed"
        healthy = False

    code = 200 if healthy else 503
    return jsonify(status), code
```

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/health')" || exit 1
```

## When to Use

- Every production container should have a health check.
- Essential when using orchestrators that perform rolling updates or automatic restarts.
- Critical for services with external dependencies that can fail independently.

## When NOT to Use

- Extremely short-lived containers (batch jobs that run for seconds) where health checks add overhead without benefit.
- Init containers in Kubernetes that are expected to exit after completion.

## Prerequisites

- Docker 1.12+ for HEALTHCHECK instruction support
- Understanding of your service's dependencies and failure modes
- A health check command available in the container image (curl, wget, or a custom script)

## Pro Tips

1. **Use the start_period wisely** — Set it to slightly longer than your worst-case startup time. During this period, failing health checks do not count toward the retry threshold.
2. **Keep health checks lightweight** — A health check that takes 5 seconds and runs every 10 seconds consumes significant resources. Check connectivity, not full functionality.
3. **Differentiate liveness from readiness** — In Kubernetes, implement separate `/livez` and `/readyz` endpoints. In Docker Compose, a single `/health` endpoint covering both is sufficient.
