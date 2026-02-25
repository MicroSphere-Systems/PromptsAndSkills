---
title: "RAG Pipeline Debugging Prompt"
description: "A diagnostic prompt that analyzes RAG pipeline failures and identifies whether issues stem from retrieval, generation, or data quality."
category: prompts
tags: ["rag", "debugging", "diagnostics", "pipeline"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# RAG Pipeline Debugging Prompt

Use this prompt when your RAG system produces bad answers. It systematically diagnoses whether the failure is in retrieval, generation, data quality, or query understanding.

## Prompt

```text
You are a RAG pipeline debugger. Analyze the following failed RAG interaction and diagnose the root cause.

## Failed Interaction
- User query: {{query}}
- Retrieved chunks (top {{k}}):
{{retrieved_chunks}}
- Generated answer: {{generated_answer}}
- Expected answer: {{expected_answer}}
- Relevance scores: {{relevance_scores}}

## Diagnostic Analysis

Evaluate each pipeline stage:

1. **Query Understanding**: Did the system correctly interpret the user's intent?
   - Is the query ambiguous?
   - Would query expansion help?

2. **Retrieval Quality**: Are the retrieved chunks relevant?
   - Score each chunk's relevance to the query (0-1)
   - Identify if the correct information exists in the corpus but was not retrieved
   - Check for embedding/keyword mismatch

3. **Context Assembly**: Was the relevant information properly presented?
   - Is the relevant chunk buried in irrelevant context?
   - Is there conflicting information across chunks?

4. **Generation Quality**: Did the LLM use the context correctly?
   - Did it hallucinate beyond the context?
   - Did it miss relevant information in the context?
   - Did the system prompt cause issues?

5. **Root Cause Classification**:
   - RETRIEVAL_FAILURE: Relevant docs not retrieved
   - GENERATION_FAILURE: Relevant docs retrieved but answer still wrong
   - DATA_GAP: Information not in the corpus
   - QUERY_AMBIGUITY: Query has multiple valid interpretations
   - CONTEXT_OVERFLOW: Too much noise in retrieved context

6. **Recommended Fix**: Specific, actionable fix for this failure mode.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `query` | User's original question | What is the refund policy for annual plans? |
| `k` | Number of retrieved chunks | 5 |
| `retrieved_chunks` | The actual retrieved text | [chunk1, chunk2, ...] |
| `generated_answer` | The system's response | Our refund policy allows... |
| `expected_answer` | The correct answer | Annual plans are non-refundable after 30 days... |
| `relevance_scores` | Similarity scores per chunk | [0.87, 0.82, 0.79, 0.65, 0.61] |

## Example Output

**Root Cause**: RETRIEVAL_FAILURE

**Analysis**: The query "refund policy for annual plans" retrieved 5 chunks about general refund policies and pricing, but none specifically mention annual plan refund terms. The correct information exists in the "Subscription Terms" document which was not in the top 5.

**Why Retrieval Failed**: The refund policy for annual plans is described in a document titled "Enterprise Subscription Agreement" using the phrase "cancellation terms" rather than "refund policy." The embedding similarity between the query and this document was 0.52, below the retrieval threshold.

**Recommended Fixes**:
1. Add "refund" and "cancellation" as synonyms in query expansion
2. Create a metadata filter for document type = "policy" to narrow search space
3. Consider adding a cross-reference chunk that links refund queries to subscription terms

## Variations

1. **Batch debugging** -- Analyze 10+ failures at once to identify systemic patterns rather than individual issues.
2. **Automated triage** -- Simplify output to just root cause classification and severity for automated monitoring dashboards.
3. **A/B comparison** -- Compare two pipeline configurations on the same failing queries to identify which changes helped.

## Best Model

Claude Opus 4.6 for complex multi-stage failures. Claude Sonnet 4.6 is sufficient for straightforward retrieval or generation failures.
