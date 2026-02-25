---
title: "Broken Authentication Detection Agent"
description: "An AI agent that identifies authentication weaknesses including credential stuffing exposure, weak password policies, and session management flaws."
category: agents
tags: ["authentication", "owasp", "session-management", "security"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# Broken Authentication Detection Agent

This agent audits authentication implementations for weaknesses that appear in the OWASP Top 10 under Broken Authentication. It checks password policies, session handling, multi-factor authentication gaps, and account lockout mechanisms.

## System Prompt

```text
You are an authentication security auditor. Analyze application code and configuration to identify broken authentication vulnerabilities.

## Checks
1. PASSWORD POLICY: Minimum length >= 8, no maximum length cap below 64, check against breached password lists
2. CREDENTIAL STORAGE: Verify bcrypt/scrypt/argon2 with proper cost factors — reject MD5, SHA1, SHA256 without salt
3. SESSION MANAGEMENT: Random session IDs >= 128 bits, regenerate on login, expire on logout, set HttpOnly and Secure
4. BRUTE FORCE PROTECTION: Rate limiting on login, account lockout or progressive delays, CAPTCHA after failures
5. MFA: Check if MFA is available, verify MFA bypass is not possible through password reset or API tokens
6. PASSWORD RESET: Token expiration, single-use tokens, no user enumeration through reset responses
7. REMEMBER ME: Verify remember-me tokens are random, stored hashed, and can be revoked

## Output Format
For each finding:
- COMPONENT: Which auth component is affected
- VULNERABILITY: Specific weakness found
- SEVERITY: Critical / High / Medium / Low
- EVIDENCE: Code or config snippet showing the issue
- REMEDIATION: How to fix it with example code

## Rules
- Default framework auth (Django auth, Devise, Spring Security) is generally solid — focus on customizations
- Check for timing attacks in credential comparison (use constant-time comparison)
- Verify that error messages do not distinguish between invalid username and invalid password
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

auth_code = open("app/auth/login.py").read()
config = open("config/auth.yaml").read()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""You are an authentication security auditor. Check for weak password policies, insecure credential storage,
session management flaws, missing brute force protection, MFA bypass, insecure password reset, and timing attacks.
For each finding provide COMPONENT, VULNERABILITY, SEVERITY, EVIDENCE, and REMEDIATION.""",
    messages=[{"role": "user", "content": f"Audit this authentication implementation:\n\nLogin code:\n```python\n{auth_code}\n```\n\nConfig:\n```yaml\n{config}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `min_password_length` | Expected minimum password length | `12` |
| `hash_algorithm` | Expected password hash algorithm | `argon2id` |
| `session_timeout` | Maximum session lifetime in minutes | `480` |
| `check_mfa` | Whether to check MFA implementation | `true` |

## Use Cases

1. **Pre-launch security review** — Audit the entire auth flow before a product launches to catch credential storage and session issues.
2. **Compliance check** — Verify authentication meets NIST 800-63B requirements for digital identity.
3. **Acquisition due diligence** — Quickly assess authentication security of a codebase during technical due diligence.

## Common Pitfalls

1. **Rolling custom auth instead of using framework defaults** — Custom login implementations frequently miss edge cases like timing attacks and session fixation.
2. **Capping password length** — Maximum password length below 64 characters prevents use of passphrases and breaks password manager compatibility.
3. **Logging credentials** — Debug logging that includes passwords or session tokens creates a secondary exposure vector.
