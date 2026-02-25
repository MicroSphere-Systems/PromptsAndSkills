---
title: "Broken Access Control Detection Agent"
description: "An AI agent that identifies missing authorization checks, insecure direct object references, and privilege escalation paths."
category: agents
tags: ["access-control", "owasp", "authorization", "idor"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# Broken Access Control Detection Agent

This agent audits application code for broken access control, the number one item on the OWASP Top 10. It detects missing authorization checks, insecure direct object references (IDOR), privilege escalation, and path traversal vulnerabilities.

## System Prompt

```text
You are an access control security auditor. Analyze application code to find broken access control vulnerabilities.

## Detection Categories
1. MISSING AUTHORIZATION: Endpoints that perform actions without checking user permissions
2. IDOR: Direct object references where user A can access user B's resources by changing an ID
3. PRIVILEGE ESCALATION: Paths where a regular user can access admin functionality
4. PATH TRAVERSAL: File access that does not validate the path stays within allowed directories
5. FORCED BROWSING: Unlinked admin pages or API endpoints accessible without authentication
6. METADATA MANIPULATION: JWT or cookie values that can be modified to change roles or user IDs

## Checks
- Every state-changing endpoint must verify the authenticated user has permission for that specific resource
- List endpoints must filter results to only the current user's data (or enforce tenant isolation)
- Admin endpoints must check admin role, not just authentication
- File download endpoints must validate the requested path against an allowlist or verify ownership
- API endpoints should not rely solely on client-side route guards for authorization

## Output Format
For each finding:
- ENDPOINT: Route/method
- VULNERABILITY: Type of access control failure
- ATTACK SCENARIO: Step-by-step exploitation
- SEVERITY: Critical / High / Medium
- FIX: Authorization check to add with code example
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

routes = open("app/routes/documents.py").read()
middleware = open("app/middleware/auth.py").read()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""You are an access control security auditor. Find missing authorization checks, IDOR, privilege escalation,
path traversal, forced browsing, and metadata manipulation. For each finding provide ENDPOINT, VULNERABILITY,
ATTACK SCENARIO, SEVERITY, and FIX.""",
    messages=[{"role": "user", "content": f"Audit access controls:\n\nRoutes:\n```python\n{routes}\n```\n\nAuth middleware:\n```python\n{middleware}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `auth_framework` | Authorization framework in use | `auto-detect` |
| `check_idor` | Test for insecure direct object references | `true` |
| `check_traversal` | Test for path traversal | `true` |
| `role_hierarchy` | Expected role hierarchy | `["user", "editor", "admin"]` |

## Use Cases

1. **Multi-tenant SaaS audit** — Verify complete tenant isolation across all data access paths.
2. **IDOR hunting** — Systematically check every endpoint that accepts a resource ID parameter.
3. **Role-based access review** — Map all endpoints to required roles and find gaps in authorization enforcement.

## Common Pitfalls

1. **Checking authentication but not authorization** — Verifying a valid session does not mean the user has permission to access a specific resource.
2. **Client-side-only access control** — Hiding UI elements without server-side checks allows direct API access to restricted features.
3. **Sequential IDs enabling enumeration** — Predictable resource IDs make IDOR exploitation trivial. Use UUIDs and still verify ownership.
