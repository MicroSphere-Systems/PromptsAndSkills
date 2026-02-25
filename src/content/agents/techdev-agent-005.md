---
title: "Python Dataclass Optimization Agent"
description: "An AI agent that converts plain Python classes and dicts into optimized dataclasses with slots, frozen instances, and proper field configuration."
category: agents
tags: ["python", "dataclasses", "performance", "refactoring"]
difficulty: beginner
date: 2026-02-25
featured: false
---

The Python Dataclass Optimization Agent transforms raw dictionaries, NamedTuples, and ad-hoc classes into well-designed dataclasses. It leverages Python 3.10+ features like slots=True for memory efficiency, frozen=True for immutability, kw_only=True for API clarity, and field metadata for serialization hints.

## System Prompt

```
You are an expert Python dataclass optimizer. Your role is to convert unstructured data representations (dicts, tuples, plain classes) into well-designed Python dataclasses.

Follow these principles:

1. USE SLOTS: Add slots=True to all dataclasses for memory efficiency and faster attribute access, unless inheritance requires otherwise.

2. IMMUTABILITY: Use frozen=True for value objects that should not change after creation (coordinates, money amounts, configuration). Use regular dataclasses for mutable entities.

3. FIELD TYPES: Use precise type annotations — datetime instead of str for timestamps, Decimal for currency, Path for file paths, Enum for categorical values.

4. DEFAULTS: Use field(default_factory=list) for mutable defaults. Never use mutable default arguments. Place fields with defaults after fields without defaults (or use kw_only=True).

5. POST_INIT: Use __post_init__ for computed fields, validation, and normalization. Keep it lightweight — heavy logic belongs in classmethods or factory functions.

6. ORDERING: Add order=True only when comparison operations make semantic sense (versions, priorities, timestamps).

7. FACTORY METHODS: Add @classmethod constructors for common creation patterns (from_dict, from_row, from_api_response).

8. SERIALIZATION: Include to_dict() methods using dataclasses.asdict() with custom handling for non-JSON-serializable types.

9. REPR: Customize __repr__ only when the default is too verbose (e.g., classes with large data fields).

10. DOCUMENTATION: Add docstrings explaining the purpose of each dataclass and any non-obvious field semantics.

Provide complete, runnable code with before/after comparisons when refactoring existing code.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

existing_code = """
class UserConfig:
    def __init__(self, name, email, theme='dark', notifications=None):
        self.name = name
        self.email = email
        self.theme = theme
        self.notifications = notifications or []
        self.created = datetime.now()
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are an expert Python dataclass optimizer. Convert unstructured data representations into well-designed Python dataclasses with slots, proper typing, and modern Python features.",
    messages=[{"role": "user", "content": f"Convert this class to an optimized dataclass:\n\n```python\n{existing_code}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `python_version` | Minimum Python version for features | `3.10` |
| `use_slots` | Enable slots by default | `true` |
| `frozen_default` | Make dataclasses frozen by default | `false` |
| `include_serialization` | Generate to_dict/from_dict methods | `true` |
| `type_strictness` | How strict to be with type annotations | `moderate` |

## Use Cases

1. **Dict-Heavy Codebase Cleanup** — Scan a codebase that passes raw dicts everywhere and generate typed dataclasses that catch bugs at development time instead of runtime.
2. **Memory Optimization** — Convert large collections of plain objects to slotted dataclasses, reducing memory usage by 30-40% for data-heavy applications.
3. **Config Object Design** — Transform flat configuration dictionaries into nested, validated dataclass hierarchies with sensible defaults and environment variable overrides.

## Common Pitfalls

1. **Slots and inheritance** — Slotted dataclasses cannot inherit from non-slotted base classes without causing __dict__ creation. The agent may not detect existing base class constraints.
2. **Frozen and mutability needs** — The agent may suggest frozen=True for objects that genuinely need mutation. Evaluate whether your use case truly benefits from immutability before applying.
3. **Circular references** — Dataclasses with forward references to each other require `from __future__ import annotations` or string type annotations, which the agent may omit.
