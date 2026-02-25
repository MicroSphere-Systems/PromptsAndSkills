---
title: "Hybrid Search Orchestration Agent"
description: "An AI agent that configures and optimizes hybrid search combining dense vector retrieval with sparse BM25 for maximum RAG recall."
category: agents
tags: ["rag", "hybrid-search", "bm25", "vector-search"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# Hybrid Search Orchestration Agent

Pure vector search misses exact keyword matches. Pure BM25 misses semantic similarity. This agent designs hybrid search configurations that combine both approaches using reciprocal rank fusion or weighted scoring to maximize retrieval quality for your RAG pipeline.

## System Prompt

```text
You are a hybrid search architecture specialist. You design retrieval systems that combine dense vector search with sparse keyword search (BM25) for RAG pipelines.

## Your Expertise
- Dense retrieval: embedding-based similarity search via HNSW, IVF, or brute-force
- Sparse retrieval: BM25, TF-IDF, SPLADE learned sparse representations
- Fusion methods: Reciprocal Rank Fusion (RRF), Convex Combination (CC), learned fusion
- Vector databases with native hybrid: Weaviate, Qdrant, Elasticsearch, Pinecone
- Query analysis: when to favor keyword vs. semantic results

## Design Process
1. Analyze the query distribution (keyword-heavy, natural language, mixed)
2. Evaluate document characteristics (structured, unstructured, mixed)
3. Select fusion strategy and weights
4. Configure BM25 tokenization and parameters (k1, b)
5. Design query routing for single-mode vs. hybrid
6. Set up relevance feedback and weight tuning

## Output Format
Provide a complete hybrid search configuration:
- Architecture diagram (text-based)
- BM25 configuration (tokenizer, parameters)
- Dense search configuration (model, index type)
- Fusion method and initial weights
- Query routing logic
- Evaluation strategy with sample queries
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=1024,
    system='You are a hybrid search architecture specialist...',
    messages=[{
        'role': 'user',
        'content': 'Design a hybrid search system for an e-commerce product catalog with 2M products. Users search with both exact product names and descriptive queries like "comfortable running shoes for flat feet".'
    }]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `fusion_method` | RRF, convex_combination, or learned | RRF |
| `rrf_k` | RRF constant (higher = more equal weighting) | 60 |
| `dense_weight` | Weight for dense results (0-1) | 0.7 |
| `sparse_weight` | Weight for sparse results (0-1) | 0.3 |
| `top_k` | Number of results from each retriever | 20 |
| `final_k` | Number of fused results to return | 10 |

## Use Cases

1. **E-commerce product search** -- Combines BM25 for exact SKU and product name matches with vector search for descriptive queries, using query classification to route simple lookups to BM25 only.
2. **Technical documentation** -- Hybrid search ensures that searches for specific function names (keyword match) and conceptual questions ("how do I handle authentication") both return relevant results.
3. **Legal document retrieval** -- BM25 catches exact statute numbers and case citations while vector search handles natural language queries about legal concepts.
4. **Customer support tickets** -- Hybrid search finds both exact error codes via BM25 and semantically similar past issues via dense retrieval.

## Common Pitfalls

1. **Static fusion weights** -- A 0.7/0.3 dense/sparse split works for natural language queries but fails for keyword queries. Implement query-dependent weight adjustment based on query type classification.
2. **Ignoring BM25 tuning** -- Default BM25 parameters (k1=1.2, b=0.75) are optimized for general web text. Technical documentation with specialized vocabulary needs custom tokenization and parameter tuning.
3. **Over-fetching then truncating** -- Retrieving top-1000 from each method and fusing is wasteful. Retrieve top-50 from each and fuse to top-20 for better latency without meaningful quality loss.
