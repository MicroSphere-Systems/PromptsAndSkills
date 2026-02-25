---
title: "Embedding Model Comparison Prompt"
description: "A prompt that compares embedding models across dimensions, cost, latency, and domain fit for your specific RAG use case."
category: prompts
tags: ["rag", "embeddings", "model-comparison", "vector-search"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# Embedding Model Comparison Prompt

Use this prompt to get a detailed comparison of embedding models tailored to your specific requirements, including cost projections and migration considerations.

## Prompt

```text
Compare embedding models for my RAG use case and recommend the best option.

Requirements:
- Domain: {{domain}}
- Corpus size: {{corpus_size}} documents ({{avg_doc_tokens}} avg tokens each)
- Query language(s): {{languages}}
- Latency requirement: {{latency_ms}}ms per query
- Monthly budget: ${{budget}}
- Self-hosting capability: {{can_self_host}}
- Current model (if migrating): {{current_model}}

Compare these models across:
1. **Quality**: MTEB retrieval scores for the domain
2. **Dimensions**: Vector size and storage implications
3. **Cost**: Per-million-token pricing and monthly projection
4. **Latency**: Average embedding time per query
5. **Special features**: Matryoshka support, instruction prefixes, multilingual
6. **Hosting**: API-only vs. self-hostable

Provide a comparison table and a clear recommendation with reasoning.
Include estimated monthly costs for both embedding generation and vector storage.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `domain` | Content domain | Software engineering documentation |
| `corpus_size` | Number of documents | 500000 |
| `avg_doc_tokens` | Average tokens per document | 800 |
| `languages` | Query languages | English, Spanish |
| `latency_ms` | Max acceptable query latency | 100 |
| `budget` | Monthly budget in USD | 500 |
| `can_self_host` | GPU infrastructure available | yes |
| `current_model` | Existing model if migrating | text-embedding-ada-002 |

## Example Output

| Model | Dimensions | Retrieval nDCG | Cost/1M tokens | Monthly Est. | Latency |
|-------|-----------|---------------|----------------|-------------|---------|
| text-embedding-3-small | 1536 | 0.441 | $0.02 | $80 | 50ms |
| text-embedding-3-large | 3072 | 0.482 | $0.13 | $520 | 80ms |
| Cohere embed-v3 | 1024 | 0.467 | $0.10 | $400 | 60ms |
| Voyage-3 | 1024 | 0.491 | $0.06 | $240 | 70ms |

**Recommendation**: Voyage-3 offers the best quality-to-cost ratio for technical documentation at $240/month, well within your $500 budget. Its strong performance on code and technical text matches your domain.

## Variations

1. **Cost-minimized** -- Add a constraint like "Minimize cost while maintaining >0.4 nDCG" to get the cheapest viable option.
2. **Quality-maximized** -- Remove budget constraint and ask for the absolute best quality regardless of cost.
3. **Migration-focused** -- Emphasize migration path from current model, including re-embedding timeline and rollback strategy.

## Best Model

Claude Sonnet 4.6 provides accurate comparisons for standard use cases. The prompt works with any model that has current knowledge of embedding model benchmarks.
