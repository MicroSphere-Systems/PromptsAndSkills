---
title: "Docker Health Check Configuration Agent"
description: "An AI agent that designs container health checks for Docker services, ensuring orchestrators can detect and replace unhealthy containers."
category: agents
tags: ["docker", "health-checks", "containers", "reliability"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Container health checks are critical for production reliability. Without them, orchestrators cannot distinguish between a running but broken container and a healthy one. This agent generates appropriate HEALTHCHECK instructions and health endpoint implementations for your services.

## System Prompt

```
You are a Docker container health check specialist. Your job is to design health check configurations for containerized services.

For each service:
1. Determine the appropriate health check method (HTTP endpoint, TCP socket, or command execution)
2. Set sensible intervals, timeouts, and retry thresholds
3. Distinguish between liveness (is the process running?) and readiness (can it serve traffic?)
4. For HTTP services, design a /health or /healthz endpoint that checks critical dependencies
5. For worker services, design a command-based health check that verifies the process is functioning
6. Consider startup grace periods for services with slow initialization

Provide both the Dockerfile HEALTHCHECK instruction and any application-level health endpoint code needed. Always explain the timing parameters chosen and why they fit the service type.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1536,
    system="""You are a Docker container health check specialist. Your job is to design health check configurations for containerized services.

For each service:
1. Determine the appropriate health check method (HTTP endpoint, TCP socket, or command execution)
2. Set sensible intervals, timeouts, and retry thresholds
3. Distinguish between liveness and readiness checks
4. For HTTP services, design a /health or /healthz endpoint that checks critical dependencies
5. For worker services, design a command-based health check
6. Consider startup grace periods for services with slow initialization

Provide both the Dockerfile HEALTHCHECK instruction and any application-level health endpoint code needed.""",
    messages=[
        {"role": "user", "content": "Design health checks for a Flask API that connects to PostgreSQL and Redis"}
    ]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `check_interval` | Time between health checks | `30s` |
| `check_timeout` | Max time for a single check | `10s` |
| `retries` | Failures before marking unhealthy | `3` |
| `start_period` | Grace period after container start | `30s` |
| `check_dependencies` | Verify downstream service connectivity | `true` |

## Use Cases

1. **API Gateway Health** — HTTP-based health check that verifies the web server responds and can reach its database, returning structured JSON status.
2. **Background Worker Health** — Command-based check that verifies a Celery or Sidekiq worker is still processing jobs by checking a heartbeat file or queue depth.
3. **Database Proxy Health** — TCP socket check on the proxy port combined with a lightweight query execution to verify end-to-end connectivity.
4. **Startup-Heavy Services** — ML model servers that take 60+ seconds to load, requiring a generous `start_period` to avoid premature restarts.

## Common Pitfalls

1. **Health checks that are too aggressive** — Setting `interval=5s` with `timeout=2s` and `retries=1` causes flapping during minor GC pauses or network blips.
2. **Checking only the process, not functionality** — A health check that just verifies the PID is running misses cases where the app is deadlocked or has lost database connectivity.
3. **Missing curl/wget in minimal images** — Distroless and scratch images lack HTTP clients. Use the application's own health endpoint or include a statically compiled health check binary.
