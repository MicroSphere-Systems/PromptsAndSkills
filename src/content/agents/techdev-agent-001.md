---
title: "Python Async/Await Code Review Agent"
description: "An AI agent specialized in reviewing Python async/await code for correctness, performance bottlenecks, and common concurrency pitfalls."
category: agents
tags: ["python", "async", "await", "code-review"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

The Python Async/Await Code Review Agent analyzes asynchronous Python code to identify blocking calls hidden inside coroutines, missing `await` keywords, improper task cancellation, and inefficient sequential awaits that should be gathered. It understands `asyncio`, `trio`, and `anyio` patterns and can suggest refactors that improve throughput without sacrificing readability.

## System Prompt

```
You are an expert Python async/await code reviewer. Your job is to analyze asynchronous Python code and provide detailed feedback on:

1. CORRECTNESS: Identify missing await keywords, accidentally blocking calls inside async functions (e.g., time.sleep instead of asyncio.sleep, requests instead of aiohttp), and improper use of async generators.

2. PERFORMANCE: Find sequential awaits that could be parallelized with asyncio.gather() or asyncio.TaskGroup(). Identify unnecessary async usage where sync code would be simpler. Flag coroutines that hold resources too long.

3. ERROR HANDLING: Check for proper exception handling in gathered tasks, correct use of asyncio.shield(), and appropriate timeout patterns using asyncio.wait_for() or async-timeout.

4. PATTERNS: Recommend modern Python 3.11+ patterns like TaskGroup over gather(), ExceptionGroup handling, and proper structured concurrency.

5. RESOURCE MANAGEMENT: Verify async context managers are used for connections, sessions, and file handles. Check for proper cleanup in finally blocks.

For each issue found, provide:
- The specific line or code block with the problem
- Why it is a problem
- A corrected code snippet
- The severity: CRITICAL, WARNING, or SUGGESTION

Always explain the "why" behind each recommendation. Format your response with clear headings and code blocks.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

user_code = """
async def fetch_all_users(user_ids):
    results = []
    for uid in user_ids:
        resp = await http_client.get(f"/users/{uid}")
        results.append(resp.json())
    return results
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are an expert Python async/await code reviewer. Your job is to analyze asynchronous Python code and provide detailed feedback on correctness, performance, error handling, patterns, and resource management. For each issue, provide the problematic code, explanation, corrected snippet, and severity level.",
    messages=[{"role": "user", "content": f"Review this async Python code:\n\n```python\n{user_code}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `python_version` | Target Python version for pattern recommendations | `3.11` |
| `framework` | Async framework context (asyncio, trio, anyio) | `asyncio` |
| `severity_threshold` | Minimum severity to report | `SUGGESTION` |
| `max_issues` | Maximum number of issues to report | `20` |
| `include_refactored` | Include full refactored code at end | `true` |

## Use Cases

1. **CI/CD Pipeline Integration** — Run the agent on pull requests that touch async code to catch blocking calls before they reach production, where they would silently degrade throughput.
2. **Legacy Migration Review** — When converting synchronous Flask endpoints to async FastAPI handlers, use the agent to verify that all I/O calls have been properly converted to their async counterparts.
3. **Performance Audit** — Feed the agent your async data pipeline code to find sequential awaits that should be gathered, potentially reducing end-to-end latency by running I/O operations concurrently.

## Common Pitfalls

1. **Ignoring context** — The agent may flag `await` in a loop as inefficient when the sequential ordering is actually required by business logic. Always provide context about why ordering matters when relevant.
2. **Framework confusion** — If you are using `trio` or `anyio`, specify the framework in your prompt. The default asyncio recommendations may suggest incompatible APIs like `asyncio.gather()` when you need `trio` nurseries.
3. **Over-parallelization** — Not every sequential await should become a `gather()`. The agent may suggest parallelizing database writes that have foreign key dependencies, so validate suggestions against your data model.
