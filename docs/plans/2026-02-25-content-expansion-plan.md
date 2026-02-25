# Content Expansion: 1,000+ Agents, Prompts & Skills — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Generate 3,000 production-grade Markdown content files (1,000 agents + 1,000 prompts + 1,000 skills) using a 100-worker parallel agent team writing to an Astro static site.

**Architecture:** 1 Team Lead launches 10 Domain Agents in parallel; each Domain Agent immediately spawns 10 Sub-agents in parallel; each Sub-agent independently writes 30 files (10 agents + 10 prompts + 10 skills) with pre-assigned slug ranges — zero cross-agent coordination required.

**Tech Stack:** Astro Content Collections, Markdown + YAML frontmatter, GitHub Pages, GitHub Actions CI/CD

---

## CRITICAL: File Format

Every single file MUST conform to this schema or Astro will reject it at build time.

### Frontmatter (REQUIRED on every file)

```yaml
---
title: "Descriptive SEO-Friendly Title Here"
description: "One to two sentence summary of what this does and who it's for."
category: agents   # must be exactly: agents OR prompts OR skills
tags: ["tag1", "tag2", "tag3", "tag4"]  # 4-8 tags, lowercase, hyphenated
difficulty: intermediate   # must be exactly: beginner OR intermediate OR advanced
date: 2026-02-25
featured: false
---
```

### Body requirements by type

**Agents** (200-500 words minimum):
1. Brief intro paragraph (what it does, why it's useful)
2. `## System Prompt` section with full copyable system prompt in a code block
3. `## Integration Example` with working Python or TypeScript code using Anthropic/OpenAI SDK
4. `## Configuration` with options table or YAML
5. `## Use Cases` with 3+ real examples
6. `## Common Pitfalls` with 2-3 watch-outs

**Prompts** (150-400 words minimum):
1. Brief intro paragraph
2. `## Prompt` section with full prompt text in a code block, using `{{variable_name}}` for placeholders
3. `## Variables` table (Variable | Description | Example)
4. `## Example Output` showing realistic output
5. `## Variations` with 2-3 tips to adapt it
6. `## Best Model` recommendation

**Skills** (150-400 words minimum):
1. Brief intro paragraph
2. `## Steps` numbered step-by-step guide
3. `## Example` with working code snippet
4. `## When to Use` + `## When NOT to Use`
5. `## Prerequisites`
6. `## Pro Tips` with 2-3 power-user insights

### Output directories

```
src/content/agents/    ← all agent .md files
src/content/prompts/   ← all prompt .md files
src/content/skills/    ← all skill .md files
```

---

## Domain → Prefix → Sub-agent Assignment Table

| Domain Agent | Prefix | Sub-topics covered |
|---|---|---|
| DA-1: Tech Dev | `techdev-` | Python, TypeScript, Go, Rust, Java, C#, React, Vue, REST APIs, DB patterns |
| DA-2: DevOps | `devops-` | Docker, Kubernetes, AWS, GCP, Azure, Terraform, GitHub Actions, Monitoring, SRE, GitOps |
| DA-3: Security | `security-` | OWASP Top 10, Secrets mgmt, Auth, Pen testing, SAST/DAST, Incident response, Cloud sec, Supply chain, Code review, Compliance |
| DA-4: AI/ML | `aiml-` | RAG, LangChain, LlamaIndex, Vector DBs, Fine-tuning, LLM evals, Prompt eng, Observability, Model serving, Multi-agent |
| DA-5: Marketing | `marketing-` | SEO, Email, Social media, Content, Paid ads, Product marketing, CRO, Video, Brand, Analytics |
| DA-6: HR & Ops | `bizops-` | Recruiting, Onboarding, Performance, Ops, Project mgmt, Finance ops, Legal ops, Customer success, Sales, Leadership |
| DA-7: Data | `dataops-` | SQL, Python data, Pipelines, Analytics eng, BI dashboards, Statistics, Data quality, Governance, ML, Real-time |
| DA-8: Creative | `creative-` | Blog writing, Technical writing, UX writing, Video/podcast, Social content, Copywriting, Storytelling, Creative writing, Newsletter, Design briefs |
| DA-9: Education | `education-` | Lesson planning, Tutoring, Assessment, Curriculum, Academic writing, Research, Study techniques, Prof dev, Corporate training, Knowledge mgmt |
| DA-10: Industry | `industry-` | Healthcare, Legal, Finance, Gaming, Manufacturing, Retail, Real estate, HR Tech, SaaS, E-commerce |

### Sub-agent number ranges (same pattern for ALL domains)

| Sub-agent | Item numbers | Files: agents | Files: prompts | Files: skills |
|---|---|---|---|---|
| SA-1 | 001–010 | `{prefix}agent-001.md` … `{prefix}agent-010.md` | `{prefix}prompt-001.md` … `{prefix}prompt-010.md` | `{prefix}skill-001.md` … `{prefix}skill-010.md` |
| SA-2 | 011–020 | … agent-011 to 020 | … prompt-011 to 020 | … skill-011 to 020 |
| SA-3 | 021–030 | … agent-021 to 030 | … prompt-021 to 030 | … skill-021 to 030 |
| SA-4 | 031–040 | … agent-031 to 040 | … prompt-031 to 040 | … skill-031 to 040 |
| SA-5 | 041–050 | … agent-041 to 050 | … prompt-041 to 050 | … skill-041 to 050 |
| SA-6 | 051–060 | … agent-051 to 060 | … prompt-051 to 060 | … skill-051 to 060 |
| SA-7 | 061–070 | … agent-061 to 070 | … prompt-061 to 070 | … skill-061 to 070 |
| SA-8 | 071–080 | … agent-071 to 080 | … prompt-071 to 080 | … skill-071 to 080 |
| SA-9 | 081–090 | … agent-081 to 090 | … prompt-081 to 090 | … skill-081 to 090 |
| SA-10 | 091–100 | … agent-091 to 100 | … prompt-091 to 100 | … skill-091 to 100 |

---

## Sub-topic assignments per sub-agent (all 100 workers)

### DA-1 Tech Dev (`techdev-`)
- SA-1 (001–010): Python — async/await, Pydantic models, FastAPI endpoints, pytest fixtures, dataclasses
- SA-2 (011–020): TypeScript — strict config, generics, decorators, Next.js App Router, Vitest
- SA-3 (021–030): Go — goroutines, channels, context, Gin web framework, testify
- SA-4 (031–040): Rust — ownership/borrowing, async Tokio, Axum HTTP, serde, cargo test
- SA-5 (041–050): Java — Spring Boot 3, JPA/Hibernate, Maven, JUnit 5, Mockito
- SA-6 (051–060): C# — .NET 8, LINQ, Entity Framework Core, xUnit, dependency injection
- SA-7 (061–070): React — hooks (useState/useEffect/useCallback), React Query, React Testing Library
- SA-8 (071–080): Vue 3 — composition API, Pinia state, Nuxt 3, VueTestUtils, TypeScript
- SA-9 (081–090): REST/API design — OpenAPI 3.1, versioning, pagination, idempotency, error contracts
- SA-10 (091–100): Database — N+1 query detection, index strategies, migrations, connection pooling, query optimization

### DA-2 DevOps (`devops-`)
- SA-1 (001–010): Docker — multi-stage builds, .dockerignore, health checks, slim base images, compose
- SA-2 (011–020): Kubernetes — Deployments, Services, Ingress, ConfigMaps, HPA autoscaling
- SA-3 (021–030): AWS — Lambda, API Gateway, S3 lifecycle, CloudFront CDN, RDS read replicas
- SA-4 (031–040): GCP — Cloud Run, Cloud Functions, GKE autopilot, Pub/Sub, Cloud Build
- SA-5 (041–050): Azure — Azure Functions, AKS, Azure DevOps pipelines, Cosmos DB, Blob Storage
- SA-6 (051–060): Terraform — module design, remote state, workspaces, variable validation, `terragrunt`
- SA-7 (061–070): GitHub Actions — reusable workflows, matrix builds, OIDC auth, caching, environments
- SA-8 (071–080): Observability — Prometheus metrics, Grafana dashboards, AlertManager, distributed tracing
- SA-9 (081–090): SRE — SLOs/SLAs/error budgets, incident runbooks, postmortem templates, on-call
- SA-10 (091–100): GitOps — ArgoCD app-of-apps, Flux v2, Helm chart packaging, progressive delivery

### DA-3 Security (`security-`)
- SA-1 (001–010): OWASP Top 10 — SQL injection, XSS, CSRF, broken auth, security misconfiguration
- SA-2 (011–020): Secrets management — HashiCorp Vault, AWS Secrets Manager, env var best practices
- SA-3 (021–030): Authentication — OAuth2 flows, OIDC, JWT validation, refresh tokens, session fixation
- SA-4 (031–040): Pen testing — recon, port scanning, web app testing, reporting, remediation
- SA-5 (041–050): SAST/DAST — Semgrep rules, Snyk integration, OWASP ZAP, CodeQL custom queries
- SA-6 (051–060): Incident response — detection, containment, eradication, recovery, communication
- SA-7 (061–070): Cloud security — AWS IAM least privilege, SCPs, security groups, VPC design, GuardDuty
- SA-8 (071–080): Supply chain — SBOM generation, Sigstore signing, dependency pinning, Dependabot
- SA-9 (081–090): Security code review — review checklist, threat modeling, STRIDE, abuse cases
- SA-10 (091–100): Compliance — SOC2 Type II controls, ISO 27001, GDPR Article 32, HIPAA safeguards

### DA-4 AI/ML (`aiml-`)
- SA-1 (001–010): RAG — document chunking strategies, embedding models, hybrid search, reranking with Cohere
- SA-2 (011–020): LangChain — LCEL chains, agent executors, memory types, custom tools, callbacks
- SA-3 (021–030): LlamaIndex — node parsers, vector indices, query engines, routers, sub-question
- SA-4 (031–040): Vector DBs — Pinecone namespaces, Chroma collections, Weaviate schemas, Qdrant filters
- SA-5 (041–050): Fine-tuning — LoRA/QLoRA setup, dataset formatting, training with Unsloth, PEFT
- SA-6 (051–060): LLM evals — RAGAS metrics, PromptFoo test cases, G-Eval, custom judge prompts
- SA-7 (061–070): Prompt engineering — CoT, few-shot, structured output (JSON mode), system prompt design
- SA-8 (071–080): LLM observability — LangSmith tracing, Helicone cost tracking, custom dashboards
- SA-9 (081–090): Model serving — vLLM deployment, HuggingFace TGI, OpenLLM, batching, quantization
- SA-10 (091–100): Multi-agent — agent orchestration patterns, planning loops, tool use, shared memory

### DA-5 Marketing (`marketing-`)
- SA-1 (001–010): SEO — keyword research, content briefs, title/meta optimization, internal linking
- SA-2 (011–020): Email — subject line formulas, welcome sequences, re-engagement, segmentation
- SA-3 (021–030): Social — LinkedIn thought leadership, Twitter/X threads, Instagram carousel scripts
- SA-4 (031–040): Content — pillar page strategy, topic clusters, content repurposing, editorial calendar
- SA-5 (041–050): Paid ads — Google Ads RSA copy, Facebook ad creative, A/B test variants, retargeting
- SA-6 (051–060): Product marketing — launch playbooks, positioning statements, competitive battlecards
- SA-7 (061–070): CRO — landing page copy, CTA optimization, headline frameworks (PAS, AIDA, BAB)
- SA-8 (071–080): Video — YouTube script structure, TikTok hooks, webinar outline, podcast show notes
- SA-9 (081–090): Brand — brand voice guide, tagline creation, brand story, mission/vision statements
- SA-10 (091–100): Analytics — UTM parameter strategy, GA4 events, attribution models, reporting templates

### DA-6 HR & Ops (`bizops-`)
- SA-1 (001–010): Recruiting — job description frameworks, Boolean search, screening rubrics, take-home tests
- SA-2 (011–020): Onboarding — 30/60/90 plans, first-day checklists, buddy program, tool provisioning
- SA-3 (021–030): Performance — OKR writing, SMART goals, review templates, continuous feedback
- SA-4 (031–040): Operations — SOP writing, process mapping, Notion/Confluence templates, RACI
- SA-5 (041–050): Project management — status report templates, risk registers, project charter, retrospectives
- SA-6 (051–060): Finance ops — budget request templates, expense policy, vendor RFPs, ROI analysis
- SA-7 (061–070): Legal ops — NDA templates, contractor agreements, IP assignment, GDPR notices
- SA-8 (071–080): Customer success — health score models, QBR agenda, escalation playbook, NPS analysis
- SA-9 (081–090): Sales — discovery call frameworks, proposal templates, objection handling, follow-up
- SA-10 (091–100): Leadership — all-hands structure, team motivation frameworks, culture assessments

### DA-7 Data & Analytics (`dataops-`)
- SA-1 (001–010): SQL — window functions, recursive CTEs, query optimization, anti-patterns, explain plans
- SA-2 (011–020): Python data — Pandas best practices, Polars for large datasets, NumPy vectorization
- SA-3 (021–030): Pipelines — Airflow DAG patterns, Prefect flows, dbt project structure, ETL vs ELT
- SA-4 (031–040): dbt — staging/marts/intermediate models, tests, documentation, macros, snapshots
- SA-5 (041–050): BI — Looker LookML, Tableau calculated fields, Power BI DAX, Metabase questions
- SA-6 (051–060): Statistics — A/B testing design, sample size calc, p-values, confidence intervals
- SA-7 (061–070): Data quality — Great Expectations suites, dbt generic tests, anomaly detection rules
- SA-8 (071–080): Governance — data catalog (Datahub/Amundsen), lineage, access control, PII handling
- SA-9 (081–090): ML in analytics — feature engineering, sklearn pipelines, model validation, MLflow
- SA-10 (091–100): Streaming — Kafka topics, Flink jobs, Spark Structured Streaming, event schema design

### DA-8 Creative & Content (`creative-`)
- SA-1 (001–010): Blog writing — long-form structure, intro hooks, H2/H3 hierarchy, SEO-integrated writing
- SA-2 (011–020): Technical writing — API docs, tutorials, how-to guides, changelog entries, README
- SA-3 (021–030): UX writing — empty states, error messages, onboarding tooltips, button labels, alerts
- SA-4 (031–040): Video/podcast — YouTube scripts, TikTok hook formulas, podcast intros, show notes
- SA-5 (041–050): Social content — LinkedIn carousels, Twitter/X thread structure, Instagram reels scripts
- SA-6 (051–060): Copywriting — headline frameworks, landing page copy, sales emails, ad copy, AIDA/PAS
- SA-7 (061–070): Storytelling — narrative arc, hero's journey for brands, case study format, testimonials
- SA-8 (071–080): Creative writing — fiction prompts, dialogue writing, world-building, character sheets
- SA-9 (081–090): Newsletter — subject line strategies, structure templates, re-engagement, digest format
- SA-10 (091–100): Design briefs — creative brief format, mood board direction, brand identity briefs

### DA-9 Education & Research (`education-`)
- SA-1 (001–010): Lesson planning — Bloom's taxonomy alignment, objectives, activities, exit tickets
- SA-2 (011–020): AI tutoring — Socratic questioning, adaptive hints, misconception detection, scaffolding
- SA-3 (021–030): Assessment — quiz question types, rubric design, peer assessment, formative feedback
- SA-4 (031–040): Curriculum — course outline structure, prerequisite mapping, module design, LMS config
- SA-5 (041–050): Academic writing — literature review structure, abstract writing, methodology section
- SA-6 (051–060): Research — hypothesis formation, experimental design, survey construction, IRB considerations
- SA-7 (061–070): Study techniques — Feynman method, spaced repetition schedules, mind mapping, active recall
- SA-8 (071–080): Professional development — certification study plans, skill gap analysis, portfolio building
- SA-9 (081–090): Corporate training — workshop facilitation, e-learning script format, train-the-trainer
- SA-10 (091–100): Knowledge management — wiki structure, documentation standards, knowledge base design

### DA-10 Industry Verticals (`industry-`)
- SA-1 (001–010): Healthcare — SOAP note writing, discharge summaries, patient education, HIPAA compliance
- SA-2 (011–020): Legal — contract clause extraction, NDA drafting, statutory analysis, case brief format
- SA-3 (021–030): Finance — financial model narration, earnings call summary, DCF assumptions, risk memo
- SA-4 (031–040): Gaming — GDD templates, NPC dialogue trees, quest design, game economy balancing
- SA-5 (041–050): Manufacturing — FMEA analysis, control plan, SPC interpretation, ISO 9001 procedures
- SA-6 (051–060): Retail — product description SEO, review response templates, inventory demand forecasting
- SA-7 (061–070): Real estate — property listing copy, market analysis memo, investment one-pager
- SA-8 (071–080): HR Tech — job posting SEO, ATS optimization, skills taxonomy, compensation benchmarking
- SA-9 (081–090): SaaS — product changelog writing, customer onboarding sequence, churn analysis report
- SA-10 (091–100): E-commerce — product SEO copy, abandoned cart emails, upsell copy, returns policy

---

## Task 1: Create Team

**Step 1:** Create the team
```
Use TeamCreate with team_name: "content-expansion"
```

**Step 2:** Verify team created — check `~/.claude/teams/content-expansion/config.json` exists

**Step 3:** Commit any existing seed content that hasn't been committed
```bash
cd /c/Users/Admin/Prompts\&Skills
git status
```

---

## Task 2: Launch 10 Domain Agents (ALL IN PARALLEL)

Launch all 10 domain agents in a **single message with 10 simultaneous Task tool calls**.

Each Domain Agent receives a prompt containing:
1. Their domain name and prefix
2. Their 10 sub-agent topic assignments (from the table above)
3. The exact file format requirements (frontmatter + body sections)
4. The project root path: `/c/Users/Admin/Prompts&Skills`
5. Their instruction to **immediately spawn 10 sub-agents in parallel**

**Domain Agent prompt template:**

```
You are Domain Agent for [DOMAIN NAME] on the content-expansion team.

Your prefix is: [PREFIX]
Your output directories:
- /c/Users/Admin/Prompts&Skills/src/content/agents/
- /c/Users/Admin/Prompts&Skills/src/content/prompts/
- /c/Users/Admin/Prompts&Skills/src/content/skills/

IMMEDIATELY spawn 10 sub-agents in parallel (single message, 10 Task tool calls).
Assign each sub-agent their specific topic and number range as follows:

[INSERT SA-1 through SA-10 topic assignments for this domain]

Each sub-agent must:
1. Write exactly 10 agent files, 10 prompt files, 10 skill files (30 total)
2. Use filenames: {prefix}agent-NNN.md, {prefix}prompt-NNN.md, {prefix}skill-NNN.md
3. Follow the EXACT frontmatter schema and body structure below

--- FRONTMATTER SCHEMA ---
---
title: "..."
description: "..."
category: agents  # or prompts or skills
tags: ["tag1", "tag2", "tag3", "tag4"]
difficulty: beginner  # or intermediate or advanced
date: 2026-02-25
featured: false
---

--- AGENT BODY STRUCTURE ---
[intro para]
## System Prompt
[full system prompt in code block]
## Integration Example
[working Python or TypeScript code using Anthropic SDK]
## Configuration
[options]
## Use Cases
[3+ examples]
## Common Pitfalls
[2-3 watch-outs]

--- PROMPT BODY STRUCTURE ---
[intro para]
## Prompt
[full prompt with {{variable}} placeholders in code block]
## Variables
| Variable | Description | Example |
## Example Output
[realistic output]
## Variations
[2-3 adaptation tips]
## Best Model
[recommendation]

--- SKILL BODY STRUCTURE ---
[intro para]
## Steps
[numbered guide]
## Example
[code snippet]
## When to Use
## When NOT to Use
## Prerequisites
## Pro Tips

After all 10 sub-agents complete, report total files written to team lead.
```

**Step 1:** Send single message with 10 parallel Task tool calls (one per domain agent)

**Step 2:** Wait for all 10 domain agents to report completion

---

## Task 3: Verify File Counts

Run these commands after all domain agents complete:

```bash
cd /c/Users/Admin/Prompts\&Skills
echo "Agents: $(ls src/content/agents/ | wc -l)"
echo "Prompts: $(ls src/content/prompts/ | wc -l)"
echo "Skills:  $(ls src/content/skills/ | wc -l)"
echo "Total:   $(ls src/content/agents/ src/content/prompts/ src/content/skills/ | wc -l)"
```

Expected output:
```
Agents: 1004   (1000 new + 4 existing)
Prompts: 1006  (1000 new + 6 existing)
Skills:  1004  (1000 new + 4 existing)
Total:   3014
```

If counts are short, identify which prefix ranges are missing:
```bash
ls src/content/agents/ | grep "techdev-" | wc -l   # should be 100
ls src/content/agents/ | grep "devops-" | wc -l    # should be 100
# etc.
```

Relaunch any sub-agents for missing ranges.

---

## Task 4: Validate Frontmatter

Run Astro's content check to catch any malformed frontmatter:

```bash
cd /c/Users/Admin/Prompts\&Skills
npm run build 2>&1 | head -50
```

If build errors appear, they will show the filename and field that failed. Fix each one:
- Wrong `category` value → must be exactly `agents`, `prompts`, or `skills`
- Wrong `difficulty` → must be `beginner`, `intermediate`, or `advanced`
- Missing `date` → add `date: 2026-02-25`
- Missing `title` or `description` → add them

---

## Task 5: Commit All Content

```bash
cd /c/Users/Admin/Prompts\&Skills
git add src/content/agents/ src/content/prompts/ src/content/skills/
git status | tail -5   # verify staged count
git commit -m "Add 3,000 production-grade content files — 1,000 agents + 1,000 prompts + 1,000 skills

Covers: Tech (dev/devops/security/AI-ML), Business (marketing/HR-ops),
Data & Analytics, Creative & Content, Education & Research,
and 10 Industry Verticals (healthcare, legal, finance, gaming, etc.)

Generated by 100-worker parallel agent team — 10 domain agents × 10 sub-agents.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 6: Push to GitHub Pages

```bash
cd /c/Users/Admin/Prompts\&Skills
git push origin main
```

GitHub Actions will trigger automatically. Check status:
```bash
gh run list --limit 3
```

Wait for green. Site will be live at `promptandskills.com` with all 3,000 items.

---

## Task 7: Shut Down Team

```bash
# Send shutdown to all domain agents via SendMessage type: shutdown_request
# Then call TeamDelete
```

---

## Reference: Anthropic SDK Usage (for sub-agents writing integration examples)

```python
# Python — use this pattern in all agent integration examples
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="Your system prompt here",
    messages=[
        {"role": "user", "content": "User message here"}
    ]
)
print(message.content[0].text)
```

```typescript
// TypeScript — use this pattern in all agent integration examples
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const message = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  system: "Your system prompt here",
  messages: [{ role: "user", content: "User message here" }],
});
console.log(message.content[0].text);
```

---

## Quality Bar Examples

### Example Agent File: `techdev-agent-001.md`

```markdown
---
title: "Python Async FastAPI Agent"
description: "An AI agent that generates production-ready FastAPI endpoints with async patterns, Pydantic validation, and pytest coverage."
category: agents
tags: ["python", "fastapi", "async", "pydantic", "api-design"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

[Full 300-word body with system prompt, code example, use cases, pitfalls]
```

### Example Prompt File: `marketing-prompt-001.md`

```markdown
---
title: "SEO Content Brief Generator"
description: "Generate comprehensive SEO content briefs with keyword strategy, competitor insights, and outline structure for any target keyword."
category: prompts
tags: ["seo", "content-marketing", "keyword-research", "copywriting"]
difficulty: beginner
date: 2026-02-25
featured: false
---

[Full 250-word body with prompt text, variables table, example output, variations]
```

### Example Skill File: `dataops-skill-001.md`

```markdown
---
title: "SQL Window Functions Mastery"
description: "Master SQL window functions (ROW_NUMBER, RANK, LAG, LEAD, running totals) to write analytics queries without self-joins."
category: skills
tags: ["sql", "analytics", "window-functions", "data-engineering"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

[Full 280-word body with steps, code examples, when-to-use, prerequisites, pro tips]
```
