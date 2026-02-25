---
title: "Hybrid Search Configuration Prompt"
description: "A prompt that generates complete hybrid search configurations combining dense vector and sparse BM25 retrieval with optimal fusion settings."
category: prompts
tags: ["rag", "hybrid-search", "bm25", "retrieval"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# Hybrid Search Configuration Prompt

Use this prompt to generate a production-ready hybrid search configuration with fusion weights, BM25 parameters, and query routing logic.

## Prompt

```text
Design a hybrid search configuration for my RAG system that combines dense vector search with sparse BM25 retrieval.

System details:
- Vector database: {{vector_db}}
- Document types: {{doc_types}}
- Query patterns: {{query_patterns}}
- Average query length: {{avg_query_tokens}} tokens
- Corpus size: {{corpus_size}} documents
- Current retrieval quality: {{current_quality}}
- Latency budget: {{latency_ms}}ms total

Provide:
1. **BM25 Configuration**: Tokenizer, k1, b parameters, stop words strategy
2. **Dense Search Configuration**: Index type (HNSW, IVF), ef_search/nprobe settings
3. **Fusion Method**: RRF vs. convex combination with rationale
4. **Fusion Weights**: Initial dense/sparse weights with tuning strategy
5. **Query Router**: Logic for routing queries to dense-only, sparse-only, or hybrid
6. **Implementation Code**: Working Python implementation for your vector DB
7. **Evaluation Plan**: How to measure hybrid search improvement over single-mode
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `vector_db` | Vector database in use | Weaviate |
| `doc_types` | Types of documents indexed | API docs, tutorials, blog posts |
| `query_patterns` | Common query types | Exact function names, natural language how-to questions |
| `avg_query_tokens` | Average query token count | 12 |
| `corpus_size` | Number of indexed documents | 200000 |
| `current_quality` | Current retrieval performance | 65% recall@10 with dense-only |
| `latency_ms` | Total acceptable latency | 200 |

## Example Output

**Fusion Method**: Reciprocal Rank Fusion (RRF) with k=60

RRF is preferred over convex combination because your query distribution is bimodal (exact lookups + natural language), making static weights suboptimal.

**Query Router**:
```python
def route_query(query: str) -> str:
    if re.match(r'^[a-zA-Z_\.]+\(', query):  # Function name pattern
        return "sparse_only"
    elif len(query.split()) <= 3 and query.isupper():
        return "sparse_only"  # Acronym/code lookup
    elif len(query.split()) > 8:
        return "hybrid"  # Natural language
    else:
        return "hybrid"  # Default to hybrid
```

## Variations

1. **Weaviate-native** -- Replace custom fusion with Weaviate's built-in hybrid search alpha parameter for simpler deployment.
2. **Elasticsearch-focused** -- Use Elasticsearch's native RRF with dense vector (kNN) and BM25 query clauses.
3. **Low-latency** -- Pre-compute sparse scores and cache them, running only dense search at query time and fusing from cache.

## Best Model

Claude Sonnet 4.6 handles this configuration task well. The prompt produces database-specific configurations that can be deployed directly.
