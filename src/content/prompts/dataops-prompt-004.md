---
title: "SQL Anti-Pattern Detection Prompt"
description: "A prompt template that reviews SQL code for anti-patterns, generating a severity-ranked report with corrected alternatives for each issue found."
category: prompts
tags: ["sql", "anti-patterns", "code-review", "best-practices"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

SQL anti-patterns are subtle and easy to miss during code review. This prompt performs a structured review of SQL code, checking for performance killers, correctness bugs, and maintainability issues.

## Prompt

```
Review the following SQL code for anti-patterns and issues.

Database engine: {{database_engine}}
Context: {{context}}

SQL Code:
{{sql_code}}

Check for these categories of anti-patterns:

PERFORMANCE:
- SELECT * in application queries
- Functions on indexed columns in WHERE (non-sargable)
- Implicit type conversions
- OR conditions preventing index usage
- Correlated subqueries replaceable with JOINs
- ORDER BY RAND() or equivalent
- Missing LIMIT on unbounded queries

CORRECTNESS:
- NOT IN with nullable columns
- BETWEEN with timestamps (missing time component)
- LEFT JOIN converted to INNER JOIN by WHERE clause
- Integer division losing precision
- DISTINCT hiding duplicate join issues
- String comparison without collation awareness

MAINTAINABILITY:
- Magic numbers without comments
- Inconsistent naming conventions
- Overly complex single queries that should be broken into CTEs
- Missing table aliases in multi-table queries

For each issue found, report:
1. Line/section where the issue occurs
2. Anti-pattern name
3. Severity: HIGH (data correctness risk), MEDIUM (performance), LOW (maintainability)
4. The corrected version
5. Brief explanation of why it matters
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `database_engine` | Target SQL engine | `postgresql` |
| `context` | What the SQL does (application query, migration, report) | `E-commerce order dashboard query running every 5 minutes` |
| `sql_code` | The SQL code to review | Multi-line SQL query or procedure |

## Example Output

| # | Location | Anti-Pattern | Severity | Fix |
|---|----------|-------------|----------|-----|
| 1 | Line 3 | `SELECT *` in production query | MEDIUM | Specify only needed columns: `SELECT o.order_id, o.total, o.status` |
| 2 | Line 7 | Non-sargable predicate `UPPER(email)` | HIGH | Add a functional index or store normalized email: `WHERE email = LOWER('User@Example.com')` |
| 3 | Line 12 | `NOT IN` with nullable subquery | HIGH | Replace with `NOT EXISTS (SELECT 1 FROM refunds r WHERE r.order_id = o.order_id AND r.status IS NULL)` |
| 4 | Line 15 | `ORDER BY RAND()` on large table | MEDIUM | Use `TABLESAMPLE` or pre-select random IDs with a more efficient method |

## Variations

1. **Schema review** — Replace the SQL code with CREATE TABLE statements and check for schema-level anti-patterns like EAV tables, missing constraints, and wrong data types.
2. **Stored procedure review** — Focus on procedural anti-patterns like row-by-row processing, missing error handling, and transaction scope issues.
3. **ORM-generated SQL review** — Paste ORM-generated queries to identify N+1 patterns, unnecessary eager loading, and missing query optimization hints.

## Best Model

Claude Sonnet 4.6 excels at anti-pattern detection for standard SQL queries. Use Claude Opus 4.6 for large stored procedures or complex multi-statement reviews where understanding control flow matters.
