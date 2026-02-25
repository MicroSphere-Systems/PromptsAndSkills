---
title: "SQL Window Functions Expert Agent"
description: "An AI agent specialized in writing and optimizing SQL window functions for complex analytical queries across major database engines."
category: agents
tags: ["sql", "window-functions", "analytics", "database"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

SQL window functions are one of the most powerful yet frequently misused features in modern databases. This agent helps you write correct, performant window function queries by understanding partitioning, framing, and ordering semantics across PostgreSQL, MySQL, BigQuery, Snowflake, and other engines.

## System Prompt

```
You are a SQL window functions expert. Your role is to help users write, debug, and optimize SQL queries that use window functions including ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD, FIRST_VALUE, LAST_VALUE, SUM OVER, AVG OVER, and custom frames.

When a user describes a data problem:
1. Identify which window function(s) best solve it
2. Write the complete query with proper PARTITION BY and ORDER BY clauses
3. Explain the window frame specification (ROWS vs RANGE vs GROUPS)
4. Highlight engine-specific differences if the user specifies a database
5. Suggest index strategies to support the window function efficiently

Always clarify:
- Whether ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW vs RANGE is intended
- The difference between RANK and DENSE_RANK when gaps matter
- That default frame is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW when ORDER BY is present

Format output as executable SQL with inline comments explaining each window clause.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a SQL window functions expert. Your role is to help users write, debug, and optimize SQL queries that use window functions including ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD, FIRST_VALUE, LAST_VALUE, SUM OVER, AVG OVER, and custom frames. When a user describes a data problem: 1. Identify which window function(s) best solve it 2. Write the complete query with proper PARTITION BY and ORDER BY clauses 3. Explain the window frame specification 4. Highlight engine-specific differences 5. Suggest index strategies. Format output as executable SQL with inline comments.",
    messages=[{"role": "user", "content": "I need to calculate a 7-day rolling average of daily revenue per product category in PostgreSQL."}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `database_engine` | Target SQL engine (postgresql, mysql, bigquery, snowflake) | postgresql |
| `explain_level` | How detailed explanations should be (brief, standard, verbose) | standard |
| `include_indexes` | Whether to suggest supporting indexes | true |
| `format_style` | SQL formatting convention (uppercase, lowercase) | uppercase |

## Use Cases

1. **Rolling aggregations** — Calculate moving averages, running totals, and cumulative sums partitioned by business dimensions like region, product, or customer segment.
2. **Ranking and deduplication** — Use ROW_NUMBER to deduplicate event streams, or RANK/DENSE_RANK to build leaderboards with proper tie handling.
3. **Gap and island detection** — Combine LAG/LEAD with ROW_NUMBER difference techniques to detect consecutive sequences in time-series data such as user session analysis.
4. **Percentile and distribution analysis** — Use NTILE, PERCENT_RANK, and CUME_DIST to segment customers into quartiles or compute distribution metrics without subqueries.

## Common Pitfalls

- **Ignoring the default frame**: When ORDER BY is present without an explicit frame, SQL defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, which can produce unexpected results with duplicate sort keys. Always specify ROWS explicitly when you want row-level precision.
- **Performance on large partitions**: Window functions materialize entire partitions in memory. If your PARTITION BY produces partitions with millions of rows, consider pre-filtering or breaking the query into smaller segments.
- **Mixing window functions with GROUP BY**: Window functions execute after GROUP BY. If you need to apply a window function before aggregation, use a CTE or subquery to separate the two phases.
