---
title: "RAG Context Assembly Prompt"
description: "A prompt that formats retrieved chunks into optimized LLM context with source attribution, deduplication, and lost-in-the-middle mitigation."
category: prompts
tags: ["rag", "context-assembly", "token-optimization", "prompting"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# RAG Context Assembly Prompt

Use this prompt as a template for assembling retrieved context into a well-structured LLM input that maximizes answer quality and supports source citations.

## Prompt

```text
You are a helpful assistant that answers questions based ONLY on the provided context. Follow these rules strictly:

1. Use ONLY information from the context below to answer the question.
2. Cite your sources using [N] notation where N is the source number.
3. If the context does not contain enough information, say: "Based on the available information, I cannot fully answer this question."
4. Do not use prior knowledge. If a fact is not in the context, do not include it.
5. When sources conflict, note the discrepancy and cite both sources.

## Context

{{#each sources}}
[{{source_number}}] ({{source_title}} | {{source_date}})
{{source_content}}

{{/each}}

## Question
{{user_question}}

## Answer Format
- Start with a direct answer to the question
- Support each claim with [N] citations
- End with a "Sources Used" list mapping numbers to document titles
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `sources` | Array of retrieved context chunks | See structure below |
| `source_number` | Sequential number for citation | 1 |
| `source_title` | Document title or filename | API Authentication Guide |
| `source_date` | Document date or version | 2024-06-15 |
| `source_content` | The actual chunk text | Bearer tokens are passed in... |
| `user_question` | The user's original question | How do I authenticate API requests? |

## Example Output

API requests are authenticated using Bearer tokens passed in the Authorization header [1]. To obtain a token, send a POST request to the `/auth/token` endpoint with your client credentials [2]. Tokens expire after 24 hours and must be refreshed using the refresh token endpoint [2].

For server-to-server communication, you can alternatively use API keys passed via the `X-API-Key` header [3], though Bearer tokens are recommended for user-facing applications [1].

**Sources Used:**
- [1] API Authentication Guide (2024-06-15)
- [2] Token Management Reference (2024-08-01)
- [3] Server Integration Guide (2024-07-20)

## Variations

1. **Confidence-scored citations** -- Add instruction to rate confidence (high/medium/low) for each cited claim based on how directly the source supports it.
2. **Structured output** -- Request JSON output with separate fields for answer, citations array, and confidence score for programmatic processing.
3. **Multi-turn context** -- Include previous conversation turns before the context section for follow-up questions that need conversational context.

## Best Model

Claude Sonnet 4.6 excels at faithful citation and grounding. It reliably follows "only use provided context" instructions with low hallucination rates.
