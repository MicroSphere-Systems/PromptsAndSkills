---
title: "Prompt Engineering Fundamentals"
description: "Core techniques for writing effective prompts that get reliable, high-quality results from LLMs."
category: "skills"
tags: ["prompt-engineering", "llm", "techniques", "fundamentals", "claude"]
difficulty: "beginner"
date: 2026-02-25
featured: true
---

# Prompt Engineering Fundamentals

Prompt engineering is the skill of communicating effectively with large language models. A well-crafted prompt can be the difference between a vague, unhelpful response and a precise, actionable one.

## Core Techniques

### 1. Be Specific and Explicit

Vague prompts get vague answers. Tell the model exactly what you want.

**Weak:**
```text
Tell me about Python error handling.
```

**Strong:**
```text
Explain Python's try/except/finally pattern with a practical example showing
how to handle a FileNotFoundError when reading a config file. Include the
correct way to log the error and provide a fallback default config.
```

### 2. Assign a Role

Give the model an identity that matches the expertise you need.

```text
You are a senior database administrator with 15 years of PostgreSQL experience.
Review this query and suggest optimizations for a table with 50 million rows.
```

Role assignment activates relevant knowledge patterns and adjusts the response's depth and vocabulary.

### 3. Provide Examples (Few-Shot)

Show the model what you want by providing input-output examples.

```text
Convert these user stories into acceptance criteria:

User story: "As a user, I want to reset my password via email."
Acceptance criteria:
- Given a registered email, when "Forgot Password" is clicked, then a reset
  link is sent within 60 seconds
- The reset link expires after 24 hours
- After resetting, the user is redirected to login

Now convert this user story:
"As an admin, I want to bulk import users from a CSV file."
```

### 4. Use Structured Output Formats

Tell the model the exact format you want the response in.

```text
Analyze this log file and return a JSON object with this structure:
{
  "error_count": number,
  "warning_count": number,
  "most_common_error": string,
  "time_range": { "start": "ISO timestamp", "end": "ISO timestamp" },
  "recommendations": string[]
}
```

### 5. Chain of Thought

For complex reasoning tasks, ask the model to think step by step.

```text
Determine whether this function has a time complexity of O(n) or O(n^2).
Think through this step by step:
1. Identify all loops and recursive calls
2. Determine the relationship between nested operations
3. Express the total operations as a function of n
4. Simplify to Big-O notation
```

### 6. Set Constraints and Boundaries

Define what the model should and should not do.

```text
Rewrite this function to use async/await instead of callbacks.
Constraints:
- Keep the same function signature
- Do not add new dependencies
- Preserve all existing error handling behavior
- Do not change the return type
```

## Common Pitfalls

- **Overloading a single prompt** -- Break complex tasks into sequential steps rather than asking for everything at once.
- **Assuming context** -- The model does not know your codebase, your team conventions, or your deployment environment unless you say so.
- **Ignoring the output** -- Always verify generated code. LLMs can produce confident-sounding but incorrect answers.
- **Not iterating** -- Your first prompt is rarely your best. Refine based on what the model gets wrong.

## Prompt Structure Template

A reliable structure for most tasks:

```text
[Role assignment]
[Task description]
[Input data or context]
[Output format specification]
[Constraints and edge cases]
[Examples if needed]
```

This template works across models and tasks. Adapt the sections based on complexity -- simple tasks may only need a task description and output format.

## Practice Exercise

Take a task you do regularly (writing tests, reviewing PRs, writing documentation) and write a prompt for it. Test it with different models. Refine it until you get consistent, useful results. Save it as a reusable template.
