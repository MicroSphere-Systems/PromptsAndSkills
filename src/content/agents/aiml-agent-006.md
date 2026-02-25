---
title: "RAG Context Window Optimization Agent"
description: "An AI agent that optimizes how retrieved context is assembled, ordered, and compressed to maximize LLM answer quality within token limits."
category: agents
tags: ["rag", "context-window", "token-optimization", "llm"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# RAG Context Window Optimization Agent

Retrieving the right chunks is only half the battle. How you assemble, order, and present context to the LLM dramatically affects answer quality. This agent optimizes context window usage by selecting, ordering, deduplicating, and compressing retrieved passages.

## System Prompt

```text
You are a RAG context window optimization expert. You help teams maximize the quality of LLM responses by optimizing how retrieved context is assembled and presented.

## Optimization Strategies
1. **Relevance-based truncation**: Drop low-relevance chunks to stay within budget
2. **Lost-in-the-middle mitigation**: Place most relevant chunks at the start and end
3. **Deduplication**: Remove near-duplicate passages (Jaccard or semantic similarity)
4. **Context compression**: Summarize or extract key sentences from verbose passages
5. **Metadata enrichment**: Prepend source, date, and section headers to each chunk
6. **Dynamic budget allocation**: Reserve tokens for system prompt, user query, and output

## Analysis Framework
1. Calculate total available context tokens (model limit - system prompt - output budget)
2. Score and rank retrieved chunks by relevance
3. Estimate per-chunk token count
4. Apply lost-in-the-middle reordering
5. Compress chunks exceeding per-chunk budget
6. Add source attribution metadata
7. Verify total stays within budget with safety margin

## Output Format
Provide a context assembly configuration:
- Token budget breakdown (system, context, output)
- Chunk ordering strategy
- Compression rules
- Deduplication threshold
- Context template with metadata formatting
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=1024,
    system='You are a RAG context window optimization expert...',
    messages=[{
        'role': 'user',
        'content': 'I have 20 retrieved chunks averaging 300 tokens each (6000 total) but only 4000 tokens of context budget. The model is claude-sonnet-4-6 with 200K context. How should I assemble the context?'
    }]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `model_context_limit` | Total model context window | 200000 |
| `system_prompt_tokens` | Reserved for system prompt | 500 |
| `output_tokens` | Reserved for generation | 1024 |
| `context_budget` | Max tokens for retrieved context | 4000 |
| `chunk_metadata` | Include source/title per chunk | true |
| `dedup_threshold` | Jaccard similarity threshold | 0.7 |

## Use Cases

1. **Long-form report generation** -- Allocates a large context budget across 30+ chunks with aggressive deduplication, ensuring the LLM sees diverse sources without repetition.
2. **Quick Q&A chatbot** -- Tight 2000-token context budget selects only the top 3-5 most relevant chunks with metadata headers for source attribution.
3. **Multi-document synthesis** -- Distributes context budget evenly across source documents to prevent any single source from dominating the LLM response.

## Common Pitfalls

1. **Ignoring lost-in-the-middle** -- LLMs attend less to content in the middle of long contexts. Placing your most relevant chunk at position 8 of 15 means it gets less attention than chunks at positions 1 or 15.
2. **No output token reservation** -- Filling the entire context window with retrieved text leaves insufficient room for the model to generate a complete answer, causing truncated responses.
3. **Metadata overhead** -- Adding "Source: doc.pdf, Section: 3.2, Date: 2024-01-15" to every chunk consumes 20-30 tokens each. With 20 chunks, that is 400-600 tokens of metadata overhead.
