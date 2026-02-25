---
title: "RAG Metadata Filtering Prompt"
description: "A prompt that generates metadata filtering strategies and filter expressions for pre-retrieval filtering in vector databases."
category: prompts
tags: ["rag", "metadata-filtering", "vector-database", "retrieval"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# RAG Metadata Filtering Prompt

Use this prompt to design metadata schemas and generate filter expressions that narrow the search space before vector similarity, improving both relevance and latency.

## Prompt

```text
Design a metadata filtering strategy for my RAG system to improve retrieval precision through pre-retrieval filtering.

Corpus description:
- Document types: {{document_types}}
- Key attributes: {{attributes}}
- User roles/access levels: {{access_levels}}
- Temporal relevance: {{temporal_requirements}}
- Vector database: {{vector_db}}

Current problem: {{current_problem}}

Provide:

1. **Metadata Schema**: Define all metadata fields with types and cardinality
   | Field | Type | Values | Purpose |

2. **Filter Strategies by Query Type**: For each common query pattern, define the filter expression
   - Include both the natural language pattern and the programmatic filter

3. **Query-to-Filter Mapping**: How to automatically extract filter parameters from user queries
   - LLM-based extraction prompt
   - Rule-based extraction patterns

4. **Filter Expression Examples**: Working code for your vector DB
   ```python
   # Example filter for Pinecone/Weaviate/Qdrant/Chroma
   ```

5. **Fallback Strategy**: What to do when filters are too restrictive (zero results)

6. **Performance Impact**: Expected latency and relevance improvement from filtering
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `document_types` | Types of documents in corpus | Product docs, API reference, changelog, blog posts |
| `attributes` | Key document attributes | product_version, language, audience_level |
| `access_levels` | User permission levels | free, pro, enterprise |
| `temporal_requirements` | Time-based relevance needs | Users expect latest version docs unless specified |
| `vector_db` | Vector database in use | Pinecone |
| `current_problem` | What is going wrong now | Users asking about v3 features get v1 documentation |

## Example Output

**Metadata Schema**:

| Field | Type | Values | Purpose |
|-------|------|--------|---------|
| `product_version` | string | "v1", "v2", "v3" | Filter by product version |
| `doc_type` | string | "api", "guide", "changelog", "blog" | Filter by content type |
| `audience` | string | "beginner", "advanced", "admin" | Match user expertise |
| `last_updated` | datetime | ISO 8601 | Temporal filtering |
| `access_tier` | string | "free", "pro", "enterprise" | Access control |

**Pinecone Filter Example**:
```python
filter = {
    "product_version": {"$eq": "v3"},
    "doc_type": {"$in": ["api", "guide"]},
    "access_tier": {"$in": ["free", "pro"]}  # user's tier and below
}
results = index.query(vector=query_embedding, filter=filter, top_k=10)
```

## Variations

1. **Access-control focused** -- Emphasize row-level security with user-specific document permissions and tenant isolation.
2. **Temporal decay** -- Add time-based boosting where recent documents score higher, with configurable decay rates.
3. **Hierarchical filtering** -- Design cascading filters that progressively relax constraints if initial filters return too few results.

## Best Model

Claude Sonnet 4.6 generates accurate filter expressions for all major vector databases. It handles the mapping between natural language queries and structured filters well.
