---
title: "RAG System Architecture Design Prompt"
description: "A comprehensive prompt that generates a complete RAG system architecture from requirements, including technology selection, pipeline design, and deployment plan."
category: prompts
tags: ["rag", "architecture", "system-design", "pipeline"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# RAG System Architecture Design Prompt

Use this prompt to generate a complete RAG system architecture from your requirements. It covers every component from ingestion to serving, with technology recommendations and deployment considerations.

## Prompt

```text
Design a complete RAG system architecture based on these requirements.

## Requirements
- Use case: {{use_case}}
- Corpus: {{corpus_description}}
- Query volume: {{queries_per_day}} queries/day
- Latency requirement: {{latency_ms}}ms p95
- Accuracy requirement: {{accuracy_target}}
- Budget: ${{monthly_budget}}/month
- Team size: {{team_size}} engineers
- Existing infrastructure: {{infrastructure}}

## Design the Following Components

1. **Data Ingestion Pipeline**
   - Source connectors and extraction
   - Preprocessing and cleaning
   - Chunking strategy with specific parameters
   - Embedding model selection with cost estimate

2. **Vector Storage**
   - Database selection with reasoning
   - Index configuration (HNSW parameters, sharding)
   - Metadata schema design
   - Backup and disaster recovery

3. **Retrieval Pipeline**
   - Search strategy (dense, sparse, hybrid)
   - Query transformation approach
   - Reranking stage (if justified)
   - Metadata filtering

4. **Generation Pipeline**
   - LLM selection and configuration
   - System prompt design with citation support
   - Context assembly strategy
   - Output parsing and validation

5. **Evaluation and Monitoring**
   - Metrics to track (retrieval + generation)
   - Evaluation dataset strategy
   - Alerting thresholds
   - User feedback loop

6. **Infrastructure and Deployment**
   - Architecture diagram (text-based)
   - Technology stack summary
   - Estimated monthly cost breakdown
   - Scaling strategy for 10x growth

7. **Implementation Roadmap**
   - Phase 1: MVP (2 weeks)
   - Phase 2: Production hardening (2 weeks)
   - Phase 3: Optimization (ongoing)
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `use_case` | Primary application | Internal developer documentation search |
| `corpus_description` | Corpus details | 50K Markdown files, 200K code files, updated daily |
| `queries_per_day` | Expected query volume | 10000 |
| `latency_ms` | Target p95 latency | 2000 |
| `accuracy_target` | Required answer accuracy | 85% correct on eval set |
| `monthly_budget` | Total monthly budget | 2000 |
| `team_size` | Engineering team size | 2 |
| `infrastructure` | Existing infra | AWS, PostgreSQL, Redis |

## Example Output

**Architecture Summary**: A hybrid search RAG system on AWS using OpenAI embeddings, Pinecone serverless for vector storage, and Claude Sonnet for generation, with LangSmith for observability.

**Monthly Cost Estimate**:
| Component | Cost |
|-----------|------|
| OpenAI embeddings | $200 |
| Pinecone serverless | $300 |
| Claude Sonnet API | $800 |
| AWS infrastructure | $400 |
| LangSmith | $100 |
| **Total** | **$1,800** |

## Variations

1. **Open-source stack** -- Constrain to self-hosted components only (Qdrant, BGE embeddings, vLLM-served model) for organizations with data residency requirements.
2. **Enterprise scale** -- Design for 1M+ queries/day with multi-region deployment, caching layers, and auto-scaling.
3. **Minimal viable RAG** -- Simplify to the cheapest possible stack for validation before investing in full infrastructure.

## Best Model

Claude Opus 4.6 for comprehensive architecture design. Claude Sonnet 4.6 for focused component-level design questions.
