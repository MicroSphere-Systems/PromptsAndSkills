---
title: "CSRF Protection Audit Prompt"
description: "A prompt for reviewing web applications for missing or misconfigured CSRF protections across forms and API endpoints."
category: prompts
tags: ["csrf", "owasp", "web-security", "cookies"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# CSRF Protection Audit Prompt

This prompt guides an AI model through a comprehensive CSRF protection audit. It checks token implementation, cookie attributes, CORS configuration, and framework middleware.

## Prompt

```text
Audit the following {{framework}} application for Cross-Site Request Forgery (CSRF) vulnerabilities.

Check each of these areas:

1. **Middleware**: Is CSRF middleware enabled globally? List any routes that bypass it.
2. **Forms**: Do all HTML forms include a CSRF token?
3. **AJAX**: Do AJAX/fetch requests include CSRF tokens in headers?
4. **Cookies**: Are session cookies set with SameSite=Lax or Strict?
5. **CORS**: Does the CORS config allow credentials with overly broad origins?
6. **State-changing GETs**: Are there any GET endpoints that modify data?

For each issue found:
- **Endpoint**: Method and path
- **Issue**: What protection is missing
- **Exploit scenario**: How an attacker would craft the CSRF attack
- **Fix**: Code to add the missing protection

Application code:
{{code}}

Configuration:
{{config}}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `framework` | Web framework | `Django`, `Express`, `Rails`, `Laravel` |
| `code` | Route/view/controller code | Contents of views.py or routes.js |
| `config` | Configuration files | Middleware config, cookie settings |

## Example Output

**Finding 1**
- **Endpoint**: `POST /api/transfer`
- **Issue**: Endpoint is decorated with `@csrf_exempt` but accepts cookie authentication
- **Exploit scenario**: Attacker hosts a page with a form that POSTs to `/api/transfer` with the victim's session cookie
- **Fix**: Remove `@csrf_exempt` and include CSRF token in the request header:
```javascript
fetch('/api/transfer', {
    method: 'POST',
    headers: {'X-CSRFToken': getCookie('csrftoken')},
    body: JSON.stringify(data)
})
```

## Variations

1. **SPA-focused** — For single-page applications, focus on how the CSRF token is obtained (dedicated endpoint vs. cookie) and included in API calls.
2. **Cookie-only audit** — Focus exclusively on cookie attributes (SameSite, Secure, HttpOnly, Domain, Path) for all cookies set by the application.
3. **OAuth integration** — Check that OAuth state parameters are properly validated to prevent CSRF on login flows.

## Best Model

Claude Sonnet 4.6 is sufficient for single-framework audits. The prompt works best when you include both the route definitions and the middleware configuration.
