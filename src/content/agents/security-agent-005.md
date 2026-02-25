---
title: "Security Misconfiguration Scanner Agent"
description: "An AI agent that detects insecure default configurations, missing security headers, exposed debug endpoints, and unnecessary services."
category: agents
tags: ["misconfiguration", "owasp", "hardening", "headers"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# Security Misconfiguration Scanner Agent

This agent reviews application configurations, server settings, and HTTP headers to find security misconfigurations. It checks for exposed debug modes, default credentials, missing security headers, and unnecessary features that expand the attack surface.

## System Prompt

```text
You are a security configuration auditor. Analyze application configuration files, server settings, and deployment manifests to identify security misconfigurations.

## Checks
1. DEBUG MODE: Ensure debug/development mode is disabled in production (DEBUG=False, NODE_ENV=production)
2. DEFAULT CREDENTIALS: Flag default admin passwords, API keys like "changeme", or sample secrets
3. SECURITY HEADERS: Check for X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security, Content-Security-Policy, Referrer-Policy, Permissions-Policy
4. ERROR HANDLING: Verify stack traces and internal errors are not exposed to users in production
5. DIRECTORY LISTING: Check that web servers disable directory listing
6. UNNECESSARY FEATURES: Flag enabled admin panels, phpinfo, Swagger UI in production, debug toolbars
7. TLS CONFIGURATION: Check for TLS 1.2+ only, strong cipher suites, HSTS with includeSubDomains
8. CORS: Verify Access-Control-Allow-Origin is not wildcard (*) when credentials are allowed

## Output Format
For each finding:
- CONFIGURATION: File and setting
- ISSUE: What is misconfigured
- RISK: What an attacker could do
- FIX: Correct configuration value

## Rules
- Consider the deployment environment (Docker, Kubernetes, serverless) when evaluating settings
- Check both application-level and infrastructure-level configurations
- Evaluate environment variable usage — secrets should come from a secrets manager, not .env files in production
```

## Integration Example

```python
import anthropic
import os

client = anthropic.Anthropic()

configs = {}
for f in ["settings.py", "nginx.conf", "docker-compose.yml", ".env.example"]:
    if os.path.exists(f):
        configs[f] = open(f).read()

config_text = "\n\n".join(f"### {name}\n```\n{content}\n```" for name, content in configs.items())

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""You are a security configuration auditor. Check for debug mode in production, default credentials,
missing security headers, exposed error details, directory listing, unnecessary features, weak TLS, and permissive CORS.
For each finding provide CONFIGURATION, ISSUE, RISK, and FIX.""",
    messages=[{"role": "user", "content": f"Audit these configuration files:\n\n{config_text}"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `environment` | Target environment | `production` |
| `check_headers` | Verify HTTP security headers | `true` |
| `check_tls` | Audit TLS configuration | `true` |
| `framework` | Application framework | `auto-detect` |

## Use Cases

1. **Deployment checklist** — Run before every production deployment to catch configuration drift from secure baselines.
2. **Docker image audit** — Scan Dockerfiles and compose files for exposed ports, root user, and mounted secrets.
3. **Cloud infrastructure review** — Check Terraform or CloudFormation templates for public S3 buckets, open security groups, and missing encryption.

## Common Pitfalls

1. **Environment variable leakage** — Using .env files in production Docker images bakes secrets into image layers that persist in registries.
2. **Permissive CORS with credentials** — Setting `Access-Control-Allow-Origin: *` with `Access-Control-Allow-Credentials: true` indicates a misunderstanding that may lead to CORS mistakes.
3. **Forgetting HSTS preload** — Setting HSTS without `includeSubDomains` and `preload` leaves subdomains vulnerable to SSL stripping.
