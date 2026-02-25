---
title: "Research Agent Template"
description: "A reusable template for building AI research agents that gather, analyze, and synthesize information from multiple sources."
category: "agents"
tags: ["agent", "research", "automation", "rag", "template"]
difficulty: "advanced"
date: 2026-02-25
featured: false
---

# Research Agent Template

A research agent automates the process of gathering information from multiple sources, cross-referencing findings, and producing a structured summary. This template shows you how to design and implement one.

## Architecture Overview

```text
User Query
    |
    v
[Query Planner] -- breaks the question into sub-queries
    |
    v
[Source Selector] -- chooses which sources to query
    |
    v
[Data Gatherer] -- executes searches / API calls in parallel
    |
    v
[Synthesizer] -- combines results, resolves conflicts
    |
    v
[Report Generator] -- produces structured output
```

## Agent System Prompt

```text
You are a research agent. Your job is to answer questions by gathering
information from available tools and synthesizing it into a comprehensive report.

## Process
1. Break the user's question into 2-5 specific sub-questions
2. For each sub-question, determine the best source to query
3. Gather information from each source
4. Cross-reference findings -- flag any contradictions
5. Synthesize into a structured report

## Rules
- Always cite your sources with specific references
- If sources disagree, present both perspectives and note the conflict
- Distinguish between facts, expert opinions, and your inferences
- If you cannot find reliable information, say so -- do not fabricate
- Prioritize recent sources over older ones for fast-moving topics

## Output Format
### Summary
[2-3 sentence overview]

### Key Findings
- Finding 1 (Source: ...)
- Finding 2 (Source: ...)

### Analysis
[Detailed analysis connecting the findings]

### Confidence Level
[High / Medium / Low] with explanation

### Sources
[Numbered list of sources used]
```

## Implementation with Tool Use

When using Claude or another model that supports tool use, define tools for each data source:

```python
tools = [
    {
        "name": "search_web",
        "description": "Search the web for recent information",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"},
                "recency": {"type": "string", "enum": ["day", "week", "month", "year"]}
            },
            "required": ["query"]
        }
    },
    {
        "name": "search_documentation",
        "description": "Search official documentation for a specific technology",
        "input_schema": {
            "type": "object",
            "properties": {
                "technology": {"type": "string"},
                "query": {"type": "string"}
            },
            "required": ["technology", "query"]
        }
    },
    {
        "name": "query_database",
        "description": "Query internal knowledge base for company-specific information",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"},
                "category": {"type": "string", "enum": ["engineering", "product", "policy"]}
            },
            "required": ["query"]
        }
    }
]
```

## Orchestration Loop

The core agent loop handles multi-step research:

```python
import anthropic

client = anthropic.Anthropic()

def run_research_agent(question: str, max_iterations: int = 10):
    messages = [{"role": "user", "content": question}]

    for _ in range(max_iterations):
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=4096,
            system=RESEARCH_SYSTEM_PROMPT,
            tools=tools,
            messages=messages,
        )

        # If the model is done researching, return the final answer
        if response.stop_reason == "end_turn":
            return extract_text(response)

        # Otherwise, execute tool calls and continue
        tool_results = execute_tool_calls(response)
        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})

    return "Max iterations reached"
```

## Tips for Production Use

1. **Add rate limiting** -- Research agents can make many API calls. Implement backoff and concurrency limits.
2. **Cache results** -- If the same sub-query appears in multiple research tasks, cache the results.
3. **Set time budgets** -- Give the agent a time or iteration limit to prevent runaway research loops.
4. **Human in the loop** -- For high-stakes research, have the agent present its plan before executing and ask for approval.
5. **Logging** -- Log every tool call, result, and decision for debugging and auditing.
