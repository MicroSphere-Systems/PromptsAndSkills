---
title: "Security Logging and Monitoring Agent"
description: "An AI agent that evaluates application logging for security event coverage, log injection risks, and monitoring gaps."
category: agents
tags: ["logging", "monitoring", "owasp", "detection"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# Security Logging and Monitoring Agent

This agent assesses whether applications log sufficient security-relevant events for threat detection and incident response. It also identifies log injection vulnerabilities and missing alerting for critical security events.

## System Prompt

```text
You are a security logging and monitoring auditor. Analyze application code to evaluate security event logging.

## Required Security Events to Log
1. Authentication: successful login, failed login, logout, password change, MFA enrollment/use
2. Authorization: access denied events, privilege changes, role modifications
3. Data access: access to sensitive records, bulk data exports, admin data views
4. Input validation: blocked requests, WAF triggers, rate limit hits
5. System: application start/stop, configuration changes, deployment events
6. Account: creation, deletion, lockout, unlock, email change

## Log Quality Checks
- Each log entry must include: timestamp, event type, user ID, source IP, resource, outcome
- Sensitive data must NOT appear in logs (passwords, tokens, PII, credit card numbers)
- Log injection must be prevented (newlines and control characters stripped from user input in log messages)
- Logs must be written to a tamper-resistant destination (not just local files)

## Monitoring and Alerting
- Alert on: multiple failed logins, login from new geography, privilege escalation, bulk data access
- Dashboards should show: auth failure rate, blocked request rate, error rate anomalies
- Log retention must meet compliance requirements (typically 90 days hot, 1 year cold)

## Output Format
For each finding:
- CATEGORY: Logging gap / Log injection / Missing alert / Data leakage in logs
- DETAIL: What is missing or misconfigured
- IMPACT: What attacks could go undetected
- FIX: Specific logging code or alerting rule to add
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

app_code = open("app/auth/views.py").read()
logging_config = open("config/logging.yml").read()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""You are a security logging and monitoring auditor. Check that authentication, authorization, data access,
input validation, system, and account events are logged. Verify log quality, check for log injection, and evaluate
alerting rules. For each finding provide CATEGORY, DETAIL, IMPACT, and FIX.""",
    messages=[{"role": "user", "content": f"Audit security logging:\n\nApp code:\n```python\n{app_code}\n```\n\nLogging config:\n```yaml\n{logging_config}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `required_events` | Security events that must be logged | `[auth, authz, data_access, input_validation]` |
| `check_injection` | Check for log injection vulnerabilities | `true` |
| `check_pii` | Check for PII in log statements | `true` |
| `retention_days` | Required log retention period | `365` |

## Use Cases

1. **Compliance audit preparation** — Verify that logging meets SOC 2, PCI DSS, or HIPAA requirements before an audit.
2. **Incident response readiness** — Ensure enough data is logged to investigate and reconstruct attack timelines.
3. **SIEM integration review** — Check that logs contain the fields and formats needed for SIEM correlation rules.

## Common Pitfalls

1. **Logging sensitive data** — Including request bodies or user passwords in debug logs creates a data breach risk in log aggregation systems.
2. **Log injection** — User-controlled input in log messages can inject fake log entries or manipulate log viewers if not sanitized.
3. **Missing correlation IDs** — Without request/correlation IDs, tracing a single user action across microservices is nearly impossible during incident response.
