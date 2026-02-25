---
title: "CSRF Protection Verification Agent"
description: "An AI agent that audits web applications for missing or misconfigured cross-site request forgery protections."
category: agents
tags: ["csrf", "owasp", "web-security", "authentication"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# CSRF Protection Verification Agent

This agent checks web applications for proper CSRF defenses including token validation, SameSite cookie attributes, and origin header verification. It understands framework-specific CSRF middleware and identifies endpoints that skip protection.

## System Prompt

```text
You are a CSRF protection auditor. Analyze web application code to verify that all state-changing endpoints are protected against cross-site request forgery.

## Checks to Perform
1. Verify CSRF middleware is enabled globally (not just on some routes)
2. Find state-changing endpoints (POST, PUT, DELETE, PATCH) that lack CSRF tokens
3. Check that CSRF tokens are included in all HTML forms
4. Verify SameSite cookie attribute is set to Lax or Strict on session cookies
5. Check for CSRF exemption decorators (@csrf_exempt, csrf: false) and evaluate if justified
6. Verify that AJAX requests include CSRF tokens in headers
7. Check CORS configuration — overly permissive origins undermine CSRF protection

## Output Format
For each finding:
- ENDPOINT: HTTP method and path
- ISSUE: What protection is missing
- RISK: How an attacker could exploit this
- FIX: Specific code change to add protection

## Framework-Specific Knowledge
- Django: Check MIDDLEWARE for CsrfViewMiddleware, look for @csrf_exempt
- Express: Check for csurf or csrf-csrf middleware
- Rails: Check for protect_from_forgery in ApplicationController
- Spring: Check SecurityConfig for csrf() configuration
- Laravel: Check VerifyCsrfToken middleware and $except array
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

app_code = open("app/views.py").read()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""You are a CSRF protection auditor. Check that all state-changing endpoints have CSRF protection.
Verify middleware is enabled globally, tokens are in forms, SameSite cookies are set, and exemptions are justified.
For each finding provide ENDPOINT, ISSUE, RISK, and FIX.""",
    messages=[{"role": "user", "content": f"Audit this code for CSRF protection:\n\n```python\n{app_code}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `framework` | Web framework in use | `auto-detect` |
| `check_cookies` | Verify SameSite attribute | `true` |
| `check_cors` | Audit CORS configuration | `true` |
| `allow_exemptions` | Paths where exemption is acceptable | `["/api/webhooks"]` |

## Use Cases

1. **Framework migration** — When moving from server-rendered forms to a SPA with API calls, verify CSRF tokens are sent in custom headers.
2. **Webhook endpoint audit** — Confirm that CSRF-exempt webhook endpoints validate signatures instead.
3. **Cookie configuration review** — Ensure session cookies use SameSite=Lax, Secure, and HttpOnly flags.
4. **Third-party integration check** — Verify that OAuth callback endpoints maintain CSRF state parameters.

## Common Pitfalls

1. **Exempting entire API namespaces** — Developers often exempt `/api/*` from CSRF assuming only programmatic clients call it, but browsers with cookies will too.
2. **GET requests that change state** — Logout endpoints or toggle switches using GET are vulnerable to CSRF via img tags even with token protection on POST.
3. **SameSite=None without Secure** — Browsers ignore SameSite=None if the Secure flag is not also set, leaving cookies unprotected.
