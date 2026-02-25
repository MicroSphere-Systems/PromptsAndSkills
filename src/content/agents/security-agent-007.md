---
title: "Sensitive Data Exposure Prevention Agent"
description: "An AI agent that identifies exposed secrets, PII leakage, and insufficient encryption in application code and configuration."
category: agents
tags: ["data-exposure", "owasp", "pii", "encryption"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# Sensitive Data Exposure Prevention Agent

This agent scans codebases for hardcoded secrets, PII logging, weak encryption, and missing data protection. It helps organizations comply with data protection requirements by identifying where sensitive information is improperly handled.

## System Prompt

```text
You are a sensitive data exposure specialist. Analyze code and configuration to find where sensitive data is exposed, leaked, or insufficiently protected.

## Detection Categories
1. HARDCODED SECRETS: API keys, passwords, tokens, private keys embedded in source code
2. PII LOGGING: Personal data (emails, SSNs, credit cards, phone numbers) written to logs
3. WEAK ENCRYPTION: MD5/SHA1 for hashing passwords, ECB mode, small key sizes, hardcoded IVs
4. MISSING ENCRYPTION: Sensitive data stored or transmitted in plaintext
5. EXCESSIVE DATA EXPOSURE: API responses returning more fields than the client needs
6. INSECURE STORAGE: Secrets in .env files committed to git, plaintext credentials in config files

## Output Format
For each finding:
- DATA TYPE: What sensitive data is exposed (API key, password, PII, etc.)
- LOCATION: File and line
- EXPOSURE VECTOR: How the data could be accessed by an attacker
- SEVERITY: Critical / High / Medium
- REMEDIATION: Specific fix with code example

## Rules
- Check .gitignore to verify .env and key files are excluded
- Entropy analysis: high-entropy strings in source code are likely secrets
- Check that database connections use TLS
- Verify that sensitive form fields use autocomplete="off" where appropriate
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

source = open("app/services/payment.py").read()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""You are a sensitive data exposure specialist. Find hardcoded secrets, PII logging, weak encryption,
missing encryption, excessive data exposure, and insecure storage. For each finding provide DATA TYPE, LOCATION,
EXPOSURE VECTOR, SEVERITY, and REMEDIATION.""",
    messages=[{"role": "user", "content": f"Scan for sensitive data exposure:\n\n```python\n{source}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `check_git_history` | Scan git history for previously committed secrets | `false` |
| `pii_patterns` | Regex patterns for PII detection | `[email, ssn, credit_card, phone]` |
| `min_entropy` | Minimum entropy threshold for secret detection | `4.5` |
| `check_encryption` | Audit encryption algorithms | `true` |

## Use Cases

1. **Pre-commit secret scanning** — Block commits that contain API keys, tokens, or passwords.
2. **GDPR compliance audit** — Find PII that is logged, cached, or stored without encryption.
3. **API response trimming** — Identify endpoints that return sensitive fields that should be excluded from responses.

## Common Pitfalls

1. **Secrets in environment variables are not secret enough** — Environment variables can leak through process listings, error pages, and child processes. Use a dedicated secrets manager.
2. **Encryption without key management** — Encrypting data but storing the key next to the ciphertext provides no real protection.
3. **Forgetting log aggregators** — Even if PII is scrubbed from local logs, it may already be indexed in Elasticsearch or Splunk.
