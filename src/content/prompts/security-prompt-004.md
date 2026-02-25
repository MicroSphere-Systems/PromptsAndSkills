---
title: "Authentication Security Review Prompt"
description: "A prompt for auditing authentication implementations covering password policies, session management, brute force protection, and MFA."
category: prompts
tags: ["authentication", "owasp", "passwords", "session-management"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# Authentication Security Review Prompt

This prompt produces a comprehensive authentication audit covering credential storage, session management, brute force protection, password reset flows, and multi-factor authentication.

## Prompt

```text
Perform a security audit of this authentication implementation.

Review each area and rate it as PASS, FAIL, or NEEDS IMPROVEMENT:

## Password Policy
- Minimum length (should be >= 8, recommended >= 12)
- Maximum length (should be >= 64)
- Checked against breached password lists (e.g., HaveIBeenPwned)
- No composition rules that reduce entropy (e.g., requiring special characters)

## Credential Storage
- Algorithm: Must be bcrypt, scrypt, or argon2id (not MD5, SHA-1, SHA-256, or plain SHA-512)
- Cost factor: bcrypt >= 12 rounds, argon2id >= 3 iterations with 64MB memory

## Session Management
- Session ID randomness: >= 128 bits from CSPRNG
- Regenerated on authentication state change (login, privilege elevation)
- Cookie flags: HttpOnly, Secure, SameSite
- Absolute and idle timeout configured

## Brute Force Protection
- Rate limiting on login endpoint
- Account lockout or progressive delay after N failures
- No user enumeration through different error messages

## Password Reset
- Tokens are random, >= 128 bits, single-use, and expire within 1 hour
- Reset does not reveal whether account exists
- Old password is not sent via email

## MFA
- Available and encouraged for all users
- Recovery codes are provided
- MFA cannot be bypassed via password reset or API tokens

Authentication code:
{{auth_code}}

Configuration:
{{auth_config}}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `auth_code` | Authentication implementation code | Login handler, password reset, session management |
| `auth_config` | Auth configuration | Password policy settings, session config |

## Example Output

| Area | Rating | Notes |
|------|--------|-------|
| Password Policy | NEEDS IMPROVEMENT | Min length is 8 (acceptable) but no breached password check |
| Credential Storage | PASS | Using argon2id with time_cost=3, memory_cost=65536 |
| Session Management | FAIL | Session ID not regenerated on login |
| Brute Force Protection | FAIL | No rate limiting on /login endpoint |
| Password Reset | NEEDS IMPROVEMENT | Tokens expire in 24h (should be 1h) |
| MFA | FAIL | Not implemented |

## Variations

1. **NIST 800-63B compliance** — Ask the model to evaluate against specific NIST Digital Identity Guidelines sections.
2. **OAuth/OIDC focus** — Replace the standard auth checks with OAuth2 flow validation, token lifetime checks, and PKCE verification.
3. **API authentication** — Focus on API key management, JWT validation, token rotation, and scope enforcement.

## Best Model

Use Claude Opus 4.6 for thorough audits that need to trace authentication logic across multiple files and understand framework-specific auth patterns.
