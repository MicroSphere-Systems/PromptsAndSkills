---
title: "Docker Container Logging Strategy Prompt"
description: "A prompt that designs centralized logging architectures for Docker containers, covering log drivers, formats, and aggregation pipelines."
category: prompts
tags: ["docker", "logging", "observability", "fluentd"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt designs a complete container logging strategy from application log output through collection, aggregation, and storage.

## Prompt

```
Design a container logging strategy for the following environment:

Application Stack: {{application_stack}}
Number of Services: {{service_count}}
Log Volume: {{log_volume}}
Retention Requirements: {{retention}}
Aggregation Platform: {{aggregation_platform}}

Address:
1. **Application Logging** — Structured log format (JSON), log levels, correlation IDs
2. **Docker Log Driver** — Which driver to use and why (json-file, fluentd, awslogs)
3. **Log Collection** — Sidecar vs daemon approach, resource overhead
4. **Log Aggregation** — Pipeline from container to centralized platform
5. **Log Rotation** — Prevent disk exhaustion on the Docker host
6. **Sensitive Data** — Redact PII, secrets, and tokens from logs
7. **Troubleshooting** — How to access logs when the aggregation pipeline is down

Provide Docker daemon configuration, compose service definitions, and application logging code.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `application_stack` | Services in the stack | "3 Python APIs, 2 Node.js workers, PostgreSQL, Redis" |
| `service_count` | Total number of containers | "15" |
| `log_volume` | Expected log throughput | "~500 MB/day" |
| `retention` | How long logs must be kept | "30 days hot, 1 year cold storage" |
| `aggregation_platform` | Where logs are centralized | "Elasticsearch + Kibana" or "Loki + Grafana" |

## Example Output

```json
// Application structured logging (Python)
{
  "timestamp": "2026-02-25T10:30:00Z",
  "level": "INFO",
  "service": "user-api",
  "trace_id": "abc-123-def",
  "message": "User created successfully",
  "user_id": "usr_456",
  "duration_ms": 45
}
```

```yaml
# Docker daemon.json - log rotation
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "5",
    "compress": "true"
  }
}
```

```yaml
# Compose - Fluentd log driver
services:
  api:
    image: myapp:latest
    logging:
      driver: fluentd
      options:
        fluentd-address: localhost:24224
        tag: "app.{{.Name}}"
        fluentd-async: "true"
```

## Variations

1. **Cloud-Native Logging** — Use cloud-native log drivers (awslogs, gcplogs) to send directly to CloudWatch or Cloud Logging without a collector.
2. **Loki Lightweight Stack** — Design a Grafana Loki pipeline with Promtail for environments where Elasticsearch is too heavy.
3. **Compliance Logging** — Add immutable audit logs with tamper-evident checksums for regulated environments.

## Best Model

Claude Sonnet 4.6 handles logging architecture design well, producing practical configurations across multiple tools and platforms.
