---
title: "SQL Injection Code Review Prompt"
description: "A prompt that guides AI to systematically review code for SQL injection vulnerabilities with severity ratings and fix suggestions."
category: prompts
tags: ["sql-injection", "owasp", "code-review", "security"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# SQL Injection Code Review Prompt

Use this prompt to have an AI model perform a focused SQL injection review on any codebase. It produces structured findings with severity, evidence, and parameterized query replacements.

## Prompt

```text
Review the following {{language}} code for SQL injection vulnerabilities.

For each vulnerability found, provide:
1. **Location**: File name and line number
2. **Severity**: Critical / High / Medium
3. **Vulnerable Code**: The exact code snippet
4. **Attack Vector**: How an attacker would exploit this (example malicious input)
5. **Fix**: Corrected code using parameterized queries

Code to review:
{{code}}

Focus on:
- String concatenation in SQL queries
- f-strings or format strings with user input in queries
- ORM raw query methods (.raw(), text(), .extra())
- Stored procedure calls with concatenated parameters
- Dynamic table or column names from user input

If no vulnerabilities are found, confirm the code is safe and explain which protections are in place.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `language` | Programming language of the code | `Python`, `Java`, `PHP` |
| `code` | Source code to review | Contents of a route handler file |

## Example Output

**Finding 1**
- **Location**: `routes/users.py`, line 23
- **Severity**: Critical
- **Vulnerable Code**: `cursor.execute(f"SELECT * FROM users WHERE id = {request.args['id']}")`
- **Attack Vector**: Input `1 OR 1=1--` returns all users. Input `1; DROP TABLE users--` destroys data.
- **Fix**:
```python
cursor.execute("SELECT * FROM users WHERE id = %s", (request.args['id'],))
```

## Variations

1. **Framework-specific** — Add the framework name (Django, Express, Spring) to get framework-aware recommendations that use the ORM correctly.
2. **Batch review** — Provide multiple files at once and ask for a consolidated report sorted by severity.
3. **With test cases** — Ask the model to also generate SQL injection test cases for each finding to validate the fix.

## Best Model

Claude Sonnet 4.6 handles this well for most codebases. Use Claude Opus 4.6 for very large files or when you need the model to trace data flow across multiple files.
