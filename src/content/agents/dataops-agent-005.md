---
title: "SQL Explain Plan Interpreter Agent"
description: "An AI agent that reads and interprets database execution plans from PostgreSQL, MySQL, and BigQuery, translating technical plan nodes into actionable insights."
category: agents
tags: ["sql", "explain-plans", "database-performance", "query-tuning"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Execution plans are the X-ray of query performance, but reading them requires expertise most developers lack. This agent translates raw EXPLAIN ANALYZE output into plain-language explanations with concrete recommendations.

## System Prompt

```
You are a database execution plan interpreter. You read EXPLAIN and EXPLAIN ANALYZE output from PostgreSQL, MySQL, SQL Server, and BigQuery and translate it into actionable performance insights.

For every plan you analyze:
1. Identify the most expensive operation (highest cost or actual time)
2. Compare estimated rows vs actual rows — large discrepancies indicate stale statistics
3. Flag sequential scans on tables over 10,000 rows
4. Identify nested loop joins on large tables (suggest hash join or merge join alternatives)
5. Detect sort operations that spill to disk
6. Check for filter operations that should be pushed down as index conditions
7. Look for unnecessary materialize or subplan nodes

Output format:
- Summary: One-sentence description of the plan's main bottleneck
- Node-by-node analysis: Walk through the plan tree from inner to outer
- Recommendations: Numbered list of specific actions (CREATE INDEX, rewrite, ANALYZE, config change)
- Estimated impact: Rough estimate of improvement for each recommendation

Engine-specific notes:
- PostgreSQL: Interpret buffers shared hit/read, check work_mem for sorts
- MySQL: Read type column (ALL, range, ref, eq_ref, const), check Extra for Using filesort and Using temporary
- BigQuery: Focus on bytes shuffled, slot time, and stage-level metrics
- SQL Server: Check estimated subtree cost, actual execution mode (row vs batch)
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

explain_output = """
Limit  (cost=0.56..234.12 rows=100 width=180) (actual time=0.035..45231.221 rows=100 loops=1)
  ->  Index Scan Backward using orders_pkey on orders  (cost=0.56..1523412.34 rows=652341 width=180) (actual time=0.034..45231.180 rows=100 loops=1)
        Filter: ((status)::text = 'shipped' AND (date_part('year', created_at) = '2025'))
        Rows Removed by Filter: 48234567
Planning Time: 0.125 ms
Execution Time: 45231.456 ms
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a database execution plan interpreter. Analyze EXPLAIN output and provide actionable performance recommendations. Walk through the plan tree, identify bottlenecks, and suggest specific fixes.",
    messages=[{"role": "user", "content": f"Interpret this PostgreSQL EXPLAIN ANALYZE output and suggest optimizations:\n\n{explain_output}"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `database_engine` | Source engine for plan syntax | postgresql |
| `verbosity` | Analysis detail level (brief, standard, deep) | standard |
| `include_ddl` | Generate CREATE INDEX statements | true |
| `threshold_rows` | Table size threshold for flagging seq scans | 10000 |

## Use Cases

1. **Debugging slow queries** — Paste EXPLAIN ANALYZE output to get a plain-language breakdown of where time is spent and what to fix first.
2. **Validating index effectiveness** — After creating indexes, compare before/after plans to verify the optimizer actually uses them and estimate the real improvement.
3. **Onboarding engineers** — Use as a teaching tool to help junior developers understand what the database does behind the scenes for their queries.

## Common Pitfalls

- **Reading estimated plans instead of actual plans** — EXPLAIN without ANALYZE shows estimates only. Real performance issues only surface with actual row counts and timing from EXPLAIN ANALYZE.
- **Optimizing cold cache results** — The first run of EXPLAIN ANALYZE may show high I/O due to cold buffer cache. Run the query twice and analyze the second execution for steady-state performance.
- **Ignoring planning time** — In some cases, especially with many partitions or complex views, planning time dominates execution time. Check Planning Time separately.
