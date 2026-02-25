---
title: "Python Async/Await Refactoring Prompt"
description: "A prompt that converts synchronous Python code to async/await with proper concurrency patterns and error handling."
category: prompts
tags: ["python", "async", "refactoring", "concurrency"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt takes synchronous Python code and converts it to use async/await properly. It handles the conversion of blocking I/O calls to their async equivalents, identifies opportunities for concurrent execution with gather/TaskGroup, and ensures proper resource cleanup with async context managers.

## Prompt

```
Convert the following synchronous Python code to use async/await. Follow these rules:

1. Replace all blocking I/O calls with async equivalents:
   - requests → aiohttp or httpx (async)
   - time.sleep → asyncio.sleep
   - open() for files → aiofiles.open()
   - database calls → async ORM methods

2. Identify independent operations that can run concurrently and wrap them with asyncio.gather() or asyncio.TaskGroup() (Python 3.11+).

3. Use async context managers (async with) for connections, sessions, and file handles.

4. Add proper error handling:
   - Timeout protection with asyncio.wait_for()
   - Exception handling in gathered tasks
   - Cleanup in finally blocks

5. Maintain the same external behavior — the function should return the same result type.

Input code:
```{{language}}
{{synchronous_code}}
```

Target Python version: {{python_version}}
Async HTTP library preference: {{http_library}}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `synchronous_code` | The sync Python code to convert | `def fetch_users(): ...` |
| `language` | Source language marker | `python` |
| `python_version` | Target Python version | `3.11` |
| `http_library` | Preferred async HTTP library | `httpx` |

## Example Output

```python
import asyncio
import httpx

async def fetch_all_users(user_ids: list[int]) -> list[dict]:
    async with httpx.AsyncClient() as client:
        tasks = [client.get(f"https://api.example.com/users/{uid}") for uid in user_ids]
        responses = await asyncio.gather(*tasks, return_exceptions=True)

        results = []
        for resp in responses:
            if isinstance(resp, Exception):
                logging.error(f"Failed to fetch user: {resp}")
                continue
            results.append(resp.json())
        return results
```

## Variations

1. **Trio-based** — Replace asyncio patterns with trio nurseries and trio.open_tcp_stream for apps using the Trio async framework.
2. **Streaming conversion** — For code that processes large files line by line, convert to async generators with `async for` and `yield` for memory-efficient streaming.
3. **Partial conversion** — When only some I/O calls can be made async, wrap blocking calls in `asyncio.to_thread()` to avoid blocking the event loop.

## Best Model

Claude Sonnet 4.6 handles async/await conversions well for most code. Use Claude Opus 4.6 for complex codebases with intricate error handling and multiple concurrent flows that require careful reasoning about race conditions.
