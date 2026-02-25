---
title: "SQL Join Debugging Prompt"
description: "A prompt template that diagnoses incorrect query results caused by wrong join types, missing predicates, or unexpected cardinality issues."
category: prompts
tags: ["sql", "joins", "debugging", "data-correctness"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

When a query returns unexpected row counts or wrong values, the root cause is often a join issue. This prompt systematically diagnoses join-related bugs by analyzing the query, table relationships, and expected vs actual results.

## Prompt

```
Diagnose why the following SQL query produces incorrect results.

Database engine: {{database_engine}}
Query:
{{query}}

Table schemas with cardinality:
{{table_schemas}}

Expected behavior: {{expected_behavior}}
Actual behavior: {{actual_behavior}}

Diagnose by checking:
1. JOIN TYPE CORRECTNESS: Is the join type (INNER, LEFT, RIGHT, FULL) correct for the business requirement? Would unmatched rows explain missing data?
2. JOIN PREDICATE COMPLETENESS: Are all necessary join conditions present? Could a missing condition cause a partial cartesian product?
3. CARDINALITY ISSUES: Does a 1:N join cause row multiplication (fan-out)? Would aggregating before joining fix the count?
4. NULL HANDLING: Does a WHERE clause on an outer-joined table convert the LEFT JOIN to an INNER JOIN? Should the filter be in the ON clause instead?
5. DUPLICATE KEYS: Are there duplicate values in the join key columns that cause unexpected multiplication?

For each issue found:
- Explain the root cause with a small data example
- Show the corrected query
- Provide a verification query to confirm the fix
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `database_engine` | Target SQL engine | `postgresql` |
| `query` | The problematic SQL query | `SELECT o.order_id, SUM(p.amount) ...` |
| `table_schemas` | Table definitions with relationship info | `orders (1) -> payments (N): one order can have multiple payments` |
| `expected_behavior` | What the user expects | `One row per order showing the total payment amount, including orders with no payments (showing 0)` |
| `actual_behavior` | What actually happens | `Orders with multiple payments show inflated totals, and orders with no payments are missing` |

## Example Output

**Issue 1: Fan-out from 1:N join (HIGH severity)**

The `orders JOIN payments` produces multiple rows when an order has multiple payments. When you also join `order_items`, each payment row is multiplied by each item row, inflating the SUM.

*Root cause data example:*
Order 100 has 2 payments ($50, $30) and 3 items. The join produces 6 rows, so SUM(payment.amount) = ($50+$30) x 3 = $240 instead of $80.

*Fix:* Pre-aggregate payments before joining:
```sql
WITH payment_totals AS (
    SELECT order_id, SUM(amount) AS total_paid
    FROM payments
    GROUP BY order_id
)
SELECT o.order_id, COALESCE(pt.total_paid, 0) AS total_paid
FROM orders o
LEFT JOIN payment_totals pt ON pt.order_id = o.order_id;
```

**Issue 2: LEFT JOIN nullified by WHERE clause (MEDIUM severity)**

The `WHERE p.status = 'completed'` filters out NULL rows from the LEFT JOIN, converting it to an INNER JOIN. Move the condition to the ON clause.

## Variations

1. **Row count investigation** — Focus specifically on why a query returns more or fewer rows than a count on the base table, useful for ETL validation.
2. **Aggregation mismatch** — Diagnose why SUM, COUNT, or AVG returns wrong values in multi-join queries with different cardinalities.
3. **Self-join issues** — Debug self-referential joins where the same table appears multiple times, checking for alias confusion and predicate misplacement.

## Best Model

Claude Sonnet 4.6 handles most join debugging scenarios. For queries with 5+ tables and complex predicate logic, Claude Opus 4.6 provides more thorough analysis.
