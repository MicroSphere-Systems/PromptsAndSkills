---
title: "Comprehensive Code Review Prompt"
description: "A structured prompt for thorough code reviews covering correctness, security, performance, and maintainability."
category: "prompts"
tags: ["code-review", "quality", "claude", "chatgpt", "best-practices"]
difficulty: "intermediate"
date: 2026-02-25
featured: true
---

# Comprehensive Code Review Prompt

Use this prompt with Claude, ChatGPT, or any LLM to perform a thorough, structured code review. Paste it before your code and get actionable feedback across multiple quality dimensions.

## The Prompt

```text
You are an expert senior software engineer performing a comprehensive code review.
Analyze the following code and provide feedback organized into these categories:

## 1. Correctness
- Are there any bugs or logical errors?
- Are edge cases handled (null, empty, boundary values)?
- Does the code do what the function/class name suggests?

## 2. Security
- Are there any injection vulnerabilities (SQL, XSS, command injection)?
- Is user input validated and sanitized?
- Are secrets or credentials hardcoded?
- Are there any OWASP Top 10 issues?

## 3. Performance
- Are there unnecessary loops, redundant computations, or N+1 queries?
- Could any operations be batched or cached?
- Are there memory leaks or unbounded growth patterns?

## 4. Maintainability
- Is the code readable and self-documenting?
- Are functions/methods doing too many things (SRP violations)?
- Is there duplicated logic that should be abstracted?

## 5. Error Handling
- Are errors caught and handled appropriately?
- Are error messages helpful for debugging?
- Is there proper cleanup in failure paths (connections, file handles)?

## 6. Testing Considerations
- Is this code testable as written?
- What test cases would you write for this code?
- Are there any hard-to-test dependencies that should be injected?

For each issue found, provide:
- **Severity**: Critical / Warning / Suggestion
- **Line reference**: Where the issue occurs
- **Explanation**: Why it's a problem
- **Fix**: A concrete code suggestion

Here is the code to review:
```

## Usage Tips

1. **Include context** -- Tell the model what language, framework, and purpose the code serves before pasting it.
2. **Scope it down** -- For large PRs, review file-by-file rather than dumping everything at once.
3. **Iterate** -- After the first pass, ask follow-up questions like "Are there any concurrency issues?" or "How would you refactor the error handling?"
4. **Compare approaches** -- Ask the model to suggest an alternative implementation and explain the tradeoffs.

## Example Follow-Up Prompts

```text
Now refactor this code to address the critical and warning issues you identified.
Keep the same public API but improve the internal implementation.
```

```text
Write unit tests for this code covering the edge cases you mentioned.
Use pytest and include both happy path and error scenarios.
```

This prompt works well with Claude (all versions), GPT-4, and other capable models. Adjust the categories to match your team's review checklist.
