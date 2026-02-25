---
title: "Python Type Annotation Retrofit Prompt"
description: "A prompt that adds comprehensive type annotations to untyped Python code, satisfying mypy strict mode."
category: prompts
tags: ["python", "typing", "mypy", "annotations"]
difficulty: advanced
date: 2026-02-25
featured: false
---

This prompt takes untyped or partially typed Python code and adds complete type annotations that pass mypy --strict. It handles function signatures, variable annotations, generic types, callback protocols, and complex return types including overloads for functions with input-dependent return types.

## Prompt

```
Add comprehensive type annotations to the following Python code. The annotations must pass mypy --strict with no errors.

```{{language}}
{{untyped_code}}
```

Follow these rules:
1. Annotate all function parameters and return types. Use -> None for functions that return nothing.
2. Use specific types: list[str] not list, dict[str, int] not dict, tuple[int, ...] for variable-length tuples.
3. For parameters that accept read-only collections, use collections.abc types: Sequence, Mapping, Iterable, Set.
4. For functions with multiple possible return types based on input, use @overload decorators.
5. For callback parameters, use Callable[[ParamTypes], ReturnType] or define a Protocol.
6. Handle Optional correctly: use X | None (Python 3.10+) for values that can be None.
7. Use TypeVar for generic functions that preserve input types.
8. Add type: ignore[specific-code] only as a last resort for third-party library issues, with a comment explaining why.
9. Include all necessary imports from typing, collections.abc, or typing_extensions.

Target type checker: {{type_checker}}
Python version: {{python_version}}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `untyped_code` | Python code without type annotations | `def process(data, callback=None): ...` |
| `language` | Language marker | `python` |
| `type_checker` | Target type checker | `mypy` |
| `python_version` | Python version for syntax | `3.11` |

## Example Output

```python
from collections.abc import Callable, Iterable, Mapping, Sequence
from typing import TypeVar, overload

T = TypeVar("T")
K = TypeVar("K")
V = TypeVar("V")

def group_by(
    items: Iterable[T],
    key_fn: Callable[[T], K],
) -> dict[K, list[T]]:
    groups: dict[K, list[T]] = {}
    for item in items:
        k = key_fn(item)
        groups.setdefault(k, []).append(item)
    return groups

@overload
def get_value(data: Mapping[str, V], key: str, default: V) -> V: ...
@overload
def get_value(data: Mapping[str, V], key: str, default: None = None) -> V | None: ...

def get_value(data: Mapping[str, V], key: str, default: V | None = None) -> V | None:
    return data.get(key, default)
```

## Variations

1. **Pyright targeting** — Adjust type patterns to satisfy pyright's stricter inference rules, which sometimes differ from mypy on generic inference and type narrowing.
2. **Gradual typing** — Add annotations only to public API functions and class interfaces, leaving internal helper functions untyped for a phased migration approach.
3. **Stub file generation** — Generate .pyi stub files instead of inline annotations, useful for compiled extensions or when you cannot modify the source.

## Best Model

Claude Opus 4.6 is recommended for complex typing scenarios involving generics, overloads, and protocol definitions. Claude Sonnet 4.6 works well for straightforward function signatures.
