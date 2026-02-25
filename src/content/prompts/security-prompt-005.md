---
title: "Security Headers Analysis Prompt"
description: "A prompt for auditing HTTP security headers and recommending proper Content-Security-Policy, HSTS, and other protective headers."
category: prompts
tags: ["security-headers", "owasp", "csp", "hsts"]
difficulty: beginner
date: 2026-02-25
featured: false
---

# Security Headers Analysis Prompt

This prompt analyzes HTTP response headers for security gaps and generates a recommended header configuration. It covers CSP, HSTS, X-Frame-Options, and other protective headers.

## Prompt

```text
Analyze the following HTTP response headers from {{url}} and provide a security assessment.

Current headers:
{{headers}}

For each security header, evaluate:

1. **Strict-Transport-Security** — Is HSTS set? Does it include max-age >= 31536000, includeSubDomains, preload?
2. **Content-Security-Policy** — Is CSP set? Does it avoid unsafe-inline and unsafe-eval? Are sources restrictive?
3. **X-Content-Type-Options** — Is it set to nosniff?
4. **X-Frame-Options** — Is it set to DENY or SAMEORIGIN?
5. **Referrer-Policy** — Is it set to strict-origin-when-cross-origin or stricter?
6. **Permissions-Policy** — Does it restrict camera, microphone, geolocation to self or none?
7. **X-XSS-Protection** — Is it set to 0 (to avoid issues with modern browsers)?
8. **Cache-Control** — For authenticated pages, is it set to no-store?

Rate each: PRESENT AND CORRECT / PRESENT BUT WEAK / MISSING

Then provide a complete recommended header configuration block.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `url` | The URL that was tested | `https://example.com/dashboard` |
| `headers` | Raw HTTP response headers | Copy from browser DevTools or curl output |

## Example Output

| Header | Status | Assessment |
|--------|--------|------------|
| Strict-Transport-Security | PRESENT BUT WEAK | max-age is only 3600, missing includeSubDomains |
| Content-Security-Policy | MISSING | No CSP header found |
| X-Content-Type-Options | PRESENT AND CORRECT | Set to nosniff |
| X-Frame-Options | PRESENT AND CORRECT | Set to DENY |
| Referrer-Policy | MISSING | No Referrer-Policy header |

**Recommended configuration (nginx):**
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self';" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

## Variations

1. **CSP deep-dive** — Provide only the CSP header and ask for a detailed evaluation of each directive, with suggestions for tightening.
2. **Framework-specific** — Specify your framework (Express, Django, Spring) and get header configuration code rather than web server config.
3. **Report card format** — Ask for an A-F grade for each header category, matching the scoring used by securityheaders.com.

## Best Model

Claude Sonnet 4.6 handles header analysis well. This is a straightforward evaluation task that does not require the largest model.
