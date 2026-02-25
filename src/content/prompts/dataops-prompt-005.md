---
title: "EXPLAIN Plan Analysis Prompt"
description: "A prompt template that interprets database execution plans and produces plain-language explanations with specific optimization actions."
category: prompts
tags: ["sql", "explain-plans", "performance", "database-tuning"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Raw execution plans are dense with technical nodes and cost estimates that are hard to interpret. This prompt transforms plan output into a clear narrative with actionable recommendations.

## Prompt

```
Interpret the following database execution plan and provide actionable optimization advice.

Database engine: {{database_engine}}
Original query:
{{query}}

Execution plan output:
{{explain_output}}

Table sizes:
{{table_sizes}}

Analysis requirements:
1. PLAN SUMMARY: One paragraph describing what the query plan does in plain language
2. BOTTLENECK IDENTIFICATION: The single most expensive operation and why it is expensive
3. ROW ESTIMATE ACCURACY: Compare estimated vs actual rows for each node — flag any where actual > 10x estimated
4. SCAN ANALYSIS: For each table access, note if it is a sequential scan, index scan, or index-only scan, and whether the scan type is appropriate
5. JOIN ANALYSIS: For each join, note the algorithm (nested loop, hash, merge) and whether it is appropriate for the data sizes
6. MEMORY AND DISK: Identify any operations that spill to disk (sort, hash) and suggest configuration changes
7. RECOMMENDATIONS: Numbered list ordered by expected impact:
   - Index suggestions with CREATE INDEX DDL
   - Query rewrites
   - Configuration changes (work_mem, effective_cache_size)
   - Statistics updates (ANALYZE on specific tables)
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `database_engine` | Source database for plan format | `postgresql` |
| `query` | The original SQL query | `SELECT ... FROM orders JOIN customers ...` |
| `explain_output` | Full EXPLAIN ANALYZE output | Multi-line plan text |
| `table_sizes` | Approximate row counts per table | `orders: 50M, customers: 2M, products: 50K` |

## Example Output

**PLAN SUMMARY**: The query performs a sequential scan on the 50M-row orders table, filtering 99.8% of rows by date range and status. The surviving 100K rows are hash-joined to the customers table using an index scan. The final sort for ORDER BY spills to disk due to insufficient work_mem.

**BOTTLENECK**: Sequential scan on `orders` (actual time: 42s of 45s total). The `YEAR(created_at)` filter prevents index usage despite an existing index on `created_at`.

**ROW ESTIMATE ACCURACY**: The planner estimated 5M matching rows but only 100K actually matched (50x overestimate), suggesting stale statistics on the `status` column.

**RECOMMENDATIONS**:
1. Rewrite WHERE clause to be sargable: `created_at >= '2025-01-01' AND created_at < '2026-01-01'`
2. Run `ANALYZE orders` to update statistics
3. Create partial index: `CREATE INDEX CONCURRENTLY idx_orders_shipped_2025 ON orders(created_at) WHERE status = 'shipped'`
4. Increase `work_mem` to 256MB for this session to prevent sort spill

## Variations

1. **Before/after comparison** — Provide two plans (before and after an optimization) and ask for verification that the change actually improved the plan.
2. **MySQL EXPLAIN format** — Adjust for MySQL's tabular EXPLAIN format with type, possible_keys, key, rows, and Extra columns.
3. **BigQuery execution details** — Analyze BigQuery job statistics including bytes processed, slot time, and shuffle bytes.

## Best Model

Claude Opus 4.6 is strongly recommended for execution plan interpretation. The analysis requires understanding plan tree structure, cost model semantics, and engine-specific optimization rules that benefit from the most capable model.
