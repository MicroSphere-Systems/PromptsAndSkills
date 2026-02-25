# Content Expansion: 1,000+ Agents, Prompts & Skills — Design Document

**Date:** 2026-02-25
**Status:** Approved
**Target:** 1,000 agents + 1,000 prompts + 1,000 skills = 3,000 content files

---

## Overview

Expand `promptandskills.com` from ~14 seed files to 3,000+ production-grade content files using a 100-worker parallel agent team. Content is AI-generated, rich & deep (200-500 words each), covering all industries, programming languages, and use cases.

---

## Architecture: Approach A — Flat 100-Worker Team

```
Team Lead (orchestrator)
├── Domain Agent 1:  Tech — Development      → 10 Sub-agents
├── Domain Agent 2:  Tech — DevOps & Cloud   → 10 Sub-agents
├── Domain Agent 3:  Tech — Security         → 10 Sub-agents
├── Domain Agent 4:  Tech — AI/ML Eng        → 10 Sub-agents
├── Domain Agent 5:  Business — Marketing    → 10 Sub-agents
├── Domain Agent 6:  Business — HR & Ops     → 10 Sub-agents
├── Domain Agent 7:  Data & Analytics        → 10 Sub-agents
├── Domain Agent 8:  Creative & Content      → 10 Sub-agents
├── Domain Agent 9:  Education & Research    → 10 Sub-agents
└── Domain Agent 10: Industry Verticals      → 10 Sub-agents

100 leaf workers × 30 files each = 3,000 files
→ 1,000 agents + 1,000 prompts + 1,000 skills
```

---

## Domain Coverage

| Agent | Domain | Sub-topics |
|-------|--------|------------|
| 1 | Tech — Development | Python, TypeScript, Go, Rust, Java, C#, React, Vue, SQL, APIs, testing |
| 2 | Tech — DevOps & Cloud | Docker, Kubernetes, AWS, GCP, Azure, CI/CD, Terraform, monitoring, SRE |
| 3 | Tech — Security | Pen testing, SAST, DAST, incident response, auth, secrets management, OWASP |
| 4 | Tech — AI/ML Eng | Model training, RAG pipelines, embeddings, fine-tuning, LLM ops, evals |
| 5 | Business — Marketing | SEO, email campaigns, social media, copywriting, brand voice, growth |
| 6 | Business — HR & Ops | Job descriptions, onboarding, OKRs, performance reviews, SOPs, proposals |
| 7 | Data & Analytics | EDA, BI dashboards, data pipelines, SQL optimization, data cleaning, viz |
| 8 | Creative & Content | Blog writing, UX copy, video scripts, storytelling, newsletters, podcasts |
| 9 | Education & Research | Lesson plans, tutoring agents, academic writing, research synthesis, quizzes |
| 10 | Industry Verticals | Healthcare, legal, finance, gaming, manufacturing, retail, logistics |

---

## Per-Worker Assignment

Each of the 10 sub-agents within a domain writes:
- **10 agent files** (`.md` in `src/content/agents/`)
- **10 prompt files** (`.md` in `src/content/prompts/`)
- **10 skill files** (`.md` in `src/content/skills/`)
= **30 files per worker**

### Slug Scheme (zero-conflict, pre-assigned)

Each domain has a prefix:

| Domain Agent | Prefix |
|---|---|
| 1 — Tech Dev | `techdev-` |
| 2 — DevOps | `devops-` |
| 3 — Security | `security-` |
| 4 — AI/ML | `aiml-` |
| 5 — Marketing | `marketing-` |
| 6 — HR & Ops | `bizops-` |
| 7 — Data | `dataops-` |
| 8 — Creative | `creative-` |
| 9 — Education | `education-` |
| 10 — Industry | `industry-` |

Within each domain, sub-agents are numbered SA-1 through SA-10, assigned item ranges:

| Sub-agent | Item range |
|-----------|------------|
| SA-1 | 001–010 |
| SA-2 | 011–020 |
| SA-3 | 021–030 |
| SA-4 | 031–040 |
| SA-5 | 041–050 |
| SA-6 | 051–060 |
| SA-7 | 061–070 |
| SA-8 | 071–080 |
| SA-9 | 081–090 |
| SA-10 | 091–100 |

Example filenames for SA-3 in Tech Dev domain:
- `src/content/agents/techdev-agent-021.md` … `techdev-agent-030.md`
- `src/content/prompts/techdev-prompt-021.md` … `techdev-prompt-030.md`
- `src/content/skills/techdev-skill-021.md` … `techdev-skill-030.md`

---

## Content Quality Standard

### Every file MUST include:

**Agents:**
- Full system prompt (50–100 lines, ready to copy-paste into Claude/GPT/etc.)
- Tool use / integration code example (Python or TypeScript)
- Configuration options section
- 3+ real-world use case examples
- Common pitfalls / edge cases

**Prompts:**
- Full prompt text with `{{variable}}` placeholders
- Variables table (name, description, example value)
- Example output (realistic)
- 2–3 variation tips
- Best model to use

**Skills:**
- Step-by-step skill guide (numbered)
- Code example (in the relevant language/tool)
- When to use / when NOT to use
- Prerequisites / dependencies
- Tips for power users

### Frontmatter Schema (all files)

```yaml
---
title: "..."           # descriptive, SEO-friendly title
description: "..."     # 1-2 sentence summary
category: agents|prompts|skills
tags: [...]            # 4-8 specific, searchable tags
difficulty: beginner|intermediate|advanced
date: 2026-02-25
featured: false
---
```

---

## Team Lead Responsibilities

1. Launch 10 Domain Agents in parallel (single `Task` call with 10 tool uses)
2. Each Domain Agent immediately spawns its 10 Sub-agents in parallel
3. Sub-agents write files independently — no cross-agent coordination needed
4. Team Lead waits for all Domain Agents to confirm completion
5. Verifies file counts: `ls src/content/agents/ | wc -l` etc.
6. Runs `git add . && git commit`
7. Reports final tally to user

---

## Multi-Session Plan

| Session | Files added | Running total |
|---------|-------------|---------------|
| Session 1 (this) | 3,000 | 3,000 |
| Session 2 (optional) | 3,000 more | 6,000 |

Session 1 already hits 1,000+ agents, 1,000+ prompts, 1,000+ skills.

---

## Content Topics by Domain (seed list for workers)

### Tech — Development (100 agents, 100 prompts, 100 skills)
Python async patterns, TypeScript strict mode, Go concurrency, Rust ownership, Java Spring Boot, C# LINQ, React hooks, Vue composition API, REST API design, GraphQL schema design, database query optimization, unit testing frameworks, integration testing, E2E testing, code documentation, refactoring legacy code, design patterns, microservices, monorepo tooling, package publishing, CLI tool building, WebSocket servers, OAuth2 implementation, JWT auth, pagination patterns, caching strategies, error handling patterns, logging best practices, OpenAPI spec writing, SDK design…

### Tech — DevOps & Cloud (100 agents, 100 prompts, 100 skills)
Dockerfile optimization, multi-stage builds, Kubernetes manifests, Helm charts, AWS Lambda, AWS ECS, GCP Cloud Run, Azure Functions, Terraform modules, Ansible playbooks, GitHub Actions workflows, GitLab CI, Jenkins pipelines, ArgoCD GitOps, Prometheus alerting, Grafana dashboards, ELK stack, distributed tracing, chaos engineering, SLO/SLA definition, on-call runbooks, disaster recovery, cost optimization, autoscaling policies, service mesh (Istio), API gateway config, secrets rotation, infrastructure as code…

### Tech — Security (100 agents, 100 prompts, 100 skills)
OWASP Top 10 checks, SQL injection testing, XSS prevention, CSRF protection, dependency audit, SAST pipeline setup, DAST scanning, penetration test reports, threat modeling, CVE triage, secrets scanning, zero trust architecture, WAF rules, TLS configuration, certificate management, RBAC design, security code review, bug bounty triage, incident response playbooks, SIEM alert tuning, phishing simulation, SOC2 compliance, GDPR data mapping…

### Tech — AI/ML Engineering (100 agents, 100 prompts, 100 skills)
RAG pipeline design, vector database setup (Pinecone/Chroma/Weaviate), embedding generation, prompt chaining, LLM evaluation frameworks, fine-tuning LoRA, model distillation, RLHF data prep, LangChain agents, LlamaIndex, Semantic Kernel, function calling, tool use patterns, structured output parsing, context window management, hallucination detection, A/B testing prompts, LLM observability, cost optimization, multi-modal inputs, streaming responses, batching inference, model serving (vLLM/TGI), MLflow tracking…

### Business — Marketing (100 agents, 100 prompts, 100 skills)
SEO content briefs, keyword research, meta description writing, email subject lines, cold outreach sequences, LinkedIn posts, Twitter/X threads, product launch announcements, landing page copy, A/B test ideas, competitor analysis, customer persona development, content calendar planning, newsletter writing, case study templates, press releases, webinar scripts, podcast episode outlines, YouTube descriptions, TikTok scripts, paid ad copy, retargeting messages, affiliate recruitment, referral program copy…

### Business — HR & Operations (100 agents, 100 prompts, 100 skills)
Job description writing, interview question banks, candidate evaluation rubrics, offer letter templates, onboarding checklists, employee handbooks, performance review frameworks, OKR writing, SMART goal setting, 1-on-1 meeting agendas, team retrospectives, conflict resolution scripts, termination documentation, salary band analysis, skills gap analysis, learning path design, SOP documentation, meeting minutes, project status reports, vendor evaluation, RFP writing, budget justifications, escalation procedures…

### Data & Analytics (100 agents, 100 prompts, 100 skills)
Exploratory data analysis, data cleaning pipelines, feature engineering, SQL window functions, dbt model design, Airflow DAGs, Spark optimization, Pandas workflows, Polars patterns, data quality checks, A/B test analysis, cohort analysis, funnel analysis, churn prediction, LTV modeling, anomaly detection, dashboard design, Looker LookML, Tableau calculated fields, Power BI DAX, Metabase questions, data dictionary writing, schema migration planning, data governance policies, GDPR data lineage…

### Creative & Content (100 agents, 100 prompts, 100 skills)
Long-form blog posts, technical article writing, how-to guides, listicle formats, opinion pieces, product reviews, interview transcripts, fiction writing, screenwriting, UX microcopy, error message writing, onboarding tooltip copy, tooltip writing, push notification copy, app store descriptions, book summaries, speech writing, eulogy writing, wedding vow assistance, song lyrics, poem generation, creative brief writing, brand story, company values, about page copy, FAQ writing…

### Education & Research (100 agents, 100 prompts, 100 skills)
Lesson plan creation, learning objective writing, quiz generation, flashcard creation, Socratic tutoring, concept explanation, analogy generation, curriculum design, rubric creation, feedback on essays, citation formatting, literature review assistance, research proposal writing, hypothesis generation, experiment design, survey question writing, data interpretation, abstract writing, peer review simulation, study guide creation, Feynman technique application, spaced repetition scheduling, vocabulary builder, reading comprehension checks…

### Industry Verticals (100 agents, 100 prompts, 100 skills)
Healthcare: clinical note summarization, ICD-10 coding, discharge summaries, drug interaction checks, patient education materials, clinical trial protocols, HIPAA compliance checklists
Legal: contract clause extraction, NDA drafting, terms of service review, GDPR compliance, litigation timeline, case brief writing, deposition preparation
Finance: financial model review, DCF analysis, earnings call summaries, risk assessment, portfolio rebalancing, tax optimization, invoice processing
Gaming: game design documents, NPC dialogue trees, quest design, balance tuning, lore writing, patch notes, community moderation
Manufacturing: quality control checklists, FMEA analysis, production scheduling, supplier evaluation, ISO documentation, maintenance logs
Retail: product description writing, inventory forecasting, customer service scripts, returns policy, loyalty program design…
