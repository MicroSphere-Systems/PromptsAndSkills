---
title: "Setting Up Python Async Task Groups"
description: "A step-by-step guide to using Python 3.11+ TaskGroup for structured concurrency with proper error handling and cancellation."
category: skills
tags: ["python", "async", "taskgroup", "concurrency"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Python 3.11 introduced `asyncio.TaskGroup` as a structured concurrency primitive that replaces the error-prone `asyncio.gather()` pattern. This skill teaches you how to use TaskGroup for running concurrent async operations with automatic cancellation on failure and proper exception group handling.

## Steps

1. **Import the required modules** — Import `asyncio` and any async libraries you need (httpx, aiohttp, aiofiles).

2. **Define your async worker functions** — Create the coroutines that will run concurrently. Each should accept its own parameters and return a result.

3. **Create a TaskGroup context** — Use `async with asyncio.TaskGroup() as tg:` to create a task group. All tasks created within this context will be awaited when the context exits.

4. **Spawn tasks with create_task** — Call `tg.create_task(coroutine())` for each concurrent operation. Store the task references if you need the results.

5. **Collect results after the context** — After the `async with` block exits, all tasks are complete. Access results via `task.result()` on the stored task references.

6. **Handle ExceptionGroup** — Wrap the TaskGroup in a `try/except*` block to handle `ExceptionGroup` for granular error handling when some tasks fail.

7. **Add timeout protection** — Wrap the TaskGroup in `asyncio.timeout()` for an overall deadline that cancels all tasks if exceeded.

## Example

```python
import asyncio
import httpx

async def fetch_url(client: httpx.AsyncClient, url: str) -> dict:
    response = await client.get(url)
    response.raise_for_status()
    return {"url": url, "status": response.status_code, "size": len(response.content)}

async def fetch_all(urls: list[str]) -> list[dict]:
    results: list[asyncio.Task] = []

    async with httpx.AsyncClient() as client:
        try:
            async with asyncio.timeout(30):
                async with asyncio.TaskGroup() as tg:
                    for url in urls:
                        task = tg.create_task(fetch_url(client, url))
                        results.append(task)
        except* httpx.HTTPStatusError as eg:
            for exc in eg.exceptions:
                print(f"HTTP error: {exc}")
        except TimeoutError:
            print("Overall timeout exceeded")
            return []

    return [t.result() for t in results if not t.cancelled()]

asyncio.run(fetch_all(["https://httpbin.org/get", "https://httpbin.org/ip"]))
```

## When to Use

- You need to run multiple async operations concurrently and wait for all to complete.
- You want automatic cancellation of remaining tasks when one fails.
- You are on Python 3.11+ and want structured concurrency guarantees.
- You need to handle partial failures where some tasks succeed and others fail.

## When NOT to Use

- You are on Python 3.10 or earlier — use `asyncio.gather(return_exceptions=True)` instead.
- You need fire-and-forget tasks that outlive the current scope — use raw `asyncio.create_task()`.
- Your tasks are CPU-bound — use `multiprocessing` or `concurrent.futures.ProcessPoolExecutor`.
- You have a single async operation — just `await` it directly without a TaskGroup.

## Prerequisites

- Python 3.11 or later
- Basic understanding of `async/await` syntax
- Familiarity with `asyncio.run()` and event loop concepts

## Pro Tips

1. **Named tasks for debugging** — Use `tg.create_task(coro(), name="fetch-user-123")` to give tasks meaningful names that appear in tracebacks and debug output.
2. **Limit concurrency** — Combine TaskGroup with `asyncio.Semaphore` to limit the number of concurrent tasks, preventing resource exhaustion when processing thousands of items.
3. **Nested groups** — TaskGroups can be nested. Use inner groups for sub-operations that should be cancelled together without affecting the outer group's other tasks.
