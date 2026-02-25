---
title: "SQL Aggregation Report Builder Prompt"
description: "A prompt template that generates complex GROUP BY queries with ROLLUP, CUBE, and GROUPING SETS for multi-dimensional business reports."
category: prompts
tags: ["sql", "aggregation", "reporting", "grouping-sets"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Business reports often require subtotals, grand totals, and cross-tabulations that are tedious to build manually. This prompt generates the right combination of GROUP BY, ROLLUP, CUBE, or GROUPING SETS to match your reporting needs.

## Prompt

```
Generate a SQL aggregation query for the following report requirement.

Database engine: {{database_engine}}
Source table(s): {{source_tables}}
Table schema: {{table_schema}}

Report requirement: {{requirement}}

Subtotal levels needed: {{subtotal_levels}}

Rules:
1. Choose the most efficient grouping strategy (ROLLUP for hierarchical subtotals, CUBE for cross-tabulations, GROUPING SETS for specific combinations)
2. Use GROUPING() function to label subtotal rows clearly (replace NULLs with descriptive labels like 'All Regions')
3. Include a grouping_level column so downstream tools can identify which level each row represents
4. Format numbers appropriately (ROUND for decimals, COALESCE for NULLs)
5. Order results logically: detail rows within each group, subtotals after each group, grand total last
6. Add percentage-of-total columns where meaningful
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `database_engine` | Target SQL engine | `postgresql` |
| `source_tables` | Table(s) to aggregate | `sales` |
| `table_schema` | Column definitions | `sale_date DATE, region VARCHAR, category VARCHAR, product VARCHAR, revenue DECIMAL, units INT` |
| `requirement` | Report description | `Monthly revenue summary by region and category with subtotals at each level and a grand total` |
| `subtotal_levels` | Which subtotals to include | `Region subtotal, category subtotal, grand total` |

## Example Output

```sql
SELECT
    CASE WHEN GROUPING(region) = 1 THEN 'ALL REGIONS' ELSE region END AS region,
    CASE WHEN GROUPING(category) = 1 THEN 'ALL CATEGORIES' ELSE category END AS category,
    DATE_TRUNC('month', sale_date) AS month,
    SUM(revenue) AS total_revenue,
    SUM(units) AS total_units,
    ROUND(AVG(revenue / NULLIF(units, 0)), 2) AS avg_revenue_per_unit,
    ROUND(100.0 * SUM(revenue) / SUM(SUM(revenue)) OVER (), 2) AS pct_of_grand_total,
    GROUPING(region, category) AS grouping_level
FROM sales
WHERE sale_date >= '2025-01-01' AND sale_date < '2026-01-01'
GROUP BY ROLLUP(region, category), DATE_TRUNC('month', sale_date)
ORDER BY
    GROUPING(region), region,
    GROUPING(category), category,
    month;
```

## Variations

1. **Pivot-style output** — Use conditional aggregation (`SUM(CASE WHEN ...)` or `FILTER (WHERE ...)`) to pivot categories into columns for spreadsheet-style output.
2. **Year-over-year comparison** — Add a self-join or LAG over month to include prior year values and growth percentages alongside current figures.
3. **Top-N with "Others"** — Rank dimension values and group everything outside the top N into an "Others" bucket for cleaner reports.

## Best Model

Claude Sonnet 4.6 handles ROLLUP and CUBE queries well. For reports that combine GROUPING SETS with window functions and conditional aggregation, Claude Opus 4.6 provides more reliable SQL.
