---
title: "Recursive CTE Builder Prompt"
description: "A prompt template that generates recursive common table expressions from hierarchy descriptions, with cycle detection and depth limiting built in."
category: prompts
tags: ["sql", "recursive-cte", "hierarchical-data", "query-generation"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Recursive CTEs require careful construction of anchor members, recursive members, and termination conditions. This prompt generates correct recursive queries from a description of your hierarchy and the traversal you need.

## Prompt

```
Generate a recursive CTE for the following hierarchical query.

Database engine: {{database_engine}}
Table name: {{table_name}}
Table schema: {{table_schema}}
Parent-child relationship: {{relationship}}
Traversal requirement: {{requirement}}
Maximum depth: {{max_depth}}

The recursive CTE must include:
1. Anchor member: the starting point(s) of the traversal
2. Recursive member: the join that walks the hierarchy
3. A depth counter column starting at 0
4. A path accumulator column showing the full traversal path (use ' > ' as separator)
5. Cycle detection to prevent infinite loops
6. A depth limit of {{max_depth}} as a safety stop

Also provide:
- An explanation of how the recursion terminates
- A query to verify the results (count nodes per depth level)
- Performance notes for the expected data volume
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `database_engine` | Target SQL engine | `postgresql` |
| `table_name` | Source table name | `employees` |
| `table_schema` | Column definitions | `employee_id INT, manager_id INT, name VARCHAR(100), title VARCHAR(100), department VARCHAR(50)` |
| `relationship` | Parent-child column mapping | `manager_id references employee_id (NULL manager_id = top of hierarchy)` |
| `requirement` | What to traverse | `Find all direct and indirect reports under employee_id 42, showing the full reporting chain` |
| `max_depth` | Safety recursion limit | `15` |

## Example Output

```sql
WITH RECURSIVE org_tree AS (
    -- Anchor: start with the target manager
    SELECT
        employee_id,
        manager_id,
        name,
        title,
        department,
        0 AS depth,
        name AS path,
        ARRAY[employee_id] AS visited  -- cycle detection
    FROM employees
    WHERE employee_id = 42

    UNION ALL

    -- Recursive: find direct reports of current level
    SELECT
        e.employee_id,
        e.manager_id,
        e.name,
        e.title,
        e.department,
        t.depth + 1,
        t.path || ' > ' || e.name,
        t.visited || e.employee_id
    FROM employees e
    INNER JOIN org_tree t ON e.manager_id = t.employee_id
    WHERE e.employee_id != ALL(t.visited)  -- prevent cycles
      AND t.depth < 15                      -- depth safety limit
)
SELECT employee_id, name, title, department, depth, path
FROM org_tree
ORDER BY depth, name;
```

## Variations

1. **Bottom-up traversal** — Reverse the CTE to start from a leaf node and walk up to the root, useful for finding the full management chain above a given employee.
2. **Bill of materials** — Adapt for product assembly hierarchies where each level multiplies quantities (add a `total_quantity` accumulator to the recursive member).
3. **Graph traversal with multiple paths** — Remove the UNION ALL deduplication to find all possible paths between two nodes in a graph adjacency list.

## Best Model

Claude Sonnet 4.6 works well for standard recursive CTEs. For complex graph traversals with multiple cycle detection strategies or engine-specific features like PostgreSQL CYCLE clause (v14+), use Claude Opus 4.6.
