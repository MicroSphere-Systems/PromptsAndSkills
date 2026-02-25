---
title: "Code Refactoring Advisor Prompt"
description: "Get AI-powered refactoring suggestions with before/after examples and explanations for cleaner code"
category: "prompts"
tags: ["refactoring", "clean-code", "development", "best-practices"]
difficulty: "intermediate"
date: 2026-02-23
featured: false
---

# Code Refactoring Advisor

Use this prompt to get actionable refactoring suggestions for any codebase. The AI analyzes your code and provides specific, prioritized improvements.

## The Prompt

```
Analyze the following code and suggest refactoring improvements.

[PASTE YOUR CODE HERE]

For each suggestion:
1. Name the specific refactoring pattern (e.g., "Extract Method", "Replace Conditional with Polymorphism")
2. Explain WHY the change improves the code (readability, testability, performance, maintainability)
3. Show the BEFORE and AFTER code
4. Rate the priority: HIGH (bugs/security), MEDIUM (maintainability), LOW (style/preference)

Focus on:
- Reducing cyclomatic complexity
- Eliminating code duplication (DRY)
- Improving naming clarity
- Simplifying control flow
- Extracting reusable functions or classes
- Removing dead code or unnecessary abstractions

Do NOT suggest changes that:
- Are purely cosmetic (formatting, bracket style)
- Add abstraction without clear benefit
- Require major architectural changes without being asked
- Change the public API or external behavior

Present suggestions ordered by priority (HIGH first).
```

## When To Use This

- Before a code review — clean up proactively
- When inheriting legacy code — understand what to improve first
- After getting a feature working — refactor while context is fresh
- During tech debt sprints — prioritize what matters most

## Pair With

Combine with the [Code Review Prompt](/prompts/code-review-prompt/) for a complete code quality workflow: review first to find issues, then refactor to fix them.
