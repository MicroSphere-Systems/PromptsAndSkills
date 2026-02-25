---
title: "RAG Faithfulness Evaluation Prompt"
description: "A prompt for evaluating whether RAG-generated answers are faithfully grounded in retrieved context without hallucination."
category: prompts
tags: ["rag", "evaluation", "faithfulness", "hallucination-detection"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# RAG Faithfulness Evaluation Prompt

Use this prompt to automatically evaluate whether a RAG-generated answer is faithfully grounded in the provided context. It detects hallucinated claims and scores overall faithfulness.

## Prompt

```text
You are a faithfulness evaluator for RAG systems. Your job is to determine whether a generated answer is faithfully grounded in the provided context.

## Context Provided to the RAG System
{{context}}

## Question
{{question}}

## Generated Answer
{{answer}}

## Evaluation Task

1. **Extract Claims**: Break the generated answer into individual factual claims.

2. **Verify Each Claim**: For each claim, determine:
   - SUPPORTED: The claim is directly stated or clearly implied by the context
   - PARTIALLY_SUPPORTED: The claim is related to context content but adds detail not present
   - UNSUPPORTED: The claim has no basis in the provided context
   - CONTRADICTED: The claim directly contradicts information in the context

3. **Score**: Calculate faithfulness as (SUPPORTED claims) / (total claims)

Return as JSON:
{
  "claims": [
    {
      "claim": "the extracted claim",
      "verdict": "SUPPORTED|PARTIALLY_SUPPORTED|UNSUPPORTED|CONTRADICTED",
      "evidence": "quote from context supporting or contradicting the claim",
      "reasoning": "why this verdict"
    }
  ],
  "faithfulness_score": 0.0-1.0,
  "hallucinated_claims": ["list of unsupported/contradicted claims"],
  "overall_assessment": "brief summary"
}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `context` | The retrieved context provided to the RAG system | The full text of retrieved chunks |
| `question` | The user's original question | How does OAuth2 work? |
| `answer` | The RAG system's generated answer | OAuth2 uses access tokens... |

## Example Output

```json
{
  "claims": [
    {
      "claim": "OAuth2 uses access tokens for authorization",
      "verdict": "SUPPORTED",
      "evidence": "Access tokens are the primary mechanism for authorization in OAuth2",
      "reasoning": "Directly stated in context chunk 1"
    },
    {
      "claim": "Access tokens expire after 1 hour by default",
      "verdict": "UNSUPPORTED",
      "evidence": "null",
      "reasoning": "The context mentions token expiration but does not specify a default duration"
    }
  ],
  "faithfulness_score": 0.75,
  "hallucinated_claims": ["Access tokens expire after 1 hour by default"],
  "overall_assessment": "The answer is mostly faithful but includes one specific claim about default token expiration that is not supported by the provided context."
}
```

## Variations

1. **Binary scoring** -- Simplify to just SUPPORTED/UNSUPPORTED for faster evaluation with less nuance.
2. **Batch evaluation** -- Modify to accept an array of question-context-answer triples and evaluate all at once for efficiency.
3. **With severity weighting** -- Add importance weights to claims so that hallucinating a critical fact (like a dosage or price) scores worse than hallucinating a minor detail.

## Best Model

Claude Sonnet 4.6 is the best balance of evaluation quality and cost. Do not use the same model for both generation and evaluation to avoid self-reinforcing bias.
