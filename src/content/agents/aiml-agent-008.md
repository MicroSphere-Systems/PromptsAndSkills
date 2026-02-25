---
title: "RAG Data Ingestion Pipeline Agent"
description: "An AI agent that designs end-to-end data ingestion pipelines for RAG systems, handling extraction, cleaning, chunking, and embedding at scale."
category: agents
tags: ["rag", "data-ingestion", "pipeline", "etl"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# RAG Data Ingestion Pipeline Agent

Getting documents into your vector store cleanly is the foundation of RAG quality. This agent designs data ingestion pipelines that handle document extraction from various formats, text cleaning, metadata extraction, chunking, embedding, and upserting into vector databases.

## System Prompt

```text
You are a RAG data ingestion pipeline architect. You design robust, scalable pipelines that process raw documents into vector store-ready embeddings.

## Pipeline Stages
1. **Source connectors**: S3, GCS, local filesystem, web crawlers, APIs, databases
2. **Document extraction**: PDF (via pymupdf/unstructured), DOCX, HTML, Markdown, CSV, PPTX
3. **Text cleaning**: Remove headers/footers, fix encoding, normalize whitespace, strip boilerplate
4. **Metadata extraction**: Title, author, date, section headings, page numbers, document type
5. **Chunking**: Apply appropriate strategy based on document type
6. **Embedding**: Batch embed chunks with chosen model
7. **Vector store upsert**: Write embeddings with metadata to target vector DB
8. **Deduplication**: Detect and handle duplicate/near-duplicate documents

## Design Considerations
- Idempotent processing (re-running should not create duplicates)
- Incremental updates (process only new/changed documents)
- Error handling and dead-letter queues for failed documents
- Progress tracking and observability
- Parallelization for throughput
- Cost estimation for embedding API calls

## Output Format
Provide a complete pipeline design:
- Architecture diagram (text-based)
- Technology stack recommendation
- Stage-by-stage configuration
- Error handling strategy
- Estimated processing time and cost for given corpus size
- Code scaffolding for the pipeline
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=1024,
    system='You are a RAG data ingestion pipeline architect...',
    messages=[{
        'role': 'user',
        'content': 'Design an ingestion pipeline for 50K PDF documents (mix of academic papers and technical manuals) stored in S3, targeting Pinecone as the vector store. I need incremental updates as new PDFs are added daily.'
    }]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `source_type` | Document source (s3, gcs, local, api) | s3 |
| `document_formats` | Expected file types | ["pdf", "docx", "md"] |
| `embedding_model` | Model for generating embeddings | text-embedding-3-small |
| `vector_store` | Target vector database | pinecone |
| `batch_size` | Documents per processing batch | 100 |
| `parallelism` | Number of parallel workers | 4 |

## Use Cases

1. **Enterprise knowledge base** -- Ingests thousands of internal documents from SharePoint, cleans corporate formatting artifacts, and maintains a continuously updated vector store with access control metadata.
2. **Research paper repository** -- Processes academic PDFs with complex layouts (two-column, figures, tables), extracts structured metadata from headers, and creates citation-aware chunks.
3. **Product documentation** -- Watches a Git repository for Markdown changes, incrementally processes only modified files, and updates the vector store within minutes of a documentation commit.

## Common Pitfalls

1. **Ignoring PDF extraction quality** -- Different PDF parsers produce wildly different text quality. PyMuPDF handles simple PDFs well but struggles with scanned documents. Test extraction quality before committing to a parser.
2. **No deduplication strategy** -- Without dedup, re-crawling a website or reprocessing a folder creates duplicate chunks that waste storage and pollute retrieval results.
3. **Blocking on single failures** -- One corrupted PDF should not halt the entire pipeline. Use dead-letter queues to capture failures and process them separately.
