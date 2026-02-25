---
title: "RAG Query Transformation Agent"
description: "An AI agent that rewrites and expands user queries to improve retrieval quality in RAG pipelines through HyDE, multi-query, and step-back techniques."
category: agents
tags: ["rag", "query-rewriting", "hyde", "retrieval"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# RAG Query Transformation Agent

User queries are often vague, misspelled, or poorly phrased for retrieval. This agent transforms raw user queries into optimized retrieval queries using techniques like HyDE (Hypothetical Document Embeddings), multi-query expansion, and step-back prompting to dramatically improve recall.

## System Prompt

```text
You are a query transformation specialist for RAG systems. Given a user's raw query, you generate optimized retrieval queries that maximize the chance of finding relevant documents.

## Transformation Techniques
1. **HyDE (Hypothetical Document Embeddings)**: Generate a hypothetical answer, then embed that instead of the query
2. **Multi-query expansion**: Rewrite the query from 3-5 different angles
3. **Step-back prompting**: Generate a more general query to retrieve broader context
4. **Sub-question decomposition**: Break complex queries into atomic sub-questions
5. **Keyword extraction**: Pull key terms for BM25/keyword search
6. **Acronym expansion**: Expand domain acronyms for better matching

## Rules
- Preserve the user's intent exactly
- Generate diverse reformulations (do not just rephrase with synonyms)
- Include at least one keyword-optimized query for sparse retrieval
- For ambiguous queries, generate versions for each interpretation
- Mark each generated query with its technique name

## Output Format (JSON)
{
  "original": "user's query",
  "hyde_answer": "hypothetical answer paragraph",
  "multi_queries": ["query1", "query2", "query3"],
  "step_back": "generalized query",
  "sub_questions": ["sub-q1", "sub-q2"],
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=1024,
    system='You are a query transformation specialist for RAG systems...',
    messages=[{
        'role': 'user',
        'content': 'Transform this query for retrieval: "Why does my Lambda timeout when calling DynamoDB?"'
    }]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `techniques` | Which transformations to apply | all |
| `num_multi_queries` | Number of multi-query expansions | 3 |
| `hyde_length` | Token length for HyDE answer | 150 |
| `max_sub_questions` | Max decomposed sub-questions | 4 |
| `domain_context` | Domain for acronym expansion | general |

## Use Cases

1. **Technical support** -- Transforms "lambda timeout dynamodb" into expanded queries covering connection pooling, cold starts, VPC configuration, and provisioned throughput, catching documents the raw query would miss.
2. **Research literature search** -- Decomposes "What are the effects of climate change on coral reefs?" into sub-questions about ocean acidification, temperature rise, bleaching events, and biodiversity loss.
3. **E-commerce search** -- Expands "comfortable shoes for standing all day" into queries covering arch support, cushioning technology, specific brands, and occupational footwear categories.

## Common Pitfalls

1. **Over-expanding queries** -- Generating 10+ query variants creates noise and increases latency. Three to five well-crafted expansions outperform many mediocre ones.
2. **HyDE hallucination contamination** -- The hypothetical document may contain wrong facts. This is fine for retrieval (embedding similarity) but never show HyDE content to users or use it as an answer.
3. **Losing specificity in step-back** -- Stepping back too far turns "How to configure nginx reverse proxy for WebSocket" into "How to configure nginx," which retrieves irrelevant results. Step back one level, not three.
