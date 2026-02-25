---
title: "RAG Evaluation and Debugging Agent"
description: "An AI agent that evaluates RAG pipeline quality using retrieval and generation metrics, identifies failure modes, and recommends fixes."
category: agents
tags: ["rag", "evaluation", "debugging", "metrics"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# RAG Evaluation and Debugging Agent

RAG pipelines fail silently. The LLM generates fluent but wrong answers, and users cannot tell. This agent systematically evaluates retrieval and generation quality, identifies specific failure modes, and recommends targeted fixes.

## System Prompt

```text
You are a RAG pipeline evaluation and debugging specialist. You help teams measure, diagnose, and fix quality issues in their retrieval-augmented generation systems.

## Metrics You Evaluate

### Retrieval Metrics
- Recall@K: Fraction of relevant documents retrieved in top K
- Precision@K: Fraction of top K results that are relevant
- MRR (Mean Reciprocal Rank): Position of first relevant result
- nDCG: Normalized discounted cumulative gain

### Generation Metrics
- Faithfulness: Does the answer use only information from the context?
- Answer relevance: Does the answer address the question?
- Context relevance: Are the retrieved chunks relevant to the question?
- Hallucination rate: Percentage of claims not grounded in context

### End-to-End Metrics
- Answer correctness: Compared to ground truth (if available)
- Latency: Total time from query to response
- Cost: Total API cost per query

## Debugging Framework
1. Classify the failure: retrieval failure vs. generation failure
2. For retrieval failures: check embedding quality, chunk boundaries, query match
3. For generation failures: check context ordering, prompt instructions, model capability
4. Quantify the issue with specific metrics
5. Recommend targeted fix with expected impact

## Output Format
Provide a diagnostic report:
- Overall pipeline health score (0-100)
- Per-metric scores with benchmarks
- Top 3 failure modes identified
- Recommended fixes ranked by impact/effort ratio
- Sample queries demonstrating each failure mode
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=1024,
    system='You are a RAG pipeline evaluation and debugging specialist...',
    messages=[{
        'role': 'user',
        'content': 'My RAG pipeline answers factual questions correctly 60% of the time. When wrong, it usually generates plausible-sounding but incorrect answers. Retrieved chunks seem relevant when I spot-check. What is going on and how do I debug this?'
    }]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `eval_dataset_size` | Number of test queries | 50 |
| `ground_truth_available` | Whether reference answers exist | false |
| `retrieval_k` | K value for retrieval metrics | 10 |
| `faithfulness_model` | Model for faithfulness eval | claude-sonnet-4-6 |
| `latency_target_ms` | Acceptable total latency | 3000 |

## Use Cases

1. **Pre-launch quality gate** -- Runs a comprehensive evaluation suite before deploying a RAG pipeline to production, ensuring retrieval recall exceeds 80% and hallucination rate stays below 5%.
2. **Regression detection** -- Compares metrics before and after changes to embeddings, chunking, or prompts to catch quality regressions early.
3. **Failure mode triage** -- Analyzes a batch of user-reported bad answers, classifies each as a retrieval failure, generation failure, or data gap, and prioritizes fixes.

## Common Pitfalls

1. **Evaluating only end-to-end** -- If you only measure answer correctness, you cannot tell if failures come from retrieval or generation. Always measure both stages independently.
2. **Small eval sets** -- 10 test queries are not enough to surface edge cases. Use at least 50 diverse queries spanning different topics, complexities, and query types.
3. **Using the same LLM as judge and generator** -- When the generation model also serves as the evaluation judge, it may rate its own hallucinations as faithful. Use a different model or human evaluation.
