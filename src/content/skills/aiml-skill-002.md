---
title: "Implement Semantic Chunking for RAG"
description: "Step-by-step guide to implementing semantic chunking that splits documents at natural topic boundaries using embedding similarity."
category: skills
tags: ["rag", "semantic-chunking", "embeddings", "document-processing"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# Implement Semantic Chunking for RAG

Semantic chunking splits documents at natural topic boundaries rather than arbitrary character counts. By comparing the embedding similarity of adjacent sentences, you detect topic shifts and create chunks that are coherent and self-contained.

## Steps

1. **Install dependencies**
   ```bash
   pip install langchain langchain-openai numpy
   ```

2. **Split document into sentences**
   ```python
   import re

   def split_sentences(text: str) -> list[str]:
       return re.split(r'(?<=[.!?])\s+', text.strip())

   sentences = split_sentences(document_text)
   ```

3. **Embed each sentence**
   ```python
   from langchain_openai import OpenAIEmbeddings

   embeddings_model = OpenAIEmbeddings(model="text-embedding-3-small")
   sentence_embeddings = embeddings_model.embed_documents(sentences)
   ```

4. **Calculate similarity between adjacent sentences**
   ```python
   import numpy as np

   def cosine_similarity(a, b):
       return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

   similarities = []
   for i in range(len(sentence_embeddings) - 1):
       sim = cosine_similarity(sentence_embeddings[i], sentence_embeddings[i + 1])
       similarities.append(sim)
   ```

5. **Detect breakpoints using percentile threshold**
   ```python
   threshold = np.percentile(similarities, 25)  # Bottom 25% = topic shifts
   breakpoints = [i for i, sim in enumerate(similarities) if sim < threshold]
   ```

6. **Create chunks from breakpoints**
   ```python
   chunks = []
   start = 0
   for bp in breakpoints:
       chunk = " ".join(sentences[start:bp + 1])
       chunks.append(chunk)
       start = bp + 1
   chunks.append(" ".join(sentences[start:]))  # Final chunk
   ```

7. **Post-process chunks** -- Merge very small chunks with neighbors and split very large ones
   ```python
   MIN_CHUNK_SIZE = 100  # characters
   MAX_CHUNK_SIZE = 2000

   processed = []
   buffer = ""
   for chunk in chunks:
       buffer += " " + chunk if buffer else chunk
       if len(buffer) >= MIN_CHUNK_SIZE:
           if len(buffer) > MAX_CHUNK_SIZE:
               # Split oversized chunks at sentence boundary
               mid = len(buffer) // 2
               processed.append(buffer[:mid])
               buffer = buffer[mid:]
           else:
               processed.append(buffer)
               buffer = ""
   if buffer:
       processed.append(buffer)
   ```

## Example

```python
from langchain_openai import OpenAIEmbeddings
import numpy as np

text = """Machine learning models require training data to learn patterns.
The quality of training data directly impacts model performance.
Data preprocessing includes cleaning, normalization, and feature engineering.

Natural language processing focuses on understanding human language.
Tokenization breaks text into meaningful units called tokens.
Modern NLP relies heavily on transformer architectures."""

sentences = [s.strip() for s in text.split('\n') if s.strip()]
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectors = embeddings.embed_documents(sentences)

# Find topic shift between ML and NLP sections
sims = [np.dot(vectors[i], vectors[i+1]) / (np.linalg.norm(vectors[i]) * np.linalg.norm(vectors[i+1]))
        for i in range(len(vectors)-1)]

threshold = np.percentile(sims, 30)
breaks = [i for i, s in enumerate(sims) if s < threshold]
print(f"Topic shifts detected at sentence indices: {breaks}")
```

## When to Use

- Documents with multiple distinct topics in a single file
- Long-form articles, reports, or transcripts without clear structural markers
- When fixed-size chunking breaks content in the middle of important concepts
- Corpora where topic coherence within chunks is critical for retrieval quality

## When NOT to Use

- Documents with clear structural headings (use heading-based splitting instead)
- Very short documents (under 500 words) where a single chunk suffices
- High-throughput ingestion where embedding every sentence is too expensive
- Code files or structured data (use syntax-aware splitters instead)

## Prerequisites

- Python 3.9+
- OpenAI API key (or any embedding model API)
- NumPy for similarity calculations

## Pro Tips

1. **Tune the percentile threshold** -- 25th percentile works for most text, but dense technical writing may need 15th percentile (fewer breaks) while conversational text may need 35th (more breaks). Test on a sample and visually inspect chunk boundaries.
2. **Use a sliding window** -- Instead of comparing only adjacent sentences, compare each sentence to a window of 3-5 surrounding sentences for smoother topic detection that is less sensitive to outlier sentences.
3. **Cache sentence embeddings** -- If you re-chunk documents frequently (tuning parameters), cache sentence embeddings to avoid redundant API calls. The sentence-level embeddings are reusable across different threshold settings.
