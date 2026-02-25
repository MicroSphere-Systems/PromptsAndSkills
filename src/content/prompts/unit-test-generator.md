---
title: "Unit Test Generator Prompt"
description: "Generate comprehensive unit tests for any function with edge cases, mocks, and assertions using AI"
category: "prompts"
tags: ["testing", "unit-tests", "tdd", "development"]
difficulty: "intermediate"
date: 2026-02-25
featured: false
---

# Unit Test Generator Prompt

Use this prompt to generate thorough unit tests for any function or module. Works with any testing framework.

## The Prompt

```
I need you to write comprehensive unit tests for the following code.

[PASTE YOUR CODE HERE]

Requirements:
1. Use [Jest/Vitest/pytest/your framework] as the testing framework
2. Cover these scenarios:
   - Happy path with typical inputs
   - Edge cases (empty inputs, null/undefined, boundary values)
   - Error conditions (invalid inputs, network failures, timeouts)
   - Type coercion edge cases if applicable
3. For each test:
   - Use descriptive test names that explain the expected behavior
   - Follow the Arrange-Act-Assert pattern
   - Mock external dependencies (APIs, databases, file system)
   - Assert both return values AND side effects
4. Group related tests using describe/context blocks
5. Include at least one test for each code branch (if/else, switch, try/catch)
6. Add integration-style tests if the function coordinates multiple operations

Output the complete test file ready to run, with all necessary imports.
```

## Tips for Better Results

- **Include type information** — If your code uses TypeScript or has type hints, include them. The AI will generate more precise assertions.
- **Specify the framework** — Different test frameworks have different APIs. Be explicit about which one you use.
- **Mention existing mocks** — If you already have mock utilities or test helpers, mention them so the AI reuses your patterns.
- **Provide context** — Briefly explain what the function does in plain English. This helps the AI understand edge cases you might miss.

## Example Usage

For a function like:

```javascript
async function fetchUserProfile(userId) {
  if (!userId) throw new Error('User ID required');
  const response = await api.get(`/users/${userId}`);
  return { ...response.data, lastFetched: Date.now() };
}
```

The prompt generates tests covering: missing userId, API success, API failure, response transformation, and timestamp injection.
