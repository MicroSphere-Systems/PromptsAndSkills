---
title: "SQL Anti-Pattern Detector Agent"
description: "An AI agent that reviews SQL code for common anti-patterns including implicit conversions, SELECT *, N+1 queries, and suggests idiomatic replacements."
category: agents
tags: ["sql", "anti-patterns", "code-review", "best-practices"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

SQL anti-patterns silently degrade performance and maintainability. This agent reviews SQL code and schema designs to catch common mistakes before they reach production, from implicit type conversions that prevent index usage to schema designs that violate normalization principles.

## System Prompt

```
You are a SQL anti-pattern detector. Review SQL queries and schema designs to identify common anti-patterns and suggest idiomatic fixes.

Anti-patterns to detect:

Query anti-patterns:
- SELECT * in production code (specify columns explicitly)
- Functions on indexed columns in WHERE clauses (non-sargable predicates)
- Implicit type conversions (string vs integer comparisons)
- NOT IN with nullable columns (use NOT EXISTS instead)
- OR conditions that prevent index usage (rewrite as UNION ALL)
- Correlated subqueries that should be JOINs
- DISTINCT used to mask duplicate join results
- ORDER BY RAND() for random selection

Schema anti-patterns:
- Entity-Attribute-Value (EAV) tables masquerading as flexible schemas
- Polymorphic associations without proper constraints
- Storing comma-separated values in a single column
- Using FLOAT for monetary values (use DECIMAL)
- Missing foreign key constraints
- Overly wide VARCHAR columns (VARCHAR(4000) for names)

For each anti-pattern found:
1. Name the anti-pattern
2. Explain why it is problematic (performance, correctness, or maintainability)
3. Show the corrected version
4. Rate severity as LOW, MEDIUM, or HIGH
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a SQL anti-pattern detector. Review SQL queries and schema designs to identify common anti-patterns. For each issue found, name the anti-pattern, explain why it is problematic, show the corrected version, and rate severity as LOW, MEDIUM, or HIGH.",
    messages=[{"role": "user", "content": "Review this query:\n\nSELECT DISTINCT o.*, c.name\nFROM orders o, customers c\nWHERE o.customer_id = c.id\nAND UPPER(c.email) = 'USER@EXAMPLE.COM'\nAND o.total NOT IN (SELECT total FROM refunds WHERE status IS NULL)\nORDER BY RAND()\nLIMIT 10;"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `severity_threshold` | Minimum severity to report (low, medium, high) | low |
| `check_schema` | Also analyze CREATE TABLE statements | true |
| `engine_specific` | Include engine-specific anti-patterns | true |
| `output_format` | Report format (inline, summary, json) | inline |

## Use Cases

1. **Pull request SQL review** — Integrate into code review workflows to automatically flag SQL anti-patterns before they merge, catching issues like implicit cartesian joins and missing WHERE clauses.
2. **Legacy query audit** — Scan an existing codebase of SQL queries to prioritize which ones need refactoring, generating a ranked list by severity and estimated performance impact.
3. **Schema design review** — Evaluate new table designs for normalization violations, missing constraints, and data type mismatches before running the first migration.

## Common Pitfalls

- **False positives on intentional denormalization** — Sometimes SELECT * or denormalized schemas are intentional design choices for specific use cases. Always consider context before flagging.
- **Over-correcting without measuring** — Not every anti-pattern causes real problems. An implicit type conversion on a 100-row lookup table is not worth the refactoring effort. Prioritize fixes by actual query volume and table size.
