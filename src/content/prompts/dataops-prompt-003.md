---
title: "SQL Query Optimization Review Prompt"
description: "A prompt template that analyzes a slow SQL query and its execution plan, producing a prioritized list of optimization recommendations with rewritten queries."
category: prompts
tags: ["sql", "query-optimization", "performance-tuning", "execution-plans"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Getting actionable optimization advice requires providing context about the query, the schema, and the execution plan. This prompt structures all the necessary inputs to generate specific, prioritized recommendations.

## Prompt

```
Analyze the following slow SQL query and provide optimization recommendations.

Database engine: {{database_engine}}
Query:
{{query}}

Table schemas and row counts:
{{table_schemas}}

Existing indexes:
{{existing_indexes}}

Execution plan (if available):
{{execution_plan}}

Current execution time: {{execution_time}}
Target execution time: {{target_time}}

Analyze and provide:
1. ROOT CAUSE: Identify the primary reason the query is slow
2. QUICK WINS: Changes that can be made without schema modifications (query rewrites, hint adjustments)
3. INDEX RECOMMENDATIONS: Specific CREATE INDEX statements with rationale
4. REWRITTEN QUERY: The optimized version of the query
5. ESTIMATED IMPROVEMENT: Expected speedup for each recommendation
6. TRADE-OFFS: Write overhead, storage impact, or maintenance burden of each change

Rank recommendations by impact-to-effort ratio (highest first).
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `database_engine` | Target database engine | `postgresql` |
| `query` | The slow SQL query | `SELECT ... FROM orders JOIN ...` |
| `table_schemas` | CREATE TABLE statements with row counts | `orders (50M rows): order_id BIGINT PK, customer_id INT, ...` |
| `existing_indexes` | Current index definitions | `idx_orders_customer_id ON orders(customer_id)` |
| `execution_plan` | EXPLAIN ANALYZE output | `Seq Scan on orders (cost=0.00..1234567.89 ...)` |
| `execution_time` | Current query runtime | `45 seconds` |
| `target_time` | Desired query runtime | `under 2 seconds` |

## Example Output

**ROOT CAUSE**: The query applies `YEAR(created_at) = 2025` which wraps the indexed column in a function, preventing index usage. Combined with `SELECT *` fetching all columns, the engine performs a full table scan on 50M rows.

**QUICK WINS**:
1. Replace `YEAR(created_at) = 2025` with `created_at >= '2025-01-01' AND created_at < '2026-01-01'` — makes the predicate sargable
2. Replace `SELECT *` with only the needed columns

**INDEX RECOMMENDATIONS**:
```sql
CREATE INDEX CONCURRENTLY idx_orders_status_created
ON orders (status, created_at DESC)
WHERE status = 'shipped';
```

**ESTIMATED IMPROVEMENT**: From 45s to ~200ms (full scan eliminated, partial index covers the filter).

## Variations

1. **Batch query audit** — Provide multiple queries and ask for a unified index strategy that covers all of them with minimal index count.
2. **Comparison analysis** — Provide two versions of a query and ask which performs better and why, useful for validating refactoring.
3. **Engine migration review** — Provide a query optimized for one engine and ask for the equivalent optimization on a different engine.

## Best Model

Claude Opus 4.6 is recommended for execution plan analysis and complex multi-table optimization. Claude Sonnet 4.6 handles straightforward single-table optimizations well.
