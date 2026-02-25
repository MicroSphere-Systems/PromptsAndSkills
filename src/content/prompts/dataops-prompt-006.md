---
title: "Database Schema Design Prompt"
description: "A prompt template that generates normalized or denormalized database schemas from business requirements, including DDL, constraints, and index strategies."
category: prompts
tags: ["sql", "schema-design", "data-modeling", "database"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Designing a good database schema requires balancing normalization, performance, and future flexibility. This prompt captures business requirements and generates production-ready DDL with constraints, indexes, and documentation.

## Prompt

```
Design a database schema for the following requirements.

Database engine: {{database_engine}}
Workload type: {{workload_type}}
Business domain: {{business_domain}}
Requirements:
{{requirements}}

Expected data volumes:
{{data_volumes}}

Output:
1. ENTITY RELATIONSHIP DESCRIPTION: List each entity, its attributes, and relationships to other entities (1:1, 1:N, M:N)
2. CREATE TABLE DDL: Complete DDL for all tables including:
   - Primary keys (explain choice of surrogate vs natural key)
   - Foreign keys with ON DELETE/UPDATE actions
   - NOT NULL constraints where appropriate
   - CHECK constraints for domain validation
   - DEFAULT values
   - Appropriate data types with rationale for non-obvious choices
3. INDEX STRATEGY: CREATE INDEX statements for expected query patterns
4. AUDIT COLUMNS: created_at, updated_at on all tables
5. NOTES: Partitioning strategy if any table exceeds 100M rows, SCD strategy for dimension tables in OLAP, multi-tenant considerations if applicable
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `database_engine` | Target database | `postgresql` |
| `workload_type` | OLTP, OLAP, or hybrid | `hybrid` |
| `business_domain` | What the system does | `SaaS subscription billing platform` |
| `requirements` | Detailed business requirements | `Track customers, subscriptions, invoices, payments, usage metering. Support monthly and annual billing cycles, prorations, and credits.` |
| `data_volumes` | Expected row counts | `10K customers, 50K subscriptions, 500K invoices/year, 5M usage events/day` |

## Example Output

```sql
-- Customers table
CREATE TABLE customers (
    customer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    external_id UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    currency CHAR(3) NOT NULL DEFAULT 'USD' CHECK (currency ~ '^[A-Z]{3}$'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
    subscription_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(customer_id) ON DELETE RESTRICT,
    plan_id BIGINT NOT NULL REFERENCES plans(plan_id),
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'paused', 'canceled', 'expired')),
    billing_cycle VARCHAR(10) NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
    current_period_start DATE NOT NULL,
    current_period_end DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status) WHERE status = 'active';
```

## Variations

1. **Star schema for analytics** — Change workload_type to OLAP and get fact/dimension table designs with surrogate keys and SCD Type 2 handling.
2. **Event sourcing schema** — Ask for an append-only events table with materialized views for current state, suitable for audit-heavy domains.
3. **Multi-tenant schema** — Add multi-tenancy as a requirement to get row-level security policies or schema-per-tenant designs.

## Best Model

Claude Sonnet 4.6 handles most schema design tasks well. For complex domains with many entities and subtle relationship modeling (healthcare, financial systems), Claude Opus 4.6 provides more thorough designs.
