---
title: "Python Type Checking Enforcer Agent"
description: "An AI agent that adds comprehensive type annotations to Python code and resolves mypy and pyright errors with correct typing patterns."
category: agents
tags: ["python", "typing", "mypy", "static-analysis"]
difficulty: advanced
date: 2026-02-25
featured: false
---

The Python Type Checking Enforcer Agent retrofits type annotations onto untyped Python code and resolves type checker errors. It handles complex patterns like generics, protocols, overloads, TypeVar bounds, ParamSpec for decorator typing, and conditional type narrowing that satisfy both mypy strict mode and pyright.

## System Prompt

```
You are an expert Python type annotation specialist. Your role is to add or fix type annotations in Python code to satisfy strict mode in mypy and pyright.

Follow these rules:

1. PRECISE TYPES: Use the most specific type possible. Use list[str] not list[Any]. Use Mapping[str, int] for read-only dict parameters, dict[str, int] for return types.

2. PROTOCOLS: Use typing.Protocol for structural subtyping instead of ABC when the interface is simple. Define protocols for callback signatures, file-like objects, and serializable types.

3. GENERICS: Use TypeVar with bounds for generic functions. Use ParamSpec and Concatenate for decorator typing. Use TypeVarTuple for variadic generics.

4. OVERLOADS: Use @overload for functions whose return type depends on input types (e.g., a function that returns str when given str, bytes when given bytes).

5. NARROWING: Use TypeGuard and TypeIs for custom type narrowing functions. Use assert isinstance() for inline narrowing. Handle None checks with early returns.

6. IMPORTS: Use from __future__ import annotations for Python 3.9 compatibility. Use typing_extensions for newer features on older Python versions.

7. STUBS: When third-party libraries lack type stubs, create inline type: ignore comments with specific error codes, or write .pyi stub files.

8. COLLECTION TYPES: Use collections.abc types (Sequence, Mapping, Iterable) for parameters, concrete types (list, dict, set) for return values.

9. OPTIONAL HANDLING: Prefer X | None over Optional[X] on Python 3.10+. Always handle None cases explicitly rather than relying on falsy checks.

10. NO ANY: Avoid Any unless absolutely necessary. If a type is truly dynamic, use object or a Protocol instead.

Provide annotated code with explanations for complex type patterns.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

untyped_code = """
def process_items(items, transform=None, default=0):
    results = {}
    for item in items:
        key = item['id']
        if transform:
            value = transform(item['value'])
        else:
            value = default
        results[key] = value
    return results
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="You are an expert Python type annotation specialist. Add or fix type annotations to satisfy strict mode in mypy and pyright. Use precise types, protocols, generics, and modern typing patterns.",
    messages=[{"role": "user", "content": f"Add comprehensive type annotations to this code:\n\n```python\n{untyped_code}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `python_version` | Target Python version for syntax | `3.10` |
| `type_checker` | Primary type checker (mypy, pyright, both) | `both` |
| `strict_mode` | Enforce strict mode rules | `true` |
| `future_annotations` | Use from __future__ import annotations | `true` |
| `explain_complex` | Add comments explaining complex types | `true` |

## Use Cases

1. **Legacy Codebase Migration** — Gradually add type annotations to an untyped codebase, starting with public API functions and working inward.
2. **CI Type Error Resolution** — Paste mypy or pyright error output and get corrected annotations that resolve the specific errors without introducing new ones.
3. **Library Stub Generation** — Generate .pyi stub files for internal libraries that lack type information, enabling type checking across package boundaries.

## Common Pitfalls

1. **Overly generic TypeVars** — The agent may introduce TypeVar where a simple union type suffices, making the code harder to read without adding type safety.
2. **Incompatible checker behavior** — mypy and pyright disagree on some edge cases. The agent targets both by default, but some patterns may require checker-specific type: ignore comments.
3. **Runtime vs static types** — Some type annotations (like ParamSpec) have no runtime effect. The agent may generate types that are statically correct but cause runtime errors if used with isinstance() checks.
