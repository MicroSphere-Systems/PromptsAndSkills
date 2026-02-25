---
title: "SQL Window Function Query Generator"
description: "A prompt template that generates SQL window function queries from natural language descriptions of the desired analytical computation."
category: prompts
tags: ["sql", "window-functions", "analytics", "query-generation"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Translating analytical requirements into correct window function syntax can be tricky, especially when choosing between ROWS and RANGE frames or combining multiple window definitions. This prompt takes a plain-language description and generates precise, executable SQL.

## Prompt

```
You are a SQL window function specialist. Generate the exact SQL query for the following analytical requirement.

Database engine: {{database_engine}}
Table name: {{table_name}}
Table schema: {{table_schema}}
Requirement: {{requirement}}

Rules:
1. Use explicit window frame specifications (never rely on defaults)
2. Use named WINDOW clauses when multiple aggregations share the same partition/order
3. Add inline comments explaining each window function's purpose
4. If the requirement involves ranking, choose between ROW_NUMBER, RANK, and DENSE_RANK based on the tie-handling needs described
5. If the requirement involves running calculations, specify ROWS vs RANGE explicitly and explain why

Return:
- The complete SQL query
- A brief explanation of the window frame used
- Example output with 3-5 sample rows showing how the window function values are computed
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `database_engine` | Target SQL database engine | `postgresql` |
| `table_name` | Name of the source table | `daily_sales` |
| `table_schema` | Column definitions of the table | `date DATE, product_id INT, category VARCHAR, revenue DECIMAL(10,2), units_sold INT` |
| `requirement` | Natural language description of the computation | `Calculate a 7-day rolling average of revenue per product category, and rank products within each category by their rolling average` |

## Example Output

```sql
-- 7-day rolling average of revenue per category with product ranking
WITH rolling_avg AS (
    SELECT
        date,
        product_id,
        category,
        revenue,
        -- Rolling 7-day average using ROWS frame for exact row count
        AVG(revenue) OVER (
            PARTITION BY category, product_id
            ORDER BY date
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ) AS rolling_7d_avg
    FROM daily_sales
)
SELECT
    date,
    product_id,
    category,
    revenue,
    ROUND(rolling_7d_avg, 2) AS rolling_7d_avg,
    -- Rank products within category by their rolling average (no gaps)
    DENSE_RANK() OVER (
        PARTITION BY category, date
        ORDER BY rolling_7d_avg DESC
    ) AS category_rank
FROM rolling_avg
ORDER BY date DESC, category, category_rank;
```

## Variations

1. **Cumulative distribution** — Change the requirement to compute percentiles using `PERCENT_RANK()` or `CUME_DIST()` for customer segmentation or scoring models.
2. **Gap detection** — Use `LAG()` and `LEAD()` to find gaps in sequential data like missing dates, transaction ID jumps, or session timeout detection.
3. **First/last value** — Use `FIRST_VALUE()` and `LAST_VALUE()` with proper frame specifications to compare each row against the first or last value in its partition.

## Best Model

Claude Sonnet 4.6 handles SQL generation well for most window function use cases. For complex multi-window queries with engine-specific syntax (BigQuery QUALIFY, Snowflake WINDOW aliases), Claude Opus 4.6 provides more reliable results.
