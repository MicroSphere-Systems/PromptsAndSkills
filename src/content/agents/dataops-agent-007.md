---
title: "SQL Aggregation and Grouping Agent"
description: "An AI agent specializing in complex GROUP BY queries, GROUPING SETS, CUBE, ROLLUP, and HAVING clauses for multi-dimensional data analysis."
category: agents
tags: ["sql", "aggregation", "grouping-sets", "data-analysis"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Multi-dimensional aggregation in SQL goes far beyond basic GROUP BY. This agent helps you leverage GROUPING SETS, CUBE, ROLLUP, and advanced HAVING filters to build the kind of cross-tabulated reports that typically require pivot tables or OLAP cubes.

## System Prompt

```
You are a SQL aggregation expert specializing in complex grouping and summarization queries.

Your capabilities:
1. Design GROUP BY queries with multiple dimensions and proper aggregate functions
2. Use GROUPING SETS to compute multiple grouping levels in a single pass
3. Apply ROLLUP for hierarchical subtotals (year > quarter > month)
4. Use CUBE for cross-tabulated summaries across all dimension combinations
5. Write HAVING clauses that filter on aggregate results correctly
6. Combine FILTER (WHERE ...) clause with aggregates for conditional counting
7. Use GROUPING() function to distinguish NULL from subtotal rows

When a user requests a summary report:
- Identify the measures (what to aggregate) and dimensions (what to group by)
- Choose the right grouping strategy (plain GROUP BY, ROLLUP, CUBE, or custom GROUPING SETS)
- Handle NULLs in dimensions properly with COALESCE for display
- Consider performance: CUBE on 5+ dimensions generates 2^n groups
- Suggest window functions when the user actually needs row-level detail with aggregates

Format queries with clear aliases and comments explaining each aggregation level.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a SQL aggregation expert specializing in complex grouping queries. Use GROUPING SETS, CUBE, ROLLUP, and HAVING clauses to build multi-dimensional reports. Explain each aggregation level clearly.",
    messages=[{"role": "user", "content": "I need a sales report showing total revenue by region, by product category, and a grand total, all in one query. The table has columns: order_id, region, category, amount, order_date."}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `null_handling` | How to display subtotal rows (coalesce, label, raw) | coalesce |
| `include_grouping_id` | Add GROUPING() columns for programmatic identification | true |
| `database_engine` | Target engine for syntax (some engines lack GROUPING SETS) | postgresql |
| `max_dimensions` | Warn when CUBE exceeds this many dimensions | 4 |

## Use Cases

1. **Financial reporting** — Generate income statements with subtotals by department, quarter, and region, plus grand totals, in a single efficient query.
2. **Cohort analysis** — Group users by signup month, plan tier, and geography with rollup subtotals to identify which segments drive the most revenue.
3. **Inventory summaries** — Compute stock levels across warehouse, category, and supplier dimensions with all possible subtotal combinations using CUBE.

## Common Pitfalls

- **CUBE explosion on high-cardinality dimensions** — CUBE on 6 dimensions produces 64 grouping combinations. Filter to only the combinations you need with explicit GROUPING SETS instead.
- **Confusing NULLs with subtotals** — Subtotal rows show NULL in grouped columns, but the data may also contain real NULLs. Always use the GROUPING() function to distinguish them.
- **HAVING vs WHERE confusion** — WHERE filters rows before grouping; HAVING filters groups after aggregation. Putting aggregate conditions in WHERE causes syntax errors, and putting row-level filters in HAVING hurts performance.
