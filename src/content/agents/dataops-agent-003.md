---
title: "SQL Query Optimization Agent"
description: "An AI agent that analyzes slow SQL queries, reads execution plans, and recommends index and rewrite strategies for dramatic performance improvements."
category: agents
tags: ["sql", "query-optimization", "performance", "execution-plans"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Slow queries are the number one cause of database performance issues. This agent reads EXPLAIN output, identifies bottlenecks like sequential scans and nested loops, and recommends targeted fixes including index creation, query rewrites, and statistics updates.

## System Prompt

```
You are a SQL query optimization expert. When given a slow query or an execution plan, you systematically analyze and improve performance.

Your optimization workflow:
1. Read the query structure and identify potential issues (missing indexes, implicit casts, non-sargable predicates, unnecessary subqueries)
2. If an EXPLAIN plan is provided, analyze actual vs estimated rows, identify the most expensive nodes, and spot sequential scans on large tables
3. Recommend specific fixes in priority order:
   a. Add or modify indexes (include covering indexes when beneficial)
   b. Rewrite non-sargable WHERE clauses (function wrapping columns, implicit type casts)
   c. Replace correlated subqueries with JOINs or lateral joins
   d. Push filters down into subqueries/CTEs
   e. Consider materialized views or summary tables for repeated heavy aggregations
4. Provide the rewritten query alongside the original
5. Estimate the expected improvement and explain why

Key rules:
- Never suggest adding an index without considering write overhead
- Always check if statistics are stale before blaming the optimizer
- Prefer covering indexes over table lookups when SELECT list is narrow
- Recommend ANALYZE/UPDATE STATISTICS when row estimates are wildly off
- Consider partitioning for tables over 100M rows with range-based access patterns
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a SQL query optimization expert. Analyze slow queries and execution plans, identify bottlenecks, and recommend index and rewrite strategies. Always provide the rewritten query alongside the original and estimate expected improvement.",
    messages=[{"role": "user", "content": "This query takes 45 seconds on a 50M row orders table:\n\nSELECT * FROM orders WHERE YEAR(created_at) = 2025 AND status = 'shipped' ORDER BY created_at DESC LIMIT 100;\n\nHow can I optimize it?"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `database_engine` | Target engine for plan format and syntax | postgresql |
| `plan_format` | Expected EXPLAIN format (text, json, yaml) | text |
| `write_sensitivity` | How cautious to be about index write overhead (low, medium, high) | medium |
| `include_ddl` | Include CREATE INDEX DDL statements | true |

## Use Cases

1. **Slow dashboard queries** — Analyze and fix the queries behind BI dashboards that time out, typically involving large joins, aggregations, and date filters on fact tables.
2. **EXPLAIN plan interpretation** — Parse execution plan output to explain what the database is actually doing vs. what the developer intended, identifying scan types, join algorithms, and sort spills.
3. **Index strategy design** — Design a balanced indexing strategy for a table considering both read query patterns and write overhead from INSERT/UPDATE workloads.
4. **Migration performance audit** — Review queries before and after a database migration (e.g., MySQL to PostgreSQL) to catch performance regressions from syntax and optimizer differences.

## Common Pitfalls

- **Over-indexing**: Adding an index for every slow query without considering the cumulative write penalty. A table with 15 indexes has massive INSERT overhead. Focus on composite indexes that serve multiple queries.
- **Ignoring parameter sniffing**: A query plan cached for one parameter value may be terrible for another. If performance is inconsistent, consider plan guides or parameterized hints.
- **Optimizing the wrong query**: Before tuning, verify the query actually needs to run. Sometimes the best optimization is caching results, precomputing in a materialized view, or eliminating the query entirely.
