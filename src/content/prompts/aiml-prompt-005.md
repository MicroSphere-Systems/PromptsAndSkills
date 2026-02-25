---
title: "RAG Query Expansion Prompt"
description: "A prompt that generates multiple query reformulations using HyDE, multi-query, and step-back techniques to improve RAG retrieval recall."
category: prompts
tags: ["rag", "query-expansion", "hyde", "retrieval"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# RAG Query Expansion Prompt

Use this prompt to transform a single user query into multiple optimized retrieval queries, dramatically improving recall by catching documents that different phrasings would match.

## Prompt

```text
You are a query expansion engine for a RAG system. Transform the user's query into multiple retrieval-optimized queries.

User query: {{user_query}}
Domain context: {{domain}}
Number of expansions: {{num_expansions}}

Generate the following:

1. **HyDE (Hypothetical Document)**: Write a 100-word paragraph that would appear in an ideal document answering this query. This will be embedded instead of the raw query.

2. **Multi-Query Expansions**: Generate {{num_expansions}} alternative phrasings of the query, each approaching the topic from a different angle:
   - Rephrase using different terminology
   - Rephrase from a different perspective
   - Make implicit assumptions explicit

3. **Step-Back Query**: Generate a more general version of the query that would retrieve broader context.

4. **Sub-Questions**: If the query is complex, decompose it into 2-4 atomic sub-questions that can be answered independently.

5. **Keywords**: Extract 3-5 key terms for BM25/keyword search.

Return as JSON:
{
  "original": "...",
  "hyde": "...",
  "multi_query": ["...", "...", "..."],
  "step_back": "...",
  "sub_questions": ["...", "..."],
  "keywords": ["...", "...", "..."]
}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `user_query` | The raw user query | How do I handle rate limiting in my FastAPI app? |
| `domain` | Application domain | Python web development |
| `num_expansions` | Number of multi-query variants | 3 |

## Example Output

```json
{
  "original": "How do I handle rate limiting in my FastAPI app?",
  "hyde": "FastAPI rate limiting can be implemented using the slowapi library, which is a speed-limiting extension built on top of limits. Install it with pip install slowapi, then create a Limiter instance with a key function that identifies clients by IP address. Apply rate limits as decorators on your route handlers using syntax like @limiter.limit('5/minute'). For production deployments, configure a Redis backend for distributed rate limiting across multiple workers.",
  "multi_query": [
    "FastAPI slowapi rate limiter setup and configuration",
    "Throttle API requests per client in FastAPI with middleware",
    "Implement request rate limiting per IP address in Python ASGI framework"
  ],
  "step_back": "What are the common approaches to API rate limiting in Python web frameworks?",
  "sub_questions": [
    "What libraries are available for rate limiting in FastAPI?",
    "How do I configure per-client rate limits in FastAPI?",
    "How do I handle rate limit exceeded responses in FastAPI?"
  ],
  "keywords": ["FastAPI", "rate limiting", "slowapi", "throttling", "ASGI"]
}
```

## Variations

1. **Domain-specific expansions** -- Add domain context like "medical terminology" or "legal jargon" to get expansions that use domain-specific vocabulary.
2. **Multilingual expansion** -- Add a target language parameter to generate expansions in multiple languages for cross-lingual retrieval.
3. **Minimal expansion** -- For latency-sensitive apps, request only multi-query (skip HyDE and sub-questions) to reduce generation overhead.

## Best Model

Claude Haiku 4.5 is fast enough for real-time query expansion. Use Claude Sonnet 4.6 for complex multi-hop queries requiring sub-question decomposition.
