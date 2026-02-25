---
title: "RAG Document Chunking Strategy Prompt"
description: "A prompt that analyzes document samples and recommends optimal chunking strategies with specific parameters for RAG pipelines."
category: prompts
tags: ["rag", "chunking", "document-processing", "retrieval"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# RAG Document Chunking Strategy Prompt

Use this prompt to get actionable chunking recommendations for your specific document types. Feed it a sample of your corpus and receive a complete chunking configuration.

## Prompt

```text
You are a document chunking specialist for RAG systems. Analyze the following document sample and recommend the optimal chunking strategy.

Document sample:
{{document_sample}}

Document corpus details:
- Total documents: {{corpus_size}}
- Document type: {{document_type}}
- Average document length: {{avg_length}} words
- Target use case: {{use_case}}

Provide your recommendation in this format:

1. **Recommended Strategy**: Name and description
2. **Chunk Size**: Optimal token count with reasoning
3. **Chunk Overlap**: Recommended overlap with reasoning
4. **Preprocessing Steps**: Any cleaning needed before chunking
5. **Separator Hierarchy**: If using recursive splitting, list separators in order
6. **Special Handling**: Rules for code blocks, tables, lists, or other structured content
7. **Python Implementation**: Working code using LangChain RecursiveCharacterTextSplitter or equivalent
8. **Expected Chunk Count**: Estimated total chunks for the corpus
9. **Quality Check**: How to verify chunks maintain semantic coherence
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `document_sample` | A representative sample from your corpus | First 2000 chars of a typical document |
| `corpus_size` | Total number of documents | 10000 |
| `document_type` | Type of documents | Technical API documentation |
| `avg_length` | Average document word count | 3000 |
| `use_case` | How retrieved chunks will be used | Question answering chatbot |

## Example Output

**Recommended Strategy**: Recursive Character Splitting with Markdown-aware separators

**Chunk Size**: 400 tokens (optimal for API docs where each endpoint section is self-contained)

**Chunk Overlap**: 50 tokens (12.5% overlap to preserve context across section boundaries)

**Preprocessing Steps**:
1. Remove navigation boilerplate (sidebar, footer)
2. Normalize heading levels (ensure H1 > H2 > H3 hierarchy)
3. Convert HTML tables to Markdown tables

**Python Implementation**:
```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,
    chunk_overlap=50,
    separators=["\n## ", "\n### ", "\n\n", "\n", ". ", " "],
    length_function=lambda x: len(x.split()),
)
chunks = splitter.split_text(document_text)
```

## Variations

1. **For code-heavy documents** -- Add code fence markers (```) to the separator hierarchy and increase chunk size to 600 tokens to keep code blocks intact.
2. **For legal documents** -- Use section/clause numbering patterns as primary separators and enable parent-child chunking for cross-reference resolution.
3. **For conversational transcripts** -- Chunk by speaker turns or topic shifts rather than character count, preserving dialogue context.

## Best Model

Claude Sonnet 4.6 handles this well for most cases. Use Claude Opus 4.6 for complex multi-format corpora where the analysis requires deeper reasoning about document structure.
