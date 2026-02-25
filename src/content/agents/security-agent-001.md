---
title: "SQL Injection Detection Agent"
description: "An AI agent that analyzes source code to identify SQL injection vulnerabilities and suggests parameterized query replacements."
category: agents
tags: ["sql-injection", "owasp", "code-analysis", "security"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# SQL Injection Detection Agent

This agent scans application source code to detect SQL injection vulnerabilities, one of the most critical items on the OWASP Top 10 list. It identifies unsafe string concatenation in database queries, recommends parameterized alternatives, and explains the risk context for each finding.

## System Prompt

```text
You are a SQL injection detection specialist. Your task is to analyze source code and identify SQL injection vulnerabilities.

## Detection Rules
1. Flag any SQL query built with string concatenation or f-strings using user input
2. Flag any use of raw SQL without parameterized placeholders
3. Flag ORM methods that accept raw SQL fragments (e.g., .extra(), .raw() in Django)
4. Identify tainted data sources: request parameters, form fields, headers, cookies, URL path segments
5. Check for proper use of prepared statements in JDBC, PDO, pg, mysql2, and similar libraries

## Output Format
For each finding, provide:
- FILE and LINE number
- SEVERITY: Critical, High, Medium
- VULNERABLE CODE snippet
- EXPLANATION of how the injection could be exploited
- REMEDIATION with corrected parameterized code

## Rules
- Only report actual vulnerabilities, not false positives
- Consider the framework's built-in protections (e.g., Django ORM is safe by default)
- If a value is validated or cast to int before use, it is NOT vulnerable
- Always provide working remediation code in the same language as the source
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

source_code = open("app/routes/users.py").read()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""You are a SQL injection detection specialist. Analyze source code to identify SQL injection vulnerabilities.
Flag queries built with string concatenation, raw SQL without parameterized placeholders, and ORM raw methods.
For each finding provide FILE, LINE, SEVERITY, VULNERABLE CODE, EXPLANATION, and REMEDIATION.""",
    messages=[{"role": "user", "content": f"Analyze this code for SQL injection vulnerabilities:\n\n```python\n{source_code}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `severity_threshold` | Minimum severity to report | `Medium` |
| `frameworks` | Target frameworks to consider | `auto-detect` |
| `include_tests` | Whether to scan test files | `false` |
| `max_file_size` | Skip files larger than this | `100KB` |

## Use Cases

1. **Pre-commit hook** — Run the agent on staged files to catch SQL injection before code reaches the repository.
2. **CI/CD pipeline gate** — Integrate as a GitHub Action that blocks merges when Critical findings exist.
3. **Legacy codebase audit** — Scan an entire legacy application to produce a prioritized remediation backlog.
4. **Developer training** — Use the agent's explanations to teach junior developers about injection risks.

## Common Pitfalls

1. **Ignoring ORM raw methods** — Developers assume ORMs are always safe, but methods like Django's `.raw()` or SQLAlchemy's `text()` can still introduce injection if misused.
2. **Trusting server-side variables** — Values from HTTP headers or cookies are attacker-controlled even though they do not come from form fields.
3. **Stored procedure false safety** — Calling a stored procedure with concatenated input is still injectable; the parameterization must happen at the call site.
