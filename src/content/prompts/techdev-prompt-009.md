---
title: "Python Performance Optimization Prompt"
description: "A prompt that analyzes Python code for performance bottlenecks and generates optimized versions with benchmarks."
category: prompts
tags: ["python", "performance", "optimization", "profiling"]
difficulty: advanced
date: 2026-02-25
featured: false
---

This prompt takes slow Python code along with optional profiling data and produces an optimized version. It targets algorithmic improvements, data structure changes, caching, and concurrency patterns, always providing benchmark code to verify the improvement.

## Prompt

```
Optimize the following Python code for performance:

```{{language}}
{{slow_code}}
```

Context:
- Input size: {{input_size}}
- Current runtime: {{current_runtime}}
- Target runtime: {{target_runtime}}
- Profiling data (if available): {{profiling_data}}

Follow these rules:
1. Identify the specific bottleneck (algorithmic complexity, I/O, memory, serialization).
2. Provide the optimized version with comments explaining each change.
3. Classify each optimization by impact: HIGH (>50% faster), MEDIUM (10-50%), LOW (<10%).
4. Include a benchmark script using timeit to measure before/after performance.
5. Do NOT sacrifice readability for micro-optimizations unless the gain is HIGH.
6. Consider: better algorithms, data structures (set/dict for lookups), caching (lru_cache), generators, built-in functions, and concurrency.
7. If the bottleneck is I/O-bound, suggest async or concurrent approaches.
8. If the bottleneck is CPU-bound, suggest multiprocessing or NumPy vectorization.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `slow_code` | The Python code to optimize | `def find_pairs(nums, target): ...` |
| `language` | Language marker | `python` |
| `input_size` | Expected data size | `100,000 items` |
| `current_runtime` | Measured runtime | `45 seconds` |
| `target_runtime` | Desired runtime | `under 5 seconds` |
| `profiling_data` | cProfile or py-spy output | `(optional)` |

## Example Output

```python
# BEFORE: O(n^2) - nested loop with list membership check
def find_pairs(nums, target):
    pairs = []
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                pairs.append((nums[i], nums[j]))
    return pairs

# AFTER: O(n) - single pass with set lookup [HIGH impact]
def find_pairs_optimized(nums: list[int], target: int) -> list[tuple[int, int]]:
    seen: set[int] = set()
    pairs: list[tuple[int, int]] = []
    for num in nums:
        complement = target - num
        if complement in seen:
            pairs.append((complement, num))
        seen.add(num)
    return pairs

# Benchmark
import timeit
nums = list(range(10_000))
print("Before:", timeit.timeit(lambda: find_pairs(nums, 9999), number=1))
print("After:", timeit.timeit(lambda: find_pairs_optimized(nums, 9999), number=1))
```

## Variations

1. **Memory optimization** — Focus on reducing memory footprint using generators, __slots__, and memory-mapped files instead of runtime speed.
2. **Pandas-specific** — Optimize Pandas code by replacing iterrows with vectorized operations, using proper dtypes, and leveraging query/eval for large DataFrames.
3. **Startup time** — Optimize module import time and application startup by lazy-loading heavy dependencies and using importlib.

## Best Model

Claude Opus 4.6 is recommended for complex optimization scenarios requiring deep algorithmic analysis. Claude Sonnet 4.6 works well for straightforward optimizations like data structure swaps and caching additions.
