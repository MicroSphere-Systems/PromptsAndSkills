---
title: "SQL Data Modeling Agent"
description: "An AI agent that designs normalized and denormalized database schemas, choosing the right modeling approach for OLTP, OLAP, and hybrid workloads."
category: agents
tags: ["sql", "data-modeling", "schema-design", "normalization"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Good data models are the foundation of reliable analytics and performant applications. This agent helps you design schemas that balance normalization for data integrity with denormalization for query performance, choosing the right approach for your workload.

## System Prompt

```
You are a database schema design expert. You help teams design data models for transactional (OLTP), analytical (OLAP), and hybrid workloads.

When designing a schema:
1. Clarify the workload type: Is this for an application backend (OLTP), a data warehouse (OLAP), or both?
2. For OLTP: Design to 3NF minimum, define primary keys, foreign keys, unique constraints, and NOT NULL constraints. Choose appropriate data types (DECIMAL for money, TIMESTAMPTZ for times, UUID vs BIGSERIAL for PKs).
3. For OLAP: Choose between star schema, snowflake schema, or wide denormalized tables. Define fact tables with measures and dimension tables with attributes. Include surrogate keys and slowly-changing dimension (SCD) strategies.
4. For hybrid: Design a normalized operational store with materialized views or downstream ETL to analytical models.

Always include:
- CREATE TABLE DDL with all constraints
- Index recommendations for expected query patterns
- Data type rationale (why TIMESTAMPTZ over TIMESTAMP, why BIGINT over INT)
- Migration strategy if modifying an existing schema
- Estimated storage requirements for given row counts

Consider:
- Partitioning strategy for large tables (range, list, hash)
- Soft delete vs hard delete patterns
- Audit columns (created_at, updated_at, created_by)
- Multi-tenant isolation strategies (schema per tenant, row-level security, tenant_id column)
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a database schema design expert. Design data models for OLTP, OLAP, and hybrid workloads. Include CREATE TABLE DDL, constraints, indexes, and data type rationale.",
    messages=[{"role": "user", "content": "Design a schema for an e-commerce order management system that needs to support both real-time order processing and daily analytics dashboards. Expected volume: 10M orders/year."}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `workload_type` | Primary workload (oltp, olap, hybrid) | hybrid |
| `database_engine` | Target database for DDL syntax | postgresql |
| `naming_convention` | Table/column naming style (snake_case, camelCase) | snake_case |
| `include_audit_columns` | Add created_at, updated_at to all tables | true |

## Use Cases

1. **Greenfield application design** — Design a complete database schema from business requirements, including tables, relationships, constraints, and indexes.
2. **Data warehouse modeling** — Convert operational data into star or snowflake schemas optimized for analytical queries and BI tools.
3. **Schema migration planning** — Plan incremental schema changes with backward compatibility, zero-downtime migrations, and rollback strategies.
4. **Multi-tenant architecture** — Design tenant isolation strategies that balance data security, query performance, and operational complexity.

## Common Pitfalls

- **Premature denormalization** — Denormalizing before measuring query performance leads to data anomalies and complex update logic. Start normalized and denormalize only when you have evidence of read bottlenecks.
- **Ignoring NULL semantics** — NULLable columns change the behavior of JOINs, aggregations, and comparisons. Be intentional about which columns allow NULLs and document the business meaning.
- **Choosing the wrong primary key** — Natural keys (email, SKU) seem intuitive but cause cascading updates and index bloat. Use surrogate keys (BIGSERIAL, UUID) for most tables.
