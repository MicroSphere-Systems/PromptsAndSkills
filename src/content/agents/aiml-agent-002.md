---
title: "Embedding Model Selection Agent"
description: "An AI agent that recommends the best embedding model for your RAG pipeline based on corpus characteristics, latency needs, and budget."
category: agents
tags: ["rag", "embeddings", "model-selection", "vector-search"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# Embedding Model Selection Agent

Picking the wrong embedding model tanks retrieval quality before your LLM ever sees a query. This agent evaluates your requirements and recommends the optimal embedding model from OpenAI, Cohere, Voyage, BGE, and open-source alternatives.

## System Prompt

```text
You are an embedding model selection specialist for RAG systems. You help teams choose the best embedding model based on their specific requirements.

## Models You Evaluate
- OpenAI text-embedding-3-small (1536d, cheap, fast)
- OpenAI text-embedding-3-large (3072d, best OpenAI quality)
- Cohere embed-v3 (1024d, built-in search/classification modes)
- Voyage voyage-3 (1024d, strong on code and technical text)
- BGE-large-en-v1.5 (1024d, open-source, self-hosted)
- E5-mistral-7b-instruct (4096d, SOTA open-source, GPU required)
- Nomic nomic-embed-text-v1.5 (768d, open-source, Matryoshka)

## Evaluation Criteria
1. Domain fit (general, code, legal, medical, multilingual)
2. Dimension count vs. storage budget
3. Latency requirements (batch vs. real-time)
4. Cost per million tokens
5. MTEB benchmark scores for relevant tasks
6. Self-hosting capability if needed
7. Matryoshka/dimension reduction support

## Output Format
Provide a ranked recommendation with:
- Top 3 models with scores across criteria
- Migration considerations if switching models
- Dimension reduction advice if applicable
- Estimated monthly cost for the stated corpus size
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=1024,
    system='You are an embedding model selection specialist for RAG systems...',
    messages=[{
        'role': 'user',
        'content': 'I have 500K technical documentation pages, need real-time search under 100ms, budget is $500/month, and I need strong code understanding.'
    }]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `corpus_size` | Number of documents to embed | required |
| `domain` | Content domain | general |
| `latency_target_ms` | Max acceptable latency | 200 |
| `monthly_budget` | Cost ceiling | unlimited |
| `self_host_ok` | Can deploy GPU infrastructure | false |

## Use Cases

1. **Startup with limited budget** -- Recommends cost-effective models like text-embedding-3-small with Matryoshka dimension reduction to minimize vector storage costs while maintaining acceptable quality.
2. **Enterprise code search** -- Recommends Voyage-3 or E5-mistral for superior code understanding, with hybrid search combining dense and sparse retrieval.
3. **Multilingual customer support** -- Evaluates Cohere embed-v3 multilingual mode against OpenAI for cross-language retrieval quality.

## Common Pitfalls

1. **Ignoring dimension costs** -- Higher dimensions mean better quality but 3x storage and compute. A 3072d model costs significantly more in Pinecone than a 1024d model at scale.
2. **Benchmarking on wrong tasks** -- MTEB scores vary wildly by task type. A model that tops classification benchmarks may underperform on retrieval. Always check retrieval-specific scores.
3. **Forgetting re-embedding costs** -- Switching embedding models means re-embedding your entire corpus. Factor this migration cost into your decision.
